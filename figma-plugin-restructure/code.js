"use strict";
(() => {
  // src/restructure-hugeicons.ts
  var PREFERRED_VARIANT = "Style=Stroke, Type=Rounded";
  var FALLBACK_VARIANTS = [
    "Style=Stroke, Type=Standard",
    "Style=Stroke, Type=Sharp",
    "Style=Solid, Type=Rounded"
  ];
  var SMALL_SIZE = 24;
  var BIG_SIZE = 64;
  var GRID_GAP = 32;
  var ICONS_PER_ROW = 12;
  var SECTION_PADDING = 50;
  function toCamelCase(str) {
    return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()).replace(/^(\w)/, (_, c) => c.toLowerCase());
  }
  function findBestVariant(iconRow) {
    const children = iconRow.children;
    const preferred = children.find((c) => c.name === PREFERRED_VARIANT);
    if (preferred) return preferred;
    for (const fallback of FALLBACK_VARIANTS) {
      const found = children.find((c) => c.name === fallback);
      if (found) return found;
    }
    const anyVariant = children.find((c) => c.name.includes("Style="));
    if (anyVariant) return anyVariant;
    return children.length > 0 ? children[0] : null;
  }
  function isCategoryFrame(node) {
    if (node.type !== "FRAME") return false;
    const frame = node;
    if (frame.children.length === 0) return false;
    for (const child of frame.children.slice(0, 3)) {
      if (child.type === "FRAME") {
        const row = child;
        if (row.children.length > 0) {
          const hasVariants = row.children.some(
            (c) => c.type === "COMPONENT" || c.name.includes("Style=")
          );
          if (hasVariants) return true;
        }
      }
    }
    return false;
  }
  function cloneAsFlat(source) {
    try {
      const clone = source.clone();
      if (clone.type === "INSTANCE") {
        return clone.detachInstance();
      }
      if (clone.type === "COMPONENT") {
        const frame = figma.createFrame();
        frame.resizeWithoutConstraints(
          clone.width,
          clone.height
        );
        frame.fills = [];
        for (const child of [...clone.children]) {
          frame.appendChild(child);
        }
        clone.remove();
        return frame;
      }
      if ("children" in clone) {
        return clone;
      }
      const wrapper = figma.createFrame();
      wrapper.resizeWithoutConstraints(
        "width" in source ? source.width : SMALL_SIZE,
        "height" in source ? source.height : SMALL_SIZE
      );
      wrapper.fills = [];
      wrapper.appendChild(clone);
      return wrapper;
    } catch (err) {
      console.error("cloneAsFlat failed:", err);
      return null;
    }
  }
  function scaleChildren(frame, factor) {
    for (const child of frame.children) {
      child.x = child.x * factor;
      child.y = child.y * factor;
      if ("resize" in child) {
        try {
          child.resize(
            child.width * factor,
            child.height * factor
          );
        } catch (e) {
        }
      }
      if ("strokeWeight" in child && typeof child.strokeWeight === "number") {
        child.strokeWeight = child.strokeWeight * factor;
      }
    }
  }
  async function main() {
    const page = figma.currentPage;
    const topNodes = [...page.children];
    const categories = [];
    for (const node of topNodes) {
      if (isCategoryFrame(node)) {
        categories.push(node);
      }
    }
    if (categories.length === 0) {
      figma.notify("No icon category frames found. Make sure you are on the correct page.", { error: true });
      return;
    }
    figma.notify(`Found ${categories.length} categories. Scanning icons...`);
    const icons = [];
    const seenNames = /* @__PURE__ */ new Set();
    for (const category of categories) {
      for (const child of category.children) {
        if (child.type !== "FRAME") continue;
        const iconRow = child;
        const variant = findBestVariant(iconRow);
        if (!variant) continue;
        const rawName = iconRow.name;
        const camelName = toCamelCase(rawName);
        let uniqueName = camelName;
        if (seenNames.has(camelName)) {
          const catSuffix = toCamelCase(category.name).replace(/[^a-zA-Z0-9]/g, "");
          uniqueName = camelName + catSuffix;
        }
        seenNames.add(uniqueName);
        icons.push({
          name: rawName,
          camelName: uniqueName,
          category: category.name,
          sourceNode: variant
        });
      }
    }
    figma.notify(`Found ${icons.length} icons. Creating components...`);
    let maxY = 0;
    for (const node of topNodes) {
      const bottom = node.y + ("height" in node ? node.height : 0);
      if (bottom > maxY) maxY = bottom;
    }
    const startY = maxY + 500;
    const smallSection = figma.createSection();
    smallSection.name = "iconSwapSmall";
    smallSection.x = 0;
    smallSection.y = startY;
    const bigSection = figma.createSection();
    bigSection.name = "iconSwapBig";
    bigSection.x = 0;
    bigSection.y = startY + 200;
    const BATCH_SIZE = 30;
    let processed = 0;
    let errors = 0;
    for (let i = 0; i < icons.length; i += BATCH_SIZE) {
      const batch = icons.slice(i, i + BATCH_SIZE);
      for (let j = 0; j < batch.length; j++) {
        const icon = batch[j];
        const globalIndex = i + j;
        try {
          const smallFlat = cloneAsFlat(icon.sourceNode);
          if (!smallFlat) {
            errors++;
            continue;
          }
          const smallComp = figma.createComponent();
          smallComp.name = `iconSwapS/${icon.camelName}`;
          smallComp.resizeWithoutConstraints(SMALL_SIZE, SMALL_SIZE);
          smallComp.fills = [];
          for (const child of [...smallFlat.children]) {
            smallComp.appendChild(child);
          }
          smallFlat.remove();
          const col = globalIndex % ICONS_PER_ROW;
          const row = Math.floor(globalIndex / ICONS_PER_ROW);
          smallComp.x = SECTION_PADDING + col * (SMALL_SIZE + GRID_GAP);
          smallComp.y = SECTION_PADDING + row * (SMALL_SIZE + GRID_GAP);
          smallSection.appendChild(smallComp);
          const bigFlat = cloneAsFlat(icon.sourceNode);
          if (!bigFlat) {
            errors++;
            continue;
          }
          const bigComp = figma.createComponent();
          bigComp.name = `iconSwapB/${icon.camelName}`;
          bigComp.resizeWithoutConstraints(BIG_SIZE, BIG_SIZE);
          bigComp.fills = [];
          for (const child of [...bigFlat.children]) {
            bigComp.appendChild(child);
          }
          bigFlat.remove();
          const scaleFactor = BIG_SIZE / SMALL_SIZE;
          scaleChildren(bigComp, scaleFactor);
          bigComp.x = SECTION_PADDING + col * (BIG_SIZE + GRID_GAP);
          bigComp.y = SECTION_PADDING + row * (BIG_SIZE + GRID_GAP);
          bigSection.appendChild(bigComp);
        } catch (err) {
          console.error(`Failed: ${icon.name} (${icon.category}):`, err);
          errors++;
        }
        processed++;
      }
      figma.notify(`${processed}/${icons.length} icons processed...`, { timeout: 800 });
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    bigSection.y = smallSection.y + smallSection.height + 200;
    const baseY = startY - 200;
    const iconSystem = figma.createComponent();
    iconSystem.name = "iconSystem";
    iconSystem.resizeWithoutConstraints(SMALL_SIZE, SMALL_SIZE);
    iconSystem.fills = [];
    iconSystem.x = 0;
    iconSystem.y = baseY;
    const iconDecoration = figma.createComponent();
    iconDecoration.name = "iconDecoration";
    iconDecoration.resizeWithoutConstraints(BIG_SIZE, BIG_SIZE);
    iconDecoration.fills = [];
    iconDecoration.x = 100;
    iconDecoration.y = baseY;
    const iconComplex = figma.createComponent();
    iconComplex.name = "iconComplex";
    iconComplex.resizeWithoutConstraints(SMALL_SIZE, SMALL_SIZE);
    iconComplex.fills = [];
    iconComplex.x = 200;
    iconComplex.y = baseY;
    const msg = errors > 0 ? `Done! ${processed - errors}/${icons.length} icons. ${errors} errors (check console).` : `Done! ${icons.length} icons restructured into VSP format.`;
    console.log(msg);
    console.log(`Categories: ${categories.map((c) => c.name).join(", ")}`);
    figma.notify(msg, { timeout: 1e4 });
  }
  main().catch((err) => {
    figma.notify(`Error: ${err.message}`, { error: true, timeout: 1e4 });
    console.error(err);
  });
})();
