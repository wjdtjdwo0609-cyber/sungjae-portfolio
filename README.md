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

## YouTube demos

Paste a YouTube URL into a project:

```text
https://www.youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID
https://www.youtube.com/shorts/VIDEO_ID
```

The site uses the YouTube thumbnail as a preview when no image is set, and opens an embedded player when clicked.

## Files

```text
index.html
assets/styles.css
assets/app.js
assets/portfolio-data.js
assets/images/
```

For GitHub Pages, the whole folder can be uploaded as a static site.
