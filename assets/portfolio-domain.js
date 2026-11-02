// ==========================================================================
// Portfolio Domain — 순수 규칙 모듈 (DOM/localStorage/window 상태 접근 금지)
// 프로젝트 정규화, 공개/검색 필터, 정렬, YouTube URL 해석(t= 보존), 레이아웃
// 패턴, 텍스트 분해, HTML 이스케이프, 첫 장 요약 규칙을 담는다. (UMD: 브라우저+Node)
// ==========================================================================
(function attachPortfolioDomain(root, factory) {
  const api = factory();
  root.PortfolioDomain = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window, function buildPortfolioDomain() {
  function normalizeData(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("포트폴리오 객체가 필요합니다.");
    const next = {
      version: 2,
      profile: data.profile || {},
      domains: data.domains && data.domains.length ? data.domains : ["All"],
      projects: Array.isArray(data.projects) ? data.projects : []
    };

    next.projects = next.projects.map((project, index) => ({
      id: project.id || slugify(project.title || `project-${index + 1}`),
      title: project.title || "Untitled",
      subtitle: project.subtitle || "",
      domain: project.domain || "Product",
      visibility: project.visibility || "public",
      maturity: project.maturity || "Case study",
      featured: Boolean(project.featured),
      priority: Number.isFinite(Number(project.priority)) ? Number(project.priority) : index + 1,
      tests: Number.isFinite(Number(project.tests)) ? Number(project.tests) : 0,
      image: project.image || "",
      imageFit: project.imageFit || "",
      visual: project.visual || "",
      video: project.video || project.videoUrl || "",
      videoPoster: project.videoPoster || "",
      gallery: Array.isArray(project.gallery) ? project.gallery : splitLines(project.gallery),
      youtubeUrl: project.youtubeUrl || "",
      summary: project.summary || "",
      problem: project.problem || "",
      period: project.period || "",
      collaboration: project.collaboration || "",
      learning: project.learning || "",
      limitations: project.limitations || "",
      nextSteps: project.nextSteps || "",
      mediaNotes: Array.isArray(project.mediaNotes) ? project.mediaNotes : [],
      awards: Array.isArray(project.awards) ? project.awards.filter((item) => item && item.title).map((item) => ({
        title: String(item.title), issuer: String(item.issuer || ""), date: String(item.date || ""), scope: String(item.scope || ""), certificate: String(item.certificate || ""), certificatePdf: String(item.certificatePdf || "")
      })) : [],
      patents: Array.isArray(project.patents) ? project.patents : [],
      copyrights: Array.isArray(project.copyrights) ? project.copyrights : [],
      architecture: Array.isArray(project.architecture) ? project.architecture : splitLines(project.architecture),
      buildSteps: Array.isArray(project.buildSteps) ? project.buildSteps : splitLines(project.buildSteps),
      challenges: normalizeCasePairs(project.challenges),
      evidence: normalizeCasePairs(project.evidence),
      metrics: normalizeCasePairs(project.metrics),
      rolePoints: Array.isArray(project.rolePoints) ? project.rolePoints : splitLines(project.rolePoints),
      scopeNotes: Array.isArray(project.scopeNotes) ? project.scopeNotes : splitLines(project.scopeNotes),
      results: Array.isArray(project.results) ? project.results : splitLines(project.results),
      stack: Array.isArray(project.stack) ? project.stack : splitComma(project.stack),
      links: Array.isArray(project.links) ? project.links : [],
      localPath: project.localPath || ""
    }));

    const domains = new Set(["All", ...next.domains, ...next.projects.map((project) => project.domain)]);
    next.domains = Array.from(domains).filter(Boolean);
    return next;
  }
  function layoutClass(index) {
    const pattern = [
      "layout-hero",
      "layout-side",
      "layout-third",
      "layout-third",
      "layout-third",
      "layout-half",
      "layout-half",
      "layout-third",
      "layout-wide"
    ];
    return pattern[index % pattern.length];
  }
  function projectSort(a, b) {
    return a.priority - b.priority || a.title.localeCompare(b.title);
  }
  function fileNameFromPath(path) {
    return String(path || "portfolio.pdf").split("/").filter(Boolean).pop() || "portfolio.pdf";
  }
  function extractYoutubeId(url) {
    return parseYoutubeSource(url).id;
  }
  function youtubeEmbedUrl(source) {
    const video = parseYoutubeSource(source);
    if (!video.id) return "";
    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      modestbranding: "1"
    });
    if (video.start > 0) params.set("start", String(video.start));
    return `https://www.youtube.com/embed/${video.id}?${params.toString()}`;
  }
  function parseYoutubeSource(source) {
    if (!source) return { id: "", start: 0 };
    try {
      const parsed = new URL(source);
      let id = "";
      if (parsed.hostname.includes("youtu.be")) id = parsed.pathname.split("/").filter(Boolean)[0] || "";
      else if (parsed.pathname.startsWith("/shorts/")) id = parsed.pathname.split("/").filter(Boolean)[1] || "";
      else if (parsed.pathname.startsWith("/embed/")) id = parsed.pathname.split("/").filter(Boolean)[1] || "";
      else id = parsed.searchParams.get("v") || "";

      const start = parseYoutubeTime(parsed.searchParams.get("t") || parsed.searchParams.get("start"));
      return { id, start };
    } catch {
      return { id: String(source || "").trim(), start: 0 };
    }
  }
  function parseYoutubeTime(value) {
    if (!value) return 0;
    const text = String(value).trim().toLowerCase();
    if (/^\d+$/.test(text)) return Number(text);
    const match = text.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
    if (!match) return 0;
    return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
  }
  function youtubeThumb(id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  function splitLines(value) {
    if (!value) return [];
    return String(value)
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  function splitComma(value) {
    if (!value) return [];
    return String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  function normalizeCasePairs(items) {
    if (!items) return [];
    const source = Array.isArray(items) ? items : splitLines(items);
    return source
      .map((item) => {
        if (typeof item === "string") {
          return { label: item, value: "" };
        }
        return {
          label: item.label || item.problem || item.title || "",
          value: item.value || item.solution || item.body || ""
        };
      })
      .filter((item) => item.label || item.value);
  }
  function parsePairLines(value) {
    return splitLines(value).map((line) => {
      const [label, ...rest] = line.split(" | ");
      return { label: label.trim(), value: rest.join(" | ").trim() };
    });
  }
  function pairLines(items) {
    return normalizeCasePairs(items).map((item) => `${item.label} | ${item.value}`).join("\n");
  }
  function publicData(data) {
    const copy = JSON.parse(JSON.stringify(normalizeData(data)));
    copy.projects = publicProjects(copy.projects).map(({ localPath, ...project }) => project);
    return copy;
  }
  function validateImport(data) {
    if (!data || !Array.isArray(data.projects) || !data.profile || typeof data.profile !== "object" || Array.isArray(data.profile)) {
      throw new Error("profile과 projects가 있는 포트폴리오 JSON을 선택하세요.");
    }
    if (data.projects.some((p) => !p || typeof p !== "object" || typeof p.title !== "string")) {
      throw new Error("프로젝트의 이름과 데이터 형식을 확인하세요.");
    }
    const recordLists = [data.profile.awards, ...data.projects.flatMap((p) => [p.links, p.mediaNotes, p.awards, p.patents, p.copyrights])];
    if (recordLists.some((items) => items != null && (!Array.isArray(items) || items.some((item) => !item || typeof item !== "object" || Array.isArray(item))))) {
      throw new Error("링크·이미지 설명·수상·출원·저작권 기록의 배열 형식을 확인하세요.");
    }
    const ids = data.projects.map((p) => p.id || slugify(p.title));
    if (ids.some((id) => typeof id !== "string" || !/^[a-zA-Z0-9가-힣_-]+$/.test(id)) || new Set(ids).size !== ids.length) throw new Error("프로젝트 ID는 중복 없이 영문·숫자·한글·밑줄·하이픈으로 입력하세요.");
    return normalizeData(data);
  }
  function flattenCasePairs(items) {
    return (Array.isArray(items) ? items : []).flatMap((item) => [item.label, item.value].filter(Boolean));
  }
  function slugify(value) {
    return String(value || "project")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9가-힣]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  function escapeAttribute(value) {
    return escapeHtml(value).replaceAll("`", "&#096;");
  }

  // 공개 프로젝트: visibility === "public", 우선순위→제목 정렬
  function publicProjects(projects) {
    return (projects || []).filter((project) => project.visibility === "public").sort(projectSort);
  }

  // 도메인 탭 + 전문 검색 필터 규칙
  function filterProjects(projects, { filter = "All", search = "" } = {}) {
    const query = String(search || "").toLowerCase();
    return publicProjects(projects).filter((project) => {
      const matchesFilter = filter === "All" || project.domain === filter;
      const haystack = [
        project.title,
        project.subtitle,
        project.summary,
        project.problem,
        project.domain,
        project.maturity,
        ...(project.architecture || []),
        ...(project.buildSteps || []),
        ...flattenCasePairs(project.challenges),
        ...flattenCasePairs(project.evidence),
        ...flattenCasePairs(project.metrics),
        ...(project.rolePoints || []),
        ...(project.scopeNotes || []),
        ...(project.stack || []),
        ...(project.results || [])
      ]
        .join(" ")
        .toLowerCase();
      return matchesFilter && (!query || haystack.includes(query));
    });
  }

  function absoluteUrl(url, base) {
    try {
      return new URL(url, base).href;
    } catch {
      return url;
    }
  }
  function isSafeLink(url) {
    return /^(https?:\/\/|\.\/)/i.test(url || "");
  }

  // 첫 장 요약: 공개 데이터의 사실만 모아 PDF와 정적 HTML이 같은 내용을 쓰게 한다
  function buildProfileBrief(data) {
    const clean = publicData(data);
    const profile = clean.profile;
    const overview = profile.overview || {};
    const projects = clean.projects;
    const toLink = (label, url) => ({ label, url: absoluteUrl(url, profile.website) });
    const detailLink = (id) => toLink("상세", `./#project/${encodeURIComponent(id)}`);
    const highlights = (overview.projects || [])
      .map((entry) => ({ entry, project: projects.find((p) => p.id === entry.id) }))
      .filter((item) => item.project)
      .map(({ entry, project }) => ({
        id: project.id,
        title: project.title,
        role: entry.role || project.rolePoints[0] || project.subtitle,
        context: [project.collaboration, project.period].filter(Boolean).join(" · "),
        summary: project.summary,
        limitation: project.limitations,
        stack: project.stack,
        links: [
          detailLink(project.id),
          ...project.links.filter((l) => isSafeLink(l.url)).map((l) => toLink(l.label || l.url, l.url)),
          ...(isSafeLink(project.youtubeUrl) ? [toLink("시연 영상 (YouTube)", project.youtubeUrl)] : []),
          ...(isSafeLink(project.video) ? [toLink("시연 영상", project.video)] : [])
        ]
      }));
    const highlightIds = new Set(highlights.map((item) => item.id));
    const stackCounts = new Map();
    projects.forEach((p) => p.stack.forEach((s) => stackCounts.set(s, (stackCounts.get(s) || 0) + 1)));
    return {
      name: profile.name || "",
      role: profile.role || "",
      summary: profile.summary || "",
      headline: overview.headline || "",
      updatedAt: profile.updatedAt || "",
      stats: {
        projects: projects.length,
        featured: projects.filter((p) => p.featured).length,
        domains: Array.from(new Set(projects.map((p) => p.domain)))
      },
      highlights,
      education: [
        { label: "학력", title: overview.degree, detail: overview.degreePeriod },
        { label: "AI 교육", title: overview.training, detail: [overview.trainingPeriod, overview.trainingDetail].filter(Boolean).join(" · ") }
      ].filter((item) => item.title),
      awards: projects.flatMap((p) => p.awards).concat(profile.awards || []).sort((a, b) => (b.date || "").localeCompare(a.date || "")),
      patents: projects.flatMap((p) => p.patents),
      copyrights: projects.flatMap((p) => p.copyrights),
      stack: Array.from(stackCounts).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([name]) => name),
      others: projects.filter((p) => !highlightIds.has(p.id)).map((p) => ({ title: p.title, domain: p.domain, link: detailLink(p.id) })),
      documents: [
        ...(isSafeLink(profile.website) ? [toLink("웹 포트폴리오", profile.website)] : []),
        ...(isSafeLink(profile.github) ? [toLink("GitHub", profile.github)] : []),
        ...(isSafeLink(profile.resume) ? [toLink("대표 PDF", profile.resume)] : []),
        ...(profile.pdfs || []).filter((pdf) => isSafeLink(pdf.file)).map((pdf) => toLink(pdf.label || "PDF", pdf.file))
      ]
    };
  }
  function renderProfileBriefHtml(brief, { titleTag = "h1" } = {}) {
    const e = escapeHtml;
    const anchors = (links) => links.map((l) => `<a href="${escapeAttribute(l.url)}">${e(l.label)}</a>`).join(" · ");
    const labeled = (label, value) => (value ? `<p><strong>${e(label)}</strong> ${e(value)}</p>` : "");
    const list = (title, items) => (items.length ? `<section><h3>${e(title)}</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></section>` : "");
    const joined = (...parts) => e(parts.filter(Boolean).join(" · "));
    const otherDomains = Array.from(new Set(brief.others.map((p) => p.domain)));
    return `<p class="eyebrow">Profile Summary · 기준일 ${e(brief.updatedAt)}</p>
<${titleTag} class="brief-name">${e(brief.name)} · ${e(brief.role)}</${titleTag}>
<p class="intro">${e(brief.summary)}</p>
<p class="brief-scope">공개 프로젝트 ${brief.stats.projects}개 · 핵심 도메인 ${brief.stats.domains.length}개(${e(brief.stats.domains.join(", "))})</p>
<section><h3>대표 경험 · 내가 맡은 일</h3>${brief.highlights.map((item) => `<div class="brief-project"><h4>${e(item.title)}</h4>
<p><strong>맡은 일</strong> ${e(item.role)}${item.context ? ` <strong>참여</strong> ${e(item.context)}` : ""}</p>${labeled("요약", item.summary)}${labeled("현재 한계", item.limitation)}${labeled("기술", item.stack.join(", "))}<p>${anchors(item.links)}</p></div>`).join("")}</section>
${list("학력·교육", brief.education.map((item) => `<strong>${e(item.label)}</strong> ${joined(item.title, item.detail)}`))}
${list(`수상·표창 ${brief.awards.length}건`, brief.awards.map((a) => joined(a.title, a.issuer, a.date, a.scope)))}
${list(`지식재산 · 특허출원 접수 ${brief.patents.length}건, 프로그램 저작권 등록 ${brief.copyrights.length}건`, [
  ...brief.patents.map((a) => joined(a.status, a.title, a.number, a.filedAt)),
  ...brief.copyrights.map((a) => joined("컴퓨터프로그램 저작권 등록", a.title, a.number, a.registeredAt))
])}
${brief.stack.length ? `<section><h3>자주 쓴 기술</h3><p>${e(brief.stack.join(", "))}</p></section>` : ""}
${list(`그 외 공개 프로젝트 ${brief.others.length}개`, otherDomains.map((domain) => `<strong>${e(domain)}</strong> ${brief.others.filter((p) => p.domain === domain).map((p) => `<a href="${escapeAttribute(p.link.url)}">${e(p.title)}</a>`).join(", ")}`))}
${brief.documents.length ? `<section><h3>자료</h3><p>${anchors(brief.documents)}</p></section>` : ""}`;
  }

  return {
    buildProfileBrief,
    renderProfileBriefHtml,
    normalizeData,
    layoutClass,
    projectSort,
    fileNameFromPath,
    extractYoutubeId,
    youtubeEmbedUrl,
    parseYoutubeSource,
    parseYoutubeTime,
    youtubeThumb,
    splitLines,
    splitComma,
    normalizeCasePairs,
    parsePairLines,
    pairLines,
    publicData,
    validateImport,
    flattenCasePairs,
    slugify,
    escapeHtml,
    escapeAttribute,
    publicProjects,
    filterProjects
  };
});
