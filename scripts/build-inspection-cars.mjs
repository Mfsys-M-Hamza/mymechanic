/**
 * Car pictures for the inspection charges cards (/car-inspection).
 *
 * Sources in assets/source/inspection-cars/ must have a transparent background:
 *  - hatchback-yaris-cut.png, sedan-silver-cut.png were cut out from the supplied JPEGs
 *    (white / baked-in checkerboard backgrounds) with rembg:
 *      python -c "from rembg import remove, new_session; from PIL import Image;
 *                 s=new_session('isnet-general-use'); remove(Image.open(SRC).convert('RGB'), session=s).save(OUT)"
 *  - suv-red.png was supplied with a real transparent background.
 *
 * Each car is trimmed, given a soft ground shadow so it sits on the dark card, and saved
 * as public/inspection/<name>.webp (560px wide).
 *
 * Run: node scripts/build-inspection-cars.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "assets/source/inspection-cars";
const OUT = "public/inspection";
const CARS = [
  { name: "hatchback", file: "hatchback-yaris-cut.png" },
  { name: "sedan", file: "sedan-silver-cut.png" },
  { name: "suv", file: "suv-red.png" },
  // New-car card: the white car mirrored, with a red gift ribbon and bow drawn on top.
  { name: "new-car", file: "hatchback-yaris-cut.png", flop: true, ribbon: true },
];

// Red gift ribbon (band over the bonnet + bows), positioned as fractions of the mirrored car.
const RED = "#d92b32", DARK = "#9e1b21";
function bow(cx, cy, s) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})">
    <path d="M0 0 C-14 -26 -46 -30 -44 -8 C-42 8 -14 6 0 0 Z" fill="${RED}" stroke="${DARK}" stroke-width="2"/>
    <path d="M0 0 C14 -26 46 -30 44 -8 C42 8 14 6 0 0 Z" fill="${RED}" stroke="${DARK}" stroke-width="2"/>
    <path d="M-2 2 L-16 30 L-8 27 L-4 34 L2 4 Z M2 2 L16 30 L8 27 L4 34 L-2 4 Z" fill="${RED}" stroke="${DARK}" stroke-width="1.5"/>
    <path d="M-14 -16 C-24 -20 -34 -18 -36 -10" fill="none" stroke="#ff6b70" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <ellipse cx="0" cy="0" rx="8" ry="7" fill="${DARK}"/><ellipse cx="-2" cy="-2" rx="4" ry="3" fill="${RED}"/>
  </g>`;
}
function ribbonSvg(w, h, top) {
  const P = (fx, fy) => `${(fx * w).toFixed(1)} ${(top + fy * h).toFixed(1)}`;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h + top}">
       <path d="M${P(0.66, 0.3)} L${P(0.715, 0.295)} L${P(0.84, 0.6)} L${P(0.79, 0.615)} Z" fill="${RED}" opacity=".95"/>
       <path d="M${P(0.7, 0.297)} L${P(0.715, 0.295)} L${P(0.84, 0.6)} L${P(0.825, 0.605)} Z" fill="${DARK}" opacity=".5"/>
       ${bow(0.69 * w, top + 0.31 * h, w / 600)}
       ${bow(0.43 * w, top + 0.01 * h, w / 380)}
     </svg>`,
  );
}

await mkdir(OUT, { recursive: true });

for (const c of CARS) {
  // Drop near-invisible halo pixels, then trim to the car.
  const { data, info } = await sharp(`${SRC}/${c.file}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) if (data[i] < 24) data[i] = 0;
  let car = await sharp(await sharp(data, { raw: info }).png().toBuffer()).trim().resize({ width: 560, withoutEnlargement: true }).flop(!!c.flop).png().toBuffer();
  let { width: w, height: h } = await sharp(car).metadata();
  if (c.ribbon) {
    const top = Math.round(h * 0.12);
    car = await sharp({ create: { width: w, height: h + top, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: car, left: 0, top }, { input: ribbonSvg(w, h, top), left: 0, top: 0 }])
      .png()
      .toBuffer();
    h += top;
  }

  // Soft elliptical ground shadow under the wheels.
  const pad = 16;
  const shadow = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h + pad}">
       <defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
       <ellipse cx="${w / 2}" cy="${h - 4}" rx="${w * 0.48}" ry="${Math.max(10, h * 0.07)}" fill="url(#g)"/>
     </svg>`,
  );
  const out = await sharp({ create: { width: w, height: h + pad, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: shadow, left: 0, top: 0 }, { input: car, left: 0, top: 0 }])
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(`${OUT}/${c.name}.webp`);
  console.log(`${c.name}.webp ${out.width}x${out.height}`);
}
