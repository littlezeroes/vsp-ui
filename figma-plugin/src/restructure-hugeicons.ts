/// <reference types="@figma/plugin-typings" />

/**
 * Hugeicons Pro → VSP Iconography Restructure Plugin
 *
 * Takes the flat Hugeicons Pro structure (59 categories × ~80 icons × 9 variants)
 * and restructures into VSP's 3-tier icon system:
 *   - iconSwapSmall section → iconSwapS/{camelName} components (24×24)
 *   - iconSwapBig section   → iconSwapB/{camelName} components (64×64)
 *   - Base components: iconSystem, iconDecoration, iconComplex
 *
 * Picks "Style=Stroke, Type=Rounded" as the canonical variant.
 * Run inside Figma on the Hugeicons Pro file.
 */

// ─── Config ──────────────────────────────────────────────────────────────────

const PREFERRED_VARIANT = 'Style=Stroke, Type=Rounded';
const FALLBACK_VARIANTS = [
  'Style=Stroke, Type=Standard',
  'Style=Stroke, Type=Sharp',
  'Style=Solid, Type=Rounded',
];

const SMALL_SIZE = 24;
const BIG_SIZE = 64;
const GRID_GAP = 32;
const ICONS_PER_ROW = 12;
const SECTION_PADDING = 50;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** kebab-case → camelCase: "gps-signal-01" → "gpsSignal01" */
function toCamelCase(str: string): string {
  return str
    .replace(/[-_](\w)/g, (_, c: string) => c.toUpperCase())
    .replace(/^(\w)/, (_, c: string) => c.toLowerCase());
}

/** Find the best variant child in an icon row frame.
 *  Children are COMPONENTs with names like "Style=Stroke, Type=Rounded" */
function findBestVariant(iconRow: FrameNode): SceneNode | null {
  const children = iconRow.children;

  // Try preferred first
  const preferred = children.find(c => c.name === PREFERRED_VARIANT);
  if (preferred) return preferred;

  // Try fallbacks in order
  for (const fallback of FALLBACK_VARIANTS) {
    const found = children.find(c => c.name === fallback);
    if (found) return found;
  }

  // Last resort: first child that looks like a variant
  const anyVariant = children.find(c => c.name.includes('Style='));
  if (anyVariant) return anyVariant;

  // Absolute last resort: first child
  return children.length > 0 ? children[0] : null;
}

/** Check if a top-level frame is an icon category.
 *  Category frames contain icon row frames, which contain COMPONENT children. */
function isCategoryFrame(node: SceneNode): boolean {
  if (node.type !== 'FRAME') return false;
  const frame = node as FrameNode;
  if (frame.children.length === 0) return false;

  // Check first few children — icon rows are FRAMEs containing COMPONENTs
  for (const child of frame.children.slice(0, 3)) {
    if (child.type === 'FRAME') {
      const row = child as FrameNode;
      if (row.children.length > 0) {
        const hasVariants = row.children.some(
          c => c.type === 'COMPONENT' || c.name.includes('Style=')
        );
        if (hasVariants) return true;
      }
    }
  }
  return false;
}

/** Clone a source node (COMPONENT) into a flat frame with vector content */
function cloneAsFlat(source: SceneNode): FrameNode | null {
  try {
    const clone = source.clone();

    // If it's a COMPONENT, we get a COMPONENT back from clone
    // If it's an INSTANCE, we can detach
    if (clone.type === 'INSTANCE') {
      return clone.detachInstance();
    }

    // If it's a COMPONENT, create a frame and move children
    if (clone.type === 'COMPONENT') {
      const frame = figma.createFrame();
      frame.resizeWithoutConstraints(
        clone.width,
        clone.height
      );
      frame.fills = [];
      // Move all children from component to frame
      for (const child of [...clone.children]) {
        frame.appendChild(child);
      }
      clone.remove();
      return frame;
    }

    // If it's already a FRAME or GROUP
    if ('children' in clone) {
      return clone as FrameNode;
    }

    // Single vector/shape — wrap in frame
    const wrapper = figma.createFrame();
    wrapper.resizeWithoutConstraints(
      'width' in source ? (source as any).width : SMALL_SIZE,
      'height' in source ? (source as any).height : SMALL_SIZE
    );
    wrapper.fills = [];
    wrapper.appendChild(clone);
    return wrapper;
  } catch (err) {
    console.error('cloneAsFlat failed:', err);
    return null;
  }
}

/** Scale all children of a frame by a factor */
function scaleChildren(frame: FrameNode, factor: number): void {
  for (const child of frame.children) {
    // Scale position
    child.x = child.x * factor;
    child.y = child.y * factor;

    // Scale size
    if ('resize' in child) {
      try {
        (child as any).resize(
          (child as any).width * factor,
          (child as any).height * factor
        );
      } catch {
        // Some nodes can't be resized, skip
      }
    }

    // Scale stroke weight
    if ('strokeWeight' in child && typeof (child as any).strokeWeight === 'number') {
      (child as any).strokeWeight = (child as any).strokeWeight * factor;
    }
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const page = figma.currentPage;
  const topNodes = [...page.children]; // snapshot to avoid mutation issues

  // Step 1: Collect all category frames
  const categories: FrameNode[] = [];
  for (const node of topNodes) {
    if (isCategoryFrame(node)) {
      categories.push(node as FrameNode);
    }
  }

  if (categories.length === 0) {
    figma.notify('No icon category frames found. Make sure you are on the correct page.', { error: true });
    return;
  }

  figma.notify(`Found ${categories.length} categories. Scanning icons...`);

  // Step 2: Extract icon data from all categories
  interface IconData {
    name: string;
    camelName: string;
    category: string;
    sourceNode: SceneNode;
  }

  const icons: IconData[] = [];
  const seenNames = new Set<string>();

  for (const category of categories) {
    for (const child of category.children) {
      if (child.type !== 'FRAME') continue;

      const iconRow = child as FrameNode;
      const variant = findBestVariant(iconRow);
      if (!variant) continue;

      const rawName = iconRow.name;
      const camelName = toCamelCase(rawName);

      // Handle duplicates by appending category suffix
      let uniqueName = camelName;
      if (seenNames.has(camelName)) {
        const catSuffix = toCamelCase(category.name).replace(/[^a-zA-Z0-9]/g, '');
        uniqueName = camelName + catSuffix;
      }
      seenNames.add(uniqueName);

      icons.push({
        name: rawName,
        camelName: uniqueName,
        category: category.name,
        sourceNode: variant,
      });
    }
  }

  figma.notify(`Found ${icons.length} icons. Creating components...`);

  // Step 3: Position — place new content below existing
  let maxY = 0;
  for (const node of topNodes) {
    const bottom = node.y + ('height' in node ? (node as any).height : 0);
    if (bottom > maxY) maxY = bottom;
  }
  const startY = maxY + 500;

  // Create sections
  const smallSection = figma.createSection();
  smallSection.name = 'iconSwapSmall';
  smallSection.x = 0;
  smallSection.y = startY;

  const bigSection = figma.createSection();
  bigSection.name = 'iconSwapBig';
  bigSection.x = 0;
  bigSection.y = startY + 200; // will move after small section is populated

  // Step 4: Create components in batches
  const BATCH_SIZE = 30;
  let processed = 0;
  let errors = 0;

  for (let i = 0; i < icons.length; i += BATCH_SIZE) {
    const batch = icons.slice(i, i + BATCH_SIZE);

    for (let j = 0; j < batch.length; j++) {
      const icon = batch[j];
      const globalIndex = i + j;

      try {
        // ── Small icon (24×24) ──
        const smallFlat = cloneAsFlat(icon.sourceNode);
        if (!smallFlat) {
          errors++;
          continue;
        }

        const smallComp = figma.createComponent();
        smallComp.name = `iconSwapS/${icon.camelName}`;
        smallComp.resizeWithoutConstraints(SMALL_SIZE, SMALL_SIZE);
        smallComp.fills = [];

        // Move children from flat clone into component
        for (const child of [...smallFlat.children]) {
          smallComp.appendChild(child);
        }
        smallFlat.remove();

        // Position in grid
        const col = globalIndex % ICONS_PER_ROW;
        const row = Math.floor(globalIndex / ICONS_PER_ROW);
        smallComp.x = SECTION_PADDING + col * (SMALL_SIZE + GRID_GAP);
        smallComp.y = SECTION_PADDING + row * (SMALL_SIZE + GRID_GAP);
        smallSection.appendChild(smallComp);

        // ── Big icon (64×64) ──
        const bigFlat = cloneAsFlat(icon.sourceNode);
        if (!bigFlat) {
          errors++;
          continue;
        }

        const bigComp = figma.createComponent();
        bigComp.name = `iconSwapB/${icon.camelName}`;
        bigComp.resizeWithoutConstraints(BIG_SIZE, BIG_SIZE);
        bigComp.fills = [];

        // Move children and scale them up
        for (const child of [...bigFlat.children]) {
          bigComp.appendChild(child);
        }
        bigFlat.remove();

        const scaleFactor = BIG_SIZE / SMALL_SIZE; // 2.667
        scaleChildren(bigComp, scaleFactor);

        // Position in grid
        bigComp.x = SECTION_PADDING + col * (BIG_SIZE + GRID_GAP);
        bigComp.y = SECTION_PADDING + row * (BIG_SIZE + GRID_GAP);
        bigSection.appendChild(bigComp);

      } catch (err) {
        console.error(`Failed: ${icon.name} (${icon.category}):`, err);
        errors++;
      }

      processed++;
    }

    // Yield to UI thread
    figma.notify(`${processed}/${icons.length} icons processed...`, { timeout: 800 });
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  // Step 5: Reposition bigSection below smallSection
  // Section auto-sizes, so read its bounds after population
  bigSection.y = smallSection.y + smallSection.height + 200;

  // Step 6: Create base components above sections
  const baseY = startY - 200;

  const iconSystem = figma.createComponent();
  iconSystem.name = 'iconSystem';
  iconSystem.resizeWithoutConstraints(SMALL_SIZE, SMALL_SIZE);
  iconSystem.fills = [];
  iconSystem.x = 0;
  iconSystem.y = baseY;

  const iconDecoration = figma.createComponent();
  iconDecoration.name = 'iconDecoration';
  iconDecoration.resizeWithoutConstraints(BIG_SIZE, BIG_SIZE);
  iconDecoration.fills = [];
  iconDecoration.x = 100;
  iconDecoration.y = baseY;

  const iconComplex = figma.createComponent();
  iconComplex.name = 'iconComplex';
  iconComplex.resizeWithoutConstraints(SMALL_SIZE, SMALL_SIZE);
  iconComplex.fills = [];
  iconComplex.x = 200;
  iconComplex.y = baseY;

  // Done
  const msg = errors > 0
    ? `Done! ${processed - errors}/${icons.length} icons. ${errors} errors (check console).`
    : `Done! ${icons.length} icons restructured into VSP format.`;

  console.log(msg);
  console.log(`Categories: ${categories.map(c => c.name).join(', ')}`);
  figma.notify(msg, { timeout: 10000 });
}

main().catch(err => {
  figma.notify(`Error: ${err.message}`, { error: true, timeout: 10000 });
  console.error(err);
});
