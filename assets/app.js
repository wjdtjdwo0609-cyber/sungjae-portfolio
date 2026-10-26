(function () {
  const STORAGE_KEY = "sungjae-portfolio-v13";
  const LEGACY_KEY = "sungjae-portfolio-v12";
  let draftNotice = "";

  // --- domain (pure rules: assets/portfolio-domain.js) ---
  const {
    normalizeData, parsePairLines, pairLines, publicData, validateImport,
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
    flattenCasePairs,
    slugify,
    escapeHtml,
    escapeAttribute,
    publicProjects,
    filterProjects
  } = window.PortfolioDomain;

  const seed = window.PORTFOLIO_SEED || { profile: {}, domains: ["All"], projects: [] };
  const studioEnabled = isStudioEnabled();
  const state = {
    data: loadData(),
    filter: "All",
    search: "",
    editingId: null,
    detailId: null
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
    $("[data-studio]").inert = true;
    if (studioEnabled) {
      $("[data-draft-notice]").textContent = draftNotice || "공개 사이트 원본을 불러왔습니다. 편집 내용은 이 브라우저에 초안으로 저장됩니다.";
      try { $("[data-import-legacy]").hidden = !localStorage.getItem(LEGACY_KEY); } catch {}
    }
    syncProjectRoute();
  }

  function loadData() {
    // Visitors always see the published seed. Studio alone uses browser drafts.
    if (studioEnabled) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const draft = JSON.parse(saved);
          const data = validateImport(draft.data || draft);
          draftNotice = draft.seedRevision === (seed.profile?.revision || seed.profile?.updatedAt)
            ? "이 브라우저의 편집 초안을 불러왔습니다. 공개 화면과는 별도로 저장됩니다."
            : "이 초안은 이전 공개 버전에서 만들었습니다. 전체 백업 후 최신 공개본과 비교하세요. 공개본 불러오기는 초안을 교체합니다.";
          return data;
        }
      } catch (error) {
        console.warn("Portfolio draft could not be loaded", error);
        draftNotice = "저장된 초안을 읽지 못해 공개 원본을 표시합니다. 기존 저장 자료는 그대로 보존되어 있습니다.";
      }
    }
    return normalizeData(clone(seed));
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ seedRevision: (seed.profile?.revision || seed.profile?.updatedAt), data: state.data }));
      $("[data-draft-notice]").textContent = "브라우저 초안 저장 완료. 공개 반영에는 배포용 파일 내보내기가 필요합니다.";
      return true;
    } catch {
      showToast("브라우저에 저장하지 못했습니다. 전체 백업으로 파일을 보관하세요.");
      return false;
    }
  }

  function render() {
    renderProfile();
    renderFilters();
    renderProjects();
    renderRecognitions();
    renderStacks();
    renderStudio();
    refreshIcons();
  }

  function renderProfile() {
    const profile = state.data.profile || {};
    document.title = `${profile.name || "Portfolio"} | ${profile.role || "Portfolio"}`;
    els.profileSummary.textContent = profile.summary || "";
    $("[data-education-summary]").textContent = profile.education || "";
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
    els.statTests.textContent = publicProjects.filter((project) => project.featured).length.toString();
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
    card.dataset.projectId = project.id;
    card.className = `project-card ${layoutClass(index)}${project.featured ? " featured" : ""}`;
    if (project.imageFit) {
      card.dataset.imageFit = project.imageFit;
    } else if (project.image && project.image.includes("pickline-preview")) {
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
    if (project.visual === "game-prototypes") {
      media.append(htmlToElement(renderGamePrototypeVisual()));
    } else if (localVideo) {
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
    const detailButton = document.createElement("a");
    detailButton.href = projectUrl(project.id);
    detailButton.className = "project-link project-link-primary";
    detailButton.innerHTML = `<i data-lucide="panel-top-open"></i>상세 보기`;
    detailButton.addEventListener("click", (event) => { event.preventDefault(); openProjectDetail(project.id); });
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

  function renderStacks() {
    const publicProjects = getPublicProjects();
    const groups = [
      {
        title: "Frontend / UX",
        tags: ["React", "TypeScript", "Vite", "Three.js", "Tauri", "PWA"],
        body: "채용자가 바로 볼 수 있는 웹 화면, 대시보드, 디지털 트윈, 로컬 GUI를 실제 실행 캡처와 함께 만듭니다."
      },
      {
        title: "Backend / API",
        tags: ["Python", "FastAPI", "Node.js", "Express", "WebSocket", "SSE"],
        body: "로컬 앱, 자동화 서버, 브릿지 프로세스, 실시간 스트림을 제품 흐름에 맞춰 분리합니다."
      },
      {
        title: "Data / Search",
        tags: ["Supabase", "PostgreSQL", "PostGIS", "SQLite", "RAG", "BM25"],
        body: "공공 API, 상권/입지 데이터, PLC 패턴, 문서 청크를 DB·검색 인덱스·운영 화면으로 연결합니다."
      },
      {
        title: "AI / Agents",
        tags: ["AI Agent", "Multi-agent", "Ollama", "MLX", "Claude", "Gemini"],
        body: "도메인 특화 AI 서비스, 로컬 에이전트 GUI, 역할형 협업 에이전트, 브라우저 자동화를 구현합니다."
      },
      {
        title: "Robotics / Factory",
        tags: ["PLC", "MELSEC", "OPC UA", "MC Protocol", "Indy7", "LeRobot", "Pi0"],
        body: "PLC 신호, 설비 브릿지, 비전·로봇 티칭, VLA 데이터셋, 웹 디지털 트윈을 한 흐름으로 묶습니다."
      },
      {
        title: "QA / Product Ops",
        tags: ["Playwright", "Vitest", "pytest", "PortOne", "Security Audit", "GitHub Actions"],
        body: "테스트, 결제 검증, 보안 감사, 운영 로그, 제출 가능한 화면 증거까지 제품 완성도를 챙깁니다."
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
    $("[data-profile-awards]").value = (state.data.profile.awards || []).map((a) => [a.title, a.issuer, a.date, a.scope, a.certificate].join(" | ")).join("\n");
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
    document.addEventListener("keydown", (event) => {
      if (!els.studio.classList.contains("is-open") || els.projectDialog.open) return;
      if (event.key === "Escape") closeStudio();
      if (event.key === "Tab") {
        const controls = [...els.studio.querySelectorAll("button, a, input")].filter((el) => !el.hidden && el.getClientRects().length);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    });
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

    $$("[data-open-project]").forEach((button) => button.addEventListener("click", () => openProjectDetail(button.dataset.openProject)));
    window.addEventListener("hashchange", syncProjectRoute);
    if (studioEnabled) {
      $("[data-export-deploy]").addEventListener("click", exportDeploy);
      $("[data-import-legacy]").addEventListener("click", importLegacy);
      $("[data-profile-awards-form]").addEventListener("submit", (event) => {
        event.preventDefault();
        state.data.profile.awards = parseAwardInput($("[data-profile-awards]").value);
        const saved = saveData();
        render();
        if (saved) showToast("개인 수상·표창 초안을 저장했습니다.");
      });
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
    $("[data-awards-grid]").addEventListener("click", (event) => {
      const button = event.target.closest("[data-open-image]");
      if (button) openImage(button.dataset.openImage, button.dataset.imageCaption || "");
    });
    els.detailDialog.addEventListener("close", () => {
      if (location.hash.startsWith("#project/")) history.replaceState(null, "", `${location.pathname}${location.search}#projects`);
      state.detailId = null;
      els.detailContent.innerHTML = "";
    });
    els.detailContent.addEventListener("click", (event) => {
      if (event.target.closest("[data-share-project]")) {
        copyToClipboard(projectUrl(state.detailId), "프로젝트 주소를 복사했습니다.");
      }
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
    els.studio.inert = false;
    els.studio.classList.add("is-open");
    els.studio.setAttribute("aria-hidden", "false");
    els.scrim.hidden = false;
    document.body.classList.add("studio-open");
    $("[data-studio-close]").focus();
  }

  function closeStudio() {
    els.studio.inert = true;
    els.studio.classList.remove("is-open");
    els.studio.setAttribute("aria-hidden", "true");
    els.scrim.hidden = true;
    document.body.classList.remove("studio-open");
    $("[data-studio-toggle]").focus();
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
    for (const key of ["problem", "period", "collaboration", "learning", "limitations", "nextSteps"]) form.elements[key].value = project[key] || "";
    for (const key of ["architecture", "buildSteps"]) form.elements[key].value = (project[key] || []).join("\n");
    for (const key of ["challenges", "evidence", "metrics"]) form.elements[key].value = pairLines(project[key]);
    form.elements.priority.value = project.priority;
    form.elements.awards.value = (project.awards || []).map((a) => [a.title, a.issuer, a.date, a.scope, a.certificate].join(" | ")).join("\n");
    form.elements.patents.value = (project.patents || []).map((a) => [a.title, a.number, a.status, a.filedAt || "", a.evidence || ""].join(" | ")).join("\n");
    form.elements.mediaNotes.value = (project.mediaNotes || []).map((m) => [m.src, m.caption, m.capturedAt, m.version].map((v) => v || "").join(" | ")).join("\n");
    form.elements.links.value = (project.links || []).map((l) => `${l.label || "Link"} | ${l.url}`).join("\n");
    if (![...form.elements.maturity.options].some((o) => o.value === project.maturity)) form.elements.maturity.add(new Option(project.maturity, project.maturity));
    form.elements.maturity.value = project.maturity;
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
    form.elements.localPath.value = project.localPath || "";

    els.projectDialog.showModal();
    refreshIcons();
  }

  function closeProjectDialog() {
    els.projectDialog.close();
  }

  function openProjectDetail(id) {
    const project = findProject(id);
    if (!project || project.visibility !== "public") return;
    state.detailId = id;
    if (location.hash !== `#project/${encodeURIComponent(id)}`) history.pushState(null, "", `#project/${encodeURIComponent(id)}`);

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
      <div class="case-context">
        ${project.period ? `<span>기간 · ${escapeHtml(project.period)}</span>` : ""}
        ${project.collaboration ? `<span>참여 · ${escapeHtml(project.collaboration)}</span>` : ""}
      </div>
      ${renderDetailListSection("내가 맡은 일", project.rolePoints)}
      ${project.awards?.length ? `<div class="award-grid">${renderAwardCards(project)}</div>` : ""}
      ${project.patents?.length ? `<div class="award-grid">${renderPatentCards(project)}</div>` : ""}
      ${renderMetricStrip(project.metrics)}
      ${renderProblemSection(project.problem)}
      ${renderArchitectureFlow(project.architecture)}
      <div class="detail-grid case-study-grid">
        ${renderDetailListSection("구현 방식", project.buildSteps)}
        ${renderChallengeSection(project.challenges)}
        ${renderEvidenceSection(project.evidence)}
      </div>
      <div class="detail-grid">
        ${renderTextSection("배운 점", project.learning)}
        ${renderTextSection("현재 한계", project.limitations)}
        ${renderTextSection("다음 검증", project.nextSteps)}
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
    if (!els.detailDialog.open) els.detailDialog.showModal();
    els.detailDialog.scrollTop = 0;
    refreshIcons();
  }

  function closeProjectDetail() {
    els.detailDialog.close();
  }

  function renderDetailActions(project, links, youtubeId, localVideo) {
    return `
      <div class="detail-actions">
        <button class="secondary-button compact" type="button" data-share-project><i data-lucide="link"></i>주소 복사</button>
        <a class="secondary-button compact" href="./summary.html?projects=${encodeURIComponent(project.id)}${studioEnabled ? "&draft=1" : ""}" target="_blank" rel="noopener"><i data-lucide="file-text"></i>요약 / 인쇄</a>
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
    if (project.visual === "game-prototypes") {
      return `<div class="detail-gallery">${renderGamePrototypeVisual("detail")}</div>`;
    }

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
            data-image-caption="${escapeAttribute(mediaCaption(project, image, index))}"
          >
            <img src="${escapeAttribute(image)}" alt="${escapeAttribute(mediaCaption(project, image, index))}" loading="${index === 0 ? "eager" : "lazy"}" />
            <span class="gallery-caption">${escapeHtml(mediaCaption(project, image, index))}</span>
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

  function renderGamePrototypeVisual(size = "") {
    const classes = ["game-prototype-visual", size ? `game-prototype-visual-${size}` : ""].filter(Boolean).join(" ");
    return `
      <div class="${classes}" aria-label="Game prototype systems">
        <div class="game-visual-topline">
          <span>Game Prototypes</span>
          <span>Local Play</span>
        </div>
        <div class="game-visual-grid">
          <div class="game-visual-panel">
            <strong>Water Bomb</strong>
            <span>4P input</span>
            <span>bomb → cross blast</span>
            <span>bubble trap</span>
          </div>
          <div class="game-visual-panel">
            <strong>Bbangya</strong>
            <span>30s turns</span>
            <span>combo score</span>
            <span>mobile touch</span>
          </div>
          <div class="game-visual-panel">
            <strong>Breakout</strong>
            <span>pygame loop</span>
            <span>collision angle</span>
            <span>restart state</span>
          </div>
        </div>
        <div class="game-visual-flow">
          <span>Input</span>
          <i></i>
          <span>Rules</span>
          <i></i>
          <span>State</span>
          <i></i>
          <span>Feedback</span>
        </div>
      </div>
    `;
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
    const previous = findProject(id);
    const project = {
      ...previous,
      id,
      title: form.elements.title.value.trim(),
      domain: form.elements.domain.value,
      visibility: form.elements.visibility.value,
      maturity: form.elements.maturity.value,
      subtitle: form.elements.subtitle.value.trim(),
      summary: form.elements.summary.value.trim(),
      problem: form.elements.problem.value.trim(),
      period: form.elements.period.value.trim(),
      collaboration: form.elements.collaboration.value.trim(),
      learning: form.elements.learning.value.trim(),
      limitations: form.elements.limitations.value.trim(),
      nextSteps: form.elements.nextSteps.value.trim(),
      mediaNotes: splitLines(form.elements.mediaNotes.value).map((line) => {
        const [src, caption = "", capturedAt = "", version = ""] = line.split(" | ");
        return { src: src.trim(), caption: caption.trim(), capturedAt: capturedAt.trim(), version: version.trim() };
      }),
      awards: parseAwardInput(form.elements.awards.value),
      patents: splitLines(form.elements.patents.value).map((line) => {
        const [title, number = "", status = "특허출원 접수", filedAt = "", evidence = ""] = line.split(" | ");
        return { title: title.trim(), number: number.trim(), status: status.trim(), filedAt: filedAt.trim(), evidence: evidence.trim() };
      }),
      architecture: splitLines(form.elements.architecture.value),
      buildSteps: splitLines(form.elements.buildSteps.value),
      challenges: parsePairLines(form.elements.challenges.value),
      evidence: parsePairLines(form.elements.evidence.value),
      metrics: parsePairLines(form.elements.metrics.value),
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
      imageFit: previous?.imageFit || "",
      visual: previous?.visual || "",
      gallery: splitLines(form.elements.gallery.value),
      localPath: form.elements.localPath.value.trim(),
      links: parsePairLines(form.elements.links.value).filter((l) => l.value).map((l) => ({ label: l.label, url: l.value, icon: l.value.includes("github.com") ? "code-2" : "external-link" })),
      priority: Number(form.elements.priority.value) || state.data.projects.length + 1
    };

    const index = state.data.projects.findIndex((item) => item.id === id);
    if (index >= 0) {
      state.data.projects[index] = project;
    } else {
      state.data.projects.push(project);
    }

    state.data = normalizeData(state.data);
    const saved = saveData();
    render();
    closeProjectDialog();
    if (saved) showToast("편집 초안을 저장했습니다. 공개 반영은 배포용 파일로 진행하세요.");
  }

  function deleteCurrentProject() {
    const id = els.projectForm.elements.id.value;
    if (!id || !confirm("이 프로젝트를 초안에서 삭제할까요? 전체 백업 후 진행하는 것을 권장합니다.")) return;
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
    const data = includeHidden ? clone(state.data) : publicData(state.data);
    downloadJson(includeHidden ? "portfolio-backup.json" : "portfolio-public.json", data);
    showToast(includeHidden ? "전체 백업을 내보냈습니다." : "공개 프로젝트만 내보냈습니다.");
  }

  function exportDeploy() {
    const data = publicData(state.data);
    data.profile.updatedAt = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
    data.profile.revision = new Date().toISOString();
    downloadFile("portfolio-data.js", `window.PORTFOLIO_SEED = ${JSON.stringify(data, null, 2)};\n`, "text/javascript");
    showToast("assets/portfolio-data.js를 이 파일로 교체한 뒤 사이트를 배포하세요.");
  }

  function importData(event) {
    const [file] = event.target.files;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = validateImport(JSON.parse(String(reader.result)));
        if (!confirm("현재 편집 초안을 가져온 자료로 교체할까요? 기존 자료는 먼저 전체 백업으로 보관하세요.")) return;
        state.data = data;
        const saved = saveData();
        render();
        if (saved) showToast("자료를 편집 초안으로 가져왔습니다.");
      } catch (error) {
        showToast(error.message || "JSON을 읽지 못했습니다.");
      } finally { event.target.value = ""; }
    };
    reader.readAsText(file);
  }

  function importLegacy() {
    try {
      const data = validateImport(JSON.parse(localStorage.getItem(LEGACY_KEY)));
      if (!confirm("이전 버전의 브라우저 자료로 현재 초안을 교체할까요? 이전 원본은 삭제하지 않습니다.")) return;
      state.data = data;
      const saved = saveData();
      render();
      if (saved) showToast("이전 자료를 불러왔습니다. 최신 공개본과 비교해 편집하세요.");
    } catch { showToast("이전 자료를 읽지 못했습니다. 기존 저장 자료는 그대로 보존했습니다."); }
  }

  function resetSeed() {
    if (!confirm("현재 편집 초안을 최신 공개본으로 교체할까요? 기존 초안은 먼저 전체 백업으로 보관하세요.")) return;
    state.data = normalizeData(clone(seed));
    const saved = saveData();
    state.filter = "All";
    state.search = "";
    els.searchInput.value = "";
    render();
    if (saved) showToast("최신 공개본을 편집 초안으로 불러왔습니다.");
  }

  function projectUrl(id) {
    const url = new URL(location.href);
    url.search = "";
    url.hash = `project/${encodeURIComponent(id)}`;
    return url.href;
  }

  function renderAwardCards(project) {
    return (project.awards || []).map((award) => {
      const caption = [award.title, award.issuer, award.date, award.scope].filter(Boolean).join(" · ");
      return `<article class="award-card"><p class="eyebrow">${escapeHtml(project.title)}</p><h3>${escapeHtml(award.title)}</h3><p>${escapeHtml([award.issuer, award.date, award.scope].filter(Boolean).join(" · "))}</p>${award.certificate ? `<button type="button" class="secondary-button compact" data-open-image="${escapeAttribute(award.certificate)}" data-image-caption="${escapeAttribute(caption)}">상장 보기</button>` : ""}</article>`;
    }).join("");
  }

  function renderRecognitions() {
    const html = getPublicProjects().filter((p) => p.awards?.length || p.patents?.length).map((p) => renderAwardCards(p) + renderPatentCards(p)).join("") + renderAwardCards({ title: "개인 수상·표창", awards: state.data.profile.awards || [] });
    $("[data-recognition]").hidden = !html;
    $("[data-awards-grid]").innerHTML = html;
  }

  function parseAwardInput(value) {
    return splitLines(value).map((line) => {
      const [title, issuer = "", date = "", scope = "", certificate = ""] = line.split(" | ");
      return { title: title.trim(), issuer: issuer.trim(), date: date.trim(), scope: scope.trim(), certificate: certificate.trim() };
    }).filter((a) => a.title);
  }

  function renderPatentCards(project) {
    return (project.patents || []).map((p) => `<article class="award-card"><p class="eyebrow">${escapeHtml(project.title)}</p><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.status)} · ${escapeHtml(p.number)}${p.filedAt ? `<br />접수일 ${escapeHtml(p.filedAt)}` : ""}</p>${p.evidence ? `<button class="secondary-button compact" type="button" data-open-image="${escapeAttribute(p.evidence)}" data-image-caption="${escapeAttribute(`${p.title} · ${p.number} · ${p.filedAt} 접수 · 2026-05-31 저장 화면`)}">접수 화면 보기</button>` : ""}</article>`).join("");
  }

  function syncProjectRoute() {
    if (!location.hash.startsWith("#project/")) {
      if (els.detailDialog.open) els.detailDialog.close();
      return;
    }
    try {
      const id = decodeURIComponent(location.hash.slice(9));
      const project = findProject(id);
      if (!project || project.visibility !== "public") {
        if (els.detailDialog.open) els.detailDialog.close();
        showToast("공개된 프로젝트를 찾지 못했습니다.");
        return;
      }
      openProjectDetail(id);
    } catch { showToast("프로젝트 주소를 확인하세요."); }
  }

  function mediaCaption(project, image, index) {
    const note = (project.mediaNotes || []).find((item) => item.src === image);
    if (!note) return `${project.title} · 이미지 ${index + 1}`;
    return [note.caption, note.capturedAt, note.version].filter(Boolean).join(" · ");
  }

  function renderTextSection(title, text) {
    return text ? `<div class="detail-section"><h3>${escapeHtml(title)}</h3><p class="detail-paragraph">${escapeHtml(text)}</p></div>` : "";
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
    return publicProjects(state.data.projects);
  }

  function getFilteredProjects() {
    return filterProjects(state.data.projects, { filter: state.filter, search: state.search });
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

  function isStudioEnabled() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "public") return false;
    const localHosts = new Set(["localhost", "127.0.0.1", "::1", "[::1]", ""]);
    return localHosts.has(window.location.hostname) || params.get("studio") === "1";
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
    downloadFile(filename, JSON.stringify(data, null, 2), "application/json");
  }

  function downloadFile(filename, content, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function htmlToElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
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

})();
