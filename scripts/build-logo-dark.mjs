/**
 * Dark-background version of the shop-sign logo.
 *
 * Input:  assets/source/logo-yellow.jpg   (the client's logo on solid yellow)
 * Output: assets/source/logo-original.png (transparent, recoloured for the dark site;
 *                                          then run `npm run assets` as usual)
 *
 * 1. Removes the yellow background by "un-mixing" every pixel: each pixel is treated as a
 *    blend of the background yellow and an ink colour, so anti-aliased edges become clean
 *    transparency instead of a yellow fringe.
 * 2. Recolours the black ink so it stays visible on a near-black page:
 *    - the "MY" and ".PK" letters → brand yellow
 *    - everything else black (badge, fist line-art, letter outlines) → charcoal steel
 *    White areas (MECHANIC, the fist, the spanner, badge text) stay white.
 *
 * Re-run after replacing the source:  npm run logo-dark && npm run assets
 */
import sharp from "sharp";

const SRC = "assets/source/logo-yellow.jpg";
const OUT = "assets/source/logo-original.png";
const ACCENT = [245, 179, 1]; // brand yellow (--color-brand) for MY / .PK
const STEEL = [52, 57, 66]; // charcoal for the badge and line-art
/**
 * Regions (fractions of the image) holding the MY and .PK letters. Tuned for the current logo.
 * "shape": recolour dark shapes lying entirely inside the zone (.PK is separate from the badge).
 * "pixel": recolour every dark pixel inside the zone ("Y" touches the badge corner, so it is
 * not a separate shape; the zone is drawn tightly around the letters).
 */
const ACCENT_ZONES = [
  { x0: 0.08, y0: 0.425, x1: 0.245, y1: 0.468, mode: "pixel" }, // MY, upper part (Y serif reaches further right)
  { x0: 0.08, y0: 0.468, x1: 0.231, y1: 0.5015, mode: "pixel" }, // MY, lower part (stops before the badge corner)
  { x0: 0.72, y0: 0.655, x1: 0.93, y1: 0.75, mode: "shape" }, // .PK
];

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, N = W * H;

// Background colour = average of the corners.
const at = (x, y) => (y * W + x) * 3;
const corners = [at(2, 2), at(W - 3, 2), at(2, H - 3), at(W - 3, H - 3)];
const BG = [0, 1, 2].map((k) => corners.reduce((s, i) => s + data[i + k], 0) / corners.length);
const bgMax = Math.max(...BG), bgMin = Math.min(...BG), bgSat = (bgMax - bgMin) / bgMax;

// 1. Un-mix: P = (1 - a)·BG + a·F. Blends with dark ink lose brightness, blends with white
//    lose saturation; whichever is larger gives the ink coverage a.
const alpha = new Float32Array(N);
const ink = new Float32Array(N * 3);
for (let p = 0; p < N; p++) {
  const i = p * 3, r = data[i], g = data[i + 1], b = data[i + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const v = max / bgMax, s = max ? (max - min) / max : 0;
  const a = Math.min(1, Math.max(0, 1 - v, 1 - s / bgSat));
  alpha[p] = a < 0.04 ? 0 : a;
  for (let k = 0; k < 3; k++) {
    const f = a > 0.04 ? (data[i + k] - (1 - a) * BG[k]) / a : 0;
    ink[i + k] = Math.min(255, Math.max(0, f));
  }
}

// 2. Find connected dark-ink shapes; shapes lying entirely inside an accent zone get ACCENT.
const lum = (i) => 0.299 * ink[i] + 0.587 * ink[i + 1] + 0.114 * ink[i + 2];
const dark = new Uint8Array(N);
for (let p = 0; p < N; p++) if (alpha[p] > 0.3 && lum(p * 3) < 110) dark[p] = 1;
const label = new Int32Array(N).fill(-1);
const shapes = [];
for (let p = 0; p < N; p++) {
  if (!dark[p] || label[p] >= 0) continue;
  const id = shapes.length, box = { x0: W, y0: H, x1: 0, y1: 0 }, stack = [p];
  label[p] = id;
  while (stack.length) {
    const q = stack.pop(), x = q % W, y = (q / W) | 0;
    if (x < box.x0) box.x0 = x; if (x > box.x1) box.x1 = x; if (y < box.y0) box.y0 = y; if (y > box.y1) box.y1 = y;
    for (const n of [q - 1, q + 1, q - W, q + W]) {
      if (n < 0 || n >= N || label[n] >= 0 || !dark[n]) continue;
      if ((n === q - 1 && x === 0) || (n === q + 1 && x === W - 1)) continue;
      label[n] = id;
      stack.push(n);
    }
  }
  shapes.push(box);
}
const shapeZones = ACCENT_ZONES.filter((z) => z.mode === "shape");
const pixelZones = ACCENT_ZONES.filter((z) => z.mode === "pixel");
const isAccent = shapes.map((b) => shapeZones.some((z) => b.x0 >= z.x0 * W && b.x1 <= z.x1 * W && b.y0 >= z.y0 * H && b.y1 <= z.y1 * H));
console.log(`shapes: ${shapes.length}, accent shapes: ${isAccent.filter(Boolean).length}`);

// Grow the accent mask by 2px so the letters' anti-aliased rims recolour too.
const accent = new Uint8Array(N);
for (let p = 0; p < N; p++) {
  if (label[p] < 0) continue;
  const x = p % W, y = (p / W) | 0;
  if (isAccent[label[p]] || pixelZones.some((z) => x >= z.x0 * W && x <= z.x1 * W && y >= z.y0 * H && y <= z.y1 * H)) accent[p] = 1;
}
for (let pass = 0; pass < 2; pass++) {
  const grow = accent.slice();
  for (let p = 0; p < N; p++) {
    if (accent[p] || alpha[p] === 0) continue;
    const x = p % W;
    if ((x > 0 && accent[p - 1]) || (x < W - 1 && accent[p + 1]) || accent[p - W] || accent[p + W]) grow[p] = 1;
  }
  accent.set(grow);
}

// 3. Recolour: dark ink → target colour, keeping the grey ramp toward white for smooth edges.
const out = Buffer.alloc(N * 4);
for (let p = 0; p < N; p++) {
  const i = p * 3, o = p * 4;
  const L = lum(i) / 255;
  const target = accent[p] ? ACCENT : STEEL;
  for (let k = 0; k < 3; k++) out[o + k] = Math.round(target[k] * (1 - L) + 255 * L);
  out[o + 3] = Math.round(alpha[p] * 255);
}
await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png({ compressionLevel: 9 }).toFile(OUT);
console.log(`written ${OUT} (${W}x${H})`);
