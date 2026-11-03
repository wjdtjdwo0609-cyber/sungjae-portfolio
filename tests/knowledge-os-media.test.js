// 검수한 Knowledge OS 미디어 연결과 가벼운 파일 헤더 회귀 검사 (재생 검사는 별도 CUA QA).
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/portfolio-data.js"), "utf8"), context);
const seed = context.window.PORTFOLIO_SEED;
const matches = seed.projects.filter((p) => p.id === "knowledge-os-control");
assert.strictEqual(matches.length, 1);
const project = matches[0];
assert.ok(typeof seed.profile.revision === "string" && seed.profile.revision.trim(), "릴리스 식별자 누락");
assert.strictEqual(project.imageFit, "contain");
assert.match(project.limitations, /마지막.*리포트/, "마지막 생성 리포트 기준이라는 한계 유지");
assert.match(project.limitations, /실시간.*아닙니다/, "실시간 재집계가 아니라는 한계 유지");

const expected = {
  video: "./assets/videos/knowledge-os-telegram-demo-20261103.mp4",
  videoPoster: "./assets/images/knowledge-os/knowledge-os-telegram-poster-20261103.jpg",
  previewVideo: "./assets/videos/previews/knowledge-os-telegram-preview-20261103.mp4"
};
for (const [field, relative] of Object.entries(expected)) {
  assert.strictEqual(project[field], relative, `${field} 연결 경로`);
  const file = path.join(root, relative);
  assert.ok(fs.existsSync(file), `${field} 파일 누락`);
  const stat = fs.statSync(file);
  assert.ok(stat.isFile() && stat.size > 24, `${field} 비어 있거나 파일이 아님`);
  const header = Buffer.alloc(24);
  const fd = fs.openSync(file, "r");
  try {
    assert.strictEqual(fs.readSync(fd, header, 0, header.length, 0), header.length);
  } finally {
    fs.closeSync(fd);
  }
  if (field === "videoPoster") {
    assert.strictEqual(header.subarray(0, 3).toString("hex"), "ffd8ff", "JPEG SOI/marker 헤더");
  } else {
    assert.strictEqual(header.toString("ascii", 4, 8), "ftyp", `${field} MP4 ftyp 헤더`);
    const boxSize = header.readUInt32BE(0);
    assert.ok(boxSize >= 16 && boxSize <= stat.size && boxSize % 4 === 0, `${field} ftyp 크기`);
    assert.ok(["isom", "iso2", "mp41", "mp42", "avc1"].includes(header.toString("ascii", 8, 12)), `${field} MP4 major brand`);
  }
  const note = project.mediaNotes.find((item) => item.src === relative);
  assert.ok(note, `${field} 미디어 근거 누락`);
  assert.strictEqual(note.capturedAt, "2026-11-03");
  assert.ok(note.caption.includes("마지막 생성 리포트 기준"));
}
const evidence = project.evidence.map((item) => `${item.label} ${item.value}`).join(" ");
for (const text of ["2026-11-03", "요청 1회", "16초 무음", "실제 창", "연속 실시간 녹화가 아니", "마지막 생성 리포트 기준", "실시간 전체 재집계가 아닙니다"]) {
  assert.ok(evidence.includes(text), `시연 근거 누락: ${text}`);
}
const css = fs.readFileSync(path.join(root, "assets/styles.css"), "utf8");
for (const tag of ["img", "video"]) {
  const selector = `.project-card[data-image-fit="contain"] .project-media ${tag}`;
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  assert.ok(rules.some(([, selectors, body]) => selectors.split(",").some((s) => s.trim() === selector) && /object-fit\s*:\s*contain\s*;/.test(body)), `${tag} contain 규칙 누락`);
}
console.log("knowledge OS media tests passed");
