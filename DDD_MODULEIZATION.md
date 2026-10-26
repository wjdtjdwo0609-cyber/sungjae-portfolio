# DDD 모듈화 — sungjae-portfolio

| Context | 책임 | 코드 |
|---|---|---|
| Project Catalog | 프로젝트 정규화(기본값·슬러그·필드 강제), 공개/숨김 정책, 우선순위 정렬, 도메인 탭·전문 검색 필터 | portfolio-domain.js |
| Media Resolution | YouTube URL 4형태 해석(watch/youtu.be/shorts/embed) + t= 타임스탬프 보존, 썸네일 규칙 | portfolio-domain.js |
| Studio (관리) | localStorage CRUD, 가져오기/내보내기, 폼 — 모두 app.js (인프라+UI) | app.js |

도메인 언어: Project, Visibility(public/hidden), Priority, Domain(탭), CasePair(label/value), YoutubeSource(id/start).

## 이력
- 2026-06-12 R5: 도메인 18개 export 추출, app.js 1320→1136줄. 테스트 0→2파일.
  **버그 수정**: shorts/embed URL ID 추출 오류(원본 잠복 버그)를 도메인 테스트로 발견·수정.
