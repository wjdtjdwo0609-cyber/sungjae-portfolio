const assert = require("assert");
const { createPreviewController } = require("../assets/media-preview.js");

class Target {
  constructor() { this.listeners = new Map(); }
  addEventListener(type, callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(callback);
  }
  removeEventListener(type, callback) { this.listeners.get(type)?.delete(callback); }
  emit(type, event = {}) { [...(this.listeners.get(type) || [])].forEach((fn) => fn({ target: this, ...event })); }
  listenerCount() { return [...this.listeners.values()].reduce((sum, set) => sum + set.size, 0); }
}
class Container extends Target {
  constructor() { super(); this.dataset = {}; this.isConnected = true; this.children = new Set(); this.focusVisible = true; }
  contains(child) { return child === this || this.children.has(child); }
  matches(selector) { return selector === ":focus-visible" && this.focusVisible; }
}
class Video extends Target {
  constructor() { super(); this.paused = true; this.currentTime = 0; this.preload = "metadata"; this.playCalls = 0; }
  play() { this.playCalls += 1; this.paused = false; return this.nextPlay ? this.nextPlay() : Promise.resolve(); }
  pause() { this.paused = true; }
}
const flush = () => new Promise((resolve) => setImmediate(resolve));
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
function setup({ canHover = true, reduce = false } = {}) {
  const doc = new Target();
  doc.hidden = false;
  const win = new Target();
  const hover = new Target(); hover.matches = canHover;
  const motion = new Target(); motion.matches = reduce;
  win.matchMedia = (query) => query.includes("reduced-motion") ? motion : hover;
  let observer;
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observer = this; }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.targets.clear(); }
    change(target, isIntersecting) { this.callback([{ target, isIntersecting }]); }
  }
  const controller = createPreviewController({ document: doc, window: win, IntersectionObserver: Observer });
  function add() {
    const container = new Container(), video = new Video();
    const unregister = controller.register(container, video);
    return { container, video, unregister };
  }
  return { doc, win, hover, motion, observer, controller, add };
}

(async () => {
  {
    const env = setup(), { container, video } = env.add();
    assert.strictEqual(video.preload, "metadata", "keep caller loading policy");
    for (const key of ["muted", "defaultMuted", "loop", "playsInline"]) assert.strictEqual(video[key], true, key);
    assert.strictEqual(container.dataset.previewState, "idle");
    container.emit("mouseenter"); await flush();
    assert.strictEqual(container.dataset.previewState, "playing");
    assert.strictEqual(video.paused, false);
    video.currentTime = 3;
    container.emit("mouseleave");
    assert.strictEqual(container.dataset.previewState, "idle");
    assert.strictEqual(video.paused, true);
    assert.strictEqual(video.currentTime, 0, "restore poster position on exit");
    env.controller.destroy();
  }
  {
    const env = setup(), first = env.add(), second = env.add();
    first.container.emit("mouseenter"); await flush();
    second.container.emit("mouseenter"); await flush();
    assert.strictEqual(first.video.paused, true, "only one preview plays");
    assert.strictEqual(first.container.dataset.previewState, "idle");
    assert.strictEqual(second.container.dataset.previewState, "playing");
    env.controller.pauseAll();
    assert.strictEqual(second.video.paused, true);
    env.controller.destroy();
  }
  {
    const env = setup(), item = env.add(), pending = deferred();
    item.video.nextPlay = () => pending.promise;
    item.container.emit("mouseenter");
    item.container.emit("mouseleave");
    item.video.paused = false; // Simulate a late media start after cancellation.
    pending.resolve(); await flush();
    assert.strictEqual(item.video.paused, true, "late play resolution cannot resume after leave");
    assert.strictEqual(item.container.dataset.previewState, "idle");
    env.controller.destroy();
  }
  {
    const env = setup(), item = env.add(), old = deferred(), fresh = deferred();
    item.video.nextPlay = () => old.promise;
    item.container.emit("mouseenter"); item.container.emit("mouseleave");
    item.video.nextPlay = () => fresh.promise;
    item.container.emit("mouseenter");
    old.resolve(); await flush();
    assert.strictEqual(item.video.paused, false, "stale resolution does not pause a newer valid request");
    fresh.resolve(); await flush();
    assert.strictEqual(item.container.dataset.previewState, "playing");
    env.controller.destroy();
  }
  {
    const env = setup(), item = env.add(), old = deferred();
    item.video.nextPlay = () => old.promise;
    item.container.emit("mouseenter"); item.container.emit("mouseleave");
    item.video.nextPlay = () => Promise.resolve();
    item.container.emit("mouseenter"); await flush();
    old.reject(new Error("superseded")); await flush();
    assert.strictEqual(item.container.dataset.previewState, "playing", "stale rejection cannot poison a new play");
    item.container.emit("mouseleave");
    item.video.nextPlay = () => Promise.reject(new Error("blocked"));
    item.container.emit("mouseenter"); await flush();
    assert.strictEqual(item.container.dataset.previewState, "unavailable");
    assert.strictEqual(item.video.paused, true);
    item.container.emit("mouseleave");
    item.video.nextPlay = () => { throw new Error("unsupported"); };
    item.container.emit("mouseenter");
    assert.strictEqual(item.container.dataset.previewState, "unavailable", "synchronous failure is contained");
    env.controller.destroy();
  }
  {
    const env = setup(), item = env.add(), old = deferred();
    item.video.nextPlay = () => old.promise;
    item.container.emit("mouseenter");
    env.controller.register(item.container, item.video);
    item.video.nextPlay = () => Promise.resolve();
    item.container.emit("mouseenter"); await flush();
    old.resolve(); await flush();
    assert.strictEqual(item.video.paused, false, "old registration cannot pause a newly registered video");
    assert.strictEqual(item.container.dataset.previewState, "playing");
    env.controller.destroy();
  }
  {
    const env = setup({ canHover: false }), item = env.add(), child = {};
    item.container.emit("mouseenter"); await flush();
    assert.strictEqual(item.video.playCalls, 0, "touch/coarse environment does not synthesize hover playback");
    item.container.emit("focusin"); await flush();
    assert.strictEqual(item.container.dataset.previewState, "playing", "keyboard works without hover capability");
    item.container.children.add(child);
    item.container.emit("focusout", { relatedTarget: child });
    assert.strictEqual(item.video.paused, false, "moving focus within the card keeps playback");
    item.container.emit("focusout", { relatedTarget: null });
    assert.strictEqual(item.video.paused, true);
    env.controller.destroy();
  }
  {
    const env = setup({ reduce: true }), item = env.add();
    item.container.emit("mouseenter"); item.container.emit("focusin"); await flush();
    assert.strictEqual(item.video.playCalls, 0, "reduced motion also blocks keyboard previews");
    env.motion.matches = false; env.motion.emit("change");
    assert.strictEqual(item.video.playCalls, 0, "preference changes never autoplay");
    item.container.emit("focusin"); await flush();
    env.motion.matches = true; env.motion.emit("change");
    assert.strictEqual(item.video.paused, true, "motion preference change stops active preview");
    env.controller.destroy();
  }
  {
    const env = setup(), item = env.add();
    item.container.emit("mouseenter"); await flush();
    item.container.focusVisible = false;
    item.container.emit("pointerdown"); item.container.emit("focusin");
    item.container.emit("mouseleave");
    assert.strictEqual(item.video.paused, true, "mouse focus cannot keep playing after pointer leaves");
    assert.strictEqual(item.container.dataset.previewState, "idle");
    item.container.focusVisible = true;
    item.container.emit("focusin"); await flush();
    assert.strictEqual(item.video.paused, false, "visible keyboard focus still starts playback");
    item.container.emit("pointerdown");
    assert.strictEqual(item.video.paused, true, "clicking an already-focused control clears keyboard intent");
    env.controller.destroy();
  }
  {
    const env = setup({ canHover: false }), item = env.add();
    item.container.focusVisible = false;
    item.container.emit("pointerdown"); item.container.emit("focusin"); await flush();
    assert.strictEqual(item.video.playCalls, 0, "touch focus does not trigger keyboard preview");
    env.controller.destroy();
  }
  {
    const env = setup(), item = env.add();
    item.container.emit("mouseenter"); await flush();
    env.doc.hidden = true; env.doc.emit("visibilitychange");
    assert.strictEqual(item.video.paused, true);
    item.container.emit("mouseenter"); await flush();
    assert.strictEqual(item.video.playCalls, 1, "hidden document cannot start playback");
    env.doc.hidden = false; env.doc.emit("visibilitychange");
    item.container.emit("mouseenter"); await flush();
    env.win.emit("blur");
    assert.strictEqual(item.video.paused, true);
    item.container.emit("mouseenter"); await flush();
    assert.strictEqual(item.video.playCalls, 2, "blurred window cannot start playback");
    env.win.emit("focus"); item.container.emit("mouseenter"); await flush();
    assert.strictEqual(item.container.dataset.previewState, "playing");
    env.observer.change(item.container, false);
    assert.strictEqual(item.video.paused, true, "offscreen preview pauses");
    env.observer.change(item.container, true); await flush();
    assert.strictEqual(item.video.paused, true, "scrolling back alone does not automatically restart");
    env.observer.change(item.container, false);
    item.container.emit("mouseenter"); await flush();
    assert.strictEqual(item.video.playCalls, 3, "offscreen start is blocked");
    env.observer.change(item.container, true); await flush();
    assert.strictEqual(item.container.dataset.previewState, "playing", "post-scroll observer update honors the pending real hover");
    assert.strictEqual(item.video.playCalls, 4);
    item.video.emit("error");
    assert.strictEqual(item.container.dataset.previewState, "unavailable");
    env.controller.destroy();
  }
  {
    const env = setup(), item = env.add();
    env.observer.change(item.container, false);
    item.container.emit("focusin"); await flush();
    assert.strictEqual(item.video.playCalls, 0);
    env.observer.change(item.container, true); await flush();
    assert.strictEqual(item.container.dataset.previewState, "playing", "post-scroll observer update honors keyboard focus");
    env.controller.destroy();
  }
  {
    const env = setup(), item = env.add(), pending = deferred();
    item.video.nextPlay = () => pending.promise;
    item.container.emit("mouseenter");
    item.container.isConnected = false;
    env.controller.prune();
    assert.strictEqual(item.video.paused, true);
    assert.strictEqual(item.container.listenerCount(), 0);
    assert.strictEqual(item.video.listenerCount(), 0);
    assert.strictEqual(env.observer.targets.size, 0);
    pending.resolve(); await flush();
    assert.strictEqual(item.container.dataset.previewState, "idle");
    env.controller.destroy();
    assert.strictEqual(env.doc.listenerCount() + env.win.listenerCount() + env.hover.listenerCount() + env.motion.listenerCount(), 0, "destroy releases global listeners");
    const after = env.add();
    after.container.emit("mouseenter");
    assert.strictEqual(after.video.playCalls, 0, "destroyed controller stays inactive");
  }
  {
    const env = setup(), item = env.add();
    item.container.emit("mouseenter"); await flush();
    env.hover.matches = false; env.hover.emit("change");
    assert.strictEqual(item.video.paused, true, "hover capability change stops a mouse preview");
    item.container.emit("focusin"); await flush();
    assert.strictEqual(item.video.paused, false, "keyboard preview remains available without hover");
    item.unregister(); item.unregister();
    assert.strictEqual(item.container.listenerCount(), 0);
    assert.strictEqual(item.video.paused, true);
    env.controller.destroy();
  }
  console.log("media preview tests passed");
})().catch((error) => { console.error(error); process.exitCode = 1; });
