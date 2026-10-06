/**
 * Hero car pipeline.
 *
 * Takes the side-view car illustration (assets/source/hero-car.jpg, on white) and produces:
 *  - public/media/hero-car.png        the car cut out of its white background; the light-grey
 *                                     ground shadow becomes a soft transparent shadow
 *  - public/media/hero-car-holo.png   a "hologram" version: glowing outlines, a faint silhouette
 *                                     fill and scanlines, used where the scanner beam has passed
 *
 * Both share one size so the 3D scene can swap between them at the beam. The crop box keeps
 * only the car and its shadow. Prints the aspect ratio and hotspot positions for heroScene.ts.
 *
 * Re-run after replacing the source image:  npm run hero-car
 */
import sharp from "sharp";

const SRC = "assets/source/hero-car.jpg";
/** Car + shadow inside the source image (pixels). Tuned for the current illustration. */
const CROP = { left: 70, top: 100, width: 590, height: 215 };
const SCALE = 2; // the source is small; upscale before processing for smoother edges

const W = CROP.width * SCALE, H = CROP.height * SCALE;
const { data } = await sharp(SRC).extract(CROP).resize(W, H, { kernel: "lanczos3" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });

const lum = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
const sat = (i) => Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
/** Background = near-neutral and light (white page or the grey ground shadow). */
const isBg = (i) => sat(i) < 22 && lum(i) > 170;

// Flood-fill the background from the image border so light areas inside the car stay opaque.
const bg = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
while (stack.length) {
  const p = stack.pop();
  if (bg[p] || !isBg(p * 3)) continue;
  bg[p] = 1;
  const x = p % W, y = (p / W) | 0;
  if (x > 0) stack.push(p - 1);
  if (x < W - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - W);
  if (y < H - 1) stack.push(p + W);
}

// Cut-out: car opaque; background white → transparent, grey shadow → soft black shadow.
const car = Buffer.alloc(W * H * 4);
const mask = new Uint8Array(W * H); // 1 = car body (used for the hologram)
for (let p = 0; p < W * H; p++) {
  const i = p * 3, o = p * 4;
  if (bg[p]) {
    const a = Math.max(0, Math.min(255, (250 - lum(i)) * 4.5));
    car[o] = car[o + 1] = car[o + 2] = 0;
    car[o + 3] = a;
  } else {
    car[o] = data[i]; car[o + 1] = data[i + 1]; car[o + 2] = data[i + 2]; car[o + 3] = 255;
    mask[p] = 1;
  }
}
// De-fringe: JPEG leaves a pale halo where the car meets the white page. Within 3px of the
// background, light low-saturation pixels fade out by brightness (dark/yellow pixels stay).
const dist = new Uint8Array(W * H).fill(255);
for (let p = 0; p < W * H; p++) if (!mask[p]) dist[p] = 0;
for (let pass = 0; pass < 3; pass++) {
  for (let p = 0; p < W * H; p++) {
    if (!mask[p] || dist[p] <= pass) continue;
    const x = p % W, y = (p / W) | 0;
    const near = (x > 0 && dist[p - 1] === pass) || (x < W - 1 && dist[p + 1] === pass) || (y > 0 && dist[p - W] === pass) || (y < H - 1 && dist[p + W] === pass);
    if (near) dist[p] = pass + 1;
  }
}
for (let p = 0; p < W * H; p++) {
  if (!mask[p] || dist[p] > 3) continue;
  const i = p * 3, l = lum(i), s = sat(i);
  if (l > 150 && s < 70) car[p * 4 + 3] = Math.round(255 * Math.max(0, Math.min(1, (238 - l) / 88)));
  else if (dist[p] === 1) car[p * 4 + 3] = 215;
}
await sharp(car, { raw: { width: W, height: H, channels: 4 } }).png({ compressionLevel: 9 }).toFile("public/media/hero-car.png");

// Hologram: Sobel edges of the car + silhouette outline, a faint fill and scanlines.
const g = new Float32Array(W * H);
for (let p = 0; p < W * H; p++) g[p] = lum(p * 3);
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

console.log(`hero car: ${W}x${H}, aspect ${(W / H).toFixed(4)}`);
// Hotspots as fractions of the crop (x from left, y from top), measured on the source image.
const at = (sx, sy) => [((sx - CROP.left) / CROP.width).toFixed(3), ((sy - CROP.top) / CROP.height).toFixed(3)];
console.log("hotspots (u, v):", JSON.stringify({ rearWheel: at(197, 263), frontWheel: at(544, 263), engine: at(570, 196), cabin: at(330, 160), exhaust: at(100, 245) }));
