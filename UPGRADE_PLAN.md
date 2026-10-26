# sungjae-portfolio 100점 플랜 (R5, 감사: APP_QUALITY_AUDIT_2026-06-11)

52점 → 목표 100. 정적 포트폴리오 + 로컬 Studio(관리 패널). 배포본이므로 동작 보존 최우선.

| 항목 | 작업 | 상태 |
|---|---|---|
| A1~A3 | `assets/portfolio-domain.js`(UMD 순수) 신설 — 정규화·공개/검색 필터·정렬·YouTube URL 해석·텍스트/이스케이프 규칙 18개 export. app.js는 DOM 어댑터화 | ✅ |
| B1 | app.js 1320 → 1136줄 (도메인 184줄 분리) | ✅ |
| C1/C3 | 도메인 테스트 + fitness(`node tests/run-all.js`) | ✅ |
| 버그 수정 | YouTube `/shorts/`·`/embed/` URL에서 ID 대신 경로 세그먼트("shorts")를 추출하던 원본 버그 — 도메인 테스트가 발견, 수정 | ✅ |
| D | ARCHITECTURE/DDD/TROUBLESHOOTING + README 갱신 | ✅ |
| E | .gitignore 신설 | ✅ |

잔여: 렌더 함수군(createProjectCard 등)은 프레젠테이션 — 분리 불필요(KISS). Studio 흐름 브라우저 스모크는 수동.
