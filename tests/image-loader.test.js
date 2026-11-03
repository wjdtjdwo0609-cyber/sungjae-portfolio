const assert = require("assert");
const { createImageLoader } = require("../assets/image-loader.js");
const flush = () => new Promise((resolve) => setImmediate(resolve));
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};

function setup(maxEntries = 12) {
  const images = [];
  class FakeImage {
    constructor() {
      this.complete = false;
      this.naturalWidth = 0;
      this.decodeCalls = 0;
      images.push(this);
    }
    decode() { this.decodeCalls += 1; return this.decoding || Promise.resolve(); }
    succeed() { this.complete = true; this.naturalWidth = 800; this.onload?.(); }
    fail() { this.complete = true; this.naturalWidth = 0; this.onerror?.(); }
  }
  return { images, loader: createImageLoader({ Image: FakeImage, maxEntries }) };
}

(async () => {
  {
    const { loader, images } = setup();
    const first = loader.load("first.jpg");
    assert.strictEqual(loader.load("first.jpg"), first, "pending request is deduplicated");
    assert.strictEqual(images.length, 1);
    const decode = deferred();
    images[0].decoding = decode.promise;
    let resolved = false;
    first.then(() => { resolved = true; });
    images[0].succeed(); await flush();
    assert.strictEqual(images[0].decodeCalls, 1);
    assert.strictEqual(resolved, false, "load waits for decode, not just download");
    decode.resolve();
    assert.strictEqual(await first, images[0]);
    assert.strictEqual(await loader.load("first.jpg"), images[0], "ready result is reused");
    assert.strictEqual(images.length, 1);
    assert.strictEqual(images[0].onload, null);
    assert.strictEqual(images[0].onerror, null);
  }
  {
    const { loader, images } = setup();
    const failed = loader.load("retry.jpg");
    const rejection = assert.rejects(failed, /could not be loaded/);
    images[0].fail(); await rejection;
    const retry = loader.load("retry.jpg");
    assert.strictEqual(images.length, 2, "failure is not cached");
    images[1].succeed();
    assert.strictEqual(await retry, images[1]);
  }
  {
    const { loader, images } = setup();
    const result = loader.load("decode-fallback.jpg");
    images[0].decoding = Promise.reject(new Error("browser decode limitation"));
    images[0].succeed();
    assert.strictEqual(await result, images[0], "decode rejection keeps a displayable image");
  }
  {
    const { loader, images } = setup();
    const result = loader.load("invalid-decode.jpg");
    const rejection = assert.rejects(result, /could not be decoded/);
    const decode = deferred(); images[0].decoding = decode.promise;
    images[0].succeed(); images[0].naturalWidth = 0;
    decode.reject(new Error("bad bytes")); await rejection;
    const retry = loader.load("invalid-decode.jpg"); images[1].succeed(); await retry;
  }
  {
    const { loader, images } = setup(2);
    const first = loader.load("a.jpg"); images.at(-1).succeed(); await first;
    const second = loader.load("b.jpg"); images.at(-1).succeed(); await second;
    await loader.load("a.jpg"); // A becomes the most recently used result.
    const third = loader.load("c.jpg"); images.at(-1).succeed(); await third;
    assert.strictEqual(await loader.load("a.jpg"), images[0]);
    assert.strictEqual(images.length, 3);
    const evicted = loader.load("b.jpg");
    assert.strictEqual(images.length, 4, "least recently used ready result is evicted");
    images.at(-1).succeed(); await evicted;
  }
  {
    const { loader, images } = setup(1);
    const pending = loader.load("pending.jpg");
    const other = loader.load("other.jpg"); images[1].succeed(); await other;
    assert.strictEqual(loader.load("pending.jpg"), pending, "LRU pressure does not duplicate in-flight work");
    images[0].succeed(); await pending;
  }
  {
    const { loader, images } = setup();
    const warm = loader.warm("warm.jpg");
    const same = loader.load("warm.jpg");
    images[0].succeed();
    assert.strictEqual(await warm, await same);
    const failure = loader.warm("missing.jpg"); images[1].fail();
    assert.strictEqual(await failure, null, "warming swallows failure without an unhandled rejection");
    await assert.rejects(loader.load(""), TypeError);
    assert.strictEqual(await loader.warm(""), null);
  }
  {
    const images = [];
    class CachedImage {
      constructor() { this.complete = true; this.naturalWidth = 600; images.push(this); }
      decode() { return Promise.resolve(); }
    }
    const loader = createImageLoader({ Image: CachedImage });
    assert.strictEqual(await loader.load("cached.jpg"), images[0], "already complete image needs no load event");
  }
  {
    class ThrowingImage { constructor() { throw new Error("image unavailable"); } }
    const loader = createImageLoader({ Image: ThrowingImage });
    await assert.rejects(loader.load("throw.jpg"), /image unavailable/);
    await assert.rejects(loader.load("throw.jpg"), /image unavailable/);
  }
  console.log("image loader tests passed");
})().catch((error) => { console.error(error); process.exitCode = 1; });
