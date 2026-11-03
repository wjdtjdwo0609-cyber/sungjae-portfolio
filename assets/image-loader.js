(function attachPortfolioImages(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PortfolioImages = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function createImageLoader(options = {}) {
    const ImageClass = options.Image || (typeof Image !== "undefined" ? Image : null);
    const limit = Number.isFinite(options.maxEntries) ? Math.max(1, Math.floor(options.maxEntries)) : 12;
    const ready = new Map();
    // In-flight requests stay deduplicated even when the completed LRU is full.
    const pending = new Map();

    function load(source) {
      if (typeof source !== "string" || !source.trim()) return Promise.reject(new TypeError("An image source is required"));
      if (pending.has(source)) return pending.get(source);
      if (ready.has(source)) {
        const image = ready.get(source);
        ready.delete(source);
        ready.set(source, image);
        return Promise.resolve(image);
      }
      if (!ImageClass) return Promise.reject(new Error("Image loading is unavailable"));
      let resolve, reject;
      const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
      pending.set(source, promise);
      let image, finishing = false, settled = false;

      function settle(error) {
        if (settled) return;
        settled = true;
        if (image) image.onload = image.onerror = null;
        pending.delete(source);
        if (error) { reject(error); return; }
        ready.set(source, image);
        while (ready.size > limit) ready.delete(ready.keys().next().value);
        resolve(image);
      }

      async function finish() {
        if (finishing || settled) return;
        finishing = true;
        if (!image.naturalWidth) { settle(new Error("Image could not be loaded")); return; }
        try { if (typeof image.decode === "function") await image.decode(); }
        catch {
          // Some browsers reject decode() for an otherwise displayable image.
          if (!image.naturalWidth) { settle(new Error("Image could not be decoded")); return; }
        }
        if (!image.naturalWidth) { settle(new Error("Image could not be decoded")); return; }
        settle();
      }

      try {
        image = new ImageClass();
        image.onload = finish;
        image.onerror = () => settle(new Error("Image could not be loaded"));
        image.src = source;
        if (image.complete && image.naturalWidth) void finish();
      } catch (error) { settle(error); }
      return promise;
    }

    function warm(source) {
      return load(source).catch(() => null);
    }

    return { load, warm };
  }

  return { createImageLoader };
});
