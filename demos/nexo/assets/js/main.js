/**
 * NEXO ACADEMY — Script Principal de Interações Locais (assets/js/main.js)
 * =========================================================================
 * Funcionalidades 100% client-side (ES6+):
 * 1. Menu mobile acessível (aria-expanded, Esc).
 * 2. Busca textual em tempo real + filtros combinados (categoria, nível, modalidade).
 * 3. Modal acessível de detalhes de cada curso com retorno de foco.
 * 4. Comparador interativo de até 3 cursos com tabela lado a lado.
 * 5. Indicador visual ilustrativo de progresso nas trilhas de aprendizagem (apenas em memória).
 * 6. Seleção de curso/turma/trilha com pré-preenchimento do formulário de interesse.
 * 7. Acordeão acessível de Perguntas Frequentes (FAQ).
 * 8. Validação em pt-BR e envio transparente via WhatsApp ou mailto:.
 */

(function () {
  "use strict";

  const config = window.NEXO_CONFIG;
  if (!config) {
    console.error("NEXO_CONFIG não encontrado. Verifique se assets/js/config.js foi carregado.");
    return;
  }

  // Estado local da sessão (não persiste dados pessoais nem simula login)
  const state = {
    searchQuery: "",
    category: "all",
    level: "all",
    modality: "all",
    comparedCourseIds: ["python-dados-automacao", "powerbi-storytelling-dados"],
    activeModalCourseId: null,
    lastFocusedElement: null,
    // Estado apenas ilustrativo das etapas marcadas nas trilhas (inicia com a 1ª etapa marcada como exemplo)
    trackProgress: {
      "trilha-analista-dados": new Set(["ad-1"]),
      "trilha-automacao-ia": new Set(["ai-1"])
    },
    submitChannel: "whatsapp"
  };

  // Utilitário de escape HTML seguro
  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Normalização de texto para busca sem acentos
  function normalizeText(str) {
    return String(str ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  // 1. Inicialização de dados institucionais e contatos
  function initBrandingAndContacts() {
    const brandNameEl = document.getElementById("brand-name");
    if (brandNameEl && config.brand?.name) {
      brandNameEl.textContent = config.brand.name;
    }

    const demoBannerEl = document.getElementById("demo-banner-text");
    if (demoBannerEl && config.brand?.demoBannerText) {
      demoBannerEl.textContent = config.brand.demoBannerText;
    }

    const legalEl = document.getElementById("footer-legal-note");
    if (legalEl && config.brand?.legalNote) {
      legalEl.textContent = config.brand.legalNote;
    }

    const whatsDisplay = document.getElementById("contato-whats-display");
    const emailDisplay = document.getElementById("contato-email-display");
    const addrDisplay = document.getElementById("contato-endereco-display");
    const fWhats = document.getElementById("footer-whats");
    const fEmail = document.getElementById("footer-email");
    const fAddr = document.getElementById("footer-address");
    const fHours = document.getElementById("footer-hours");

    if (whatsDisplay) whatsDisplay.textContent = config.contact.whatsappDisplay;
    if (emailDisplay) emailDisplay.textContent = config.contact.email;
    if (addrDisplay) addrDisplay.textContent = config.contact.address;
    if (fWhats) fWhats.textContent = "WhatsApp: " + config.contact.whatsappDisplay;
    if (fEmail) fEmail.textContent = "E-mail: " + config.contact.email;
    if (fAddr) fAddr.textContent = config.contact.address;
    if (fHours) fHours.textContent = config.contact.hours;

    const yearEl = document.getElementById("ano-atual");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  // 2. Menu Mobile Acessível
  function initMobileNav() {
    const toggleBtn = document.getElementById("btn-menu-mobile");
    const nav = document.getElementById("menu-navegacao");
    if (!toggleBtn || !nav) return;

    function closeMenu() {
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "Abrir menu de navegação");
      nav.classList.remove("is-open");
    }

    toggleBtn.addEventListener("click", () => {
      const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.setAttribute("aria-label", "Fechar menu de navegação");
        nav.classList.add("is-open");
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 860) {
          closeMenu();
        }
      });
    });

    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggleBtn.focus();
      }
    });
  }

  // 3. Vitrine de Cursos + Busca + Filtros
  function getFilteredCourses() {
    const query = normalizeText(state.searchQuery);
    return config.courses.filter((course) => {
      const matchCat = state.category === "all" || course.category === state.category;
      const matchLevel = state.level === "all" || course.level === state.level;
      const matchModality = state.modality === "all" || course.modality === state.modality;

      if (!matchCat || !matchLevel || !matchModality) return false;
      if (!query) return true;

      const haystack = normalizeText(
        [
          course.title,
          course.category,
          course.level,
          course.modality,
          course.shortDescription,
          course.portfolioProject,
          (course.tools || []).join(" ")
        ].join(" ")
      );
      return haystack.includes(query);
    });
  }

  function renderCourses() {
    const grid = document.getElementById("grade-cursos");
    const counter = document.getElementById("contador-cursos");
    if (!grid) return;

    const filtered = getFilteredCourses();
    const total = config.courses.length;

    if (counter) {
      counter.textContent = `Exibindo ${filtered.length} de ${total} cursos disponíveis`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>Nenhum curso encontrado com os filtros selecionados</h3>
          <p>Tente buscar por outro termo ou redefinir os filtros para visualizar todas as formações.</p>
          <button type="button" class="btn btn--outline btn--sm" id="btn-empty-reset" style="margin-top:0.85rem;">
            Mostrar todos os cursos
          </button>
        </div>
      `;
      const resetBtn = document.getElementById("btn-empty-reset");
      if (resetBtn) {
        resetBtn.addEventListener("click", resetFilters);
      }
      return;
    }

    grid.innerHTML = filtered
      .map((course) => {
        const isCompared = state.comparedCourseIds.includes(course.id);
        return `
          <article class="course-card" data-course-id="${escapeHtml(course.id)}">
            <div class="course-card__media">
              <img
                src="${escapeHtml(course.image)}"
                alt="${escapeHtml(course.imageAlt)}"
                width="400"
                height="220"
                loading="lazy"
                class="course-card__img"
              />
              <div class="course-card__badges">
                <span class="badge badge--cat">${escapeHtml(course.category)}</span>
                <span class="badge badge--highlight">${escapeHtml(course.badge)}</span>
              </div>
            </div>
            <div class="course-card__body">
              <h3 class="course-card__title">${escapeHtml(course.title)}</h3>
              <p class="course-card__desc">${escapeHtml(course.shortDescription)}</p>

              <div class="course-card__meta" aria-label="Resumo técnico do curso">
                <div>
                  <span>Carga horária</span>
                  <strong>${escapeHtml(course.workload)}</strong>
                </div>
                <div>
                  <span>Nível</span>
                  <strong>${escapeHtml(course.level)}</strong>
                </div>
                <div>
                  <span>Formato</span>
                  <strong>${escapeHtml(course.modality)}</strong>
                </div>
              </div>

              <div class="course-card__price-box">
                <span class="course-card__price">${escapeHtml(course.demoPrice)}</span>
                <span class="course-card__installments">${escapeHtml(course.demoInstallments)}</span>
              </div>

              <div class="course-card__actions">
                <button
                  type="button"
                  class="btn btn--outline btn--sm js-open-modal"
                  data-course-id="${escapeHtml(course.id)}"
                >
                  Ver ementa
                </button>
                <button
                  type="button"
                  class="btn btn--ghost btn--sm btn-compare js-toggle-compare ${isCompared ? "is-selected" : ""}"
                  data-course-id="${escapeHtml(course.id)}"
                  aria-pressed="${isCompared ? "true" : "false"}"
                >
                  ${isCompared ? "✓ Comparando" : "+ Comparar"}
                </button>
                <button
                  type="button"
                  class="btn btn--primary btn--sm btn--full js-select-course"
                  data-course-id="${escapeHtml(course.id)}"
                >
                  Tenho interesse neste curso
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function syncCategoryPills() {
    document.querySelectorAll("[data-quick-category]").forEach((btn) => {
      const cat = btn.getAttribute("data-quick-category");
      btn.classList.toggle("is-active", cat === state.category);
    });
  }

  function resetFilters() {
    state.searchQuery = "";
    state.category = "all";
    state.level = "all";
    state.modality = "all";

    const searchInput = document.getElementById("busca-curso");
    const catSelect = document.getElementById("filtro-categoria");
    const lvlSelect = document.getElementById("filtro-nivel");
    const modSelect = document.getElementById("filtro-modalidade");

    if (searchInput) searchInput.value = "";
    if (catSelect) catSelect.value = "all";
    if (lvlSelect) lvlSelect.value = "all";
    if (modSelect) modSelect.value = "all";

    syncCategoryPills();
    renderCourses();
  }

  function initCourseFilters() {
    const searchInput = document.getElementById("busca-curso");
    const catSelect = document.getElementById("filtro-categoria");
    const lvlSelect = document.getElementById("filtro-nivel");
    const modSelect = document.getElementById("filtro-modalidade");
    const clearBtn = document.getElementById("btn-limpar-filtros");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        renderCourses();
      });
    }

    if (catSelect) {
      catSelect.addEventListener("change", (e) => {
        state.category = e.target.value;
        syncCategoryPills();
        renderCourses();
      });
    }

    if (lvlSelect) {
      lvlSelect.addEventListener("change", (e) => {
        state.level = e.target.value;
        renderCourses();
      });
    }

    if (modSelect) {
      modSelect.addEventListener("change", (e) => {
        state.modality = e.target.value;
        renderCourses();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", resetFilters);
    }

    document.querySelectorAll("[data-quick-category]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-quick-category") || "all";
        state.category = cat;
        if (catSelect) catSelect.value = cat;
        syncCategoryPills();
        renderCourses();
      });
    });

    // Atalhos de filtro no rodapé
    document.querySelectorAll("[data-footer-filter]").forEach((link) => {
      link.addEventListener("click", () => {
        const cat = link.getAttribute("data-footer-filter") || "all";
        state.category = cat;
        if (catSelect) catSelect.value = cat;
        syncCategoryPills();
        renderCourses();
      });
    });

    // Delegação de eventos na grade de cursos
    const grid = document.getElementById("grade-cursos");
    if (grid) {
      grid.addEventListener("click", (ev) => {
        const modalBtn = ev.target.closest(".js-open-modal");
        if (modalBtn) {
          openCourseModal(modalBtn.getAttribute("data-course-id"), modalBtn);
          return;
        }

        const compareBtn = ev.target.closest(".js-toggle-compare");
        if (compareBtn) {
          toggleCourseComparison(compareBtn.getAttribute("data-course-id"));
          return;
        }

        const selectBtn = ev.target.closest(".js-select-course");
        if (selectBtn) {
          const courseId = selectBtn.getAttribute("data-course-id");
          const course = config.courses.find((c) => c.id === courseId);
          if (course) {
            prefillEnrollmentForm({
              courseTitle: course.title,
              cohortLabel: ""
            });
          }
        }
      });
    }
  }

  // 4. Modal Acessível de Detalhes do Curso
  function openCourseModal(courseId, triggerElement) {
    const course = config.courses.find((c) => c.id === courseId);
    const modal = document.getElementById("modal-curso");
    if (!course || !modal) return;

    state.activeModalCourseId = course.id;
    state.lastFocusedElement = triggerElement || document.activeElement;

    document.getElementById("modal-curso-categoria").textContent = `${course.category} • ${course.badge}`;
    document.getElementById("modal-curso-titulo").textContent = course.title;
    document.getElementById("modal-curso-resumo").textContent = course.shortDescription;
    document.getElementById("modal-curso-carga").textContent = `${course.workload} (${course.durationWeeks})`;
    document.getElementById("modal-curso-nivel").textContent = course.level;
    document.getElementById("modal-curso-modalidade").textContent = course.modality;
    document.getElementById("modal-curso-preco").textContent = course.demoPrice;
    document.getElementById("modal-curso-projeto").textContent = course.portfolioProject;
    document.getElementById("modal-curso-prereq").textContent = course.prerequisites;

    const toolsContainer = document.getElementById("modal-curso-ferramentas");
    toolsContainer.innerHTML = (course.tools || [])
      .map((t) => `<span class="instructor-tag">${escapeHtml(t)}</span>`)
      .join("");

    const syllabusContainer = document.getElementById("modal-curso-ementa");
    syllabusContainer.innerHTML = (course.syllabus || [])
      .map(
        (item) => `
        <div class="syllabus-item">
          <strong>${escapeHtml(item.module)}</strong>
          <p>${escapeHtml(item.topics)}</p>
        </div>
      `
      )
      .join("");

    syncModalCompareButton();

    modal.hidden = false;
    document.body.style.overflow = "hidden";

    const closeBtn = document.getElementById("btn-fechar-modal");
    if (closeBtn) closeBtn.focus();
  }

  function syncModalCompareButton() {
    const btnCompare = document.getElementById("btn-modal-comparar");
    if (!btnCompare || !state.activeModalCourseId) return;
    const isCompared = state.comparedCourseIds.includes(state.activeModalCourseId);
    btnCompare.textContent = isCompared
      ? "✓ Remover do comparador"
      : "+ Adicionar ao comparador";
  }

  function closeCourseModal() {
    const modal = document.getElementById("modal-curso");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    state.activeModalCourseId = null;
    if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === "function") {
      state.lastFocusedElement.focus();
    }
  }

  function initModalEvents() {
    const modal = document.getElementById("modal-curso");
    const closeBtn = document.getElementById("btn-fechar-modal");
    const modalCompareBtn = document.getElementById("btn-modal-comparar");
    const modalInterestBtn = document.getElementById("btn-modal-interesse");

    if (!modal) return;

    if (closeBtn) {
      closeBtn.addEventListener("click", closeCourseModal);
    }

    modal.addEventListener("click", (ev) => {
      if (ev.target === modal) {
        closeCourseModal();
      }
    });

    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && !modal.hidden) {
        closeCourseModal();
      }
    });

    if (modalCompareBtn) {
      modalCompareBtn.addEventListener("click", () => {
        if (state.activeModalCourseId) {
          toggleCourseComparison(state.activeModalCourseId);
          syncModalCompareButton();
        }
      });
    }

    if (modalInterestBtn) {
      modalInterestBtn.addEventListener("click", () => {
        const course = config.courses.find((c) => c.id === state.activeModalCourseId);
        closeCourseModal();
        if (course) {
          prefillEnrollmentForm({
            courseTitle: course.title,
            cohortLabel: ""
          });
        }
      });
    }
  }

  // 5. Comparador Interativo de até 3 Cursos
  function showComparatorAlert(message) {
    const alertEl = document.getElementById("aviso-limite-comparador");
    if (!alertEl) return;
    if (!message) {
      alertEl.hidden = true;
      alertEl.textContent = "";
      return;
    }
    alertEl.textContent = message;
    alertEl.hidden = false;
  }

  function toggleCourseComparison(courseId) {
    if (!courseId) return;
    const idx = state.comparedCourseIds.indexOf(courseId);

    if (idx >= 0) {
      state.comparedCourseIds.splice(idx, 1);
      showComparatorAlert("");
    } else {
      if (state.comparedCourseIds.length >= 3) {
        showComparatorAlert(
          "Limite atingido: você já selecionou 3 cursos para comparação. Desmarque um curso abaixo caso queira substituí-lo."
        );
        return;
      }
      state.comparedCourseIds.push(courseId);
      showComparatorAlert("");
    }

    renderCourses();
    renderComparator();
  }

  function renderComparator() {
    const count = state.comparedCourseIds.length;
    const navBadge = document.getElementById("nav-compare-count");
    const shortcutNum = document.getElementById("atalho-compare-num");
    const statusBadge = document.getElementById("status-comparador");
    const selectorContainer = document.getElementById("seletor-rapido-comparador");
    const tableContainer = document.getElementById("container-tabela-comparador");

    if (navBadge) navBadge.textContent = String(count);
    if (shortcutNum) shortcutNum.textContent = String(count);
    if (statusBadge) statusBadge.textContent = `${count} de 3 cursos selecionados`;

    if (selectorContainer) {
      selectorContainer.innerHTML = config.courses
        .map((c) => {
          const active = state.comparedCourseIds.includes(c.id);
          return `
            <button
              type="button"
              class="comp-toggle-btn ${active ? "is-active" : ""}"
              data-compare-quick="${escapeHtml(c.id)}"
              aria-pressed="${active ? "true" : "false"}"
            >
              ${active ? "✓ " : "+ "}${escapeHtml(c.title)}
            </button>
          `;
        })
        .join("");
    }

    if (!tableContainer) return;

    const selectedCourses = state.comparedCourseIds
      .map((id) => config.courses.find((c) => c.id === id))
      .filter(Boolean);

    if (selectedCourses.length === 0) {
      tableContainer.innerHTML = `
        <div class="empty-state" style="border:none;">
          <h3>Nenhum curso selecionado no comparador</h3>
          <p>Clique nos botões acima ou em "+ Comparar" nos cards da vitrine para comparar até 3 cursos lado a lado.</p>
        </div>
      `;
      return;
    }

    const headers = selectedCourses
      .map(
        (c) => `
        <th scope="col">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
            <span>${escapeHtml(c.title)}</span>
            <button
              type="button"
              class="btn btn--ghost btn--sm js-remove-compare"
              data-course-id="${escapeHtml(c.id)}"
              aria-label="Remover ${escapeHtml(c.title)} da comparação"
              style="padding:0.2rem 0.5rem; font-size:0.75rem;"
            >
              ✕
            </button>
          </div>
        </th>
      `
      )
      .join("");

    const rowCategory = selectedCourses.map((c) => `<td><span class="badge badge--cat">${escapeHtml(c.category)}</span></td>`).join("");
    const rowWorkload = selectedCourses.map((c) => `<td><strong>${escapeHtml(c.workload)}</strong> (${escapeHtml(c.durationWeeks)})</td>`).join("");
    const rowLevel = selectedCourses.map((c) => `<td>${escapeHtml(c.level)}</td>`).join("");
    const rowModality = selectedCourses.map((c) => `<td>${escapeHtml(c.modality)}</td>`).join("");
    const rowPrereq = selectedCourses.map((c) => `<td>${escapeHtml(c.prerequisites)}</td>`).join("");
    const rowTools = selectedCourses
      .map((c) => `<td>${escapeHtml((c.tools || []).join(", "))}</td>`)
      .join("");
    const rowProject = selectedCourses.map((c) => `<td>${escapeHtml(c.portfolioProject)}</td>`).join("");
    const rowPrice = selectedCourses
      .map(
        (c) =>
          `<td><strong style="color:var(--cyan-400);">${escapeHtml(c.demoPrice)}</strong><br/><small>${escapeHtml(c.demoInstallments)}</small></td>`
      )
      .join("");
    const rowActions = selectedCourses
      .map(
        (c) => `
        <td>
          <button
            type="button"
            class="btn btn--primary btn--sm js-compare-select"
            data-course-id="${escapeHtml(c.id)}"
          >
            Escolher este curso
          </button>
        </td>
      `
      )
      .join("");

    tableContainer.innerHTML = `
      <table class="compare-table" aria-label="Tabela comparativa de cursos selecionados">
        <thead>
          <tr>
            <th scope="col">Critério Técnico</th>
            ${headers}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Área / Categoria</th>
            ${rowCategory}
          </tr>
          <tr>
            <th scope="row">Carga Horária</th>
            ${rowWorkload}
          </tr>
          <tr>
            <th scope="row">Nível Recomendado</th>
            ${rowLevel}
          </tr>
          <tr>
            <th scope="row">Modalidade</th>
            ${rowModality}
          </tr>
          <tr>
            <th scope="row">Pré-requisitos</th>
            ${rowPrereq}
          </tr>
          <tr>
            <th scope="row">Ferramentas Principais</th>
            ${rowTools}
          </tr>
          <tr>
            <th scope="row">Projeto de Portfólio</th>
            ${rowProject}
          </tr>
          <tr>
            <th scope="row">Investimento (Demo)</th>
            ${rowPrice}
          </tr>
          <tr>
            <th scope="row">Ação Rápida</th>
            ${rowActions}
          </tr>
        </tbody>
      </table>
    `;
  }

  function initComparatorEvents() {
    const clearBtn = document.getElementById("btn-limpar-comparador");
    const selectorContainer = document.getElementById("seletor-rapido-comparador");
    const tableContainer = document.getElementById("container-tabela-comparador");

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        state.comparedCourseIds = [];
        showComparatorAlert("");
        renderCourses();
        renderComparator();
      });
    }

    if (selectorContainer) {
      selectorContainer.addEventListener("click", (ev) => {
        const btn = ev.target.closest("[data-compare-quick]");
        if (btn) {
          toggleCourseComparison(btn.getAttribute("data-compare-quick"));
        }
      });
    }

    if (tableContainer) {
      tableContainer.addEventListener("click", (ev) => {
        const removeBtn = ev.target.closest(".js-remove-compare");
        if (removeBtn) {
          toggleCourseComparison(removeBtn.getAttribute("data-course-id"));
          return;
        }

        const selectBtn = ev.target.closest(".js-compare-select");
        if (selectBtn) {
          const courseId = selectBtn.getAttribute("data-course-id");
          const course = config.courses.find((c) => c.id === courseId);
          if (course) {
            prefillEnrollmentForm({
              courseTitle: course.title,
              cohortLabel: ""
            });
          }
        }
      });
    }
  }

  // 6. Trilhas de Aprendizagem com Indicador Visual Ilustrativo de Progresso
  function renderTracks() {
    const container = document.getElementById("container-trilhas");
    if (!container) return;

    container.innerHTML = config.tracks
      .map((track) => {
        const completedSet = state.trackProgress[track.id] || new Set();
        const totalSteps = track.steps.length;
        const doneCount = completedSet.size;
        const pct = totalSteps > 0 ? Math.round((doneCount / totalSteps) * 100) : 0;

        const stepsHtml = track.steps
          .map((step) => {
            const isChecked = completedSet.has(step.stepId);
            return `
              <li class="track-step ${isChecked ? "is-done" : ""}">
                <label class="track-step__label">
                  <input
                    type="checkbox"
                    class="track-step__checkbox js-track-step-check"
                    data-track-id="${escapeHtml(track.id)}"
                    data-step-id="${escapeHtml(step.stepId)}"
                    ${isChecked ? "checked" : ""}
                  />
                  <div>
                    <span class="track-step__title">${escapeHtml(step.order)} — ${escapeHtml(step.title)} (${escapeHtml(step.hours)})</span>
                    <p class="track-step__desc">${escapeHtml(step.outcome)}</p>
                  </div>
                </label>
              </li>
            `;
          })
          .join("");

        return `
          <article class="track-card" data-track-card="${escapeHtml(track.id)}">
            <div class="track-card__header">
              <span class="badge badge--cat">${escapeHtml(track.totalHours)}</span>
              <h3 class="track-card__title" style="margin-top:0.5rem;">${escapeHtml(track.name)}</h3>
              <p class="track-card__subtitle">${escapeHtml(track.subtitle)}</p>
            </div>

            <div class="track-progress-box" aria-live="polite">
              <div class="track-progress-box__top">
                <span>Simulador ilustrativo de jornada (não salvo)</span>
                <strong>${doneCount} de ${totalSteps} etapas (${pct}%)</strong>
              </div>
              <div
                class="track-progress-bar"
                role="progressbar"
                aria-label="Progresso ilustrativo da ${escapeHtml(track.name)}"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${pct}"
              >
                <div class="track-progress-bar__fill" style="width: ${pct}%;"></div>
              </div>
            </div>

            <ul class="track-steps">
              ${stepsHtml}
            </ul>

            <button
              type="button"
              class="btn btn--outline btn--sm js-select-track"
              data-track-name="${escapeHtml(track.name)}"
            >
              Solicitar orientação sobre esta trilha
            </button>
          </article>
        `;
      })
      .join("");
  }

  function initTracksEvents() {
    const container = document.getElementById("container-trilhas");
    if (!container) return;

    container.addEventListener("change", (ev) => {
      const checkbox = ev.target.closest(".js-track-step-check");
      if (!checkbox) return;
      const trackId = checkbox.getAttribute("data-track-id");
      const stepId = checkbox.getAttribute("data-step-id");
      if (!trackId || !stepId) return;

      if (!state.trackProgress[trackId]) {
        state.trackProgress[trackId] = new Set();
      }

      if (checkbox.checked) {
        state.trackProgress[trackId].add(stepId);
      } else {
        state.trackProgress[trackId].delete(stepId);
      }
      renderTracks();
    });

    container.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".js-select-track");
      if (!btn) return;
      const trackName = btn.getAttribute("data-track-name");
      if (trackName) {
        prefillEnrollmentForm({
          courseTitle: trackName,
          cohortLabel: "Planejamento completo de Trilha"
        });
      }
    });
  }

  // 7. Cronograma de Turmas Fictícias e Editáveis
  function renderCohorts() {
    const container = document.getElementById("lista-turmas");
    if (!container) return;

    container.innerHTML = config.cohorts
      .map(
        (cohort) => `
        <article class="cohort-card">
          <div>
            <div class="cohort-card__top">
              <span class="cohort-code">${escapeHtml(cohort.code)}</span>
              <span class="cohort-status">${escapeHtml(cohort.status)}</span>
            </div>
            <h3 class="cohort-card__title">${escapeHtml(cohort.courseName)}</h3>
            <ul class="cohort-meta">
              <li><strong>Modalidade:</strong> ${escapeHtml(cohort.modality)}</li>
              <li><strong>Horário:</strong> ${escapeHtml(cohort.schedule)}</li>
              <li><strong>Início (Exemplo):</strong> ${escapeHtml(cohort.startDate)}</li>
              <li><strong>Vagas:</strong> ${escapeHtml(cohort.spotsLabel)}</li>
            </ul>
          </div>
          <button
            type="button"
            class="btn btn--outline btn--sm js-select-cohort"
            data-course-name="${escapeHtml(cohort.courseName)}"
            data-cohort-label="${escapeHtml(cohort.code)} — ${escapeHtml(cohort.schedule)}"
          >
            Tenho interesse nesta turma
          </button>
        </article>
      `
      )
      .join("");

    container.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".js-select-cohort");
      if (!btn) return;
      prefillEnrollmentForm({
        courseTitle: btn.getAttribute("data-course-name") || "",
        cohortLabel: btn.getAttribute("data-cohort-label") || ""
      });
    });
  }

  // 8. Projetos Práticos Demonstrativos e Instrutores
  function renderProjectsAndInstructors() {
    const projectsGrid = document.getElementById("grade-projetos");
    if (projectsGrid) {
      projectsGrid.innerHTML = config.projects
        .map(
          (proj) => `
          <article class="project-card">
            <img
              src="${escapeHtml(proj.image)}"
              alt="${escapeHtml(proj.imageAlt)}"
              width="420"
              height="240"
              loading="lazy"
            />
            <div class="project-card__body">
              <span class="project-card__cat">${escapeHtml(proj.category)}</span>
              <h3 class="project-card__title">${escapeHtml(proj.title)}</h3>
              <p class="project-card__desc">${escapeHtml(proj.description)}</p>
              <ul class="project-deliverables">
                ${(proj.deliverables || []).map((d) => `<li>${escapeHtml(d)}</li>`).join("")}
              </ul>
            </div>
          </article>
        `
        )
        .join("");
    }

    const instructorsGrid = document.getElementById("grade-instrutores");
    if (instructorsGrid) {
      instructorsGrid.innerHTML = config.instructors
        .map(
          (inst) => `
          <article class="instructor-card">
            <img
              src="${escapeHtml(inst.avatar)}"
              alt="Avatar ilustrativo de ${escapeHtml(inst.name)}"
              width="88"
              height="88"
              loading="lazy"
              class="instructor-card__avatar"
            />
            <h3 class="instructor-card__name">${escapeHtml(inst.name)}</h3>
            <p class="instructor-card__role">${escapeHtml(inst.role)}</p>
            <p class="instructor-card__bio">${escapeHtml(inst.bio)}</p>
            <div class="instructor-tags">
              ${(inst.tags || []).map((t) => `<span class="instructor-tag">${escapeHtml(t)}</span>`).join("")}
            </div>
          </article>
        `
        )
        .join("");
    }
  }

  // 9. Perguntas Frequentes (FAQ) em Acordeão Acessível
  function renderFaq() {
    const faqContainer = document.getElementById("lista-faq");
    if (!faqContainer) return;

    faqContainer.innerHTML = config.faqs
      .map((item, idx) => {
        const isFirst = idx === 0;
        const btnId = `faq-btn-${idx}`;
        const panelId = `faq-panel-${idx}`;
        return `
          <div class="faq-item">
            <h3>
              <button
                type="button"
                class="faq-question"
                id="${btnId}"
                aria-expanded="${isFirst ? "true" : "false"}"
                aria-controls="${panelId}"
              >
                <span>${escapeHtml(item.question)}</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
            </h3>
            <div
              id="${panelId}"
              class="faq-answer"
              role="region"
              aria-labelledby="${btnId}"
              ${isFirst ? "" : "hidden"}
            >
              <p>${escapeHtml(item.answer)}</p>
            </div>
          </div>
        `;
      })
      .join("");

    faqContainer.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".faq-question");
      if (!btn) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;

      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) {
        panel.hidden = expanded;
      }
    });
  }

  // 10. Formulário de Interesse (Pré-preenchimento + Validação + WhatsApp/Mailto)
  function populateFormSelects() {
    const courseSelect = document.getElementById("campo-curso");
    const cohortSelect = document.getElementById("campo-turma");

    if (courseSelect) {
      const courseOptions = config.courses
        .map((c) => `<option value="${escapeHtml(c.title)}">${escapeHtml(c.title)}</option>`)
        .join("");
      const trackOptions = config.tracks
        .map((t) => `<option value="${escapeHtml(t.name)}">${escapeHtml(t.name)} (Trilha Completa)</option>`)
        .join("");

      courseSelect.innerHTML = `
        <option value="">Selecione um curso ou trilha...</option>
        <optgroup label="Cursos Individuais">
          ${courseOptions}
        </optgroup>
        <optgroup label="Trilhas de Aprendizagem">
          ${trackOptions}
        </optgroup>
      `;
    }

    if (cohortSelect) {
      const cohortOptions = config.cohorts
        .map((ch) => {
          const val = `${ch.code} — ${ch.schedule}`;
          return `<option value="${escapeHtml(val)}">${escapeHtml(ch.code)} | ${escapeHtml(ch.courseName)} (${escapeHtml(ch.schedule)})</option>`;
        })
        .join("");

      cohortSelect.innerHTML = `
        <option value="Qualquer turma disponível / A definir">Qualquer turma disponível / A definir</option>
        <option value="Planejamento completo de Trilha">Planejamento completo de Trilha</option>
        ${cohortOptions}
      `;
    }
  }

  function prefillEnrollmentForm({ courseTitle, cohortLabel }) {
    const courseSelect = document.getElementById("campo-curso");
    const cohortSelect = document.getElementById("campo-turma");
    const banner = document.getElementById("banner-preenchimento");
    const bannerText = document.getElementById("texto-preenchimento");
    const section = document.getElementById("inscricao");

    if (courseSelect && courseTitle) {
      courseSelect.value = courseTitle;
    }

    if (cohortSelect && cohortLabel) {
      // Verifica se a opção existe; caso contrário, adiciona dinamicamente
      const exists = Array.from(cohortSelect.options).some((opt) => opt.value === cohortLabel);
      if (!exists) {
        const opt = document.createElement("option");
        opt.value = cohortLabel;
        opt.textContent = cohortLabel;
        cohortSelect.appendChild(opt);
      }
      cohortSelect.value = cohortLabel;
    }

    if (banner && bannerText) {
      banner.hidden = false;
      bannerText.textContent = cohortLabel
        ? `Pré-selecionado: ${courseTitle} (${cohortLabel}). Complete seus dados abaixo para falar com a equipe.`
        : `Pré-selecionado: ${courseTitle}. Complete seus dados abaixo para solicitar a ementa e condições.`;
    }

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const nameInput = document.getElementById("campo-nome");
        if (nameInput) nameInput.focus();
      }, 450);
    }
  }

  function setFieldError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (!errorEl) return;

    if (message) {
      errorEl.textContent = message;
      errorEl.hidden = false;
      if (input) input.setAttribute("aria-invalid", "true");
    } else {
      errorEl.textContent = "";
      errorEl.hidden = true;
      if (input) input.removeAttribute("aria-invalid");
    }
  }

  function validateForm() {
    let isValid = true;

    const nome = document.getElementById("campo-nome")?.value.trim() || "";
    const email = document.getElementById("campo-email")?.value.trim() || "";
    const telefone = document.getElementById("campo-telefone")?.value.trim() || "";
    const curso = document.getElementById("campo-curso")?.value.trim() || "";
    const consent = document.getElementById("campo-consentimento")?.checked || false;

    if (nome.length < 3) {
      setFieldError("campo-nome", "erro-nome", "Informe seu nome completo (mínimo de 3 caracteres).");
      isValid = false;
    } else {
      setFieldError("campo-nome", "erro-nome", "");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFieldError("campo-email", "erro-email", "Informe um endereço de e-mail válido.");
      isValid = false;
    } else {
      setFieldError("campo-email", "erro-email", "");
    }

    const digits = telefone.replace(/\D/g, "");
    if (digits.length < 10) {
      setFieldError("campo-telefone", "erro-telefone", "Informe um telefone ou WhatsApp válido com DDD.");
      isValid = false;
    } else {
      setFieldError("campo-telefone", "erro-telefone", "");
    }

    if (!curso) {
      setFieldError("campo-curso", "erro-curso", "Selecione o curso ou trilha de seu interesse.");
      isValid = false;
    } else {
      setFieldError("campo-curso", "erro-curso", "");
    }

    if (!consent) {
      setFieldError(
        "campo-consentimento",
        "erro-consentimento",
        "Confirme ciência sobre o funcionamento do envio para prosseguir."
      );
      isValid = false;
    } else {
      setFieldError("campo-consentimento", "erro-consentimento", "");
    }

    return isValid;
  }

  function buildMessagePayload() {
    const nome = document.getElementById("campo-nome")?.value.trim() || "";
    const email = document.getElementById("campo-email")?.value.trim() || "";
    const telefone = document.getElementById("campo-telefone")?.value.trim() || "";
    const curso = document.getElementById("campo-curso")?.value.trim() || "";
    const turma = document.getElementById("campo-turma")?.value.trim() || "";
    const nivel = document.getElementById("campo-nivel")?.value.trim() || "";
    const objetivo = document.getElementById("campo-objetivo")?.value.trim() || "";
    const mensagem = document.getElementById("campo-mensagem")?.value.trim() || "";

    const lines = [
      `Olá, equipe da ${config.brand.name}!`,
      `Gostaria de receber informações sobre formação técnica:`,
      ``,
      `• Nome: ${nome}`,
      `• E-mail: ${email}`,
      `• WhatsApp: ${telefone}`,
      `• Curso/Trilha: ${curso}`,
      `• Turma/Turno: ${turma}`,
      `• Nível atual: ${nivel}`,
      `• Objetivo: ${objetivo}`
    ];

    if (mensagem) {
      lines.push(`• Observações: ${mensagem}`);
    }

    return {
      subject: `[Interesse ${config.brand.name}] ${curso} - ${nome}`,
      body: lines.join("\n")
    };
  }

  function initInterestForm() {
    populateFormSelects();

    const form = document.getElementById("form-interesse");
    const btnWhats = document.getElementById("btn-enviar-whatsapp");
    const btnEmail = document.getElementById("btn-enviar-email");
    const feedback = document.getElementById("feedback-formulario");

    if (!form) return;

    if (btnWhats) {
      btnWhats.addEventListener("click", () => {
        state.submitChannel = "whatsapp";
      });
    }

    if (btnEmail) {
      btnEmail.addEventListener("click", () => {
        state.submitChannel = "email";
      });
    }

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      if (!validateForm()) {
        if (feedback) feedback.hidden = true;
        return;
      }

      const payload = buildMessagePayload();
      const encodedBody = encodeURIComponent(payload.body);
      const encodedSubject = encodeURIComponent(payload.subject);

      if (state.submitChannel === "email") {
        const mailtoUrl = `mailto:${config.contact.email}?subject=${encodedSubject}&body=${encodedBody}`;
        if (feedback) {
          feedback.hidden = false;
          feedback.innerHTML = `
            <strong>Mensagem preparada para E-mail!</strong> Seu aplicativo de e-mail padrão foi acionado para enviar a solicitação a <code>${escapeHtml(config.contact.email)}</code>.
          `;
        }
        window.location.href = mailtoUrl;
      } else {
        const cleanPhone = String(config.contact.whatsappNumber).replace(/\D/g, "");
        const whatsUrl = `https://wa.me/${cleanPhone}?text=${encodedBody}`;
        if (feedback) {
          feedback.hidden = false;
          feedback.innerHTML = `
            <strong>Mensagem preparada para o WhatsApp!</strong> Abrindo conversa codificada com <code>${escapeHtml(config.contact.whatsappDisplay)}</code> em nova aba.
          `;
        }
        window.open(whatsUrl, "_blank", "noopener,noreferrer");
      }
    });
  }

  // Inicialização geral quando o DOM estiver pronto
  document.addEventListener("DOMContentLoaded", () => {
    initBrandingAndContacts();
    initMobileNav();
    renderCourses();
    initCourseFilters();
    initModalEvents();
    renderComparator();
    initComparatorEvents();
    renderTracks();
    initTracksEvents();
    renderCohorts();
    renderProjectsAndInstructors();
    renderFaq();
    initInterestForm();
  });
})();
