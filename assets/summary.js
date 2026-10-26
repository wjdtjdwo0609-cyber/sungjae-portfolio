(function () {
  const d = window.PortfolioDomain;
  let source = window.PORTFOLIO_SEED;
  const params = new URLSearchParams(location.search);
  if (params.get("draft") === "1") {
    try {
      const saved = JSON.parse(localStorage.getItem("sungjae-portfolio-v13"));
      if (saved) {
        source = d.validateImport(saved.data || saved);
        document.querySelector(".summary-tools p").textContent = "이 브라우저의 편집 초안 미리보기입니다. 공개 사이트에는 아직 반영되지 않았습니다.";
      }
    } catch { document.querySelector(".summary-tools p").textContent = "편집 초안을 읽지 못해 공개 원본을 표시합니다."; }
  }
  const data = d.publicData(source);
  const projects = data.projects;
  const requested = params.has("projects") ? params.get("projects").split(",") : projects.filter((p) => p.featured).map((p) => p.id);
  const selected = new Set(requested);
  let includeRecords = params.get("records") === "1";
  const recordsToggle = document.querySelector("[data-records-toggle]");
  recordsToggle.checked = includeRecords;
  recordsToggle.addEventListener("change", () => {
    includeRecords = recordsToggle.checked;
    const url = new URL(location.href);
    includeRecords ? url.searchParams.set("records", "1") : url.searchParams.delete("records");
    history.replaceState(null, "", url.href);
    render();
  });
  const e = d.escapeHtml;
  const root = document.querySelector("[data-summary]");
  const selection = document.querySelector("[data-selection]");
  const text = (title, value) => value ? `<section><h3>${e(title)}</h3><p>${e(value)}</p></section>` : "";
  const list = (title, items) => items?.length ? `<section><h3>${e(title)}</h3><ul>${items.map((v) => `<li>${e(v)}</li>`).join("")}</ul></section>` : "";
  const safeLink = (value) => /^(https?:\/\/|\.\/)/i.test(value || "");

  for (const project of projects) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = project.id;
    input.checked = selected.has(project.id);
    input.addEventListener("change", () => {
      input.checked ? selected.add(project.id) : selected.delete(project.id);
      const url = new URL(location.href);
      url.searchParams.set("projects", projects.filter((p) => selected.has(p.id)).map((p) => p.id).join(","));
      history.replaceState(null, "", url.href);
      render();
    });
    label.append(input, document.createTextNode(project.title));
    selection.append(label);
  }

  function render() {
    const included = projects.filter((p) => selected.has(p.id));
    if (!included.length && !includeRecords) {
      root.innerHTML = '<p class="empty">표시할 프로젝트가 없습니다. 프로젝트 선택에서 사례를 추가하세요.</p>';
      return;
    }
    root.innerHTML = included.map((p, index) => {
      const note = (p.mediaNotes || []).find((m) => m.src === p.image);
      const caption = note ? [note.caption, note.capturedAt, note.version].filter(Boolean).join(" · ") : p.title;
      const links = (p.links || []).filter((l) => safeLink(l.url));
      const detail = `${data.profile.website || new URL('./', location.href).href}#project/${encodeURIComponent(p.id)}`;
      return `<article class="print-case">
        <header class="case-header"><span>정성재 · 프로젝트 포트폴리오</span><span>${e(data.profile.updatedAt || "")} · ${index + 1} / ${included.length}</span></header>
        <p class="eyebrow">${e(p.domain)} · ${e(p.maturity)}</p>
        <h1>${e(p.title)}</h1><p class="subtitle">${e(p.subtitle)}</p>
        ${p.period || p.collaboration ? `<p class="context">${e([p.period, p.collaboration].filter(Boolean).join(" · "))}</p>` : ""}
        ${(p.awards || []).map((a) => `<p class="context">${e([a.title, a.issuer, a.date, a.scope].filter(Boolean).join(" · "))}</p>`).join("")}
        ${(p.patents || []).map((a) => `<p class="context">${e([a.title, a.status, a.number].filter(Boolean).join(" · "))}</p>`).join("")}
        <p class="intro">${e(p.summary)}</p>
        ${p.image && safeLink(p.image) ? `<figure><img src="${e(p.image)}" alt="${e(caption)}" /><figcaption>${e(caption)}</figcaption></figure>` : ""}
        <div class="case-columns">
          ${text("해결하려던 문제", p.problem)}
          ${list("내가 맡은 일", (p.rolePoints || []).slice(0, 3))}
          ${p.challenges?.length ? `<section><h3>시행착오와 개선</h3>${d.normalizeCasePairs(p.challenges).slice(0, 1).map((c) => `<p><strong>${e(c.label)}</strong><br />${e(c.value)}</p>`).join("")}</section>` : ""}
          ${list("확인한 결과", (p.results || []).slice(0, 3))}
          ${text("배운 점", p.learning)}
          ${text("현재 한계", p.limitations)}
        </div>
        <footer><p>${e((p.stack || []).join(" · "))}</p><a href="${e(detail)}">웹 상세와 증빙</a>${links.map((l) => ` · <a href="${e(l.url)}">${e(l.label || l.url)}</a>`).join("")}</footer>
      </article>`;
    }).join("") + (includeRecords ? recordPage() : "");
  }
  function recordPage() {
    const allAwards = projects.flatMap((p) => (p.awards || []).map((a) => ({...a, project: p.title}))).concat((data.profile.awards || []).map((a) => ({...a, project: "개인 수상·표창"})));
    const patents = projects.flatMap((p) => (p.patents || []).map((a) => ({...a, project: p.title})));
    return `<article class="print-case"><header class="case-header"><span>정성재 · 수상·교육·출원 기록</span><span>${e(data.profile.updatedAt || "")}</span></header><p class="eyebrow">Records</p><h1>수상·표창과 출원 기록</h1>
      ${data.profile.education ? text("교육", data.profile.education) : ""}
      <section><h3>수상·표창</h3>${allAwards.map((a) => `<p><strong>${e(a.title)}</strong><br />${e([a.issuer, a.date, a.scope].filter(Boolean).join(" · "))}<br /><span class="context">${e(a.project)}</span>${a.certificate && safeLink(a.certificate) ? ` · <a href="${e(new URL(a.certificate, data.profile.website || location.href).href)}">상장 보기</a>` : ""}</p>`).join("")}</section>
      <section><h3>지식재산 활동</h3>${patents.map((a) => `<p><strong>${e(a.title)}</strong><br />${e(a.status)} · ${e(a.number)}<br /><span class="context">${e(a.project)}</span></p>`).join("")}</section>
      <footer><a href="${e((data.profile.website || new URL('./', location.href).href)+'#recognition')}">웹 기록과 증빙</a></footer></article>`;
  }
  document.querySelector("[data-print]").addEventListener("click", () => window.print());
  render();
})();
