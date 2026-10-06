/**
 * Brand asset pipeline.
 *
 * Takes the client's original logo (assets/source/logo-original.png) and produces:
 *  - public/brand/mm-logo.webp / mm-logo.png   trimmed logo (rename when the logo changes, so caches refresh) (proportions untouched)
 *  - src/app/icon.png / apple-icon.png   favicons generated from the logo mark
 *  - public/brand/og-image.jpg           1200x630 social sharing image
 *
 * Three background modes, picked automatically from the corners:
 *  - Already transparent (e.g. the pack's "transparent-for-dark-bg" logo) → just trimmed.
 *  - White background  → removed with an edge flood fill, so white areas INSIDE the
 *    logo (lettering, highlights) are preserved.
 *  - Coloured background (e.g. the My Mechanic yellow) → kept as part of the brand:
 *    the logo is cropped to its content and given rounded corners, because its dark
 *    lettering is designed to sit on that colour.
 * Colours are never altered.
 *
 * Re-run after replacing the source logo:  npm run assets
 * Then copy the printed logo size into client.logo.width/height.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "assets/source/logo-original.png";
const WHITE = 232; // channel threshold treated as "background white"
/** Region (fractions of the source) holding the logo mark used for favicons. Tuned for the current logo. */
const ICON_REGION = { left: 0.31, top: 0.215, width: 0.33, height: 0.215 };
const OG_TEXT = {
  line1: "EFI & Hybrid Specialists",
  line2: "Wah Cantt · Since 1998",
  line3: "Laiq Ali Chowk · Taj Market, New City Phase-1",
  line4: "4.6★ Google · Call / WhatsApp 0312-5045678",
};

const { data: srcData, info: srcInfo } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = srcInfo;

const px = (x, y) => { const i = (y * W + x) * 4; return [srcData[i], srcData[i + 1], srcData[i + 2]]; };
const corners = [px(2, 2), px(W - 3, 2), px(2, H - 3), px(W - 3, H - 3)];
const bg = [0, 1, 2].map((c) => Math.round(corners.reduce((s, p) => s + p[c], 0) / corners.length));
const alphaAt = (x, y) => srcData[(y * W + x) * 4 + 3];
const alphaMode = [alphaAt(2, 2), alphaAt(W - 3, 2), alphaAt(2, H - 3), alphaAt(W - 3, H - 3)].every((a) => a < 10);
const whiteMode = !alphaMode && bg.every((v) => v >= WHITE);

function hsv([r, g, b]) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max / 255 };
}
const bgHsv = hsv(bg);
/** Coloured-background test: same hue family and still saturated (covers gradients and soft shadows). */
const isColourBg = (rgb) => {
  const p = hsv(rgb);
  const dh = Math.min(Math.abs(p.h - bgHsv.h), 360 - Math.abs(p.h - bgHsv.h));
  return dh < 22 && p.s > 0.55 && p.v > 0.45;
};

async function transparentLogo() {
  const data = Buffer.from(srcData);
  const w = W, h = H;
  const isBg = (i) => data[i] >= WHITE && data[i + 1] >= WHITE && data[i + 2] >= WHITE;
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    seen[p] = 1;
    if (!isBg(p * 4)) continue;
    data[p * 4 + 3] = 0;
    const x = p % w, y = (p / w) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }
  // Soften the anti-aliased fringe: near-white pixels touching the removed area get partial alpha.
  for (let p = 0; p < w * h; p++) {
    const i = p * 4;
    if (data[i + 3] === 0) continue;
    const x = p % w, y = (p / w) | 0;
    const touches =
      (x > 0 && data[i - 4 + 3] === 0) || (x < w - 1 && data[i + 4 + 3] === 0) ||
      (y > 0 && data[i - w * 4 + 3] === 0) || (y < h - 1 && data[i + w * 4 + 3] === 0);
    if (!touches) continue;
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (lum > 170) data[i + 3] = Math.round(255 * (1 - (lum - 170) / 85));
  }
  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer().then((b) => sharp(b).trim().png().toBuffer());
}

/** Bounding box of logo content (non-background pixels) inside a region, with padding. */
function contentBox(region = { left: 0, top: 0, width: W, height: H }, padFrac = 0.05) {
  let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
  for (let y = region.top; y < region.top + region.height; y += 2) {
    for (let x = region.left; x < region.left + region.width; x += 2) {
      if (alphaMode ? alphaAt(x, y) < 24 : isColourBg(px(x, y))) continue;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  const pad = Math.round(Math.max(x1 - x0, y1 - y0) * padFrac);
  const left = Math.max(0, x0 - pad), top = Math.max(0, y0 - pad);
  return { left, top, width: Math.min(W, x1 + pad) - left, height: Math.min(H, y1 + pad) - top };
}

const rounded = async (buf, radiusFrac) => {
  const { width, height } = await sharp(buf).metadata();
  const r = Math.round(Math.min(width, height) * radiusFrac);
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${r}" ry="${r}"/></svg>`);
  return sharp(buf).ensureAlpha().composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
};

async function tileLogo() {
  const box = contentBox(undefined, 0.045);
  return rounded(await sharp(SRC).extract(box).png().toBuffer(), 0.07);
}

async function iconMark() {
  if (whiteMode) return null;
  // The mark keeps its own background in tile mode; transparent marks are placed on a dark tile below.
  const region = {
    left: Math.round(W * ICON_REGION.left), top: Math.round(H * ICON_REGION.top),
    width: Math.round(W * ICON_REGION.width), height: Math.round(H * ICON_REGION.height),
  };
  const box = contentBox(region, 0.08);
  // Pad (never extend) to a square so neighbouring artwork stays out of the favicon.
  const side = Math.max(box.width, box.height);
  const fill = alphaMode ? { r: 0, g: 0, b: 0, alpha: 0 } : { r: bg[0], g: bg[1], b: bg[2], alpha: 1 };
  return sharp(SRC).extract(box).resize(side, side, { fit: "contain", background: fill }).png().toBuffer();
}

await mkdir("public/brand", { recursive: true });
const logoBox = alphaMode ? contentBox(undefined, 0.02) : null;
const logo = alphaMode
  ? await sharp(SRC).extract(logoBox).png().toBuffer()
  : whiteMode ? await transparentLogo() : await tileLogo();
const meta = await sharp(logo).metadata();
console.log(`mode: ${alphaMode ? "already transparent" : whiteMode ? "transparent (white background removed)" : `tile (background rgb ${bg.join(",")})`}`);
console.log(`trimmed logo: ${meta.width}x${meta.height} → client.logo = { width: 640, height: ${Math.round((640 * meta.height) / meta.width)} }`);

await sharp(logo).resize({ width: 640 }).webp({ quality: 90, alphaQuality: 95 }).toFile("public/brand/mm-logo.webp");
await sharp(logo).resize({ width: 640 }).png({ compressionLevel: 9 }).toFile("public/brand/mm-logo.png");
await sharp(logo).resize({ width: 220 }).webp({ quality: 90 }).toFile("public/brand/mm-logo-sm.webp");

// Favicons. Coloured-background logos use the mark on its own colour, full-bleed;
// transparent logos sit centred on a dark tile so they read at 16-32px.
const mark = await iconMark();
const square = async (size, pad) => {
  if (mark && !alphaMode) return sharp(mark).resize(size, size).png({ palette: true, quality: 90, compressionLevel: 9 });
  const source = mark ?? logo;
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(source).resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 12, g: 13, b: 15, alpha: 1 } } })
    .composite([{ input: m, gravity: "center" }]).png({ palette: true, quality: 90, compressionLevel: 9 });
};
await (await square(192, 0.04)).toFile("src/app/icon.png");
await (await square(180, 0.06)).toFile("src/app/apple-icon.png");
await (await square(192, 0.04)).toFile("public/brand/icon-192.png");
await (await square(512, 0.04)).toFile("public/brand/icon-512.png");

// Open Graph image
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const ogLogo = await sharp(logo).resize({ width: 470, height: 470, fit: "inside" }).toBuffer();
const ogMeta = await sharp(ogLogo).metadata();
const ogBg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g" cx="30%" cy="50%" r="70%"><stop offset="0" stop-color="#3a2c05"/><stop offset=".55" stop-color="#101114"/><stop offset="1" stop-color="#08090a"/></radialGradient>
    <pattern id="c" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="14" fill="#ffffff" opacity=".025"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#c)"/>
  <rect x="0" y="600" width="1200" height="30" fill="#f5b301"/>
  <text x="600" y="215" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="38">${esc(OG_TEXT.line1)}</text>
  <text x="600" y="280" fill="#f5b301" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="38">${esc(OG_TEXT.line2)}</text>
  <text x="600" y="360" fill="#d7dbe0" font-family="Arial, sans-serif" font-size="23">${esc(OG_TEXT.line3)}</text>
  <text x="600" y="420" fill="#d7dbe0" font-family="Arial, sans-serif" font-size="26">${esc(OG_TEXT.line4)}</text>
</svg>`);
await sharp(ogBg)
  .composite([{ input: ogLogo, left: 60, top: Math.round((600 - ogMeta.height) / 2) }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("public/brand/og-image.jpg");

console.log("brand assets written");
