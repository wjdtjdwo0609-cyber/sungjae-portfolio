// 아키텍처 fitness — 도메인 순수성 + 로드 순서 검증
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const domainSrc = fs.readFileSync(path.join(root, "assets/portfolio-domain.js"), "utf8")
  .split("\n").filter((l) => !l.trim().startsWith("//") && !l.includes("attachPortfolioDomain") && !l.includes("globalThis")).join("\n");
["document.", "localStorage", "window.location", "addEventListener", "fetch(", "getElementById"].forEach((token) => {
  assert.ok(!domainSrc.includes(token), `도메인이 외부 기술 사용: ${token}`);
});
const appSrc = fs.readFileSync(path.join(root, "assets/app.js"), "utf8");
assert.ok(appSrc.includes("window.PortfolioDomain"), "app.js가 도메인을 사용하지 않음");
assert.ok(!/function (slugify|parseYoutubeSource|normalizeData)\(/.test(appSrc), "app.js에 도메인 함수 중복 정의 잔존");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const domainIdx = html.indexOf("portfolio-domain.js");
const appIdx = html.indexOf("assets/app.js");
assert.ok(domainIdx > -1 && domainIdx < appIdx, "index.html에서 도메인이 app.js보다 먼저 로드돼야 함");
console.log("architecture fitness tests passed");
