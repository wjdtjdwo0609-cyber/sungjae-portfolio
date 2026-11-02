// 첫 장 요약과 정적 HTML이 공개 데이터와 어긋나지 않는지 검사
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const d = require("../assets/portfolio-domain.js");
const { build } = require("../tools/build-static.js");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const textOf = (html) => html.replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

// 커밋된 HTML은 생성 결과와 같아야 한다. 어긋나면 node tools/build-static.js를 실행한다.
for (const [file, html] of Object.entries(build())) {
  assert.strictEqual(read(file), html, `${file}이 portfolio-data.js와 어긋남: node tools/build-static.js 실행 필요`);
}

// 요약은 공개 프로젝트의 사실만 쓴다.
const sample = {
  profile: { name: "성재", role: "개발자", website: "https://example.com/site/", github: "https://github.com/me", resume: "./a.pdf", pdfs: [{ label: "기록", file: "./b.pdf" }, { label: "차단", file: "javascript:alert(1)" }], awards: [{ title: "개인상", date: "2020.01.01", scope: "개인 표창" }], overview: { headline: "소개", degree: "학위", degreePeriod: "2015~2021", projects: [{ id: "main", label: "대표", role: "맡은 일" }, { id: "secret", role: "숨김" }] } },
  projects: [
    { id: "main", title: "대표 <사례>", domain: "AI", visibility: "public", featured: true, priority: 1, summary: "요약", limitations: "한계", stack: ["Python", "React"], links: [{ label: "코드", url: "https://example.com/code" }], awards: [{ title: "팀상", date: "2026.05.22", scope: "팀 수상" }], patents: [{ title: "특허", status: "특허출원 접수", number: "10-1" }], copyrights: [{ title: "등록", number: "C-1", registeredAt: "2026.04.10" }] },
    { id: "other", title: "기타", subtitle: "한 줄", domain: "Robotics", visibility: "public", priority: 2, stack: ["Python"] },
    { id: "secret", title: "숨긴 프로젝트", domain: "Secret", visibility: "hidden", priority: 3, summary: "비공개", localPath: "/private/work" }
  ]
};
const brief = d.buildProfileBrief(sample);
assert.deepStrictEqual(brief.stats, { projects: 2, featured: 1, domains: ["AI", "Robotics"] });
assert.deepStrictEqual(brief.highlights.map((item) => item.id), ["main"]);
assert.deepStrictEqual(brief.others.map((item) => item.title), ["기타"]);
assert.deepStrictEqual(brief.awards.map((item) => item.title), ["팀상", "개인상"]);
assert.deepStrictEqual(brief.stack, ["Python", "React"]);
assert.strictEqual(brief.highlights[0].links[0].url, "https://example.com/site/#project/main");
assert.deepStrictEqual(brief.documents.map((item) => item.url), ["https://example.com/site/", "https://github.com/me", "https://example.com/site/a.pdf", "https://example.com/site/b.pdf"]);

const html = d.renderProfileBriefHtml(brief);
assert.ok(html.includes("대표 &lt;사례&gt;"), "프로젝트 이름은 이스케이프돼야 함");
assert.ok(html.includes("특허출원 접수"), "특허는 출원 접수로 적어야 함");
assert.ok(html.includes("팀 수상") && html.includes("개인 표창"), "팀 수상과 개인 표창을 구분해야 함");
assert.ok(html.includes("한계"), "현재 한계를 빼면 안 됨");
["숨긴 프로젝트", "/private/work", "javascript:"].forEach((token) => assert.ok(!html.includes(token), `공개되면 안 되는 값: ${token}`));

// 스크립트 없이 읽어도 실제 수치와 핵심 사실이 보이고, 글자를 숨기지 않는다.
global.window = {};
require("../assets/portfolio-data.js");
const seedBrief = d.buildProfileBrief(window.PORTFOLIO_SEED);
const generated = (html, name) => html.match(new RegExp(`<!-- static:${name} -->([\\s\\S]*?)<!-- /static:${name} -->`))[1];
for (const file of ["index.html", "summary.html"]) {
  const page = read(file);
  const text = textOf(generated(page, "brief"));
  [seedBrief.name, "특허출원 접수", "최우수상", "프로그램 저작권 등록", `공개 프로젝트 ${seedBrief.stats.projects}개`].forEach((token) => assert.ok(text.includes(token), `${file} 정적 요약에 없음: ${token}`));
  assert.ok(!/display\s*:\s*none|visibility\s*:\s*hidden|\shidden[\s>]|font-size\s*:\s*0|aria-hidden/.test(generated(page, "brief")), `${file} 정적 요약에 숨긴 글자가 있음`);
  const ld = JSON.parse(generated(page, "json-ld").replace(/<\/?script[^>]*>/g, ""));
  assert.strictEqual(ld["@type"], "Person");
  assert.strictEqual(ld.name, seedBrief.name);
}
const index = read("index.html");
assert.strictEqual(generated(index, "stat-projects"), String(seedBrief.stats.projects));
assert.ok(seedBrief.stats.projects > 0);
assert.ok(!/<a [^>]*data-resume-link href="#"/.test(index), "대표 PDF 링크가 비어 있음");
seedBrief.others.forEach((p) => assert.ok(generated(index, "projects").includes(d.escapeHtml(p.title)), `정적 프로젝트 목록에 없음: ${p.title}`));

console.log("static brief tests passed");
