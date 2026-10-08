/**
 * Hero car pipeline.
 *
 * Takes the side-view car photo, already cut out of its background with rembg
 * (assets/source/hero-car-photo-cut.png, from hero-car-photo.jpg:
 *   python -c "from rembg import remove, new_session; from PIL import Image;
 *              s=new_session('isnet-general-use'); remove(Image.open(SRC).convert('RGB'), session=s).save(OUT)")
 * and produces:
 *  - public/media/hero-car.png        the car facing right, see-through window glass tinted dark,
 *                                     with a soft ground shadow
 *  - public/media/hero-car-holo.png   a "hologram" version: glowing outlines, a faint silhouette
 *                                     fill and scanlines, used where the scanner beam has passed
 *
 * Both share one size so the 3D scene can swap between them at the beam. Prints the size;
 * the wheel and hotspot positions in heroScene.ts are measured on this output.
 *
 * Re-run after replacing the source image:  npm run hero-car
 */
import sharp from "sharp";

const SRC = "assets/source/hero-car-photo-cut.png";
const SCALE = 2; // the source is small; upscale before processing for smoother edges
const PAD = 14; // transparent space under the tyres for the ground shadow (source pixels)
/** Window glass inside the trimmed, mirrored source (pixels). The photo's glass was see-through
 *  (a checkerboard showed through), so light neutral pixels here are repainted as tinted glass. */
const GLASS = { left: 110, top: 8, right: 375, bottom: 62 };

// Trim, mirror (the photo faces left; the scene drives the car in from the left), drop halo pixels.
const trimmed = await sharp(SRC).trim().flop().png().toBuffer();
const { data: src, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const sw = info.width, sh = info.height;
for (let p = 0; p < sw * sh; p++) {
  const o = p * 4;
  if (src[o + 3] < 24) src[o + 3] = 0;
  const x = p % sw, y = (p / sw) | 0;
  if (x < GLASS.left || x > GLASS.right || y < GLASS.top || y > GLASS.bottom || src[o + 3] === 0) continue;
  const r = src[o], g = src[o + 1], b = src[o + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b, sat = Math.max(r, g, b) - Math.min(r, g, b);
  if (sat < 28 && lum > 70) {
    // Dark smoked glass with a faint diagonal sky reflection.
    const t = (y - GLASS.top) / (GLASS.bottom - GLASS.top);
    const shine = Math.max(0, 1 - Math.abs(((x - GLASS.left) / 90 + t * 1.6) % 2.2 - 1.1) * 3) * 26;
    src[o] = 26 + shine + t * 6; src[o + 1] = 30 + shine + t * 6; src[o + 2] = 36 + shine + t * 8;
    src[o + 3] = 255;
  }
}
const W = sw * SCALE, H = (sh + PAD) * SCALE;
const carOnly = await sharp(src, { raw: { width: sw, height: sh, channels: 4 } }).resize(W, sh * SCALE, { kernel: "lanczos3" }).png().toBuffer();

// Car + soft elliptical ground shadow under the tyres.
const shadow = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
     <defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".75"/><stop offset=".6" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
     <ellipse cx="${W / 2}" cy="${sh * SCALE - 4}" rx="${W * 0.5}" ry="${PAD * SCALE * 0.9}" fill="url(#g)"/>
   </svg>`,
);
const car = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: shadow, left: 0, top: 0 }, { input: carOnly, left: 0, top: 0 }])
  .raw()
  .toBuffer();
await sharp(car, { raw: { width: W, height: H, channels: 4 } }).png({ compressionLevel: 9 }).toFile("public/media/hero-car.png");

// Hologram: Sobel edges of the car + silhouette outline, a faint fill and scanlines.
const { data: body } = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: carOnly, left: 0, top: 0 }])
  .raw()
  .toBuffer({ resolveWithObject: true });
const mask = new Uint8Array(W * H);
const g = new Float32Array(W * H);
for (let p = 0; p < W * H; p++) {
  const o = p * 4;
  mask[p] = body[o + 3] > 128 ? 1 : 0;
  g[p] = 0.299 * body[o] + 0.587 * body[o + 1] + 0.114 * body[o + 2];
}
const holo = Buffer.alloc(W * H * 4);
const [R, G, B] = [255, 210, 74];
for (let y = 1; y < H - 1; y++) {
  for (let x = 1; x < W - 1; x++) {
    const p = y * W + x;
    if (!mask[p]) continue;
    const gx = -g[p - W - 1] - 2 * g[p - 1] - g[p + W - 1] + g[p - W + 1] + 2 * g[p + 1] + g[p + W + 1];
    const gy = -g[p - W - 1] - 2 * g[p - W] - g[p - W + 1] + g[p + W - 1] + 2 * g[p + W] + g[p + W + 1];
    const edge = Math.min(1, Math.hypot(gx, gy) / 160);
    const outline = !mask[p - 1] || !mask[p + 1] || !mask[p - W] || !mask[p + W] ? 1 : 0;
    const scan = y % 6 < 2 ? 0.22 : 0;
    const a = Math.max(edge, outline, 0.1 + scan);
    const o = p * 4;
    holo[o] = R; holo[o + 1] = G; holo[o + 2] = B; holo[o + 3] = Math.round(a * 255);
  }
}
await sharp(holo, { raw: { width: W, height: H, channels: 4 } }).blur(0.6).png({ compressionLevel: 9 }).toFile("public/media/hero-car-holo.png");

console.log(`hero car: ${W}x${H}, aspect ${(W / H).toFixed(4)}; source (trimmed) ${sw}x${sh}`);
