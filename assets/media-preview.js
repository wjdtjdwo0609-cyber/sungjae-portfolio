(function attachPortfolioMedia(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PortfolioMedia = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function createPreviewController(options = {}) {
    const doc = options.document || (typeof document !== "undefined" ? document : null);
    const win = options.window || doc?.defaultView || (typeof window !== "undefined" ? window : null);
    const Observer = Object.prototype.hasOwnProperty.call(options, "IntersectionObserver")
      ? options.IntersectionObserver : win?.IntersectionObserver;
    const entries = new Map();
    const cleanup = [];
    const reducedMotion = win?.matchMedia?.("(prefers-reduced-motion: reduce)");
    const hover = win?.matchMedia?.("(hover: hover)");
    let active = null;
    let blurred = false;
    let destroyed = false;

    function listen(target, type, handler, removers) {
      if (!target?.addEventListener) return;
      target.addEventListener(type, handler);
      removers.push(() => target.removeEventListener(type, handler));
    }

    function watch(query, handler) {
      if (query?.addEventListener) listen(query, "change", handler, cleanup);
      else if (query?.addListener) {
        query.addListener(handler);
        cleanup.push(() => query.removeListener(handler));
      }
    }

    function pauseVideo(entry) {
      try { entry.video.pause(); } catch {}
      // Seeking can throw before metadata is available. The poster still remains visible.
      try { entry.video.currentTime = 0; } catch {}
    }

    function stop(entry, state = "idle", clearIntent = false) {
      entry.version += 1;
      if (active === entry) active = null;
      if (clearIntent) entry.hovered = entry.focused = false;
      pauseVideo(entry);
      entry.container.dataset.previewState = state;
    }

    function allowed(entry) {
      return !destroyed && !entry.disposed && entry.container.isConnected !== false
        && !doc?.hidden && !blurred && entry.visible && !reducedMotion?.matches
        && (entry.focused || (entry.hovered && hover?.matches));
    }

    function start(entry) {
      if (!allowed(entry) || active === entry) return;
      if (active) stop(active);
      active = entry;
      const version = ++entry.version;
      entry.container.dataset.previewState = "idle";
      let playing;
      try { playing = entry.video.play(); }
      catch { stop(entry, "unavailable"); return; }
      Promise.resolve(playing).then(() => {
        if (entry.version !== version || active !== entry || !allowed(entry)) {
          // A stale play() may finish after leave/blur/removal. Do not interrupt
          // a newer request for this same video when that request is still valid.
          if (active?.video !== entry.video || !allowed(active)) pauseVideo(entry);
          return;
        }
        entry.container.dataset.previewState = "playing";
      }, () => {
        // A superseded AbortError/rejection must not overwrite the next preview.
        if (entry.version === version && active === entry) stop(entry, "unavailable");
      });
    }

    function dispose(entry) {
      if (entry.disposed) return;
      stop(entry, "idle", true);
      entry.disposed = true;
      entry.cleanup.forEach((remove) => remove());
      observer?.unobserve(entry.container);
      entries.delete(entry.container);
    }

    const observer = Observer ? new Observer((changes) => {
      changes.forEach((change) => {
        const entry = entries.get(change.target);
        if (!entry) return;
        entry.visible = change.isIntersecting;
        if (!entry.visible) stop(entry, "idle", true);
        // A real enter/focus can arrive before the observer's post-scroll update.
        // start() still requires a current intent; scrolling alone does not play.
        else start(entry);
      });
    }, { threshold: 0 }) : null;

    function prune() {
      entries.forEach((entry) => {
        if (entry.container.isConnected === false) dispose(entry);
      });
    }

    function pauseAll() {
      entries.forEach((entry) => stop(entry, "idle", true));
      prune();
    }

    function register(container, video) {
      if (destroyed) return () => {};
      if (!container?.dataset || !video?.play || !video?.pause) {
        throw new TypeError("A preview container and video element are required");
      }
      if (entries.has(container)) dispose(entries.get(container));
      const entry = { container, video, cleanup: [], version: 0, visible: true,
        hovered: false, focused: false, disposed: false };
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      container.dataset.previewState = "idle";
      entries.set(container, entry);
      listen(container, "mouseenter", () => { entry.hovered = true; start(entry); }, entry.cleanup);
      listen(container, "mouseleave", () => {
        entry.hovered = false;
        if (!entry.focused) stop(entry);
      }, entry.cleanup);
      listen(container, "pointerdown", () => {
        // Clicking an already-focused control may not emit another focusin.
        entry.focused = false;
        if (!entry.hovered || !hover?.matches) stop(entry);
      }, entry.cleanup);
      listen(container, "focusin", (event) => {
        // Mouse/touch focus must not keep a preview alive after pointer exit.
        try { entry.focused = Boolean(event.target?.matches?.(":focus-visible")); }
        catch { entry.focused = false; }
        if (entry.focused) start(entry);
        else if (!entry.hovered || !hover?.matches) stop(entry);
      }, entry.cleanup);
      listen(container, "focusout", (event) => {
        if (event.relatedTarget && container.contains(event.relatedTarget)) return;
        entry.focused = false;
        if (!entry.hovered || !hover?.matches) stop(entry);
      }, entry.cleanup);
      listen(video, "error", () => stop(entry, "unavailable"), entry.cleanup);
      observer?.observe(container);
      return () => dispose(entry);
    }

    listen(doc, "visibilitychange", () => { if (doc.hidden) pauseAll(); }, cleanup);
    listen(win, "blur", () => { blurred = true; pauseAll(); }, cleanup);
    listen(win, "focus", () => { blurred = false; }, cleanup);
    watch(reducedMotion, () => { if (reducedMotion.matches) pauseAll(); });
    watch(hover, () => {
      if (!hover.matches) entries.forEach((entry) => { if (!entry.focused) stop(entry, "idle", true); });
    });

    function destroy() {
      destroyed = true;
      entries.forEach(dispose);
      observer?.disconnect();
      cleanup.forEach((remove) => remove());
    }

    return { register, pauseAll, prune, destroy };
  }

  return { createPreviewController };
});
