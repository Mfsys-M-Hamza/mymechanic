/**
 * Car pictures for the inspection charges cards (/car-inspection).
 *
 * Sources in assets/source/inspection-cars/ must have a transparent background:
 *  - hatchback-yaris-cut.png, sedan-silver-cut.png, new-car-ribbon-cut.png were cut out from the supplied JPEGs
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
  { name: "new-car", file: "new-car-ribbon-cut.png" },
];

await mkdir(OUT, { recursive: true });

for (const c of CARS) {
  // Drop near-invisible halo pixels, then trim to the car.
  const { data, info } = await sharp(`${SRC}/${c.file}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) if (data[i] < 24) data[i] = 0;
  const car = await sharp(await sharp(data, { raw: info }).png().toBuffer()).trim().resize({ width: 560, withoutEnlargement: true }).png().toBuffer();
  const { width: w, height: h } = await sharp(car).metadata();

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
