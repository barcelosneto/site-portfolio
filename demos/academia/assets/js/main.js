/**
 * PULSO FIT | Academia e Treinamento
 * Script principal de interatividade (assets/js/main.js)
 * Depende de: window.PULSO_CONFIG (carregado em assets/js/config.js)
 */
(function () {
  "use strict";

  const config = window.PULSO_CONFIG || {};

  // Estado da aplicação
  const state = {
    selectedModalityFilter: "todas",
    selectedDayFilter: "todos",
    selectedBillingCycle: "anual"
  };

  /**
   * Utilitário para formatar moeda em Real Brasileiro (pt-BR)
   */
  function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  /**
   * Utilitário para construir URL do WhatsApp com mensagem codificada
   */
  function buildWhatsAppUrl(message) {
    const rawPhone =
      (config.contact && config.contact.whatsappNumber) || "5511999990000";
    const cleanPhone = String(rawPhone).replace(/\D/g, "");
    return (
      "https://wa.me/" +
      cleanPhone +
      "?text=" +
      encodeURIComponent(message)
    );
  }

  /**
   * Utilitário para construir URL mailto: com assunto e corpo codificados
   */
  function buildMailtoUrl(subject, body) {
    const email =
      (config.contact && config.contact.email) ||
      "contato.demo@pulsofit.exemplo.br";
    return (
      "mailto:" +
      email +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  /**
   * 1. Sincroniza dados configuráveis do cliente (config.js) no DOM
   */
  function applyClientConfig() {
    if (!config.brand || !config.contact) return;

    const demoWarnEl = document.querySelector('[data-config="demo-warning"]');
    if (demoWarnEl && config.brand.demoWarning) {
      demoWarnEl.textContent = config.brand.demoWarning;
    }

    document.querySelectorAll('[data-config="brand-name"]').forEach((el) => {
      el.textContent = config.brand.name;
    });

    const addr1 = document.querySelector('[data-config="address-line1"]');
    if (addr1) addr1.textContent = config.contact.addressLine1;

    const addr2 = document.querySelector('[data-config="address-line2"]');
    if (addr2) addr2.textContent = config.contact.addressLine2;

    const whatsDisp = document.querySelector('[data-config="whatsapp-display"]');
    if (whatsDisp) whatsDisp.textContent = config.contact.whatsappDisplay;

    const phoneDisp = document.querySelector('[data-config="phone-display"]');
    if (phoneDisp) phoneDisp.textContent = config.contact.phoneDisplay;

    const emailLink = document.querySelector('[data-config="email-link"]');
    if (emailLink) {
      emailLink.textContent = config.contact.email;
      emailLink.setAttribute("href", "mailto:" + config.contact.email);
    }

    const mapsLink = document.querySelector('[data-config="maps-link"]');
    if (mapsLink && config.contact.googleMapsQuery) {
      mapsLink.setAttribute("href", config.contact.googleMapsQuery);
    }

    const directWa = document.getElementById("contact-whatsapp-direct");
    if (directWa) {
      directWa.setAttribute(
        "href",
        buildWhatsAppUrl(
          "Olá! Vim pelo site da " +
            config.brand.name +
            " (Demonstração) e gostaria de informações sobre aula experimental e planos."
        )
      );
    }

    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  /**
   * 2. Menu Mobile Acessível (aria-expanded, aria-controls, fechamento por Esc e clique em link)
   */
  function initMobileNav() {
    const toggleBtn = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (!toggleBtn || !navMenu) return;

    function closeMenu(returnFocus) {
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "Abrir menu de navegação");
      navMenu.classList.remove("is-open");
      if (returnFocus) toggleBtn.focus();
    }

    function openMenu() {
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.setAttribute("aria-label", "Fechar menu de navegação");
      navMenu.classList.add("is-open");
    }

    toggleBtn.addEventListener("click", function () {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (navMenu.classList.contains("is-open")) {
          closeMenu(false);
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
        closeMenu(true);
      }
    });
  }

  /**
   * Auxiliar para pré-preencher o formulário de aula experimental / planos e rolar suavemente
   */
  function prefillTrialForm(options) {
    const modalitySelect = document.getElementById("modalidade");
    const timeSelect = document.getElementById("horario-preferido");
    const planSelect = document.getElementById("plano-interesse");
    const notesTextarea = document.getElementById("observacoes");
    const noticeBox = document.getElementById("form-prefill-notice");
    const noticeText = document.getElementById("form-prefill-text");
    const formSection = document.getElementById("aula-experimental");
    const nameInput = document.getElementById("nome");

    const summaryParts = [];

    if (options.modality && modalitySelect) {
      modalitySelect.value = options.modality;
      summaryParts.push("Modalidade: " + options.modality);
    }

    if (options.period && timeSelect) {
      timeSelect.value = options.period;
      summaryParts.push("Período: " + options.period);
    }

    if (options.plan && planSelect) {
      planSelect.value = options.plan;
      summaryParts.push("Plano: " + options.plan);
    }

    if (options.note && notesTextarea) {
      notesTextarea.value = options.note;
      summaryParts.push(options.note);
    }

    if (noticeBox && noticeText && summaryParts.length > 0) {
      noticeText.textContent =
        "Seleção carregada no formulário: " + summaryParts.join(" • ");
      noticeBox.hidden = false;
    }

    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () {
        if (nameInput) nameInput.focus({ preventScroll: true });
      }, 350);
    }
  }

  /**
   * 3. CTAs das Modalidades que pré-selecionam a modalidade no formulário
   */
  function initModalityButtons() {
    const modalityMap = {
      musculacao: "Musculação Orientada",
      funcional: "Treinamento Funcional",
      bike: "Bike Indoor",
      mobilidade: "Mobilidade & Core"
    };

    document.querySelectorAll(".js-select-modality").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const key = btn.getAttribute("data-modality");
        const label = modalityMap[key] || "Musculação Orientada";
        prefillTrialForm({
          modality: label,
          note: "Interesse iniciado na seção de Modalidades (" + label + ")."
        });
      });
    });

    const clearBtn = document.getElementById("clear-prefill-btn");
    const noticeBox = document.getElementById("form-prefill-notice");
    if (clearBtn && noticeBox) {
      clearBtn.addEventListener("click", function () {
        noticeBox.hidden = true;
        const notesTextarea = document.getElementById("observacoes");
        if (notesTextarea) notesTextarea.value = "";
      });
    }
  }

  /**
   * Converte hora "HH:MM" no turno correspondente do select do formulário
   */
  function mapTimeToPeriod(timeStr, dayKey) {
    if (dayKey === "sabado") {
      return "Sábado pela manhã (08h00 às 13h00)";
    }
    const hour = parseInt(String(timeStr).split(":")[0], 10);
    if (hour < 9) return "Manhã cedo (06h00 às 09h00)";
    if (hour < 12) return "Meio da manhã (09h00 às 12h00)";
    if (hour < 14) return "Horário de almoço (12h00 às 14h00)";
    if (hour < 18) return "Tarde (14h00 às 18h00)";
    return "Noite (18h00 às 21h30)";
  }

  /**
   * 4. Grade Semanal de Aulas com Filtro Combinado por Modalidade e Dia da Semana
   */
  function renderSchedule() {
    const gridEl = document.getElementById("schedule-grid");
    const countEl = document.getElementById("schedule-count");
    if (!gridEl || !config.schedule) return;

    const filtered = config.schedule.filter(function (item) {
      const matchModality =
        state.selectedModalityFilter === "todas" ||
        item.modality === state.selectedModalityFilter;
      const matchDay =
        state.selectedDayFilter === "todos" ||
        item.day === state.selectedDayFilter;
      return matchModality && matchDay;
    });

    if (countEl) {
      countEl.innerHTML =
        "Exibindo <strong>" +
        filtered.length +
        "</strong> " +
        (filtered.length === 1
          ? "turma de exemplo encontrada."
          : "turmas de exemplo na grade semanal.");
    }

    if (filtered.length === 0) {
      gridEl.innerHTML =
        '<div class="schedule-empty">' +
        "<p>Nenhuma turma encontrada para esta combinação de filtros.</p>" +
        '<button type="button" class="btn btn--secondary btn--sm" id="reset-schedule-filters" style="margin-top:0.85rem;">Mostrar todos os horários</button>' +
        "</div>";
      const resetBtn = document.getElementById("reset-schedule-filters");
      if (resetBtn) {
        resetBtn.addEventListener("click", function () {
          state.selectedModalityFilter = "todas";
          state.selectedDayFilter = "todos";
          syncScheduleFilterButtons();
          renderSchedule();
        });
      }
      return;
    }

    gridEl.innerHTML = filtered
      .map(function (item) {
        return (
          '<article class="schedule-card" data-day="' +
          item.day +
          '" data-modality="' +
          item.modality +
          '">' +
          '<div class="schedule-card__top">' +
          '<span class="schedule-card__day-time">' +
          item.dayLabel +
          " • " +
          item.time +
          "</span>" +
          '<span class="schedule-card__modality">' +
          item.modalityLabel +
          "</span>" +
          "</div>" +
          '<h3 class="schedule-card__title">' +
          item.title +
          "</h3>" +
          '<div class="schedule-card__meta">' +
          "<span><strong>Orientação:</strong> " +
          item.instructor +
          "</span>" +
          "<span><strong>Duração:</strong> " +
          item.duration +
          " • <strong>Capacidade:</strong> " +
          item.spots +
          "</span>" +
          "<span><strong>Perfil:</strong> " +
          item.level +
          "</span>" +
          "</div>" +
          '<div class="schedule-card__cta">' +
          '<button type="button" class="btn btn--outline btn--sm btn--full js-schedule-book" ' +
          'data-modality-label="' +
          item.modalityLabel +
          '" data-day-label="' +
          item.dayLabel +
          '" data-day-key="' +
          item.day +
          '" data-time="' +
          item.time +
          '" data-title="' +
          item.title +
          '">' +
          "Solicitar este horário (" +
          item.dayLabel +
          " " +
          item.time +
          ")" +
          "</button>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    gridEl.querySelectorAll(".js-schedule-book").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const modalityLabel = btn.getAttribute("data-modality-label");
        const dayLabel = btn.getAttribute("data-day-label");
        const dayKey = btn.getAttribute("data-day-key");
        const time = btn.getAttribute("data-time");
        const title = btn.getAttribute("data-title");

        prefillTrialForm({
          modality: modalityLabel,
          period: mapTimeToPeriod(time, dayKey),
          note:
            "Turma de interesse na grade: " +
            title +
            " — " +
            dayLabel +
            " às " +
            time +
            " (sujeito a confirmação de vaga)."
        });
      });
    });
  }

  function syncScheduleFilterButtons() {
    document
      .querySelectorAll("[data-filter-modality]")
      .forEach(function (btn) {
        const isCurrent =
          btn.getAttribute("data-filter-modality") ===
          state.selectedModalityFilter;
        btn.classList.toggle("is-active", isCurrent);
        btn.setAttribute("aria-pressed", isCurrent ? "true" : "false");
      });

    document.querySelectorAll("[data-filter-day]").forEach(function (btn) {
      const isCurrent =
        btn.getAttribute("data-filter-day") === state.selectedDayFilter;
      btn.classList.toggle("is-active", isCurrent);
      btn.setAttribute("aria-pressed", isCurrent ? "true" : "false");
    });
  }

  function initScheduleFilters() {
    document
      .querySelectorAll("[data-filter-modality]")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.selectedModalityFilter =
            btn.getAttribute("data-filter-modality") || "todas";
          syncScheduleFilterButtons();
          renderSchedule();
        });
      });

    document.querySelectorAll("[data-filter-day]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.selectedDayFilter =
          btn.getAttribute("data-filter-day") || "todos";
        syncScheduleFilterButtons();
        renderSchedule();
      });
    });

    renderSchedule();
  }

  /**
   * 5. Planos com Alternância de Periodicidade (Mensal / Trimestral / Anual) e Cálculo Transparente
   */
  function renderPlans() {
    const plansGrid = document.getElementById("plans-grid");
    const cycleNoteEl = document.getElementById("billing-cycle-note");
    if (!plansGrid || !config.plans) return;

    const cycleKey = state.selectedBillingCycle;
    const cycleInfo =
      config.plans.cycles[cycleKey] || config.plans.cycles.anual;

    if (cycleNoteEl && cycleInfo) {
      cycleNoteEl.innerHTML =
        "Ciclo selecionado: <strong>" +
        cycleInfo.label +
        " (" +
        cycleInfo.months +
        (cycleInfo.months === 1 ? " mês" : " meses") +
        ")</strong> — " +
        cycleInfo.description;
    }

    plansGrid.innerHTML = config.plans.items
      .map(function (plan) {
        const baseMonthly = plan.pricing.mensal.monthlyEquivalent;
        const currentMonthly = plan.pricing[cycleKey].monthlyEquivalent;
        const totalCycle = currentMonthly * cycleInfo.months;
        const fullWithoutDiscount = baseMonthly * cycleInfo.months;
        const savingsTotal = fullWithoutDiscount - totalCycle;

        let calculationHtml = "";
        if (cycleInfo.months === 1) {
          calculationHtml =
            "<span>Ciclo mensal: <strong>R$ " +
            formatCurrencyBRL(totalCycle) +
            "</strong> cobrado mês a mês</span>" +
            "<span>Sem fidelidade • Valor fictício de exemplo</span>";
        } else {
          calculationHtml =
            "<span>Total do ciclo (" +
            cycleInfo.months +
            " meses): <strong>R$ " +
            formatCurrencyBRL(totalCycle) +
            "</strong> (ou " +
            cycleInfo.months +
            "x de R$ " +
            formatCurrencyBRL(currentMonthly) +
            ")</span>" +
            '<span class="plan-card__savings">Economia transparente de R$ ' +
            formatCurrencyBRL(savingsTotal) +
            " no ciclo vs. plano mensal (Demo)</span>";
        }

        const waMessage =
          "Olá! Vim pelo site da " +
          (config.brand ? config.brand.name : "Pulso Fit") +
          " (Demonstração) e gostaria de informações sobre o *" +
          plan.name +
          "* na periodicidade *" +
          cycleInfo.label +
          "* (valor ilustrativo de R$ " +
          formatCurrencyBRL(currentMonthly) +
          "/mês — total de R$ " +
          formatCurrencyBRL(totalCycle) +
          " no ciclo) e sobre agendamento de aula experimental.";

        const waUrl = buildWhatsAppUrl(waMessage);

        const featuresHtml = plan.features
          .map(function (feat) {
            return "<li>" + feat + "</li>";
          })
          .join("");

        return (
          '<article class="plan-card ' +
          (plan.featured ? "plan-card--featured" : "") +
          '" data-plan-id="' +
          plan.id +
          '">' +
          '<span class="plan-card__badge">' +
          plan.badge +
          "</span>" +
          '<h3 class="plan-card__name">' +
          plan.name +
          "</h3>" +
          '<p class="plan-card__subtitle">' +
          plan.subtitle +
          "</p>" +
          '<div class="plan-card__price-box">' +
          '<span class="plan-card__demo-tag">Valor Fictício de Exemplo • Ciclo ' +
          cycleInfo.label +
          "</span>" +
          '<div class="plan-card__price-main">' +
          '<span class="plan-card__currency">R$</span>' +
          '<span class="plan-card__amount" data-plan-amount="' +
          plan.id +
          '">' +
          formatCurrencyBRL(currentMonthly) +
          "</span>" +
          '<span class="plan-card__period">/mês equiv.</span>' +
          "</div>" +
          '<div class="plan-card__calc-details">' +
          calculationHtml +
          "</div>" +
          "</div>" +
          '<ul class="plan-card__features">' +
          featuresHtml +
          "</ul>" +
          '<div class="plan-card__actions">' +
          '<a href="' +
          waUrl +
          '" target="_blank" rel="noopener noreferrer" class="btn ' +
          (plan.featured ? "btn--primary" : "btn--secondary") +
          ' btn--full js-plan-whatsapp">' +
          "Consultar " +
          plan.name +
          " no WhatsApp" +
          "</a>" +
          '<button type="button" class="btn btn--outline btn--sm btn--full js-plan-select-form" ' +
          'data-plan-name="' +
          plan.name +
          " (Mensal / Trimestral / Anual)" +
          '" data-cycle-label="' +
          cycleInfo.label +
          '" data-price-str="R$ ' +
          formatCurrencyBRL(currentMonthly) +
          '/mês">' +
          "Selecionar este plano no formulário" +
          "</button>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    plansGrid
      .querySelectorAll(".js-plan-select-form")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          const planOptionValue = btn.getAttribute("data-plan-name");
          const cycleLabel = btn.getAttribute("data-cycle-label");
          const priceStr = btn.getAttribute("data-price-str");
          prefillTrialForm({
            plan: planOptionValue,
            note:
              "Interesse no " +
              planOptionValue.replace(" (Mensal / Trimestral / Anual)", "") +
              " — Periodicidade " +
              cycleLabel +
              " (" +
              priceStr +
              " ilustrativo)."
          });
        });
      });
  }

  function initPlansSwitcher() {
    const buttons = document.querySelectorAll("#billing-switcher [data-cycle]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const cycle = btn.getAttribute("data-cycle");
        if (!cycle) return;
        state.selectedBillingCycle = cycle;

        buttons.forEach(function (b) {
          const active = b.getAttribute("data-cycle") === cycle;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });

        renderPlans();
      });
    });

    renderPlans();
  }

  /**
   * 6. Acordeão de Perguntas Frequentes (FAQ) Acessível
   */
  function initFaqAccordion() {
    const triggers = document.querySelectorAll(".faq-trigger");
    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        const isExpanded = trigger.getAttribute("aria-expanded") === "true";
        const panelId = trigger.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;

        trigger.setAttribute("aria-expanded", isExpanded ? "false" : "true");
        if (panel) {
          panel.hidden = isExpanded;
        }
      });
    });
  }

  /**
   * 7. Formulário de Interesse em Aula Experimental / Planos (Validação no Cliente + WhatsApp / mailto:)
   */
  function initTrialForm() {
    const form = document.getElementById("trial-form");
    const mailtoBtn = document.getElementById("btn-submit-mailto");
    const feedbackEl = document.getElementById("form-feedback");
    if (!form) return;

    function clearError(fieldId, errorId) {
      const field = document.getElementById(fieldId);
      const err = document.getElementById(errorId);
      if (field) field.setAttribute("aria-invalid", "false");
      if (err) err.textContent = "";
    }

    function setError(fieldId, errorId, message) {
      const field = document.getElementById(fieldId);
      const err = document.getElementById(errorId);
      if (field) field.setAttribute("aria-invalid", "true");
      if (err) err.textContent = message;
    }

    function validateForm() {
      let isValid = true;
      let firstInvalidField = null;

      const nome = document.getElementById("nome");
      const contato = document.getElementById("contato-usuario");
      const email = document.getElementById("email-usuario");
      const objetivo = document.getElementById("objetivo");
      const modalidade = document.getElementById("modalidade");
      const horario = document.getElementById("horario-preferido");
      const aceite = document.getElementById("aceite-confirmacao");

      clearError("nome", "erro-nome");
      clearError("contato-usuario", "erro-contato");
      clearError("email-usuario", "erro-email");
      clearError("objetivo", "erro-objetivo");
      clearError("modalidade", "erro-modalidade");
      clearError("horario-preferido", "erro-horario");
      clearError("aceite-confirmacao", "erro-aceite");

      if (!nome || nome.value.trim().length < 3) {
        setError(
          "nome",
          "erro-nome",
          "Por favor, informe seu nome completo (mínimo de 3 caracteres)."
        );
        isValid = false;
        firstInvalidField = firstInvalidField || nome;
      }

      const digitsOnly = contato ? contato.value.replace(/\D/g, "") : "";
      if (!contato || digitsOnly.length < 10) {
        setError(
          "contato-usuario",
          "erro-contato",
          "Informe um WhatsApp ou telefone válido com DDD (mínimo 10 dígitos)."
        );
        isValid = false;
        firstInvalidField = firstInvalidField || contato;
      }

      if (email && email.value.trim().length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          setError(
            "email-usuario",
            "erro-email",
            "Informe um endereço de e-mail válido ou deixe o campo em branco."
          );
          isValid = false;
          firstInvalidField = firstInvalidField || email;
        }
      }

      if (!objetivo || !objetivo.value) {
        setError(
          "objetivo",
          "erro-objetivo",
          "Selecione o foco principal que você busca para sua rotina."
        );
        isValid = false;
        firstInvalidField = firstInvalidField || objetivo;
      }

      if (!modalidade || !modalidade.value) {
        setError(
          "modalidade",
          "erro-modalidade",
          "Selecione a modalidade que gostaria de conhecer."
        );
        isValid = false;
        firstInvalidField = firstInvalidField || modalidade;
      }

      if (!horario || !horario.value) {
        setError(
          "horario-preferido",
          "erro-horario",
          "Selecione o turno ou período de sua preferência."
        );
        isValid = false;
        firstInvalidField = firstInvalidField || horario;
      }

      if (!aceite || !aceite.checked) {
        setError(
          "aceite-confirmacao",
          "erro-aceite",
          "Confirme que está ciente de que a aula experimental depende de confirmação da equipe."
        );
        isValid = false;
        firstInvalidField = firstInvalidField || aceite;
      }

      if (!isValid && firstInvalidField) {
        firstInvalidField.focus();
      }

      return isValid;
    }

    function composeMessageData() {
      const nome = document.getElementById("nome").value.trim();
      const contato = document.getElementById("contato-usuario").value.trim();
      const email =
        document.getElementById("email-usuario").value.trim() ||
        "Não informado";
      const objetivo = document.getElementById("objetivo").value;
      const modalidade = document.getElementById("modalidade").value;
      const horario = document.getElementById("horario-preferido").value;
      const plano = document.getElementById("plano-interesse").value;
      const observacoes =
        document.getElementById("observacoes").value.trim() ||
        "Nenhuma observação adicional";

      const textBody = [
        "Olá, equipe da " +
          (config.brand ? config.brand.name : "PULSO FIT") +
          "! (Solicitação via Site Demonstrativo)",
        "",
        "Gostaria de solicitar uma AULA EXPERIMENTAL sujeita a confirmação de disponibilidade:",
        "• Nome: " + nome,
        "• WhatsApp/Telefone: " + contato,
        "• E-mail: " + email,
        "• Objetivo de rotina: " + objetivo,
        "• Modalidade de interesse: " + modalidade,
        "• Turno/Horário preferido: " + horario,
        "• Plano de referência: " + plano,
        "• Observações: " + observacoes,
        "",
        "Aguardo o retorno da recepção para confirmar a disponibilidade de turma."
      ].join("\n");

      return {
        nome: nome,
        modalidade: modalidade,
        textBody: textBody
      };
    }

    function handleDispatch(channel) {
      if (!validateForm()) {
        if (feedbackEl) {
          feedbackEl.hidden = true;
        }
        return;
      }

      const data = composeMessageData();

      if (channel === "mailto") {
        const subject =
          "Solicitação de Aula Experimental — " +
          data.nome +
          " (" +
          data.modalidade +
          ")";
        const mailtoUrl = buildMailtoUrl(subject, data.textBody);

        if (feedbackEl) {
          feedbackEl.hidden = false;
          feedbackEl.innerHTML =
            "<strong>Mensagem preparada para E-mail!</strong> Seu aplicativo de e-mail foi acionado com os dados preenchidos. Lembre-se: a aula experimental será confirmada pela equipe após o recebimento. " +
            '<a href="' +
            mailtoUrl +
            '" class="text-link">Clique aqui caso seu cliente de e-mail não tenha aberto automaticamente</a>.';
        }
        window.location.href = mailtoUrl;
      } else {
        const waUrl = buildWhatsAppUrl(data.textBody);
        if (feedbackEl) {
          feedbackEl.hidden = false;
          feedbackEl.innerHTML =
            "<strong>Mensagem preparada para WhatsApp!</strong> Uma nova aba foi aberta para você enviar sua solicitação diretamente à recepção. A reserva só é efetivada após confirmação da equipe. " +
            '<a href="' +
            waUrl +
            '" target="_blank" rel="noopener noreferrer" class="text-link">Abrir link do WhatsApp novamente</a>.';
        }
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      handleDispatch("whatsapp");
    });

    if (mailtoBtn) {
      mailtoBtn.addEventListener("click", function () {
        handleDispatch("mailto");
      });
    }
  }

  /**
   * 8. Fallback defensivo para imagens caso alguma falhe (garantia de zero imagens quebradas)
   */
  function initImageFallbacks() {
    document.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () {
        if (!img.dataset.fallbackApplied) {
          img.dataset.fallbackApplied = "true";
          img.src = "assets/img/og-pulso-fit.svg";
        }
      });
    });
  }

  // Inicialização quando o DOM estiver pronto
  document.addEventListener("DOMContentLoaded", function () {
    applyClientConfig();
    initMobileNav();
    initModalityButtons();
    initScheduleFilters();
    initPlansSwitcher();
    initFaqAccordion();
    initTrialForm();
    initImageFallbacks();
  });
})();
