// 공개 릴리스 연결/헤더/핵심 한계 검사. 영상 재생과 PDF 본문 검수는 별도 수행.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const d = require("../assets/portfolio-domain.js");
const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const context = { window: {} };
vm.runInNewContext(read("assets/portfolio-data.js"), context);
const seed = context.window.PORTFOLIO_SEED;
const published = d.publicData(seed);
assert.strictEqual(seed.projects.length, 16, "원본 프로젝트 16개 보존");
assert.strictEqual(published.projects.length, 15, "공개 프로젝트 15개 보존 (기존 hidden 1개 제외)");
assert.strictEqual(new Set(seed.projects.map((p) => p.id)).size, 16, "프로젝트 ID 중복 금지");
for (const data of [seed, published]) {
  assert.ok(!JSON.stringify(data).includes("/Users"), "공개 데이터에 로컬 사용자 경로 금지");
}
const project = (id) => {
  const found = published.projects.find((p) => p.id === id);
  assert.ok(found, `공개 프로젝트 누락: ${id}`);
  return found;
};
const vla = project("robot-vla-pipeline");
const notebook = project("notebooklm-auto-collector");
assert.strictEqual(project("grovebound-3d").youtubeUrl, "https://www.youtube.com/watch?v=q3dl5on5Vnw", "사용자가 지정한 Grovebound 시연 영상 유지");
const pdf = "./assets/docs/sungjae-third-hand-vla-presentation.pdf";
const pdfLink = vla.links.find((link) => link.url === pdf);
assert.ok(pdfLink, "팀 발표 PDF 링크 누락");
assert.strictEqual(pdfLink.icon, "file-text");
assert.match(pdfLink.label, /팀 발표자료/);
assert.match(pdfLink.label, /29쪽/);
assert.match(pdfLink.label, /영상 제외/);
assert.ok(vla.links.some((link) => link.url === "https://github.com/wjdtjdwo0609-cyber/Dobot_VLM_VLA"), "기존 코드 링크 보존");
assert.ok(seed.profile.pdfs.some((item) => item.file === "./assets/docs/sungjae-third-hand-vla.pdf"), "기존 요약 PDF 연결 보존");

function checkHeader(relative, type) {
  const file = path.join(root, relative);
  assert.ok(fs.existsSync(file), `파일 누락: ${relative}`);
  const stat = fs.statSync(file);
  assert.ok(stat.isFile() && stat.size > 24, `유효한 파일 필요: ${relative}`);
  const header = Buffer.alloc(24);
  const fd = fs.openSync(file, "r");
  try {
    assert.strictEqual(fs.readSync(fd, header, 0, header.length, 0), header.length);
  } finally {
    fs.closeSync(fd);
  }
  if (type === "pdf") {
    assert.strictEqual(header.toString("ascii", 0, 5), "%PDF-");
    assert.strictEqual(stat.size, 6371722, "전달받은 승인 PDF 크기");
  } else if (type === "jpeg") {
    assert.strictEqual(header.subarray(0, 3).toString("hex"), "ffd8ff");
  } else {
    assert.strictEqual(header.toString("ascii", 4, 8), "ftyp");
    const size = header.readUInt32BE(0);
    assert.ok(size >= 16 && size <= stat.size && size % 4 === 0, "MP4 ftyp 크기");
    assert.ok(["isom", "iso2", "mp41", "mp42", "avc1"].includes(header.toString("ascii", 8, 12)), "MP4 major brand");
  }
}
checkHeader(pdf, "pdf");
const media = {
  video: ["./assets/videos/notebooklm-result-walkthrough-20261103.mp4", "mp4"],
  previewVideo: ["./assets/videos/previews/notebooklm-result-preview-20261103.mp4", "mp4"],
  videoPoster: ["./assets/images/notebooklm-result-poster-20261103.jpg", "jpeg"]
};
for (const [field, [relative, type]] of Object.entries(media)) {
  assert.strictEqual(notebook[field], relative, `${field} 연결 경로`);
  checkHeader(relative, type);
  const note = notebook.mediaNotes.find((item) => item.src === relative);
  assert.ok(note, `${field} 시연 근거 누락`);
  assert.strictEqual(note.capturedAt, "2026-11-03");
  assert.match(note.caption, /재열람/);
}
assert.strictEqual(notebook.image, notebook.videoPoster);
assert.strictEqual(notebook.imageFit, "contain");
assert.ok(notebook.gallery.includes("./assets/images/notebooklm-automation.png"), "기존 이미지 보존");
assert.strictEqual(notebook.tests, 36);
const evidence = notebook.evidence.map((item) => `${item.label} ${item.value}`).join(" ");
assert.match(evidence, /npm test.*36/);
assert.match(evidence, /syntax.*통과/);
assert.match(evidence, /HTTP URL\s*27/);
assert.match(evidence, /중복\s*0/);
for (const text of [notebook.limitations, evidence]) {
  for (const pattern of [/본문\s*27개.*(?:아니|않)/, /29개.*오류\s*7개/, /선택.*22개/, /실패\s*소스.*일괄삭제.*미지원/, /재열람/, /24초.*캡처.*편집/, /신규 수집.*실시간 녹화.*(?:아니|아닙)/, /노트북 생성.*채팅.*Deep Research.*(?:않|안 함)/]) {
    assert.match(text, pattern, `핵심 한계 누락: ${pattern}`);
  }
}
assert.match(evidence, /2026-11-03 02:47/);
assert.ok(!/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(JSON.stringify(notebook)), "계정 이메일 금지");
assert.ok(!/[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}/i.test(JSON.stringify(notebook)), "노트북 UUID 금지");
const revision = seed.profile.revision;
assert.ok(typeof revision === "string" && revision.trim(), "릴리스 식별자 필요");
for (const [file, style] of [["index.html", "styles.css"], ["summary.html", "summary.css"]]) {
  const html = read(file);
  assert.ok(html.includes(`./assets/portfolio-data.js?v=${revision}`), `${file} seed 캐시`);
  assert.ok(html.includes(`./assets/${style}?v=${revision}`), `${file} CSS 캐시`);
}
console.log("portfolio release media tests passed");
