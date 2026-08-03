import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('../public/assets/', import.meta.url).pathname;
const MAX_WIDTH = 1600;
const JPG_QUALITY = 82;
// Files that genuinely need transparency; everything else can become JPG.
const KEEP_PNG = new Set(['logo_nova.png', 'logo_nova_old.png']);

const formatBytes = (n) => `${(n / 1024).toFixed(0)}KB`;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(png|jpe?g)$/i.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

async function processFile(file) {
  const isPng = /\.png$/i.test(file);
  const basename = file.split('/').pop();
  const before = (await stat(file)).size;

  if (before < 200 * 1024) return { file, skipped: 'small', before };

  if (isPng && KEEP_PNG.has(basename)) {
    const out = await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer();
    if (out.length < before) {
      await sharp(out).toFile(file + '.tmp');
      const { rename } = await import('node:fs/promises');
      await rename(file + '.tmp', file);
    }
    return { file, kept: 'png', before, after: out.length };
  }

  // PNG photo → JPG, JPG → recompressed JPG
  const targetPath = isPng ? file.replace(/\.png$/i, '.jpg') : file;
  const buf = await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
    .toBuffer();

  await sharp(buf).toFile(targetPath + '.tmp');
  const { rename } = await import('node:fs/promises');
  await rename(targetPath + '.tmp', targetPath);

  if (isPng && targetPath !== file) {
    await unlink(file);
  }

  return { file, newPath: targetPath, before, after: buf.length };
}

const files = await walk(ROOT);
console.log(`Found ${files.length} images. Processing...\n`);

const results = [];
for (const f of files) {
  try {
    const r = await processFile(f);
    results.push(r);
    if (r.skipped) {
      console.log(`  skip  ${r.file.replace(ROOT, '')}  (${formatBytes(r.before)})`);
    } else {
      const saved = r.before - r.after;
      const pct = ((saved / r.before) * 100).toFixed(0);
      const renamed = r.newPath && r.newPath !== r.file ? ` → ${r.newPath.split('/').pop()}` : '';
      console.log(
        `  ok    ${r.file.replace(ROOT, '')}${renamed}  ${formatBytes(r.before)} → ${formatBytes(r.after)}  (-${pct}%)`,
      );
    }
  } catch (err) {
    console.error(`  FAIL  ${f}: ${err.message}`);
  }
}

const totalBefore = results.reduce((a, r) => a + (r.before || 0), 0);
const totalAfter = results.reduce((a, r) => a + (r.after || r.before || 0), 0);
console.log(
  `\nTotal: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}  (saved ${formatBytes(totalBefore - totalAfter)})`,
);
