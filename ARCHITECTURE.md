# 아키텍처 — sungjae-portfolio

```
index.html
 ├─ assets/portfolio-data.js     ← Seed 데이터 (window.PORTFOLIO_SEED)
 ├─ assets/portfolio-domain.js   ← Domain (순수): 정규화·필터·정렬·YouTube 해석·이스케이프
 └─ assets/app.js                ← Presentation+Infrastructure: DOM 렌더, localStorage 저장, Studio UI
```

- 의존 방향: app.js → portfolio-domain.js (`window.PortfolioDomain` 구조분해). 역방향 금지 — `tests/architecture.test.js`가 검증.
- 저장: localStorage(`sungjae-portfolio-v12`) — app.js만 접근. 도메인은 데이터 구조만 안다.
- Studio 게이트: 로컬호스트 또는 `?studio=1` (app.js의 isStudioEnabled — window 의존이라 앱 계층 소속).
- 검증: `node tests/run-all.js`
