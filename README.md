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

The user reported awards on 2026-10-26, superseding older local notes that said there were no awards. Five HEIC originals were found under the job materials' award folder and visually inspected: 2015 BIO Leaders prize, 2016 Busan provincial police commendation, 2021 biomaterials idea prize, 2026 VLA team first prize and a training completion certificate. Jinju public-data and the separate factory-process award certificates remain unlocated. Exact course dates are 2025-11-13 through 2026-05-22 (900 hours). Do not infer an award title or grade from a presentation. In Studio, each award uses `exact title | issuer | date | individual/team | certificate image path`; standalone awards have their own form. Patent records use `title | application number | filing status`. Raw scans stay in the user's materials; the BIO Leaders certificate with a student ID and completion certificate with a birth date are not uploaded to the public site. Patent titles/numbers are supported by the existing personal fact sheet; official receipt originals were not located in this pass. `summary.html?records=1` includes the records page, and `?projects=&records=1` prints only that page.

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
