const assert = require("assert");
const d = require("../assets/portfolio-domain.js");
global.window = {};
require("../assets/portfolio-data.js");
const seed = d.validateImport(window.PORTFOLIO_SEED);

// Old backups gain new optional fields without losing their case descriptions.
const old = { profile: { name: "성재" }, projects: [{ id: "old", title: "과거 기록", problem: "원래 문제", challenges: [{ problem: "오류", solution: "수정" }], links: [{ label: "코드", url: "https://example.com" }] }] };
const migrated = d.validateImport(old);
assert.strictEqual(migrated.projects[0].problem, "원래 문제");
assert.deepStrictEqual(migrated.projects[0].challenges, [{ label: "오류", value: "수정" }]);
assert.deepStrictEqual(migrated.projects[0].mediaNotes, []);
assert.strictEqual(migrated.projects[0].links.length, 1);

// Public export excludes private drafts and machine paths and does not mutate the source.
const input = { profile: {}, projects: [
  { id: "shown", title: "공개", visibility: "public", localPath: "/private/work", period: "2026", mediaNotes: [{ src: "a.png", caption: "화면", capturedAt: "2026-10-25" }] },
  { id: "secret", title: "초안", visibility: "hidden" }
] };
const exported = d.publicData(input);
assert.deepStrictEqual(exported.projects.map((p) => p.id), ["shown"]);
assert.ok(!("localPath" in exported.projects[0]));
assert.strictEqual(exported.projects[0].mediaNotes[0].capturedAt, "2026-10-25");
assert.strictEqual(input.projects.length, 2);
assert.strictEqual(input.projects[0].localPath, "/private/work");
// Scanned award PDF links survive editing/import and public export.
const awardBackup = { profile: {}, projects: [{ id: "award", title: "수상 사례", awards: [{ title: "최우수상", certificate: "./scan.jpg", certificatePdf: "./scan.pdf" }] }] };
const awardRoundTrip = d.validateImport(JSON.parse(JSON.stringify(d.publicData(awardBackup))));
assert.strictEqual(awardRoundTrip.projects[0].awards[0].certificatePdf, "./scan.pdf");
assert.throws(() => d.validateImport({ unrelated: true }));
assert.throws(() => d.validateImport({ profile: { awards: "invalid" }, projects: [] }));
assert.throws(() => d.validateImport({ profile: {}, projects: [{ id: "case", title: "A", links: [null] }] }));
assert.throws(() => d.validateImport({ profile: {}, projects: [{ id: "same", title: "A" }, { id: "same", title: "B" }] }));
assert.throws(() => d.validateImport({ profile: {}, projects: [{ id: '\" onclick=\"bad', title: "A" }] }));
assert.deepStrictEqual(d.parsePairLines(d.pairLines([{ label: "원인", value: "분석 | 추가 정보" }])), [{ label: "원인", value: "분석 | 추가 정보" }]);

console.log("content management tests passed");
