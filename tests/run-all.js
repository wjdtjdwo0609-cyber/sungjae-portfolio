// 전체 테스트 러너: node tests/run-all.js
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const files = fs
  .readdirSync(__dirname)
  .filter((f) => f.endsWith(".test.js"))
  .sort();

let failed = 0;
for (const file of files) {
  try {
    execFileSync(process.execPath, [path.join(__dirname, file)], { stdio: "inherit" });
  } catch {
    failed += 1;
  }
}
if (failed > 0) {
  console.error(`\n${failed}개 테스트 파일 실패`);
  process.exit(1);
}
console.log(`\n전체 ${files.length}개 테스트 파일 통과`);
