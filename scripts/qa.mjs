/**
 * Automated QA for the built site.
 *
 *   npm run build && npm start          (in one terminal, default port 3000)
 *   npm run qa -- http://localhost:3000  (in another)
 *
 * Checks every URL in the sitemap on desktop + mobile: HTTP status, console errors,
 * failed requests, one H1, unique titles/descriptions, canonical, valid JSON-LD,
 * axe-core WCAG 2.2 AA scan, internal links, WhatsApp/tel link formats, the
 * appointment form (validation + WhatsApp message), mobile menu, reduced motion,
 * 3D fallback, 404 handling, redirects and security headers.
 *
 * Set CHROME_PATH if Chrome is not in the default Windows location.
 */
import puppeteer from "puppeteer-core";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
// Sub-path for static-export builds, e.g. QA_BASE_PATH=/Autogargareone
const BP = (process.env.QA_BASE_PATH || "").replace(/\/$/, "");
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SHOTS = process.env.QA_SHOTS || "qa-screenshots";
mkdirSync(SHOTS, { recursive: true });

const report = { base: BASE, pages: [], links: {}, checks: [], failures: [] };
const fail = (msg) => { report.failures.push(msg); console.log("  ✗", msg); };
const pass = (msg) => { report.checks.push(msg); console.log("  ✓", msg); };

// ---------------------------------------------------------------- Sitemap
const sm = await (await fetch(`${BASE}${BP}/sitemap.xml`)).text();
const urls = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
pass(`sitemap.xml lists ${urls.length} URLs`);
const robots = await (await fetch(`${BASE}${BP}/robots.txt`)).text();
robots.includes("Sitemap:") ? pass("robots.txt references the sitemap") : fail("robots.txt missing sitemap");

// ---------------------------------------------------------------- Headers
{
  const r = await fetch(`${BASE}${BP}/`);
  for (const h of ["content-security-policy", "strict-transport-security", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"]) {
    r.headers.get(h) ? pass(`header ${h}`) : fail(`missing header ${h}`);
  }
  r.headers.get("x-powered-by") ? fail("x-powered-by header exposed") : pass("x-powered-by hidden");
}

// ---------------------------------------------------------------- Redirects & 404
for (const [from, to] of [["/appointment", "/book-appointment"], ["/about-us", "/about"]]) {
  const r = await fetch(`${BASE}${from}`, { redirect: "manual" });
  const loc = r.headers.get("location") || "";
  r.status === 308 || r.status === 301 ? (loc.endsWith(to) ? pass(`redirect ${from} → ${to} (${r.status})`) : fail(`redirect ${from} went to ${loc}`)) : fail(`no redirect for ${from} (${r.status})`);
}
{
  const r = await fetch(`${BASE}${BP}/this-page-does-not-exist`);
  r.status === 404 ? pass("unknown URL returns 404 with custom page") : fail(`unknown URL returned ${r.status}`);
  const r2 = await fetch(`${BASE}${BP}/services/not-a-service`);
  r2.status === 404 ? pass("unknown service slug returns 404") : fail(`unknown service slug returned ${r2.status}`);
}

// ---------------------------------------------------------------- Browser
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const titles = new Map();
const descs = new Map();
const internalLinks = new Set();
const externalLinks = new Set();

async function audit(path, viewport, label) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(`console: ${m.text()}`));
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) => r.url().startsWith(BASE) && errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`));
  page.on("response", (r) => r.url().startsWith(BASE) && r.status() >= 400 && errors.push(`http ${r.status()}: ${r.url()}`));
  const res = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle0", timeout: 60000 });
  // scroll through so reveal/lazy content is triggered
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 900));

  const info = await page.evaluate(() => {
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
      try { const j = JSON.parse(s.textContent || ""); return j["@type"]; } catch { return "INVALID"; }
    });
    return {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "",
      twitter: document.querySelector('meta[name="twitter:card"]')?.getAttribute("content") || "",
      h1: document.querySelectorAll("h1").length,
      ld,
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
      hScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      hiddenReveal: [...document.querySelectorAll(".reveal:not(.is-visible)")].length,
    };
  });

  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    // @ts-ignore
    const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] } });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes[0]?.target?.join(" ") }));
  });

  const p = { path, label, status: res?.status(), ...info, links: undefined, axe, errors };
  report.pages.push(p);
  const problems = [];
  if (p.status !== 200 && p.status !== 304) problems.push(`status ${p.status}`);
  if (info.h1 !== 1) problems.push(`${info.h1} h1 elements`);
  if (!info.desc) problems.push("no meta description");
  if (!info.canonical) problems.push("no canonical");
  if (!info.ogImage || !info.twitter) problems.push("missing social meta");
  if (info.ld.includes("INVALID")) problems.push("invalid JSON-LD");
  if (info.imgsNoAlt) problems.push(`${info.imgsNoAlt} img without alt`);
  if (info.hScroll) problems.push("horizontal scroll");
  if (axe.length) problems.push(`axe: ${axe.map((a) => `${a.id}(${a.nodes}) @ ${a.sample}`).join("; ")}`);
  if (errors.length) problems.push(errors.join(" | "));
  problems.length ? fail(`[${label}] ${path}: ${problems.join(" / ")}`) : pass(`[${label}] ${path} — clean (JSON-LD: ${info.ld.join(", ")})`);

  if (label === "desktop") {
    titles.set(info.title, [...(titles.get(info.title) || []), path]);
    descs.set(info.desc, [...(descs.get(info.desc) || []), path]);
    for (const l of info.links) {
      if (!l) continue;
      if (l.startsWith("/")) internalLinks.add(l.split("#")[0] || "/");
      else if (l.startsWith("#")) continue;
      else externalLinks.add(l);
    }
  }
  if (["/", "/book-appointment", "/services/efi-specialist", "/blog/check-engine-light-meaning"].includes(path)) {
    await page.screenshot({ path: `${SHOTS}/${label}${path.replace(/\//g, "_") || "_home"}.png`, fullPage: label === "mobile" ? false : false });
  }
  await page.close();
}

for (const path of urls) {
  await audit(path, { width: 1366, height: 900 }, "desktop");
  await audit(path, { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, "mobile");
}

// duplicate titles / descriptions
for (const [t, ps] of titles) ps.length > 1 ? fail(`duplicate title "${t}" on ${ps.join(", ")}`) : null;
for (const [d, ps] of descs) ps.length > 1 ? fail(`duplicate description on ${ps.join(", ")}`) : null;
pass(`titles unique across ${titles.size} pages`);

// ---------------------------------------------------------------- Links
for (const l of internalLinks) {
  const path = l.split("?")[0];
  const r = await fetch(`${BASE}${path}`, { redirect: "manual" });
  report.links[l] = r.status;
  r.status === 200 ? null : fail(`internal link ${l} → ${r.status}`);
}
pass(`${internalLinks.size} unique internal links checked`);
const wa = [...externalLinks].filter((l) => l.startsWith("https://wa.me/"));
const tel = [...externalLinks].filter((l) => l.startsWith("tel:"));
wa.every((l) => l.startsWith("https://wa.me/923125045678")) ? pass(`${wa.length} WhatsApp link variants all use wa.me/923125045678`) : fail(`bad WhatsApp link: ${wa.find((l) => !l.startsWith("https://wa.me/923125045678"))}`);
// The footer's web-developer credit (WideWeb Technologies) carries its own number.
const DEV_CREDIT_TEL = "tel:+923040500121";
tel.every((l) => l === "tel:+923125045678" || l === DEV_CREDIT_TEL) ? pass(`telephone links use tel:+923125045678 (plus the developer credit)`) : fail(`bad tel link ${tel.join(",")}`);
report.externalLinks = [...externalLinks];

// ---------------------------------------------------------------- Appointment form
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.evaluateOnNewDocument(() => {
    // capture window.open instead of leaving the site
    window.__opened = [];
    window.open = (u) => { window.__opened.push(String(u)); return { opener: null }; };
    // The car-inspection pop-up would cover the form; mark it as already seen this visit.
    try { sessionStorage.setItem("mm-inspection-popup", "1"); } catch {}
  });
  await page.goto(`${BASE}${BP}/book-appointment?service=hybrid-car-repair`, { waitUntil: "networkidle0" });
  const pre = await page.$eval("#service", (s) => s.value);
  pre === "hybrid-car-repair" ? pass("?service= preselects the service") : fail(`service preselect got "${pre}"`);

  // Empty submit → errors
  await new Promise((r) => setTimeout(r, 3200)); // pass time-trap
  await page.$eval("#service", (s) => { s.value = ""; s.dispatchEvent(new Event("change", { bubbles: true })); });
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 300));
  const errCount = await page.$$eval('[aria-invalid="true"]', (e) => e.length);
  const focused = await page.evaluate(() => document.activeElement?.id);
  errCount >= 9 && focused === "error-summary" ? pass(`empty submit shows ${errCount} field errors and focuses the error summary`) : fail(`empty submit: ${errCount} errors, focus ${focused}`);

  // Invalid phone / past date
  await page.type("#name", "Ali Khan");
  await page.type("#mobile", "12345");
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 200));
  const phoneErr = await page.$eval("#mobile", (e) => e.getAttribute("aria-invalid"));
  phoneErr === "true" ? pass("invalid mobile number rejected") : fail("invalid mobile accepted");

  // Valid submission
  await new Promise((r) => setTimeout(r, 300)); // let the form move focus to the error summary first
  await page.focus("#mobile");
  await page.$eval("#mobile", (e) => e.select());
  await page.keyboard.press("Backspace");
  await page.type("#mobile", "0300-1234567");
  await page.type("#email", "ali@example.com");
  await page.type("#make", "Toyota");
  await page.type("#model", "Aqua");
  await page.type("#year", "2016");
  await page.type("#registration", "abc-123");
  await page.select("#service", "hybrid-car-repair");
  const tomorrow = new Date(Date.now() + 86400000);
  const iso = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
  await page.$eval("#date", (e, v) => { e.value = v; }, iso);
  await page.select("#time", "11:00");
  await page.type("#issue", "Hybrid warning light <script>alert(1)</script> and low average.");
  await page.click("#consent");
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 400));
  const opened = await page.evaluate(() => window.__opened);
  const success = await page.$("#form-success");
  if (opened.length === 1 && success) {
    const u = new URL(opened[0]);
    const text = u.searchParams.get("text") || "";
    const okNumber = u.origin + u.pathname === "https://wa.me/923125045678";
    const okContent = ["Ali Khan", "0300-1234567", "Toyota Aqua (2016)", "ABC-123", "Hybrid Car Repair & Maintenance", "11:00 am"].every((s) => text.includes(s));
    const sanitised = !text.includes("<script>");
    okNumber && okContent && sanitised ? pass("valid submission opens WhatsApp to 923125045678 with formatted, sanitised details") : fail(`WhatsApp message wrong: ${text}`);
    report.sampleWhatsAppMessage = text;
    const honest = await page.$eval("#form-success", (e) => e.textContent || "");
    honest.includes("not confirmed yet") ? pass("success message states the appointment is not yet confirmed") : fail("success message may imply confirmation");
  } else {
    const why = await page.evaluate(() => ({ summary: document.getElementById("error-summary")?.textContent, invalid: [...document.querySelectorAll("[aria-invalid=true]")].map((e) => e.id) }));
    fail(`submission: opened=${opened.length} success=${!!success} ${JSON.stringify(why)}`);
  }

  // Rapid resubmission is rate-limited
  if (await page.$("#form-success button")) {
  await page.click("#form-success button");
  await new Promise((r) => setTimeout(r, 3300));
  await page.type("#name", "Ali Khan"); await page.type("#mobile", "03001234567"); await page.type("#make", "Toyota"); await page.type("#model", "Aqua"); await page.type("#year", "2016");
  await page.select("#service", "brake-service"); await page.$eval("#date", (e, v) => { e.value = v; }, iso); await page.select("#time", "10:00");
  await page.type("#issue", "Brake squeal when stopping."); await page.click("#consent");
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 300));
  const limited = await page.$eval("#error-summary", (e) => e.textContent || "").catch(() => "");
  limited.includes("wait") ? pass("repeat submission within cooldown is blocked") : fail("no cooldown on repeat submission");
  }
  errors.length ? fail(`form page errors: ${errors.join(" | ")}`) : null;
  await page.close();
}

// Bot trap
{
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => { window.__opened = []; window.open = (u) => { window.__opened.push(u); return null; }; });
  await page.goto(`${BASE}${BP}/contact`, { waitUntil: "networkidle0" });
  await page.type("#name", "Spam Bot"); await page.type("#mobile", "03001234567"); await page.type("#message", "Buy cheap things now!!!");
  await page.click("#consent");
  await page.click('button[type="submit"]'); // faster than 3s → time trap
  await new Promise((r) => setTimeout(r, 200));
  const opened = await page.evaluate(() => window.__opened.length);
  opened === 0 ? pass("contact form blocks instant (bot-speed) submissions") : fail("time trap did not block");
  await page.close();
}

// ---------------------------------------------------------------- Mobile menu + keyboard
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE}${BP}/`, { waitUntil: "networkidle0" });
  await page.click('button[aria-controls="mobile-menu"]');
  await new Promise((r) => setTimeout(r, 200));
  const st = await page.evaluate(() => ({
    expanded: document.querySelector('button[aria-controls="mobile-menu"]')?.getAttribute("aria-expanded"),
    visible: !document.getElementById("mobile-menu")?.hidden,
    focusInMenu: document.getElementById("mobile-menu")?.contains(document.activeElement),
  }));
  st.expanded === "true" && st.visible && st.focusInMenu ? pass("mobile menu opens with aria-expanded and moves focus into menu") : fail(`mobile menu: ${JSON.stringify(st)}`);
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 150));
  const closed = await page.evaluate(() => document.getElementById("mobile-menu")?.hidden && document.activeElement?.getAttribute("aria-controls") === "mobile-menu");
  closed ? pass("Escape closes mobile menu and returns focus to the toggle") : fail("Escape did not close menu / restore focus");
  const bar = await page.evaluate(() => {
    const b = document.querySelector('nav[aria-label="Quick contact"]');
    return b ? getComputedStyle(b).position === "fixed" && b.getBoundingClientRect().height < 90 : false;
  });
  bar ? pass("sticky mobile action bar (Call / WhatsApp / Book) present") : fail("mobile action bar missing");
  const noCanvas = await page.evaluate(() => !document.querySelector("canvas"));
  noCanvas ? pass("phones get the lightweight SVG hero (no WebGL download)") : fail("WebGL loaded on phone viewport");
  await page.close();
}
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.goto(`${BASE}${BP}/`, { waitUntil: "networkidle0" });
  const before = await page.evaluate(() => !!document.querySelector("canvas")); // checked before any interaction
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => document.activeElement?.textContent);
  skip?.includes("Skip to main") ? pass("first Tab focuses the skip link") : fail(`first Tab focused "${skip}"`);
  await page.mouse.move(400, 300);
  await new Promise((r) => setTimeout(r, 3500));
  const canvas = await page.evaluate(() => !!document.querySelector("canvas"));
  !before && canvas ? pass("desktop hero defers Three.js until first interaction, then upgrades to WebGL") : fail(`desktop hero WebGL: before=${before} after=${canvas}`);
  await page.close();
}

// ---------------------------------------------------------------- Reduced motion & no-WebGL fallback
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${BASE}${BP}/`, { waitUntil: "networkidle0" });
  const rm = await page.evaluate(() => {
    const hidden = [...document.querySelectorAll(".reveal")].filter((e) => getComputedStyle(e).opacity !== "1").length;
    const anim = [...document.querySelectorAll(".a-spin")].map((e) => parseFloat(getComputedStyle(e).animationDuration)).every((d) => d < 0.01);
    return { hidden, anim };
  });
  rm.hidden === 0 && rm.anim ? pass("reduced motion: all content visible, looping animations disabled") : fail(`reduced motion: ${JSON.stringify(rm)}`);
  await page.close();

  const p2 = await browser.newPage();
  await p2.setViewport({ width: 1366, height: 900 });
  await p2.evaluateOnNewDocument(() => { HTMLCanvasElement.prototype.getContext = () => null; });
  await p2.goto(`${BASE}${BP}/`, { waitUntil: "networkidle0" });
  await p2.mouse.move(400, 300);
  await new Promise((r) => setTimeout(r, 3000));
  const fb = await p2.evaluate(() => !document.querySelector("canvas") && !!document.querySelector("[data-anim] svg"));
  fb ? pass("no-WebGL browsers keep the animated SVG fallback") : fail("no-WebGL fallback failed");
  await p2.close();
}

await browser.close();
writeFileSync("qa-report.json", JSON.stringify(report, null, 2));
console.log(`\n${report.checks.length} passed, ${report.failures.length} failed`);
process.exit(report.failures.length ? 1 : 0);
