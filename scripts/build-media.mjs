/**
 * Workshop media pipeline.
 *
 * Takes the original photos and videos in assets/media/ and produces public/media/:
 *  - <name>.webp         photos, resized to max 1600px wide
 *  - <name>.mp4          videos, copied as-is (already small WhatsApp exports)
 *  - <name>-poster.webp  a still frame from each video, grabbed with headless Chrome
 *
 * Prints the width/height of every output so src/data/content.ts can be updated.
 * Re-run after adding media:  npm run media
 */
import sharp from "sharp";
import http from "node:http";
import puppeteer from "puppeteer-core";
import { copyFile, mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/media";
const OUT = "public/media";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
/** Where to grab each video's poster, as a fraction of its length (default: the middle). */
const POSTER_AT = { "logo-animated": 0.9 };

await mkdir(OUT, { recursive: true });
const files = await readdir(SRC);

for (const f of files.filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  const name = f.replace(/\.\w+$/, "");
  const info = await sharp(path.join(SRC, f)).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}/${name}.webp`);
  console.log(`photo  ${name}.webp  ${info.width}x${info.height}`);
}

// Chrome only decodes video over http, so serve assets/media on a throwaway port.
const videos = files.filter((f) => f.endsWith(".mp4"));
const server = http.createServer(async (req, res) => {
  const f = decodeURIComponent(req.url.slice(1));
  if (!videos.includes(f)) return res.end("<!doctype html>");
  const buf = await readFile(path.join(SRC, f));
  res.writeHead(200, { "content-type": "video/mp4", "content-length": buf.length }).end(buf);
}).listen(0);
const base = `http://localhost:${server.address().port}/`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
const page = await browser.newPage();
await page.goto(base);

for (const f of videos) {
  const name = f.replace(/\.mp4$/, "");
  const frame = await page.evaluate(async (src, at) => {
    const v = Object.assign(document.createElement("video"), { muted: true, preload: "auto", src });
    await new Promise((ok, fail) => { v.onloadeddata = ok; v.onerror = () => fail(new Error(`cannot decode ${src}`)); });
    // Play up to the frame instead of seeking: clips with few keyframes (e.g. animation
    // exports) otherwise decode as their first keyframe in headless Chrome.
    const target = v.duration * at;
    v.playbackRate = 4;
    await v.play();
    await new Promise((ok) => { const tick = () => (v.currentTime >= target || v.ended ? ok() : requestAnimationFrame(tick)); tick(); });
    v.pause();
    const c = Object.assign(document.createElement("canvas"), { width: v.videoWidth, height: v.videoHeight });
    c.getContext("2d").drawImage(v, 0, 0);
    return c.toDataURL("image/png");
  }, base + encodeURIComponent(f), POSTER_AT[name] ?? 0.5);
  const still = sharp(Buffer.from(frame.split(",")[1], "base64"));
  const { width: fw = 0, height: fh = 0 } = await still.metadata();
  // Portrait clips: 720px wide is plenty; landscape clips are shown wider, so keep 1280px.
  const info = await still.resize({ width: fw > fh ? 1280 : 720, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}/${name}-poster.webp`);
  await copyFile(path.join(SRC, f), `${OUT}/${f}`);
  console.log(`video  ${f} + ${name}-poster.webp  ${info.width}x${info.height}`);
}

await browser.close();
server.close();
