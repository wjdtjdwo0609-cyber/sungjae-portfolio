const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "assets/app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.ok(html.indexOf("assets/media-preview.js") < html.indexOf("assets/app.js"));
assert.ok(app.includes("previews.register(card, video)"), "preview covers the whole card");
assert.ok(app.includes("previews.register(button, video)"), "hero uses the same preview controller");
assert.ok(app.includes('$(".detail-panel", els.detailDialog).scrollTop = 0'), "reset the actual dialog scroller");

function extract(name) {
  const start = app.indexOf(`  function ${name}(`);
  const end = app.indexOf("\n  function ", start + 4);
  return app.slice(start, end > 0 ? end : undefined).trim();
}

const context = {};
vm.createContext(context);
vm.runInContext(extract("jumpGallery"), context);
let movement;
const track = { clientWidth: 560, children: [{}, {}, {}], scrollTo: (args) => { movement = args; } };
const button = { closest: () => ({ querySelector: () => track }) };
context.jumpGallery(button, 2);
assert.strictEqual(movement.left, 1120);
assert.strictEqual(movement.behavior, "smooth");
assert.ok(!extract("jumpGallery").includes("scrollIntoView"), "must not scroll dialog/page ancestors");

const gallery = extract("renderDetailGallery");
assert.ok(!gallery.includes('loading="lazy"'), "dialog gallery must not rely on horizontal lazy loading");
assert.ok(!gallery.includes('class="media-play"'), "video button must not cover image thumbnails");
assert.ok(gallery.includes('class="gallery-image-status"'), "loading/error status is visible");

const listeners = {};
const image = { complete: false, naturalWidth: 0, addEventListener: (event, fn) => { listeners[event] = fn; } };
const status = { textContent: "" };
const slide = { dataset: {}, querySelector: (selector) => selector === "img" ? image : status };
context.$$ = () => [slide];
context.els = { detailContent: {} };
vm.runInContext(extract("bindGalleryImages"), context);
context.bindGalleryImages();
assert.strictEqual(slide.dataset.imageState, "loading");
listeners.error();
assert.strictEqual(slide.dataset.imageState, "error");
assert.match(status.textContent, /다시 시도/);
listeners.load();
assert.strictEqual(slide.dataset.imageState, "ready");
assert.strictEqual(status.textContent, "");
console.log("gallery/media integration tests passed");
