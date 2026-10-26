// 포트폴리오 도메인 규칙 테스트
const assert = require("assert");
const d = require("../assets/portfolio-domain.js");

// YouTube URL 해석 (4가지 형태 + t= 보존)
assert.strictEqual(d.parseYoutubeSource("https://www.youtube.com/watch?v=ABC123").id, "ABC123");
assert.strictEqual(d.parseYoutubeSource("https://youtu.be/ABC123").id, "ABC123");
assert.strictEqual(d.parseYoutubeSource("https://www.youtube.com/shorts/ABC123").id, "ABC123");
assert.strictEqual(d.parseYoutubeSource("https://www.youtube.com/embed/ABC123").id, "ABC123");
assert.strictEqual(d.parseYoutubeSource("https://www.youtube.com/watch?v=X&t=463s").start, 463);
assert.strictEqual(d.parseYoutubeTime("1h2m3s"), 3723);
assert.strictEqual(d.parseYoutubeTime("90"), 90);
assert.ok(d.youtubeEmbedUrl("https://www.youtube.com/watch?v=X&t=10s").includes("start=10"));
assert.strictEqual(d.youtubeEmbedUrl(""), "");
assert.ok(d.youtubeThumb("X").includes("/vi/X/"));

// 정규화: 기본값 채움 + id 슬러그 생성
const data = d.normalizeData({ projects: [{ title: "한글 제목!" }] });
const p = data.projects[0];
assert.strictEqual(p.visibility, "public");
assert.strictEqual(p.domain, "Product");
assert.ok(p.id.includes("한글"));
assert.ok(Array.isArray(p.stack) && Array.isArray(p.gallery));
assert.ok(data.domains.includes("All"));

// 공개 필터 + 정렬 (priority → title)
const projects = [
  { title: "b", visibility: "public", priority: 2, domain: "AI" },
  { title: "a", visibility: "public", priority: 2, domain: "Robotics" },
  { title: "hidden", visibility: "hidden", priority: 1, domain: "AI" },
  { title: "first", visibility: "public", priority: 1, domain: "AI", summary: "yolo vision" }
];
const pub = d.publicProjects(projects);
assert.deepStrictEqual(pub.map((x) => x.title), ["first", "a", "b"]);

// 검색·도메인 탭 필터
assert.deepStrictEqual(d.filterProjects(projects, { filter: "AI" }).map((x) => x.title), ["first", "b"]);
assert.deepStrictEqual(d.filterProjects(projects, { search: "yolo" }).map((x) => x.title), ["first"]);
assert.strictEqual(d.filterProjects(projects, { filter: "AI", search: "없는단어" }).length, 0);

// 텍스트 규칙
assert.deepStrictEqual(d.splitLines("a\n\n b \n"), ["a", "b"]);
assert.deepStrictEqual(d.splitComma("x, y ,,z"), ["x", "y", "z"]);
assert.strictEqual(d.slugify("Smart Factory 디지털트윈!"), "smart-factory-디지털트윈");
assert.strictEqual(d.escapeHtml("<b>&"), "&lt;b&gt;&amp;");
assert.deepStrictEqual(d.normalizeCasePairs(["문제"])[0], { label: "문제", value: "" });
assert.strictEqual(d.layoutClass(0), "layout-hero");
assert.strictEqual(d.layoutClass(9), "layout-hero"); // 패턴 순환
assert.strictEqual(d.fileNameFromPath("./assets/docs/x.pdf"), "x.pdf");

console.log("domain tests passed");
