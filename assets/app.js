(function () {
  const STORAGE_KEY = "sungjae-portfolio-v9";

  const seed = window.PORTFOLIO_SEED || { profile: {}, domains: ["All"], projects: [] };
  const studioEnabled = isStudioEnabled();
  const state = {
    data: loadData(),
    filter: "All",
    search: "",
    editingId: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const els = {
    header: $("[data-header]"),
    profileSummary: $("[data-profile-summary]"),
    lastUpdated: $("[data-last-updated]"),
    statProjects: $("[data-stat-projects]"),
    statTests: $("[data-stat-tests]"),
    statDomains: $("[data-stat-domains]"),
    filterBar: $("[data-filter-bar]"),
    searchInput: $("[data-search-input]"),
    projectGrid: $("[data-project-grid]"),
    stackGrid: $("[data-stack-grid]"),
    resumeLink: $("[data-resume-link]"),
    githubLink: $("[data-github-link]"),
    pdfLinks: $("[data-pdf-links]"),
    studio: $("[data-studio]"),
    scrim: $("[data-scrim]"),
    studioList: $("[data-studio-list]"),
    projectDialog: $("[data-project-dialog]"),
    projectForm: $("[data-project-form]"),
    dialogTitle: $("[data-dialog-title]"),
    detailDialog: $("[data-detail-dialog]"),
    detailDomain: $("[data-detail-domain]"),
    detailTitle: $("[data-detail-title]"),
    detailContent: $("[data-detail-content]"),
    videoDialog: $("[data-video-dialog]"),
    videoIframe: $("[data-video-iframe]"),
    videoPlayer: $("[data-video-player]"),
    imageDialog: $("[data-image-dialog]"),
    imageViewer: $("[data-image-viewer]"),
    imageCaption: $("[data-image-caption]"),
    toast: $("[data-toast]")
  };

  init();

  function init() {
    document.body.classList.toggle("studio-disabled", !studioEnabled);
    render();
    bindEvents();
    refreshIcons();
  }

  function loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return normalizeData(JSON.parse(saved));
    } catch (error) {
      console.warn("Portfolio data load failed", error);
    }
    return normalizeData(clone(seed));
  }

  function normalizeData(data) {
    const next = {
      version: data.version || 1,
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
      video: project.video || project.videoUrl || "",
      videoPoster: project.videoPoster || "",
      gallery: Array.isArray(project.gallery) ? project.gallery : splitLines(project.gallery),
      youtubeUrl: project.youtubeUrl || "",
      summary: project.summary || "",
      problem: project.problem || "",
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

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  }

  function render() {
    renderProfile();
    renderFilters();
    renderProjects();
    renderStacks();
    renderStudio();
    refreshIcons();
  }

  function renderProfile() {
    const profile = state.data.profile || {};
    document.title = `${profile.name || "Portfolio"} | ${profile.role || "Portfolio"}`;
    els.profileSummary.textContent = profile.summary || "";
    els.lastUpdated.textContent = profile.updatedAt ? `Updated ${profile.updatedAt}` : "";
    els.resumeLink.href = profile.resume || "#";
    if (profile.resume) {
      els.resumeLink.setAttribute("download", fileNameFromPath(profile.resume));
    }
    els.githubLink.href = profile.github || "#";
    if (!profile.resume || profile.resume === "#") {
      els.resumeLink.setAttribute("aria-disabled", "true");
      els.resumeLink.onclick = preventEmptyLink;
    } else {
      els.resumeLink.removeAttribute("aria-disabled");
      els.resumeLink.onclick = null;
    }
    if (!profile.github || profile.github === "#") {
      els.githubLink.setAttribute("aria-disabled", "true");
      els.githubLink.onclick = preventEmptyLink;
    } else {
      els.githubLink.removeAttribute("aria-disabled");
      els.githubLink.onclick = null;
    }

    const publicProjects = getPublicProjects();
    els.statProjects.textContent = publicProjects.length.toString();
    els.statTests.textContent = sum(publicProjects.map((project) => project.tests)).toString();
    els.statDomains.textContent = new Set(publicProjects.map((project) => project.domain)).size.toString();
    renderPdfLinks(profile.pdfs || []);
  }

  function renderPdfLinks(pdfs) {
    els.pdfLinks.innerHTML = "";
    pdfs.forEach((pdf) => {
      if (!pdf.file) return;
      const link = document.createElement("a");
      link.className = "pdf-chip";
      link.href = pdf.file;
      link.download = fileNameFromPath(pdf.file);
      link.innerHTML = `<i data-lucide="download"></i>${escapeHtml(pdf.label || "PDF")}`;
      els.pdfLinks.append(link);
    });
  }

  function renderFilters() {
    els.filterBar.innerHTML = "";
    const publicDomains = new Set(getPublicProjects().map((project) => project.domain));
    const domains = state.data.domains.filter((domain) => domain === "All" || publicDomains.has(domain));

    domains.forEach((domain) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `segment${state.filter === domain ? " is-active" : ""}`;
      button.textContent = domain;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", state.filter === domain ? "true" : "false");
      button.addEventListener("click", () => {
        state.filter = domain;
        renderProjects();
        renderFilters();
      });
      els.filterBar.append(button);
    });
  }

  function renderProjects() {
    const projects = getFilteredProjects();
    els.projectGrid.innerHTML = "";

    if (!projects.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "조건에 맞는 공개 프로젝트가 없습니다.";
      els.projectGrid.append(empty);
      return;
    }

    projects.forEach((project, index) => {
      els.projectGrid.append(createProjectCard(project, index));
    });
  }

  function createProjectCard(project, index) {
    const card = document.createElement("article");
    card.className = `project-card ${layoutClass(index)}${project.featured ? " featured" : ""}`;
    if (project.image && project.image.includes("pickline-preview")) {
      card.dataset.imageFit = "contain";
    }

    const youtubeId = extractYoutubeId(project.youtubeUrl);
    const localVideo = project.video || "";
    const image = project.videoPoster || project.image || (youtubeId ? youtubeThumb(youtubeId) : "");
    const initials = project.title
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    const media = document.createElement("div");
    media.className = "project-media";
    if (localVideo) {
      const video = document.createElement("video");
      video.src = localVideo;
      video.poster = image || "";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", `${project.title} video preview`);
      media.addEventListener("mouseenter", () => video.play().catch(() => {}));
      media.addEventListener("mouseleave", () => video.pause());
      media.append(video);
    } else if (image) {
      const img = document.createElement("img");
      img.src = image;
      img.alt = `${project.title} preview`;
      img.loading = "lazy";
      media.append(img);
    } else {
      const fallback = document.createElement("div");
      fallback.className = "media-fallback";
      fallback.innerHTML = `<span class="fallback-mark">${escapeHtml(initials || "P")}</span>`;
      media.append(fallback);
    }

    if (localVideo || youtubeId) {
      const play = document.createElement("button");
      play.type = "button";
      play.className = "media-play";
      play.innerHTML = `<i data-lucide="play"></i><span>Demo</span>`;
      play.addEventListener("click", () =>
        localVideo ? openVideo(localVideo, "local") : openVideo(project.youtubeUrl, "youtube")
      );
      media.append(play);
    }

    const body = document.createElement("div");
    body.className = "project-body";

    body.append(htmlToElement(`
      <div class="project-kicker">
        <span>${escapeHtml(project.domain)}</span>
        <span class="status-dot" data-maturity="${escapeHtml(project.maturity)}">${escapeHtml(project.maturity)}</span>
      </div>
    `));

    body.append(htmlToElement(`
      <div class="project-title-group">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.subtitle)}</p>
      </div>
    `));

    const summary = document.createElement("p");
    summary.className = "project-summary";
    summary.textContent = project.summary;
    body.append(summary);

    const results = document.createElement("ul");
    results.className = "result-list";
    project.results.slice(0, 3).forEach((result) => {
      const li = document.createElement("li");
      li.textContent = result;
      results.append(li);
    });
    body.append(results);

    const chips = document.createElement("div");
    chips.className = "chip-row";
    if (project.tests > 0) {
      const tests = document.createElement("span");
      tests.className = "meta-pill";
      tests.innerHTML = `<i data-lucide="check-circle-2"></i>${project.tests} tests`;
      chips.append(tests);
    }
    project.stack.slice(0, 6).forEach((tech) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = tech;
      chips.append(chip);
    });
    body.append(chips);

    const links = document.createElement("div");
    links.className = "project-links";
    const detailButton = document.createElement("button");
    detailButton.type = "button";
    detailButton.className = "project-link project-link-primary";
    detailButton.innerHTML = `<i data-lucide="panel-top-open"></i>상세 보기`;
    detailButton.addEventListener("click", () => openProjectDetail(project.id));
    links.append(detailButton);

    project.links.forEach((link) => {
      if (!link.url) return;
      const anchor = document.createElement("a");
      anchor.className = "project-link";
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.innerHTML = `<i data-lucide="${link.icon || "external-link"}"></i>${escapeHtml(link.label || "Link")}`;
      links.append(anchor);
    });
    if (localVideo || youtubeId) {
      const videoLink = document.createElement("button");
      videoLink.type = "button";
      videoLink.className = "project-link";
      videoLink.innerHTML = `<i data-lucide="play-circle"></i>영상 보기`;
      videoLink.addEventListener("click", () =>
        localVideo ? openVideo(localVideo, "local") : openVideo(project.youtubeUrl, "youtube")
      );
      links.append(videoLink);
    }
    if (project.localPath && studioEnabled) {
      const copyPath = document.createElement("button");
      copyPath.type = "button";
      copyPath.className = "project-link";
      copyPath.innerHTML = `<i data-lucide="copy"></i>경로 복사`;
      copyPath.addEventListener("click", () => copyToClipboard(project.localPath, "로컬 경로를 복사했습니다."));
      links.append(copyPath);
    }
    body.append(links);

    card.append(media, body);
    return card;
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

  function renderStacks() {
    const publicProjects = getPublicProjects();
    const groups = [
      {
        title: "Robotics / Factory",
        tags: ["ROS2", "Three.js", "OPC UA", "PLC", "Indy7", "Gazebo"],
        body: "로봇 시뮬레이션, PLC 신호, 디지털 트윈, 품질 데이터를 연결해 현장 흐름을 설명 가능한 시스템으로 만듭니다."
      },
      {
        title: "AI Agent",
        tags: ["FastAPI", "WebSocket", "Ollama", "MLX", "Multi-agent"],
        body: "로컬 모델과 역할형 에이전트를 세션, 워크스페이스, 실행 로그로 묶어 실제 작업 도구로 구성합니다."
      },
      {
        title: "Document AI",
        tags: ["RAG", "Knowledge Graph", "OCR", "Tauri", "Mermaid"],
        body: "비정형 문서를 구조화하고 그래프, 검색 인덱스, 메모 가능한 캔버스로 바꾸는 흐름에 집중합니다."
      },
      {
        title: "Product Engineering",
        tags: ["React", "Vite", "SQLite", "Playwright", "Vitest"],
        body: "계산, 자동화, 운영 화면을 제품 형태로 닫고 테스트와 실행 증거를 함께 남기는 쪽을 선호합니다."
      }
    ];

    const usedTags = new Set(publicProjects.flatMap((project) => project.stack));
    els.stackGrid.innerHTML = "";
    groups.forEach((group) => {
      const card = document.createElement("article");
      card.className = "stack-card";
      const tags = group.tags
        .map((tag) => `<span class="chip${usedTags.has(tag) ? " is-used" : ""}">${escapeHtml(tag)}</span>`)
        .join("");
      card.innerHTML = `
        <h3>${escapeHtml(group.title)}</h3>
        <p>${escapeHtml(group.body)}</p>
        <div class="chip-row" style="margin-top: 16px">${tags}</div>
      `;
      els.stackGrid.append(card);
    });
  }

  function renderStudio() {
    if (!studioEnabled) {
      els.studioList.innerHTML = "";
      return;
    }
    els.studioList.innerHTML = "";
    const projects = [...state.data.projects].sort(projectSort);
    projects.forEach((project) => {
      const item = document.createElement("div");
      item.className = "studio-item";
      item.innerHTML = `
        <div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.domain)} · ${escapeHtml(project.maturity)} · ${
            project.visibility === "public" ? "공개" : "숨김"
          }</p>
        </div>
        <div class="studio-item-actions">
          <button class="ghost-button icon-button" type="button" data-toggle-visibility="${project.id}" aria-label="공개 상태 전환">
            <i data-lucide="${project.visibility === "public" ? "eye" : "eye-off"}"></i>
          </button>
          <button class="ghost-button icon-button" type="button" data-edit-project="${project.id}" aria-label="편집">
            <i data-lucide="pencil"></i>
          </button>
        </div>
      `;
      els.studioList.append(item);
    });
  }

  function bindEvents() {
    window.addEventListener("scroll", () => {
      els.header.classList.toggle("is-scrolled", window.scrollY > 8);
    });

    els.searchInput.addEventListener("input", (event) => {
      state.search = event.target.value.trim().toLowerCase();
      renderProjects();
      refreshIcons();
    });

    $$("[data-hero-video-url]").forEach((button) => {
      button.addEventListener("click", () => openVideo(button.dataset.heroVideoUrl, "youtube"));
    });

    if (studioEnabled) {
      $("[data-studio-toggle]").addEventListener("click", openStudio);
      $("[data-studio-close]").addEventListener("click", closeStudio);
      els.scrim.addEventListener("click", closeStudio);

      $("[data-new-project]").addEventListener("click", () => openProjectDialog(createBlankProject()));
      $("[data-export-public]").addEventListener("click", () => exportData(false));
      $("[data-export-all]").addEventListener("click", () => exportData(true));
      $("[data-reset-seed]").addEventListener("click", resetSeed);
      $("[data-import-input]").addEventListener("change", importData);

      els.studioList.addEventListener("click", (event) => {
        const editButton = event.target.closest("[data-edit-project]");
        const toggleButton = event.target.closest("[data-toggle-visibility]");
        if (editButton) {
          const project = findProject(editButton.dataset.editProject);
          if (project) openProjectDialog(project);
        }
        if (toggleButton) {
          toggleVisibility(toggleButton.dataset.toggleVisibility);
        }
      });

      els.projectForm.addEventListener("submit", saveProjectFromForm);
      $("[data-dialog-close]").addEventListener("click", closeProjectDialog);
      $("[data-dialog-cancel]").addEventListener("click", closeProjectDialog);
      $("[data-delete-project]").addEventListener("click", deleteCurrentProject);
    }

    $("[data-detail-close]").addEventListener("click", closeProjectDetail);
    els.detailDialog.addEventListener("close", () => {
      els.detailContent.innerHTML = "";
    });
    els.detailContent.addEventListener("click", (event) => {
      const videoButton = event.target.closest("[data-detail-video]");
      const localVideoButton = event.target.closest("[data-detail-local-video]");
      const copyButton = event.target.closest("[data-detail-copy]");
      const imageButton = event.target.closest("[data-open-image]");
      const galleryStep = event.target.closest("[data-gallery-step]");
      const galleryJump = event.target.closest("[data-gallery-jump]");
      if (videoButton) openVideo(videoButton.dataset.detailVideo, "youtube");
      if (localVideoButton) openVideo(localVideoButton.dataset.detailLocalVideo, "local");
      if (copyButton) copyToClipboard(copyButton.dataset.detailCopy || "", "로컬 경로를 복사했습니다.");
      if (galleryStep) moveGallery(galleryStep, Number(galleryStep.dataset.galleryStep || 1));
      if (galleryJump) jumpGallery(galleryJump, Number(galleryJump.dataset.galleryJump || 0));
      if (imageButton) openImage(imageButton.dataset.openImage, imageButton.dataset.imageCaption || "");
    });

    $("[data-video-close]").addEventListener("click", closeVideo);
    els.videoDialog.addEventListener("close", () => {
      els.videoIframe.removeAttribute("src");
      els.videoIframe.hidden = false;
      els.videoPlayer.pause();
      els.videoPlayer.removeAttribute("src");
      els.videoPlayer.hidden = true;
    });

    $("[data-image-close]").addEventListener("click", closeImage);
    els.imageDialog.addEventListener("close", () => {
      els.imageViewer.removeAttribute("src");
      els.imageViewer.alt = "";
      els.imageCaption.textContent = "";
    });
  }

  function openStudio() {
    els.studio.classList.add("is-open");
    els.studio.setAttribute("aria-hidden", "false");
    els.scrim.hidden = false;
    document.body.classList.add("studio-open");
  }

  function closeStudio() {
    els.studio.classList.remove("is-open");
    els.studio.setAttribute("aria-hidden", "true");
    els.scrim.hidden = true;
    document.body.classList.remove("studio-open");
  }

  function openProjectDialog(project) {
    state.editingId = project.id;
    els.dialogTitle.textContent = findProject(project.id) ? "프로젝트 편집" : "프로젝트 추가";
    fillDomainOptions();

    const form = els.projectForm;
    form.elements.id.value = project.id;
    form.elements.title.value = project.title || "";
    form.elements.domain.value = project.domain || "Product";
    form.elements.visibility.value = project.visibility || "public";
    form.elements.maturity.value = project.maturity || "Case study";
    form.elements.subtitle.value = project.subtitle || "";
    form.elements.summary.value = project.summary || "";
    form.elements.rolePoints.value = (project.rolePoints || []).join("\n");
    form.elements.scopeNotes.value = (project.scopeNotes || []).join("\n");
    form.elements.results.value = (project.results || []).join("\n");
    form.elements.tests.value = project.tests || 0;
    form.elements.featured.value = project.featured ? "true" : "false";
    form.elements.stack.value = (project.stack || []).join(", ");
    form.elements.youtubeUrl.value = project.youtubeUrl || "";
    form.elements.video.value = project.video || "";
    form.elements.videoPoster.value = project.videoPoster || "";
    form.elements.image.value = project.image || "";
    form.elements.gallery.value = (project.gallery || []).join("\n");
    form.elements.repo.value = firstRepo(project);
    form.elements.localPath.value = project.localPath || "";

    els.projectDialog.showModal();
    refreshIcons();
  }

  function closeProjectDialog() {
    els.projectDialog.close();
  }

  function openProjectDetail(id) {
    const project = findProject(id);
    if (!project) return;

    const youtubeId = extractYoutubeId(project.youtubeUrl);
    const localVideo = project.video || "";
    const links = (project.links || []).filter((link) => link.url);
    els.detailDomain.textContent = `${project.domain} · ${project.maturity}`;
    els.detailTitle.textContent = project.title;
    els.detailContent.innerHTML = `
      <div class="detail-hero">
        ${renderDetailGallery(project, youtubeId, localVideo)}
        <div class="detail-brief">
          <p class="detail-label">Case Summary</p>
          <p class="detail-subtitle">${escapeHtml(project.subtitle || "")}</p>
          <p class="detail-summary">${escapeHtml(project.summary || "")}</p>
          <div class="detail-meta">
            ${project.tests > 0 ? `<span class="meta-pill"><i data-lucide="check-circle-2"></i>${project.tests} tests</span>` : ""}
            <span class="meta-pill"><i data-lucide="layers-3"></i>${escapeHtml(project.domain)}</span>
            <span class="meta-pill"><i data-lucide="signal"></i>${escapeHtml(project.maturity)}</span>
          </div>
          ${renderDetailActions(project, links, youtubeId, localVideo)}
        </div>
      </div>
      ${renderMetricStrip(project.metrics)}
      ${renderProblemSection(project.problem)}
      ${renderArchitectureFlow(project.architecture)}
      <div class="detail-grid case-study-grid">
        ${renderDetailListSection("구현 방식", project.buildSteps)}
        ${renderChallengeSection(project.challenges)}
        ${renderEvidenceSection(project.evidence)}
      </div>
      <div class="detail-grid">
        ${renderDetailListSection("나의 역할", project.rolePoints)}
        ${renderDetailListSection("구현 범위", project.scopeNotes)}
        ${renderDetailListSection("검증 포인트", project.results)}
        <div class="detail-section">
          <h3>기술 스택</h3>
          <div class="chip-row">
            ${(project.stack || []).map((tech) => `<span class="chip">${escapeHtml(tech)}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
    els.detailDialog.showModal();
    refreshIcons();
  }

  function closeProjectDetail() {
    els.detailDialog.close();
  }

  function renderDetailActions(project, links, youtubeId, localVideo) {
    return `
      <div class="detail-actions">
        ${links
          .map(
            (link) => `
              <a class="primary-button compact" href="${escapeAttribute(link.url)}" target="_blank" rel="noreferrer">
                <i data-lucide="${escapeAttribute(link.icon || "external-link")}"></i>${escapeHtml(link.label || "Link")}
              </a>
            `
          )
          .join("")}
        ${
          localVideo
            ? `<button class="secondary-button compact" type="button" data-detail-local-video="${escapeAttribute(localVideo)}"><i data-lucide="play-circle"></i>영상 재생</button>`
            : ""
        }
        ${
          youtubeId
            ? `<button class="secondary-button compact" type="button" data-detail-video="${escapeAttribute(project.youtubeUrl)}"><i data-lucide="play-circle"></i>영상 재생</button>`
            : ""
        }
        ${
          project.localPath && studioEnabled
            ? `<button class="secondary-button compact" type="button" data-detail-copy="${escapeAttribute(project.localPath)}"><i data-lucide="copy"></i>로컬 경로 복사</button>`
            : ""
        }
      </div>
    `;
  }

  function renderDetailListSection(title, items) {
    const list = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!list.length) return "";
    return `
      <div class="detail-section">
        <h3>${escapeHtml(title)}</h3>
        <ul class="detail-list">
          ${list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  function renderMetricStrip(items) {
    const metrics = Array.isArray(items) ? items.filter((item) => item.label || item.value) : [];
    if (!metrics.length) return "";
    return `
      <div class="case-metrics" aria-label="핵심 증거">
        ${metrics
          .map(
            (item) => `
              <div class="case-metric">
                <strong>${escapeHtml(item.label || "")}</strong>
                <span>${escapeHtml(item.value || "")}</span>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderProblemSection(problem) {
    if (!problem) return "";
    return `
      <div class="detail-section case-problem">
        <h3>문제 정의</h3>
        <p class="detail-paragraph">${escapeHtml(problem)}</p>
      </div>
    `;
  }

  function renderArchitectureFlow(items) {
    const nodes = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!nodes.length) return "";
    return `
      <div class="detail-section case-flow">
        <h3>시스템 구조</h3>
        <div class="flow-row" aria-label="${escapeAttribute(nodes.join(" to "))}">
          ${nodes.map((node) => `<span class="flow-node">${escapeHtml(node)}</span>`).join("")}
        </div>
      </div>
    `;
  }

  function renderChallengeSection(items) {
    const challenges = Array.isArray(items) ? items.filter((item) => item.label || item.value) : [];
    if (!challenges.length) return "";
    return `
      <div class="detail-section">
        <h3>문제 / 해결</h3>
        <div class="challenge-list">
          ${challenges
            .map(
              (item) => `
                <div class="challenge-item">
                  <p>문제</p>
                  <strong>${escapeHtml(item.label || "")}</strong>
                  <p>해결</p>
                  <span>${escapeHtml(item.value || "")}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderEvidenceSection(items) {
    const evidence = Array.isArray(items) ? items.filter((item) => item.label || item.value) : [];
    if (!evidence.length) return "";
    return `
      <div class="detail-section">
        <h3>증거 자료</h3>
        <div class="evidence-list">
          ${evidence
            .map(
              (item) => `
                <div class="evidence-item">
                  <strong>${escapeHtml(item.label || "")}</strong>
                  <span>${escapeHtml(item.value || "")}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderDetailGallery(project, youtubeId, localVideo) {
    const images = projectImages(project, youtubeId);
    if (!images.length) {
      const initials = project.title
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
      return `<div class="detail-gallery media-fallback"><span class="fallback-mark">${escapeHtml(initials || "P")}</span></div>`;
    }

    const slides = images
      .map(
        (image, index) => `
          <button
            class="gallery-slide"
            type="button"
            data-open-image="${escapeAttribute(image)}"
            data-image-caption="${escapeAttribute(`${project.title} ${index + 1}`)}"
          >
            <img src="${escapeAttribute(image)}" alt="${escapeAttribute(`${project.title} preview ${index + 1}`)}" loading="${index === 0 ? "eager" : "lazy"}" />
          </button>
        `
      )
      .join("");

    const thumbs = images
      .map(
        (image, index) => `
          <button class="gallery-thumb" type="button" data-gallery-jump="${index}" aria-label="이미지 ${index + 1}">
            <img src="${escapeAttribute(image)}" alt="" loading="lazy" />
          </button>
        `
      )
      .join("");

    return `
      <div class="detail-gallery" data-gallery>
        <div class="gallery-stage">
          <div class="gallery-track" data-gallery-track>
            ${slides}
          </div>
          ${images.length > 1 ? `<button class="gallery-nav gallery-prev" type="button" data-gallery-step="-1" aria-label="이전 이미지"><i data-lucide="chevron-left"></i></button>` : ""}
          ${images.length > 1 ? `<button class="gallery-nav gallery-next" type="button" data-gallery-step="1" aria-label="다음 이미지"><i data-lucide="chevron-right"></i></button>` : ""}
          <div class="gallery-hint"><i data-lucide="maximize-2"></i>크게 보기</div>
        </div>
        ${images.length > 1 ? `<div class="gallery-strip" data-gallery-strip>${thumbs}</div>` : ""}
        ${
          localVideo
            ? `<button class="media-play" type="button" data-detail-local-video="${escapeAttribute(localVideo)}"><i data-lucide="play"></i><span>Demo</span></button>`
            : ""
        }
        ${
          youtubeId
            ? `<button class="media-play" type="button" data-detail-video="${escapeAttribute(project.youtubeUrl)}"><i data-lucide="play"></i><span>Demo</span></button>`
            : ""
        }
      </div>
    `;
  }

  function projectImages(project, youtubeId) {
    return unique(
      [project.videoPoster, project.image, ...(project.gallery || []), youtubeId ? youtubeThumb(youtubeId) : ""].filter(Boolean)
    );
  }

  function fillDomainOptions() {
    const select = els.projectForm.elements.domain;
    select.innerHTML = "";
    state.data.domains
      .filter((domain) => domain !== "All")
      .forEach((domain) => {
        const option = document.createElement("option");
        option.value = domain;
        option.textContent = domain;
        select.append(option);
      });
  }

  function saveProjectFromForm(event) {
    event.preventDefault();
    const form = els.projectForm;
    const id = form.elements.id.value || slugify(form.elements.title.value);
    const repo = form.elements.repo.value.trim();
    const previous = findProject(id);
    const project = {
      id,
      title: form.elements.title.value.trim(),
      domain: form.elements.domain.value,
      visibility: form.elements.visibility.value,
      maturity: form.elements.maturity.value,
      subtitle: form.elements.subtitle.value.trim(),
      summary: form.elements.summary.value.trim(),
      problem: previous?.problem || "",
      architecture: previous?.architecture || [],
      buildSteps: previous?.buildSteps || [],
      challenges: previous?.challenges || [],
      evidence: previous?.evidence || [],
      metrics: previous?.metrics || [],
      rolePoints: splitLines(form.elements.rolePoints.value),
      scopeNotes: splitLines(form.elements.scopeNotes.value),
      results: splitLines(form.elements.results.value),
      tests: Number(form.elements.tests.value || 0),
      featured: form.elements.featured.value === "true",
      stack: splitComma(form.elements.stack.value),
      youtubeUrl: form.elements.youtubeUrl.value.trim(),
      video: form.elements.video.value.trim(),
      videoPoster: form.elements.videoPoster.value.trim(),
      image: form.elements.image.value.trim(),
      gallery: splitLines(form.elements.gallery.value),
      localPath: form.elements.localPath.value.trim(),
      links: repo ? [{ label: "Link", url: repo, icon: repo.includes("github") ? "code-2" : "external-link" }] : [],
      priority: findProject(id)?.priority || state.data.projects.length + 1
    };

    const index = state.data.projects.findIndex((item) => item.id === id);
    if (index >= 0) {
      state.data.projects[index] = project;
    } else {
      state.data.projects.push(project);
    }

    state.data = normalizeData(state.data);
    saveData();
    render();
    closeProjectDialog();
    showToast("프로젝트가 저장됐습니다.");
  }

  function deleteCurrentProject() {
    const id = els.projectForm.elements.id.value;
    if (!id) return;
    state.data.projects = state.data.projects.filter((project) => project.id !== id);
    saveData();
    render();
    closeProjectDialog();
    showToast("프로젝트를 삭제했습니다.");
  }

  function toggleVisibility(id) {
    const project = findProject(id);
    if (!project) return;
    project.visibility = project.visibility === "public" ? "hidden" : "public";
    saveData();
    render();
    showToast(project.visibility === "public" ? "공개로 전환했습니다." : "숨김으로 전환했습니다.");
  }

  function exportData(includeHidden) {
    const data = clone(state.data);
    if (!includeHidden) {
      data.projects = data.projects.filter((project) => project.visibility === "public");
    }
    const filename = includeHidden ? "portfolio-backup.json" : "portfolio-public.json";
    downloadJson(filename, data);
    showToast(includeHidden ? "전체 백업을 내보냈습니다." : "공개 프로젝트만 내보냈습니다.");
  }

  function importData(event) {
    const [file] = event.target.files;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        state.data = normalizeData(JSON.parse(String(reader.result)));
        saveData();
        render();
        showToast("포트폴리오 데이터를 가져왔습니다.");
      } catch (error) {
        console.error(error);
        showToast("JSON을 읽지 못했습니다.");
      } finally {
        event.target.value = "";
      }
    };
    reader.readAsText(file);
  }

  function resetSeed() {
    localStorage.removeItem(STORAGE_KEY);
    state.data = normalizeData(clone(seed));
    state.filter = "All";
    state.search = "";
    els.searchInput.value = "";
    render();
    showToast("초기 데이터로 되돌렸습니다.");
  }

  function openVideo(source, type = "youtube") {
    els.videoIframe.removeAttribute("src");
    els.videoPlayer.pause();
    els.videoPlayer.removeAttribute("src");

    if (type === "local") {
      els.videoIframe.hidden = true;
      els.videoPlayer.hidden = false;
      els.videoPlayer.src = source;
      els.videoPlayer.load();
    } else {
      const embedUrl = youtubeEmbedUrl(source);
      if (!embedUrl) {
        showToast("영상 링크를 확인하지 못했습니다.");
        return;
      }
      els.videoIframe.hidden = false;
      els.videoPlayer.hidden = true;
      els.videoIframe.src = embedUrl;
    }

    els.videoDialog.showModal();
    if (type === "local") {
      els.videoPlayer.play().catch(() => {});
    }
  }

  function closeVideo() {
    if (els.videoDialog.open) {
      els.videoDialog.close();
    }
    els.videoIframe.removeAttribute("src");
    els.videoPlayer.pause();
    els.videoPlayer.removeAttribute("src");
  }

  function openImage(source, caption = "") {
    if (!source) return;
    els.imageViewer.src = source;
    els.imageViewer.alt = caption || "Project image";
    els.imageCaption.textContent = caption;
    els.imageDialog.showModal();
  }

  function closeImage() {
    if (els.imageDialog.open) {
      els.imageDialog.close();
    }
  }

  function moveGallery(button, direction) {
    const gallery = button.closest("[data-gallery]");
    const track = gallery?.querySelector("[data-gallery-track]");
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  }

  function jumpGallery(button, index) {
    const gallery = button.closest("[data-gallery]");
    const track = gallery?.querySelector("[data-gallery-track]");
    const slide = track?.children[index];
    if (!slide) return;
    slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  async function copyToClipboard(value, message) {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      showToast(message);
    } catch {
      showToast(value);
    }
  }

  function getPublicProjects() {
    return state.data.projects
      .filter((project) => project.visibility === "public")
      .sort(projectSort);
  }

  function getFilteredProjects() {
    return getPublicProjects().filter((project) => {
      const matchesFilter = state.filter === "All" || project.domain === state.filter;
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
      return matchesFilter && (!state.search || haystack.includes(state.search));
    });
  }

  function projectSort(a, b) {
    return a.priority - b.priority || a.title.localeCompare(b.title);
  }

  function findProject(id) {
    return state.data.projects.find((project) => project.id === id);
  }

  function createBlankProject() {
    return {
      id: `project-${Date.now()}`,
      title: "",
      subtitle: "",
      domain: state.data.domains.find((domain) => domain !== "All") || "Product",
      visibility: "hidden",
      maturity: "WIP",
      featured: false,
      priority: state.data.projects.length + 1,
      tests: 0,
      image: "",
      video: "",
      videoPoster: "",
      gallery: [],
      youtubeUrl: "",
      summary: "",
      problem: "",
      architecture: [],
      buildSteps: [],
      challenges: [],
      evidence: [],
      metrics: [],
      rolePoints: [],
      scopeNotes: [],
      results: [],
      stack: [],
      links: []
    };
  }

  function firstRepo(project) {
    return (project.links || []).find((link) => link.url)?.url || "";
  }

  function preventEmptyLink(event) {
    const href = event.currentTarget.getAttribute("href");
    if (!href || href === "#") {
      event.preventDefault();
      showToast("링크는 Studio에서 연결하면 됩니다.");
    }
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
      else if (parsed.pathname.startsWith("/shorts/")) id = parsed.pathname.split("/")[1] || "";
      else if (parsed.pathname.startsWith("/embed/")) id = parsed.pathname.split("/")[1] || "";
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

  function isStudioEnabled() {
    const params = new URLSearchParams(window.location.search);
    const localHosts = new Set(["localhost", "127.0.0.1", "::1", "[::1]", ""]);
    return localHosts.has(window.location.hostname) || params.get("studio") === "1";
  }

  function youtubeThumb(id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      els.toast.hidden = true;
    }, 2200);
  }

  function downloadJson(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function htmlToElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
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

  function flattenCasePairs(items) {
    return (Array.isArray(items) ? items : []).flatMap((item) => [item.label, item.value].filter(Boolean));
  }

  function sum(values) {
    return values.reduce((total, value) => total + Number(value || 0), 0);
  }

  function unique(values) {
    return Array.from(new Set(values.filter(Boolean)));
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
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
})();
