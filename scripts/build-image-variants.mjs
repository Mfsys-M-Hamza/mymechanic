/**
 * Responsive image copies for the static export (GitHub Pages has no image server).
 *
 * For every image in public/ this writes smaller WebP copies to
 * public/_v/<path>-<width>.webp and a manifest (.image-variants.json) listing the widths made.
 * scripts/image-loader.mjs — the next/image loader used by STATIC_EXPORT builds — reads the
 * manifest so each <Image> gets a srcset and phones download a small copy, not the original.
 *
 * Runs in the deploy workflow before `next build`; outputs are git-ignored.
 * Run locally:  node scripts/build-image-variants.mjs
 */
import sharp from "sharp";
import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

/** Must match images.deviceSizes / imageSizes in next.config.ts (the loader rounds up to these). */
export const WIDTHS = [256, 480, 828, 1200];
const ROOT = "public";
const OUT = "public/_v";
const SKIP = new Set(["_v"]);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP.has(e.name)) yield* walk(p);
    } else if (/\.(webp|jpe?g|png)$/i.test(e.name)) yield p;
  }
}

await rm(OUT, { recursive: true, force: true });
const manifest = {};
let made = 0, saved = 0;
for await (const file of walk(ROOT)) {
  const rel = "/" + path.relative(ROOT, file).split(path.sep).join("/");
  const { width = 0 } = await sharp(file).metadata();
  const widths = WIDTHS.filter((w) => w < width * 0.9);
  if (!widths.length) continue;
  const orig = (await stat(file)).size;
  const base = rel.replace(/\.[^.]+$/, "");
  await mkdir(path.dirname(path.join(OUT, base)), { recursive: true });
  for (const w of widths) {
    const info = await sharp(file).resize({ width: w }).webp({ quality: 72, alphaQuality: 85 }).toFile(path.join(OUT, `${base}-${w}.webp`));
    made++;
    if (w === widths[widths.length - 1]) saved += orig - info.size;
  }
  manifest[rel] = widths;
}
await writeFile(".image-variants.json", JSON.stringify(manifest));
console.log(`image variants: ${made} files for ${Object.keys(manifest).length} images; largest copies save ${(saved / 1048576).toFixed(1)} MB vs originals`);
