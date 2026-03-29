import * as esbuild from 'esbuild';
import fs from 'fs';

const isWatch = process.argv.includes('--watch');

async function buildAll() {
  if (!fs.existsSync('dist')) fs.mkdirSync('dist', { recursive: true });

  // 1. Plugin main thread
  await esbuild.build({
    entryPoints: ['src/code.ts'],
    bundle: true,
    outfile: 'dist/code.js',
    platform: 'browser',
    target: ['es2017'],
  });

  // 2. UI — bundle React app then inline into HTML
  const uiResult = await esbuild.build({
    entryPoints: ['src/ui/main.tsx'],
    bundle: true,
    write: false,
    platform: 'browser',
    target: ['es2017'],
    define: { 'process.env.NODE_ENV': '"production"' },
  });

  const uiJs = uiResult.outputFiles[0].text;
  const template = fs.readFileSync('src/ui/index.html', 'utf8');
  const finalHtml = template.replace('/* __UI_SCRIPT__ */', uiJs);
  fs.writeFileSync('dist/ui.html', finalHtml);

  // 3. Restructure plugin (no UI)
  await esbuild.build({
    entryPoints: ['src/restructure-hugeicons.ts'],
    bundle: true,
    outfile: 'dist/restructure-hugeicons.js',
    platform: 'browser',
    target: ['es2017'],
  });

  console.log('[VSP Plugin] Build complete ✓');
}

if (isWatch) {
  // Watch code.ts
  const codeCtx = await esbuild.context({
    entryPoints: ['src/code.ts'],
    bundle: true,
    outfile: 'dist/code.js',
    platform: 'browser',
    target: ['es2017'],
    plugins: [{
      name: 'notify',
      setup(build) {
        build.onEnd(() => console.log('[VSP Plugin] code.ts rebuilt'));
      },
    }],
  });
  await codeCtx.watch();

  // Watch UI (rebuild manually on change)
  const rebuildUI = async () => {
    try {
      const uiResult = await esbuild.build({
        entryPoints: ['src/ui/main.tsx'],
        bundle: true,
        write: false,
        platform: 'browser',
        target: ['es2017'],
        define: { 'process.env.NODE_ENV': '"development"' },
      });
      const uiJs = uiResult.outputFiles[0].text;
      const template = fs.readFileSync('src/ui/index.html', 'utf8');
      fs.writeFileSync('dist/ui.html', template.replace('/* __UI_SCRIPT__ */', uiJs));
      console.log('[VSP Plugin] UI rebuilt');
    } catch (e) {
      console.error('[VSP Plugin] UI build error:', e.message);
    }
  };

  await rebuildUI();

  // Watch src/ui directory for changes
  fs.watch('src/ui', { recursive: true }, rebuildUI);

  console.log('[VSP Plugin] Watching...');
} else {
  buildAll();
}
