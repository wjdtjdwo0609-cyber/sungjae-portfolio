// 정적 요약 생성: node tools/build-static.js
// portfolio-data.js로 index.html·summary.html의 <!-- static:이름 --> 구간을 다시 쓴다.
// 스크립트를 실행하지 않고 읽는 사람과 도구도 같은 사실을 보게 하며, 구간은 app.js·summary.js가 대체한다.
const fs = require("fs");
const path = require("path");
const d = require("../assets/portfolio-domain.js");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function loadSeed() {
  const context = { window: {} };
  new Function("window", read("assets/portfolio-data.js"))(context.window);
  return context.window.PORTFOLIO_SEED;
}

function fillBlock(html, name, content) {
  const pattern = new RegExp(`(<!-- static:${name} -->)[\\s\\S]*?(<!-- /static:${name} -->)`);
  if (!pattern.test(html)) throw new Error(`정적 구간이 없습니다: ${name}`);
  return html.replace(pattern, (_, start, end) => `${start}${content}${end}`);
}

function profileJsonLd(brief, data) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: brief.name,
    jobTitle: brief.role,
    description: brief.summary,
    url: data.profile.website,
    sameAs: [data.profile.github].filter(Boolean),
    knowsAbout: brief.stack,
    award: brief.awards.map((a) => [a.title, a.date].filter(Boolean).join(" · "))
  });
  return `<script type="application/ld+json">${json.replace(/</g, "\\u003c")}</script>`;
}

function staticProjects(data, website) {
  return data.projects.map((p) => {
    const url = new URL(`./#project/${encodeURIComponent(p.id)}`, website).href;
    return `<article class="static-project"><h3><a href="${d.escapeAttribute(url)}">${d.escapeHtml(p.title)}</a></h3><p>${d.escapeHtml([p.domain, p.maturity, p.subtitle].filter(Boolean).join(" · "))}</p><p>${d.escapeHtml(p.summary)}</p></article>`;
  }).join("");
}

function build() {
  const seed = loadSeed();
  const data = d.publicData(seed);
  const brief = d.buildProfileBrief(seed);
  const description = `${brief.name} · ${brief.role}. ${brief.summary}`;
  const fill = (html, values) => Object.entries(values).reduce((next, [name, content]) => fillBlock(next, name, content), html);
  const setDescription = (html) => html.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, (_, a, b) => `${a}${d.escapeAttribute(description)}${b}`);
  const index = fill(setDescription(read("index.html")), {
    "json-ld": profileJsonLd(brief, data),
    "summary": d.escapeHtml(brief.summary),
    "updated": d.escapeHtml(brief.updatedAt ? `Updated ${brief.updatedAt}` : ""),
    "stat-projects": String(brief.stats.projects),
    "stat-featured": String(brief.stats.featured),
    "stat-domains": String(brief.stats.domains.length),
    "brief": `<article class="static-brief">${d.renderProfileBriefHtml(brief, { titleTag: "h3" })}</article>`,
    "projects": staticProjects(data, data.profile.website),
    "education": d.escapeHtml(data.profile.education || "")
  }).replace(/(data-resume-link href=")[^"]*(")/, (_, a, b) => `${a}${d.escapeAttribute(data.profile.resume || "#")}${b}`)
    .replace(/(data-github-link href=")[^"]*(")/, (_, a, b) => `${a}${d.escapeAttribute(data.profile.github || "#")}${b}`);
  const summary = fill(setDescription(read("summary.html")), {
    "json-ld": profileJsonLd(brief, data),
    "brief": `<article class="print-case profile-brief">${d.renderProfileBriefHtml(brief)}</article>`
  });
  return { "index.html": index, "summary.html": summary };
}

if (require.main === module) {
  for (const [file, html] of Object.entries(build())) fs.writeFileSync(path.join(root, file), html);
  console.log("index.html, summary.html 정적 요약을 갱신했습니다.");
}

module.exports = { build };
