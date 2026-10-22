/**
 * LINHA VIVA | Arquitetura e Interiores
 * Script Principal de Interações (main.js) — ES6+ Sem Dependências Externas
 */

(function () {
  "use strict";

  const CFG = window.LINHA_VIVA_CONFIG || {};

  // Dados detalhados dos 7 estudos conceituais (0 = Hero + 1..6 = Portfólio)
  const CONCEPT_PROJECTS = [
    {
      id: 0,
      category: "Projeto Destaque • Conceito Editorial",
      meta: "Estudo Volumétrico & Interiores • 380 m²",
      title: "Residência Vale Sereno — Conceito Editorial",
      image: "assets/img/hero-vale-sereno.svg",
      alt: "Perspectiva arquitetônica conceitual da Residência Vale Sereno com pé-direito duplo, brises de madeira, luz natural e mobiliário orgânico em tons de areia e terracota",
      description:
        "Estudo autoral que sintetiza a filosofia da Linha Viva: pé-direito duplo banhado por luz filtrada através de brises verticais em freijó, parede monolítica em travertino bruto e estar rebaixado com tecidos naturais.",
      specs: [
        "Controle solar passivo por brises verticais em madeira certificada",
        "Piso contínuo em pedra natural levigada de baixa manutenção",
        "Sanca iluminada linear 2700K integrada ao forro acústico",
        "Marcenaria de estar desenhada sob medida com encaixes ocultos"
      ],
      serviceMatch: "Arquitetura Residencial & Reforma"
    },
    {
      id: 1,
      category: "Estudo 01 • Residencial (Demonstração)",
      meta: "Nova Lima / MG (Estudo) • 420 m²",
      title: "Casa Mirante da Serra",
      image: "assets/img/proj-casa-mirante.svg",
      alt: "Projeto conceitual Casa Mirante da Serra: volumes em concreto aparente pigmentado, beirais em madeira certificada e integração com topografia em declive",
      description:
        "Concebida para um terreno em aclive acentuado, a residência acomoda-se na topografia por meio de dois prismas horizontais em concreto pigmentado em tom areia, preservando a permeabilidade visual para o vale.",
      specs: [
        "Implantação escalonada que reduz movimentação excessiva de terra",
        "Painéis camarão em freijó para proteção da fachada oeste",
        "Integração total entre estar interno, varanda e espelho d'água",
        "Infraestrutura prevista para captação pluvial e painéis fotovoltaicos"
      ],
      serviceMatch: "Arquitetura Residencial & Reforma"
    },
    {
      id: 2,
      category: "Estudo 02 • Interiores (Demonstração)",
      meta: "São Paulo / SP (Estudo) • 210 m²",
      title: "Apartamento Alvorada Jardins",
      image: "assets/img/proj-apartamento-jardins.svg",
      alt: "Projeto conceitual Apartamento Alvorada Jardins: living integrado com painéis em freijó natural, bancada monolítica em quartzito e iluminação linear",
      description:
        "Retrofit interno de apartamento originalmente compartimentado. A eliminação de alvenarias não estruturais permitiu criar um eixo social contínuo revestido por painéis de madeira natural com portas mimetizadas.",
      specs: [
        "Ilha gourmet monolítica em quartzito brasileiro escovado",
        "Painel em marcenaria acústica ocultando acesso íntimo e lavabo",
        "Projeto luminotécnico com cenas independentes para jantar e leitura",
        "Compatibilização de ar-condicionado dutado com grelhas lineares discretas"
      ],
      serviceMatch: "Arquitetura de Interiores"
    },
    {
      id: 3,
      category: "Estudo 03 • Comercial (Demonstração)",
      meta: "Pinheiros / SP (Estudo) • 165 m²",
      title: "Flagship & Atelier Botânico Raiz",
      image: "assets/img/proj-atelier-botanico.svg",
      alt: "Projeto conceitual Flagship e Atelier Botânico Raiz: arquitetura comercial sensorial com expositores em terracota, arcos acústicos e ilha central de atendimento",
      description:
        "Arquitetura comercial voltada à desaceleração no varejo físico. O percurso em torno da ilha central revestida em terracota canelada convida à experimentação tátil dos produtos com iluminação suave.",
      specs: [
        "Três pórticos arqueados com iluminação embutida para exposição",
        "Balcão central de atendimento e lavatório de testes em pedra sabão e argila",
        "Pintura mineral respirável nas paredes em tom areia quente",
        "Estoque rápido mimetizado na marcenaria posterior"
      ],
      serviceMatch: "Arquitetura Comercial"
    },
    {
      id: 4,
      category: "Estudo 04 • Interiores (Demonstração)",
      meta: "Rio de Janeiro / RJ (Estudo) • 280 m²",
      title: "Cobertura Horizonte Atlântico",
      image: "assets/img/proj-cobertura-leblon.svg",
      alt: "Projeto conceitual Cobertura Horizonte Atlântico: terraço gourmet integrado ao estar com pérgola bioclimática e marcenaria sob medida resistente à maresia",
      description:
        "Projeto de interiores e área externa para cobertura litorânea. Prioriza materiais resistentes à salinidade e ventilação permanente, dissolvendo a fronteira entre sala de estar e terraço descoberto.",
      specs: [
        "Nivelamento de piso interno e externo em travertino não polido antiderrapante",
        "Pérgola superior com lâminas orientáveis para controle de insolação",
        "Ferragens em aço inox 316 e tecidos acrílicos com toque de linho natural",
        "Curadoria de mobiliário assinado nacional e vasos em cerâmica de alta temperatura"
      ],
      serviceMatch: "Arquitetura de Interiores"
    },
    {
      id: 5,
      category: "Estudo 05 • Comercial (Demonstração)",
      meta: "Curitiba / PR (Estudo) • 240 m²",
      title: "Café & Galeria Croma Editorial",
      image: "assets/img/proj-galeria-croma.svg",
      alt: "Projeto conceitual Café e Galeria Croma Editorial: espaço híbrido de gastronomia e arte com bancada em concreto pigmentado, iluminação museográfica e acústica absorvente",
      description:
        "Espaço híbrido que articula cafeteria de especialidade, livraria de arquitetura e galeria expositiva. O desenho separa o fluxo rápido de balcão das áreas de permanência silenciosa e leitura.",
      specs: [
        "Forro fonoabsorvente contínuo para controle de reverberação sonora",
        "Trilhos eletrificados com projetores IRC > 95 para fidelidade cromática das obras",
        "Bancada de barismo de 6 metros em concreto moldado pigmentado em terracota",
        "Acessibilidade universal integral em todos os níveis e sanitários"
      ],
      serviceMatch: "Arquitetura Comercial"
    },
    {
      id: 6,
      category: "Estudo 06 • Residencial (Demonstração)",
      meta: "Campos do Jordão / SP (Estudo) • 310 m²",
      title: "Pavilhão Vento Sul — Mantiqueira",
      image: "assets/img/proj-refugio-mantiqueira.svg",
      alt: "Projeto conceitual Pavilhão Vento Sul: refúgio de montanha em estrutura mista de aço oxidado, pedra natural e madeira engenheirada com lareira central suspensa",
      description:
        "Refúgio residencial em clima de altitude projetado com construção seca racionalizada. A cobertura inclinada em madeira laminada colada (MLC) abriga o estar integrado aquecido por lareira metálica central.",
      specs: [
        "Sistema construtivo limpo e rápido em madeira engenheirada e aço",
        "Esquadrias com corte térmico e vidros duplos insulados",
        "Embasamento em pedra moledo local dialogando com a topografia",
        "Aquecimento de piso nos banheiros e iluminação indireta nos caibros"
      ],
      serviceMatch: "Arquitetura Residencial & Reforma"
    }
  ];

  // 1. APLICAR CONFIGURAÇÕES DO CLIENTE (config.js)
  function applyClientConfig() {
    const yearEl = document.getElementById("ano-atual");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    if (!CFG.brand || !CFG.contact) return;

    document.querySelectorAll('[data-config="brand-name"]').forEach((el) => {
      el.textContent = CFG.brand.name;
    });
    document.querySelectorAll('[data-config="brand-tagline"]').forEach((el) => {
      el.textContent = CFG.brand.tagline;
    });
    document.querySelectorAll('[data-config="whatsapp-display"]').forEach((el) => {
      el.textContent = CFG.contact.whatsappDisplay;
    });
    document.querySelectorAll('[data-config="email-display"]').forEach((el) => {
      el.textContent = CFG.contact.email;
    });
    document.querySelectorAll('[data-config="address-display"]').forEach((el) => {
      el.textContent = CFG.contact.addressDisplay;
    });
    document.querySelectorAll('[data-config="hours-display"]').forEach((el) => {
      el.textContent = CFG.contact.officeHours;
    });
    document.querySelectorAll('[data-config="city-display"]').forEach((el) => {
      el.textContent = CFG.contact.cityState;
    });
    document.querySelectorAll('[data-config="legal-notice"]').forEach((el) => {
      el.textContent = CFG.brand.legalNotice;
    });

    const igLink = document.querySelector('[data-config-href="instagram"]');
    if (igLink && CFG.contact.instagramUrl) igLink.href = CFG.contact.instagramUrl;

    const pinLink = document.querySelector('[data-config-href="pinterest"]');
    if (pinLink && CFG.contact.pinterestUrl) pinLink.href = CFG.contact.pinterestUrl;

    const inLink = document.querySelector('[data-config-href="linkedin"]');
    if (inLink && CFG.contact.linkedinUrl) inLink.href = CFG.contact.linkedinUrl;
  }

  // 2. CABEÇALHO E MENU MOBILE ACESSÍVEL
  function initNavigation() {
    const header = document.getElementById("cabecalho");
    const toggleBtn = document.getElementById("menu-toggle");
    const nav = document.getElementById("menu-navegacao");

    if (header) {
      window.addEventListener(
        "scroll",
        () => {
          header.classList.toggle("is-scrolled", window.scrollY > 24);
        },
        { passive: true }
      );
    }

    if (!toggleBtn || !nav) return;

    function closeMenu(returnFocus = false) {
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "Abrir menu de navegação");
      nav.classList.remove("is-open");
      if (returnFocus) toggleBtn.focus();
    }

    function openMenu() {
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.setAttribute("aria-label", "Fechar menu de navegação");
      nav.classList.add("is-open");
    }

    toggleBtn.addEventListener("click", () => {
      const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 980) closeMenu(false);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });
  }

  // 3. FILTRO DE PORTFÓLIO
  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
    const cards = document.querySelectorAll(".project-card[data-category]");
    const statusEl = document.getElementById("portfolio-status");

    if (!filterBtns.length || !cards.length) return;

    const categoryNames = {
      todos: "estudos conceituais",
      residencial: "estudos residenciais",
      interiores: "estudos de interiores",
      comercial: "estudos comerciais"
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selected = btn.getAttribute("data-filter") || "todos";

        filterBtns.forEach((b) => {
          const isCurrent = b === btn;
          b.classList.toggle("is-active", isCurrent);
          b.setAttribute("aria-pressed", isCurrent ? "true" : "false");
        });

        let visibleCount = 0;
        cards.forEach((card) => {
          const cat = card.getAttribute("data-category");
          const match = selected === "todos" || cat === selected;
          card.hidden = !match;
          if (match) visibleCount += 1;
        });

        if (statusEl) {
          const label = categoryNames[selected] || "estudos conceituais";
          statusEl.textContent = `Exibindo ${visibleCount} de ${cards.length} ${label}`;
        }
      });
    });
  }

  // 4. LIGHTBOX ACESSÍVEL COM NAVEGAÇÃO POR TECLADO
  function initLightbox(selectServiceCallback) {
    const modal = document.getElementById("portfolio-lightbox");
    if (!modal) return;

    const imgEl = document.getElementById("lightbox-img");
    const catEl = document.getElementById("lightbox-category");
    const countEl = document.getElementById("lightbox-counter");
    const metaEl = document.getElementById("lightbox-meta");
    const titleEl = document.getElementById("lightbox-title");
    const descEl = document.getElementById("lightbox-desc");
    const specsListEl = document.getElementById("lightbox-specs-list");
    const ctaBtn = document.getElementById("lightbox-cta-btn");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    let currentIndex = 0;
    let lastFocusedElement = null;

    function renderProject(index) {
      const total = CONCEPT_PROJECTS.length;
      currentIndex = (index + total) % total;
      const item = CONCEPT_PROJECTS[currentIndex];

      if (imgEl) {
        imgEl.src = item.image;
        imgEl.alt = item.alt;
      }
      if (catEl) catEl.textContent = item.category;
      if (countEl) countEl.textContent = `Estudo ${currentIndex + 1} de ${total}`;
      if (metaEl) metaEl.textContent = item.meta;
      if (titleEl) titleEl.textContent = item.title;
      if (descEl) descEl.textContent = item.description;

      if (specsListEl) {
        specsListEl.innerHTML = "";
        item.specs.forEach((spec) => {
          const li = document.createElement("li");
          li.textContent = spec;
          specsListEl.appendChild(li);
        });
      }

      if (ctaBtn) {
        ctaBtn.setAttribute("data-service-target", item.serviceMatch);
        ctaBtn.setAttribute("data-project-target", item.title);
      }
    }

    function openLightbox(index, triggerEl) {
      lastFocusedElement = triggerEl || document.activeElement;
      renderProject(index);
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      if (modal.hidden) return;
      modal.hidden = true;
      document.body.style.overflow = "";
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }

    document.querySelectorAll("[data-open-lightbox]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-open-lightbox") || "0", 10);
        openLightbox(idx, btn);
      });
    });

    modal.querySelectorAll("[data-close-lightbox]").forEach((el) => {
      el.addEventListener("click", closeLightbox);
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => renderProject(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => renderProject(currentIndex + 1));
    }

    if (ctaBtn) {
      ctaBtn.addEventListener("click", () => {
        const service = ctaBtn.getAttribute("data-service-target") || "Arquitetura de Interiores";
        const projectTitle = ctaBtn.getAttribute("data-project-target") || "";
        closeLightbox();
        if (typeof selectServiceCallback === "function") {
          selectServiceCallback(service, projectTitle);
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (modal.hidden) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        renderProject(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        renderProject(currentIndex + 1);
      } else if (e.key === "Tab") {
        // Trap focus inside modal
        const focusable = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // 5. SLIDER INTERATIVO ANTES / DEPOIS
  function initBeforeAfterSlider() {
    const stage = document.getElementById("ba-stage");
    const range = document.getElementById("ba-range");
    const beforeClip = document.getElementById("ba-before-clip");
    const beforeImg = beforeClip ? beforeClip.querySelector("img") : null;
    const handle = document.getElementById("ba-handle");
    const presetBtns = document.querySelectorAll("[data-ba-preset]");

    if (!stage || !range || !beforeClip || !handle) return;

    function syncBeforeImageWidth() {
      if (beforeImg && stage.clientWidth > 0) {
        beforeImg.style.width = `${stage.clientWidth}px`;
      }
    }

    function updatePosition(percentValue) {
      const clamped = Math.max(5, Math.min(95, Number(percentValue) || 50));
      range.value = String(clamped);
      beforeClip.style.width = `${clamped}%`;
      handle.style.left = `${clamped}%`;

      presetBtns.forEach((btn) => {
        const presetVal = Number(btn.getAttribute("data-ba-preset"));
        btn.classList.toggle("is-active", Math.abs(presetVal - clamped) <= 5);
      });
    }

    range.addEventListener("input", (e) => {
      updatePosition(e.target.value);
    });

    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetVal = btn.getAttribute("data-ba-preset") || "50";
        updatePosition(targetVal);
      });
    });

    window.addEventListener("resize", syncBeforeImageWidth, { passive: true });
    syncBeforeImageWidth();
    updatePosition(50);
  }

  // 6. SIMULADOR INTERATIVO DE ESCOPO
  function initScopeEstimator(applyScopeToBriefingCallback) {
    const typeBtns = document.querySelectorAll("[data-est-type]");
    const areaBtns = document.querySelectorAll("[data-est-area]");
    const modBtns = document.querySelectorAll("[data-est-mod]");

    const badgeEl = document.getElementById("est-complexity-badge");
    const titleEl = document.getElementById("est-result-title");
    const metaEl = document.getElementById("est-result-meta");
    const timelineEl = document.getElementById("est-timeline-value");
    const listEl = document.getElementById("est-deliverables-list");
    const applyBtn = document.getElementById("btn-apply-scope");

    if (!typeBtns.length || !areaBtns.length || !modBtns.length) return;

    const state = {
      type: "Residencial (Apartamento ou Casa)",
      areaKey: "de70a150",
      areaLabel: "70 m² a 150 m²",
      modKey: "completo"
    };

    const complexityLabels = {
      consultoria: "COMPLEXIDADE TÉCNICA: ÁGIL / SEM OBRA CIVIL",
      completo: "COMPLEXIDADE TÉCNICA: MÉDIA-ALTA (DETALHAMENTO 1:20)",
      reforma: "COMPLEXIDADE TÉCNICA: ALTA (COMPATIBILIZAÇÃO & OBRA CIVIL)"
    };

    function updateEstimatorView() {
      const rules =
        CFG.scopeRules && CFG.scopeRules.modalities && CFG.scopeRules.modalities[state.modKey]
          ? CFG.scopeRules.modalities[state.modKey]
          : null;

      if (!rules) return;

      if (badgeEl) {
        badgeEl.textContent = complexityLabels[state.modKey] || "COMPLEXIDADE TÉCNICA: PERSONALIZADA";
      }
      if (titleEl) {
        titleEl.textContent = rules.label;
      }
      if (metaEl) {
        metaEl.textContent = `Tipologia: ${state.type} • Área: ${state.areaLabel}`;
      }

      const weeks = rules.baseWeeks[state.areaKey] || [8, 12];
      if (timelineEl) {
        timelineEl.textContent = `${weeks[0]} a ${weeks[1]} semanas`;
      }

      if (listEl) {
        listEl.innerHTML = "";
        rules.deliverables.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          listEl.appendChild(li);
        });
      }
    }

    function bindRadioGroup(buttons, onSelect) {
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => {
            const active = b === btn;
            b.classList.toggle("is-selected", active);
            b.setAttribute("aria-checked", active ? "true" : "false");
          });
          onSelect(btn);
          updateEstimatorView();
        });
      });
    }

    bindRadioGroup(typeBtns, (btn) => {
      state.type = btn.getAttribute("data-est-type") || state.type;
    });

    bindRadioGroup(areaBtns, (btn) => {
      state.areaKey = btn.getAttribute("data-est-area") || state.areaKey;
      state.areaLabel = btn.getAttribute("data-area-label") || state.areaLabel;
    });

    bindRadioGroup(modBtns, (btn) => {
      state.modKey = btn.getAttribute("data-est-mod") || state.modKey;
    });

    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        if (typeof applyScopeToBriefingCallback === "function") {
          applyScopeToBriefingCallback({ ...state });
        }
      });
    }

    updateEstimatorView();
  }

  // 7. FAQ EM ACORDEÃO ACESSÍVEL
  function initFaqAccordion() {
    const triggers = document.querySelectorAll(".faq-trigger");
    if (!triggers.length) return;

    triggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isExpanded = btn.getAttribute("aria-expanded") === "true";
        const panelId = btn.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;

        btn.setAttribute("aria-expanded", isExpanded ? "false" : "true");
        if (panel) {
          panel.hidden = isExpanded;
        }
      });
    });
  }

  // 8. FORMULÁRIO DE BRIEFING, PROGRESSO, CÓPIA E ENVIO WHATSAPP/MAILTO
  function initBriefingForm() {
    const form = document.getElementById("briefing-form");
    if (!form) return {};

    const fields = {
      nome: document.getElementById("bf-nome"),
      contato: document.getElementById("bf-contato"),
      tipoImovel: document.getElementById("bf-tipo-imovel"),
      servico: document.getElementById("bf-servico"),
      metragem: document.getElementById("bf-metragem"),
      cidade: document.getElementById("bf-cidade"),
      prazo: document.getElementById("bf-prazo"),
      descricao: document.getElementById("bf-descricao")
    };

    const progressText = document.getElementById("form-progress-text");
    const progressBar = document.getElementById("form-progress-bar");
    const progressFill = document.getElementById("form-progress-fill");
    const previewEl = document.getElementById("briefing-preview-text");
    const copyBtn = document.getElementById("btn-copy-briefing");
    const emailBtn = document.getElementById("btn-send-email");
    const feedbackEl = document.getElementById("form-feedback");

    function getValues() {
      return {
        nome: fields.nome ? fields.nome.value.trim() : "",
        contato: fields.contato ? fields.contato.value.trim() : "",
        tipoImovel: fields.tipoImovel ? fields.tipoImovel.value.trim() : "",
        servico: fields.servico ? fields.servico.value.trim() : "",
        metragem: fields.metragem ? fields.metragem.value.trim() : "",
        cidade: fields.cidade ? fields.cidade.value.trim() : "",
        prazo: fields.prazo ? fields.prazo.value.trim() : "",
        descricao: fields.descricao ? fields.descricao.value.trim() : ""
      };
    }

    function buildFormattedSummary(vals) {
      return [
        "SOLICITAÇÃO DE PROPOSTA — LINHA VIVA ARQUITETURA E INTERIORES",
        "------------------------------------------------------------",
        `• Nome: ${vals.nome || "(Não informado)"}`,
        `• Contato de retorno: ${vals.contato || "(Não informado)"}`,
        `• Tipo de imóvel: ${vals.tipoImovel || "(Não selecionado)"}`,
        `• Modalidade desejada: ${vals.servico || "(Não selecionada)"}`,
        `• Metragem aproximada: ${vals.metragem || "(Não informada)"}`,
        `• Cidade / UF: ${vals.cidade || "(Não informada)"}`,
        `• Previsão de início: ${vals.prazo || "(Não informada)"}`,
        `• Objetivos e descrição: ${vals.descricao || "(Não informado)"}`
      ].join("\n");
    }

    function updateProgressAndPreview() {
      const vals = getValues();
      const keys = Object.keys(vals);
      const filledCount = keys.filter((k) => vals[k].length > 0).length;
      const percent = Math.round((filledCount / keys.length) * 100);

      if (progressText) progressText.textContent = `${percent}% preenchido`;
      if (progressBar) progressBar.setAttribute("aria-valuenow", String(percent));
      if (progressFill) progressFill.style.width = `${percent}%`;

      if (previewEl) {
        if (filledCount === 0) {
          previewEl.textContent =
            "Preencha os campos acima para visualizar o resumo formatado do seu briefing.";
        } else {
          previewEl.textContent = buildFormattedSummary(vals);
        }
      }
    }

    function setFieldError(inputEl, errorId, message) {
      const errSpan = document.getElementById(errorId);
      if (!inputEl || !errSpan) return;

      if (message) {
        inputEl.classList.add("is-invalid");
        inputEl.setAttribute("aria-invalid", "true");
        errSpan.textContent = message;
        errSpan.hidden = false;
      } else {
        inputEl.classList.remove("is-invalid");
        inputEl.removeAttribute("aria-invalid");
        errSpan.textContent = "";
        errSpan.hidden = true;
      }
    }

    function showFeedback(message, type = "success") {
      if (!feedbackEl) return;
      feedbackEl.textContent = message;
      feedbackEl.className = `form-feedback ${type === "error" ? "is-error" : "is-success"}`;
      feedbackEl.hidden = false;
    }

    function validateAll() {
      const vals = getValues();
      let firstInvalid = null;

      const checks = [
        {
          el: fields.nome,
          errId: "err-nome",
          valid: vals.nome.length >= 3,
          msg: "Por favor, informe seu nome completo (mínimo de 3 caracteres)."
        },
        {
          el: fields.contato,
          errId: "err-contato",
          valid: vals.contato.length >= 6,
          msg: "Informe um telefone/WhatsApp com DDD ou um endereço de e-mail válido."
        },
        {
          el: fields.tipoImovel,
          errId: "err-tipo-imovel",
          valid: vals.tipoImovel.length > 0,
          msg: "Selecione o tipo de imóvel."
        },
        {
          el: fields.servico,
          errId: "err-servico",
          valid: vals.servico.length > 0,
          msg: "Selecione o serviço ou modalidade desejada."
        },
        {
          el: fields.metragem,
          errId: "err-metragem",
          valid: vals.metragem.length >= 1,
          msg: "Informe a metragem aproximada (ex.: 120 m²)."
        },
        {
          el: fields.cidade,
          errId: "err-cidade",
          valid: vals.cidade.length >= 2,
          msg: "Informe a cidade e UF do imóvel."
        },
        {
          el: fields.prazo,
          errId: "err-prazo",
          valid: vals.prazo.length > 0,
          msg: "Selecione a previsão estimada para início."
        },
        {
          el: fields.descricao,
          errId: "err-descricao",
          valid: vals.descricao.length >= 10,
          msg: "Descreva brevemente seus objetivos para o espaço (mínimo de 10 caracteres)."
        }
      ];

      checks.forEach((chk) => {
        if (!chk.valid) {
          setFieldError(chk.el, chk.errId, chk.msg);
          if (!firstInvalid) firstInvalid = chk.el;
        } else {
          setFieldError(chk.el, chk.errId, "");
        }
      });

      if (firstInvalid) {
        showFeedback(
          "Por favor, revise os campos destacados antes de prosseguir com o envio.",
          "error"
        );
        firstInvalid.focus();
        return false;
      }

      return true;
    }

    // Monitorar digitação em tempo real
    Object.values(fields).forEach((el) => {
      if (!el) return;
      el.addEventListener("input", () => {
        updateProgressAndPreview();
        const errId = el.getAttribute("aria-describedby");
        if (errId && el.value.trim().length > 0) {
          setFieldError(el, errId, "");
        }
      });
      el.addEventListener("change", updateProgressAndPreview);
    });

    // Botão Copiar Resumo do Briefing
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const vals = getValues();
        const summary = buildFormattedSummary(vals);

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(summary);
          } else {
            const tempArea = document.createElement("textarea");
            tempArea.value = summary;
            tempArea.setAttribute("readonly", "");
            tempArea.style.position = "absolute";
            tempArea.style.left = "-9999px";
            document.body.appendChild(tempArea);
            tempArea.select();
            document.execCommand("copy");
            document.body.removeChild(tempArea);
          }
          const originalLabel = copyBtn.textContent;
          copyBtn.textContent = "✓ Resumo copiado!";
          showFeedback(
            "Resumo do briefing copiado para a área de transferência com sucesso.",
            "success"
          );
          setTimeout(() => {
            copyBtn.textContent = originalLabel;
          }, 3000);
        } catch (err) {
          showFeedback(
            "Não foi possível copiar automaticamente. Selecione o texto no quadro de resumo acima.",
            "error"
          );
        }
      });
    }

    // Envio por WhatsApp (Submit padrão)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateAll()) return;

      const vals = getValues();
      const summary = buildFormattedSummary(vals);
      const phone =
        CFG.contact && CFG.contact.whatsappNumber ? CFG.contact.whatsappNumber : "5511999990000";
      const waUrl = `https://wa.me/${encodeURIComponent(phone)}?text=${encodeURIComponent(summary)}`;

      showFeedback(
        "Briefing validado! Abrindo o WhatsApp com o resumo codificado para revisão e envio...",
        "success"
      );
      window.open(waUrl, "_blank", "noopener,noreferrer");
    });

    // Envio por E-mail (mailto:)
    if (emailBtn) {
      emailBtn.addEventListener("click", () => {
        if (!validateAll()) return;

        const vals = getValues();
        const summary = buildFormattedSummary(vals);
        const emailTo =
          CFG.contact && CFG.contact.email
            ? CFG.contact.email
            : "contato@linhaviva-demo.arquitetura.br";
        const subject = `Solicitação de Proposta — ${vals.servico} (${vals.nome})`;
        const mailtoUrl = `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(summary)}`;

        showFeedback(
          "Briefing validado! Abrindo seu aplicativo de e-mail padrão com os dados preenchidos...",
          "success"
        );
        window.location.href = mailtoUrl;
      });
    }

    // Funções auxiliares para pré-preenchimento a partir de CTAs da página
    function preselectService(serviceName, projectRef = "") {
      if (fields.servico && serviceName) {
        fields.servico.value = serviceName;
      }
      if (projectRef && fields.descricao) {
        const prefix = `Referência de interesse no portfólio: ${projectRef}. `;
        if (!fields.descricao.value.includes(projectRef)) {
          fields.descricao.value = prefix + fields.descricao.value;
        }
      }
      updateProgressAndPreview();
      const briefingSection = document.getElementById("briefing");
      if (briefingSection) {
        briefingSection.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => {
        if (fields.nome && !fields.nome.value) {
          fields.nome.focus();
        } else if (fields.servico) {
          fields.servico.focus();
        }
      }, 450);
    }

    function applyEstimatorScope(scopeState) {
      if (!scopeState) return;

      // Mapear tipologia
      if (fields.tipoImovel) {
        if (scopeState.type.includes("Comercial")) {
          fields.tipoImovel.value = "Imóvel Comercial (Loja, Clínica, Café, Escritório)";
        } else if (scopeState.type.includes("Ambiente")) {
          fields.tipoImovel.value = "Ambiente específico (Living, Suíte, Cozinha)";
        } else {
          fields.tipoImovel.value = "Apartamento existente (reforma)";
        }
      }

      // Mapear modalidade
      if (fields.servico) {
        const modMap = {
          completo: "Arquitetura de Interiores",
          reforma: "Reforma e Retrofit Completo",
          consultoria: "Consultoria de Ambientes"
        };
        fields.servico.value = modMap[scopeState.modKey] || "Arquitetura de Interiores";
      }

      // Mapear metragem
      if (fields.metragem && scopeState.areaLabel) {
        fields.metragem.value = scopeState.areaLabel;
      }

      // Adicionar nota na descrição se estiver vazia
      if (fields.descricao && !fields.descricao.value.trim()) {
        fields.descricao.value = `Escopo simulado na página: ${scopeState.type}, faixa de ${scopeState.areaLabel}. Busco proposta detalhada para ${fields.servico ? fields.servico.value : "o projeto"}.`;
      }

      updateProgressAndPreview();
      showFeedback(
        "Escopo do simulador transferido para o seu briefing! Complete seu nome, contato e cidade para enviar.",
        "success"
      );

      const briefingSection = document.getElementById("briefing");
      if (briefingSection) {
        briefingSection.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => {
        if (fields.nome) fields.nome.focus();
      }, 450);
    }

    // Conectar botões [data-select-service] espalhados pela página
    document.querySelectorAll("[data-select-service]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const srv = btn.getAttribute("data-select-service") || "";
        const proj = btn.getAttribute("data-project-ref") || "";
        preselectService(srv, proj);
      });
    });

    updateProgressAndPreview();

    return {
      preselectService,
      applyEstimatorScope
    };
  }

  function initAll() {
    if (window.__LINHA_VIVA_READY) return;
    window.__LINHA_VIVA_READY = true;
    applyClientConfig();
    initNavigation();
    initPortfolioFilter();
    initBeforeAfterSlider();
    initFaqAccordion();

    const briefingController = initBriefingForm();
    initLightbox(briefingController.preselectService);
    initScopeEstimator(briefingController.applyEstimatorScope);
  }

  // Inicialização segura independentemente do momento de carregamento do script
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
