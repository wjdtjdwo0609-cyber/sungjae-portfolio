const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");
const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const data = { window: {} };
vm.runInNewContext(read("assets/record-image-variants.js"), data);
const variants = data.window.PORTFOLIO_RECORD_IMAGES;
assert.strictEqual(Object.keys(variants).length, 7);
let before = 0, after = 0;
for (const [source, v] of Object.entries(variants)) {
  const original = fs.readFileSync(path.join(root, source));
  const display = fs.readFileSync(path.join(root, v.display));
  assert.strictEqual(crypto.createHash("sha256").update(original).digest("hex"), v.sourceSha256, "approved/redacted originals must not change");
  assert.strictEqual(display.toString("ascii", 0, 4), "RIFF");
  assert.strictEqual(display.toString("ascii", 8, 12), "WEBP");
  assert.strictEqual(display.length, v.bytes);
  assert.strictEqual(original.length, v.originalBytes);
  assert.strictEqual(Math.max(v.width, v.height), 2400);
  assert.ok(Math.abs(v.width / v.height - v.originalWidth / v.originalHeight) < 0.001, "preserve document aspect ratio");
  assert.ok(v.bytes < v.originalBytes);
  before += v.originalBytes; after += v.bytes;
}
assert.ok(after < before * 0.35, "display files should save at least 65% collectively");

const app = read("assets/app.js");
const html = read("index.html");
for (const dependency of ["record-image-variants.js", "image-loader.js"]) {
  assert.ok(html.indexOf(dependency) > 0 && html.indexOf(dependency) < html.indexOf("assets/app.js"));
}
const start = app.indexOf("  async function openImage(");
const end = app.indexOf("\n  function ", start + 4);
const el = () => ({ hidden: false, style: {}, attributes: {}, setAttribute(k, v) { this.attributes[k] = v; }, removeAttribute(k) { delete this[k]; } });
const els = Object.fromEntries(["imageViewer", "imageCanvas", "imageStatus", "imageRetry", "imageOriginal", "imageQuality", "imageCaption"].map(k => [k, el()]));
els.imageDialog = { open: false, showModal() { this.open = true; } };
const pending = [];
const ctx = { els, recordImages: { "./a.jpg": { display: "./a.webp" } }, previews: { pauseAll() {} }, imageLoader: { load(source) { return new Promise((resolve, reject) => pending.push({ source, resolve, reject })); } }, URL, location: { href: "https://example.com/portfolio/" } };
vm.createContext(ctx);
vm.runInContext("let imageRequest = 0; let selectedImage = null;\n" + app.slice(start, end), ctx);
(async () => {
  const first = ctx.openImage("./a.jpg", "first");
  assert.strictEqual(pending[0].source, "./a.webp");
  assert.strictEqual(els.imageOriginal.href, "https://example.com/portfolio/a.jpg");
  assert.strictEqual(els.imageViewer.hidden, true);
  assert.strictEqual(els.imageCanvas.attributes["aria-busy"], "true");
  const second = ctx.openImage("./b.jpg", "second");
  pending[0].resolve({ src: "a.webp" }); await first;
  assert.strictEqual(els.imageViewer.src, undefined, "stale image cannot overwrite a newer selection");
  pending[1].resolve({ src: "b.jpg" }); await second;
  assert.strictEqual(els.imageViewer.src, "b.jpg");
  assert.strictEqual(els.imageViewer.hidden, false);
  assert.strictEqual(els.imageStatus.hidden, true);
  assert.strictEqual(els.imageCanvas.attributes["aria-busy"], "false");
  const failed = ctx.openImage("./missing.jpg");
  pending[2].reject(new Error("network")); await failed;
  assert.strictEqual(els.imageRetry.hidden, false);
  assert.match(els.imageStatus.textContent, /다시 시도/);
  const closed = ctx.openImage("./a.jpg");
  els.imageDialog.open = false;
  pending[3].resolve({ src: "a.webp" }); await closed;
  assert.strictEqual(els.imageViewer.hidden, true, "closed dialog must not reveal late-loaded image");
  console.log("record image assets and viewer tests passed");
})().catch(error => { console.error(error); process.exitCode = 1; });
