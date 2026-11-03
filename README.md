# 정성재 portfolio

Apple-style static portfolio for AI, robotics, smart factory, document AI, and automation projects.

## Run locally

```bash
cd /Users/tjdwo0609/Documents/sungjae-portfolio
python3 -m http.server 8123
```

Open:

```text
http://localhost:8123
```

## Manage projects

Click the slider button in the top-right while running locally. On a deployed site, add `?studio=1`
to the URL when you want to open the management panel.

- Add a project
- Edit project text, stack, image, YouTube URL, and link
- Toggle public/hidden
- Delete draft projects
- Export public-only JSON
- Export full backup JSON
- Import JSON backup

Hidden projects stay visible in Studio but do not appear on the public portfolio grid.

## Update and publish (2026-10-26)

- Public pages always read `assets/portfolio-data.js`. Studio edits are browser drafts, not a server update.
- Open Studio locally, or use `?studio=1` on the deployed site. `?view=public` opens the published seed even on localhost.
- Edit problem, period, individual/team scope, role, implementation, challenge/solution, evidence, limitations, next steps, multiple links, image captions and priority.
- Pair fields use one `label | value` per line. Image notes use `image path | caption | capture date | version or operating mode`.
- Images/videos are file paths or URLs. Add the actual files under `assets/images/` or `assets/videos/`; this static editor does not upload media to a server.
- Preserve a full JSON backup before replacing a draft. Invalid imports are rejected. Import/reset/delete ask before replacing data.
- The previous `sungjae-portfolio-v12` browser data is retained. Use **이전 브라우저 자료** to explicitly import it; old drafts never replace a new published release automatically.
- The existing source's full catalogue, including hidden entries, is preserved in `.local/portfolio-full-backup-2026-10-26.json` (ignored by Git). Import it through Studio when needed. The deployed seed contains public projects only.
- Drafts use `sungjae-portfolio-v13`; a notice appears when their base release differs from the published update date.
- **초안 요약 확인** uses this browser's draft. The public summary always uses published data.
- To publish, select **배포용 파일**, replace `assets/portfolio-data.js` with the downloaded JS, add the media files, then deploy the repository. The file excludes hidden projects and `localPath` values. **공개 내보내기** exports JSON for reuse, not a deployable JS file.
- Verify in **공개 화면 확인** and in a fresh browser: project order, direct links, images and summary.
- `#project/<id>` is a stable project link. Preserve existing IDs when changing titles.
- `summary.html` defaults to featured projects. `?projects=id1,id2` selects public cases; the selection can be printed or saved to PDF.

Project periods, team composition and hardware evaluation results should be filled from actual records. Captured screens establish visible features, not sales, model accuracy or customer outcomes.

### Award evidence

The user reported awards on 2026-10-26, superseding older local notes that said there were no awards. Five HEIC originals were found under the job materials' award folder and visually inspected: 2015 BIO Leaders prize, 2016 Busan provincial police commendation, 2021 biomaterials idea prize, 2026 VLA team first prize and a training completion certificate. Jinju public-data and the separate factory-process award certificates remain unlocated. Exact course dates are 2025-11-13 through 2026-05-22 (900 hours). Do not infer an award title or grade from a presentation. In Studio, each award uses `exact title | issuer | date | individual/team | certificate image path`; standalone awards have their own form. Patent records use `title | application number | filing status`. Raw scans stay in the user's materials; the BIO Leaders certificate and the training completion certificate were uploaded on 2026-11-02 only as copies whose student ID and birth date pixels were painted over; on-device text recognition of the JPG, the image inside the PDF and the rendered PDF found neither value. The training certificate keeps its printed certificate number. Its paths live in `profile.overview.trainingCertificate` and `trainingCertificatePdf`. Patent titles/numbers are supported by the existing personal fact sheet; official receipt originals were not located in this pass. `summary.html?records=1` includes the records page, and `?projects=&records=1` prints only that page.

## YouTube demos

Paste a YouTube URL into a project:

```text
https://www.youtube.com/watch?v=VIDEO_ID
https://www.youtube.com/watch?v=VIDEO_ID&t=463s
https://youtu.be/VIDEO_ID
https://www.youtube.com/shorts/VIDEO_ID
```

The site uses the YouTube thumbnail as a preview when no image is set, preserves `t=` / `start=`
timestamps, and opens an embedded player when clicked.

## Files

```text
index.html
assets/styles.css
assets/app.js
assets/portfolio-data.js
assets/images/
```

For GitHub Pages, the whole folder can be uploaded as a static site.

## Structure & tests (2026-06-12 R5)

- Rules live in `assets/portfolio-domain.js` (pure); `assets/app.js` is the DOM/localStorage adapter.
- Run tests: `node tests/run-all.js` (domain + architecture fitness)
- Docs: `ARCHITECTURE.md`, `DDD_MODULEIZATION.md`, `TROUBLESHOOTING.md`, `UPGRADE_PLAN.md`

### Patent filing evidence found (2026-10-26)

An original 2026-05-31 screenshot of the Patent-ro filing list was located and copied unchanged. It shows 10-2026-0061383 received 2026-04-04 and 10-2026-0061403 received 2026-04-05, both with 접수완료 at that time. This proves the recorded receipt state in that screenshot, not current examination or registration status. Project records and summaries link to the image. Individual receipt PDFs and specification originals remain unlocated. Deploy exports assign a revision timestamp so same-day published changes can be distinguished from browser drafts.

### Profile overview and card layout (2026-10-26)

`#overview` appears after the hero and before the project catalogue. It combines degree/training, three project highlights with actual individual/team roles, verified awards and patent filings. Award and patent lists reuse public project/profile records. Degree details come from the existing personal fact sheet; training dates/hours come from the inspected completion certificate. Do not turn education or team project activity into employment history.

Studio's **약력 관리** edits `profile.overview`; project highlights remain in its `projects` list in JSON. The new hero shortcut and Profile navigation open the overview; its project links open the existing project details. Editing the training summary also updates the education field used by the printable records page.

Project bodies use a vertical flex layout with the action row at the bottom. Footer actions share available width, are centered, and keep the same 20px body padding on both sides and below. This was checked at 320, 390, 768 and 1440px.

### Media and PDF refresh (2026-11-02)

The JangsaOS demo in `assets/videos/` is a real guest run on the public service: 서울 성동구 성수동1가, 카페/디저트. It replaces the 2026-02-10 clip, which reached a 404 after sign-in. The wait is sped up about 9x and labeled in the video; the recording stops before the footer, which shows business contact details. That run collected 6 of 7 data items (no competitor search result), as stated in the project evidence.

DocScope images were captured from a local run on a copied demo folder, so the original workspace was not changed. The earlier blank-canvas captures were removed.

`assets/docs/sungjae-portfolio.pdf`, `sungjae-records.pdf` and `sungjae-third-hand-vla.pdf` are printed from `summary.html`, `summary.html?projects=&records=1` and `summary.html?projects=robot-vla-pipeline`. Print them again when those pages change. Company-specific PDFs do not belong in this public folder; keep them in the job application folder.

### Readable first page (2026-11-02)

`assets/docs/sungjae-portfolio.pdf` now opens with a one-page profile summary built by `buildProfileBrief` in `assets/portfolio-domain.js`. It uses only public data, keeps each representative project's limitations, separates team awards from individual commendations, and states patents as filings. In print, case sections use one column so text extractors read each heading before its body. `summary.html` shows the summary by default and leaves it out when `?projects=` is set, unless `brief=1` is added.

`index.html` and `summary.html` also carry the same facts as static text for readers that do not run JavaScript. Blocks marked `<!-- static:name -->` are generated, and `app.js` or `summary.js` replaces the visible ones when they run. After replacing `assets/portfolio-data.js`, run `node tools/build-static.js`, reprint the PDFs and run `node tests/run-all.js`, which fails if the generated blocks no longer match the data. No text is hidden for AI readers.

### 공개자료와 완료 결과 시연 (2026-11-03)

- 사용자·팀 공개 승인된 `assets/docs/sungjae-third-hand-vla-presentation.pdf`(29쪽, 영상 제외)를 기존 코드 링크와 함께 연결했습니다. 이 링크를 포함하도록 대표 포트폴리오(3쪽)와 제3의 손 요약(1쪽) PDF를 재인쇄하고 본문·링크·페이지 잘림을 확인했습니다. 변경 없는 기록 PDF는 유지합니다.
- NotebookLM 영상은 이전 세션의 2026-11-03 02:47 실수집 결과를 재열람한 24초 실제 화면 캡처 편집본이며, 7초 미리보기와 포스터를 연결했습니다. 신규 수집·전체 과정 실시간 녹화가 아니고 이번 재열람에서 신규 노트북 생성·채팅·Deep Research는 하지 않았습니다.
- 감독자 전달 검증: 수집기 `npm test` 36개 및 syntax 검사 통과, 저장 HTTP URL 27개/중복 0개, 서체 가독성 디자인 카드 29개 중 오류 7개/선택 가능 22개. URL 수는 본문 수집 성공 수가 아니며 실패 소스 일괄삭제는 미지원입니다.
- 포트폴리오 회귀 검사는 연결 경로·파일 헤더·한계 문구·공개 데이터의 로컬 경로 누출을 확인합니다. 영상 전체 재생·PDF 29쪽 내용 검수 및 최종 배포 검수는 감독자 담당이며, 헤더 검사만으로 이를 검증했다고 간주하지 않습니다.
- Relay가 데이터·캐시·회귀 테스트를 반영하고 정적 생성 및 전체 6개 테스트 파일을 실행했습니다. 감독자는 원본 16개 중 공개 15개라는 테스트 기대값을 바로잡고 Grovebound YouTube ID 보존 검사를 추가했습니다. CUA로 NotebookLM 24초 완주, 모바일 390px 재생, Telegram 영상 및 Grovebound YouTube(1분 16초) 재생을 확인했습니다. GUI 촬영·PDF 재인쇄·최종 검수는 Relay 자체의 컴퓨터 제어 기능이 아닙니다.

### Hover and embedded-browser gallery fixes (2026-11-03)

- The three hero previews and all ten video project cards now use `assets/media-preview.js`. Hover anywhere on a card or focus it with the keyboard for a muted preview; leaving restores the poster. Only one preview plays, and opening a dialog, leaving the viewport or hiding the page stops previews. Touch-only and reduced-motion environments retain explicit video buttons.
- Photos remain photos for the five projects without a demo video. No synthetic demo or additional YouTube upload was created.
- Detail gallery images load eagerly while the dialog is open, with visible loading/error/retry states. The gallery track has an explicit containing box for embedded WebKit layout. Thumbnail navigation scrolls only the track; the redundant Demo overlay no longer covers thumbnails. Opening a project resets the actual `.detail-panel` scroller.
- CUA verification: desktop hero previews 3/3 and card previews 10/10 played muted and stopped; 15 project galleries / 65 slides loaded and could be selected. The 390px view had no horizontal page overflow. All 68 referenced image files decoded and their public responses matched local bytes. The user's widespread broken-image report was not reproduced as failed image downloads; the confirmed overlay/navigation issues were fixed without claiming the browser itself was faulty.
- `node tests/run-all.js` includes preview lifecycle/race tests and gallery integration tests. This targeted follow-up was coded and browser-tested by the supervising Codex session; it is not a claim of Relay computer-control support. PDF content is unchanged and was not reprinted.
