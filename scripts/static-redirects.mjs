/**
 * Post-export step for static hosting (GitHub Pages), run after `next build` with STATIC_EXPORT=true.
 * Writes redirect pages, .nojekyll and flat prefetch files. For redirects it
 * writes a tiny HTML page for each legacy URL in src/config/redirects.ts that
 * forwards visitors (and tells search engines the canonical URL).
 * Also adds .nojekyll so GitHub Pages serves the _next/ folder.
 */
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

const OUT = "out";
const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

// Parse the redirect list from the TS config without a TS toolchain.
const src = readFileSync("src/config/redirects.ts", "utf8");
const pairs = [...src.matchAll(/source:\s*"([^"]+)",\s*destination:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]);

for (const [from, to] of pairs) {
  const target = `${base}${to === "/" ? "/" : to}`;
  const canonical = site ? `${site}${to === "/" ? "" : to}` : target;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting…</title>
<meta name="robots" content="noindex"><link rel="canonical" href="${canonical}">
<meta http-equiv="refresh" content="0; url=${target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script>
</head><body><p>This page has moved to <a href="${target}">${target}</a>.</p></body></html>`;
  const file = join(OUT, `${from}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}
writeFileSync(join(OUT, ".nojekyll"), "");
console.log(`wrote ${pairs.length} redirect pages + .nojekyll`);

// Next.js writes client-navigation prefetch data as nested folders
// (about/__next.about/__PAGE__.txt) but the browser requests a flat name
// (about/__next.about.__PAGE__.txt). Server hosts rewrite this; static hosts
// can't, so write a flat copy of each file next to the folder.
let flat = 0;
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      for (const file of listFiles(p)) {
        const rel = relative(dir, file).split(sep).join(".");
        copyFileSync(file, join(dir, rel));
        flat++;
      }
    } else walk(p);
  }
}
function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? listFiles(join(dir, e.name)) : [join(dir, e.name)]));
}
walk(OUT);
console.log(`wrote ${flat} flat prefetch files`);
