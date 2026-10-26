# 문제 해결 — sungjae-portfolio

| 증상 | 해결 |
|---|---|
| 페이지가 비어 보임 | 콘솔에서 `PortfolioDomain is not defined` 확인 → index.html에서 portfolio-domain.js가 app.js보다 먼저(defer 순서) 로드되는지 확인 |
| Studio 버튼이 안 보임 | 로컬호스트가 아니면 `?studio=1` 쿼리 필요 |
| 수정했는데 새로고침하면 사라짐 | localStorage 저장은 브라우저별. 영구 반영은 Studio→Export 후 portfolio-data.js 갱신 |
| YouTube 미리보기가 안 뜸 | URL 형태 확인 (watch/youtu.be/shorts/embed 지원, t= 보존). 테스트: `node tests/run-all.js` |
| 데이터 초기화 | Studio의 Reset(시드 복원) 또는 localStorage에서 `sungjae-portfolio-v12` 삭제 |
| GitHub Pages 배포 후 깨짐 | 캐시 — script 태그의 `?v=` 버전 쿼리 갱신 확인 |
