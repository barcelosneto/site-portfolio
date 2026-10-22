/**
 * PATA & PROSA | Pet Shop e Banho & Tosa
 * Script Principal de Interações (assets/js/main.js)
 *
 * Responsabilidades:
 * 1. Sincronizar dados dinâmicos a partir de window.PATA_PROSA_CONFIG
 * 2. Menu mobile acessível (aria-expanded, fechamento por Esc e clique externo)
 * 3. Filtro interativo de serviços por tipo de pet (Todos / Cães / Gatos / Pacotes)
 * 4. Simulador de orçamento estimado por espécie/porte + serviço + adicionais
 * 5. Transferência fluida da simulação ou serviço/pacote para o formulário de pré-agendamento
 * 6. Galeria Antes/Depois com Lightbox acessível (role="dialog", teclado, retorno de foco)
 * 7. FAQ em acordeão acessível (aria-expanded, aria-controls)
 * 8. Validação completa do formulário de pré-agendamento e geração de link WhatsApp / mailto:
 */

(function () {
  "use strict";

  const config = window.PATA_PROSA_CONFIG;
  if (!config) {
    console.error("PATA_PROSA_CONFIG não encontrado. Verifique se assets/js/config.js foi carregado.");
    return;
  }

  /**
   * Utilitário de formatação em Real Brasileiro (R$)
   */
  function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2
    });
  }

  /**
   * Gera URL segura de WhatsApp com texto codificado
   */
  function gerarUrlWhatsApp(mensagem) {
    const numeroLimpo = String(config.contato.whatsappNumero || "").replace(/\D/g, "");
    const textoCodificado = encodeURIComponent(mensagem || config.contato.mensagemPadraoWhatsApp);
    return `https://wa.me/${numeroLimpo}?text=${textoCodificado}`;
  }

  /**
   * 1. Inicialização de links globais de contato e dados da marca
   */
  function inicializarContatosGlobais() {
    const urlPadraoWhats = gerarUrlWhatsApp(config.contato.mensagemPadraoWhatsApp);

    document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
      const msgCustom = el.getAttribute("data-whatsapp-msg");
      el.setAttribute("href", msgCustom ? gerarUrlWhatsApp(msgCustom) : urlPadraoWhats);
    });

    document.querySelectorAll("[data-config-whatsapp-exibicao]").forEach((el) => {
      el.textContent = config.contato.whatsappExibicao;
    });

    document.querySelectorAll("[data-config-telefone-exibicao]").forEach((el) => {
      el.textContent = config.contato.telefoneFixoExibicao;
    });

    document.querySelectorAll("[data-config-email]").forEach((el) => {
      el.textContent = config.contato.email;
      if (el.tagName === "A") {
        el.setAttribute("href", `mailto:${config.contato.email}`);
      }
    });

    document.querySelectorAll("[data-config-endereco]").forEach((el) => {
      el.textContent = `${config.localizacao.logradouro} — ${config.localizacao.bairro}, ${config.localizacao.cidadeUf}`;
    });

    const anoAtualEl = document.getElementById("ano-atual");
    if (anoAtualEl) {
      anoAtualEl.textContent = String(new Date().getFullYear());
    }
  }

  /**
   * 2. Menu de navegação mobile acessível
   */
  function inicializarMenuMobile() {
    const btnToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (!btnToggle || !navMenu) return;

    function fecharMenu() {
      btnToggle.setAttribute("aria-expanded", "false");
      btnToggle.setAttribute("aria-label", "Abrir menu de navegação");
      navMenu.classList.remove("is-open");
    }

    function abrirMenu() {
      btnToggle.setAttribute("aria-expanded", "true");
      btnToggle.setAttribute("aria-label", "Fechar menu de navegação");
      navMenu.classList.add("is-open");
    }

    btnToggle.addEventListener("click", () => {
      const expandido = btnToggle.getAttribute("aria-expanded") === "true";
      if (expandido) {
        fecharMenu();
      } else {
        abrirMenu();
      }
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 960) {
          fecharMenu();
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && btnToggle.getAttribute("aria-expanded") === "true") {
        fecharMenu();
        btnToggle.focus();
      }
    });
  }

  /**
   * 3. Renderização e Filtro Interativo de Serviços por Tipo de Pet
   */
  function inicializarServicos() {
    const grid = document.getElementById("servicos-grid");
    const botoesFiltro = document.querySelectorAll("[data-filtro-pet]");
    const statusFiltro = document.getElementById("servicos-filtro-status");
    if (!grid) return;

    function renderizarCards(filtroAtivo) {
      grid.innerHTML = "";

      const servicosFiltrados = config.servicos.filter((servico) => {
        if (filtroAtivo === "todos") return true;
        return Array.isArray(servico.categoriasFiltro) && servico.categoriasFiltro.includes(filtroAtivo);
      });

      servicosFiltrados.forEach((servico) => {
        const precoInicialPequeno =
          config.matrizOrcamento.pequeno && config.matrizOrcamento.pequeno[servico.id]
            ? config.matrizOrcamento.pequeno[servico.id]
            : 65;

        const card = document.createElement("article");
        card.className = "servico-card";
        card.setAttribute("data-servico-id", servico.id);
        card.setAttribute("data-categorias", servico.categoriasFiltro.join(" "));

        const itensIncluidosHtml = servico.inclui
          .map((item) => `<li><span class="check-icon" aria-hidden="true">✓</span> ${item}</li>`)
          .join("");

        card.innerHTML = `
          <div class="servico-card__media">
            <img src="${servico.imagem}" alt="${servico.alt}" width="360" height="240" loading="lazy">
            <span class="servico-card__badge">${servico.badge}</span>
          </div>
          <div class="servico-card__body">
            <div class="servico-card__meta">
              <span class="servico-card__tempo">⏱ ${servico.tempoEstimado}</span>
              <span class="servico-card__preco-ref">A partir de <strong>${formatarMoeda(precoInicialPequeno)}</strong>*</span>
            </div>
            <h3 class="servico-card__title">${servico.titulo}</h3>
            <p class="servico-card__desc">${servico.resumo}</p>
            <ul class="servico-card__list" aria-label="O que está incluído em ${servico.titulo}">
              ${itensIncluidosHtml}
            </ul>
            <div class="servico-card__actions">
              <button type="button" class="btn btn--secondary btn--sm" data-acao-simular="${servico.id}">
                Simular valor por porte
              </button>
              <button type="button" class="btn btn--primary btn--sm" data-acao-agendar-servico="${servico.id}">
                Pré-agendar este cuidado
              </button>
            </div>
          </div>
        `;

        grid.appendChild(card);
      });

      if (statusFiltro) {
        const nomesFiltro = {
          todos: "todos os pets e pacotes",
          caes: "cães",
          gatos: "gatos",
          pacotes: "pacotes recorrentes"
        };
        statusFiltro.textContent = `Exibindo ${servicosFiltrados.length} opções para ${nomesFiltro[filtroAtivo] || filtroAtivo}.`;
      }
    }

    botoesFiltro.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filtro = btn.getAttribute("data-filtro-pet") || "todos";
        botoesFiltro.forEach((b) => {
          const ativo = b === btn;
          b.classList.toggle("is-active", ativo);
          b.setAttribute("aria-pressed", ativo ? "true" : "false");
        });
        renderizarCards(filtro);
      });
    });

    // Delegação de clique para os botões dentro dos cards de serviço
    grid.addEventListener("click", (e) => {
      const btnSimular = e.target.closest("[data-acao-simular]");
      if (btnSimular) {
        const servicoId = btnSimular.getAttribute("data-acao-simular");
        selecionarNoSimulador(servicoId);
        return;
      }

      const btnAgendar = e.target.closest("[data-acao-agendar-servico]");
      if (btnAgendar) {
        const servicoId = btnAgendar.getAttribute("data-acao-agendar-servico");
        preencherFormularioAgendamento({ servicoId });
      }
    });

    renderizarCards("todos");
  }

  /**
   * 4. Simulador Interativo de Orçamento Estimado por Porte e Serviço
   */
  let estadoSimulador = {
    porteId: "pequeno",
    servicoId: "banho_completo",
    adicionaisIds: []
  };

  function inicializarSimulador() {
    const containerPortes = document.getElementById("simulador-portes");
    const selectServico = document.getElementById("simulador-servico");
    const containerAdicionais = document.getElementById("simulador-adicionais");
    const btnLevarAgendamento = document.getElementById("btn-simulador-agendar");
    const btnWhatsSimulador = document.getElementById("btn-simulador-whatsapp");

    if (!containerPortes || !selectServico || !containerAdicionais) return;

    // Renderizar botões de porte
    containerPortes.innerHTML = "";
    config.portes.forEach((porte) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `porte-pill ${porte.id === estadoSimulador.porteId ? "is-active" : ""}`;
      btn.setAttribute("data-porte-id", porte.id);
      btn.setAttribute("aria-pressed", porte.id === estadoSimulador.porteId ? "true" : "false");
      btn.innerHTML = `
        <span class="porte-pill__title">${porte.rotulo}</span>
        <span class="porte-pill__sub">${porte.detalhe}</span>
      `;
      btn.addEventListener("click", () => {
        estadoSimulador.porteId = porte.id;
        // Se selecionou gato e o serviço atual for exclusivo de cães, mantém ou sugere cuidados_gatos se desejar
        containerPortes.querySelectorAll(".porte-pill").forEach((p) => {
          const ativo = p.getAttribute("data-porte-id") === porte.id;
          p.classList.toggle("is-active", ativo);
          p.setAttribute("aria-pressed", ativo ? "true" : "false");
        });
        atualizarCalculoSimulador();
      });
      containerPortes.appendChild(btn);
    });

    // Popular select de serviço principal
    selectServico.innerHTML = "";
    config.servicos.forEach((servico) => {
      const opt = document.createElement("option");
      opt.value = servico.id;
      opt.textContent = `${servico.titulo} (${servico.tempoEstimado})`;
      if (servico.id === estadoSimulador.servicoId) {
        opt.selected = true;
      }
      selectServico.appendChild(opt);
    });

    selectServico.addEventListener("change", () => {
      estadoSimulador.servicoId = selectServico.value;
      atualizarCalculoSimulador();
    });

    // Popular checkboxes de adicionais opcionais
    containerAdicionais.innerHTML = "";
    config.adicionaisOrcamento.forEach((adicional) => {
      const label = document.createElement("label");
      label.className = "adicional-check";
      label.innerHTML = `
        <input type="checkbox" value="${adicional.id}" data-adicional-check>
        <span class="adicional-check__info">
          <span class="adicional-check__nome">${adicional.nome}</span>
          <span class="adicional-check__preco">+ ${formatarMoeda(adicional.valor)}</span>
        </span>
      `;
      const input = label.querySelector("input");
      input.addEventListener("change", () => {
        const selecionados = Array.from(
          containerAdicionais.querySelectorAll("input[data-adicional-check]:checked")
        ).map((el) => el.value);
        estadoSimulador.adicionaisIds = selecionados;
        atualizarCalculoSimulador();
      });
      containerAdicionais.appendChild(label);
    });

    if (btnLevarAgendamento) {
      btnLevarAgendamento.addEventListener("click", () => {
        preencherFormularioAgendamento({
          porteId: estadoSimulador.porteId,
          servicoId: estadoSimulador.servicoId,
          adicionaisIds: estadoSimulador.adicionaisIds
        });
      });
    }

    if (btnWhatsSimulador) {
      btnWhatsSimulador.addEventListener("click", () => {
        const resumo = obterResumoSimulador();
        const msg =
          `Olá, Pata & Prosa! Fiz uma simulação de orçamento estimado no site:\n` +
          `• Espécie/Porte: ${resumo.porteRotulo}\n` +
          `• Serviço principal: ${resumo.servicoTitulo}\n` +
          `• Adicionais: ${resumo.adicionaisTexto}\n` +
          `• Estimativa no site: ${formatarMoeda(resumo.total)} (sujeita à avaliação presencial da pelagem)\n\n` +
          `Gostaria de verificar horários disponíveis!`;
        window.open(gerarUrlWhatsApp(msg), "_blank", "noopener,noreferrer");
      });
    }

    atualizarCalculoSimulador();
  }

  function obterResumoSimulador() {
    const porteObj = config.portes.find((p) => p.id === estadoSimulador.porteId) || config.portes[0];
    const servicoObj = config.servicos.find((s) => s.id === estadoSimulador.servicoId) || config.servicos[0];
    const tabelaPorte = config.matrizOrcamento[porteObj.id] || config.matrizOrcamento.pequeno;
    const valorBase = Number(tabelaPorte[servicoObj.id] || 65);

    const adicionaisSelecionados = config.adicionaisOrcamento.filter((a) =>
      estadoSimulador.adicionaisIds.includes(a.id)
    );
    const valorAdicionais = adicionaisSelecionados.reduce((acc, item) => acc + Number(item.valor), 0);
    const total = valorBase + valorAdicionais;

    return {
      porteObj,
      porteRotulo: porteObj.rotulo,
      servicoObj,
      servicoTitulo: servicoObj.titulo,
      valorBase,
      adicionaisSelecionados,
      adicionaisTexto:
        adicionaisSelecionados.length > 0
          ? adicionaisSelecionados.map((a) => a.nome).join(", ")
          : "Nenhum item adicional",
      valorAdicionais,
      total
    };
  }

  function atualizarCalculoSimulador() {
    const elValorTotal = document.getElementById("simulador-valor-total");
    const elResumoPorte = document.getElementById("simulador-resumo-porte");
    const elResumoServico = document.getElementById("simulador-resumo-servico");
    const elResumoAdicionais = document.getElementById("simulador-resumo-adicionais");
    const elResumoTempo = document.getElementById("simulador-resumo-tempo");

    const dados = obterResumoSimulador();

    if (elValorTotal) elValorTotal.textContent = formatarMoeda(dados.total);
    if (elResumoPorte) elResumoPorte.textContent = dados.porteRotulo;
    if (elResumoServico) {
      elResumoServico.textContent = `${dados.servicoTitulo} (${formatarMoeda(dados.valorBase)})`;
    }
    if (elResumoAdicionais) {
      elResumoAdicionais.textContent =
        dados.adicionaisSelecionados.length > 0
          ? `${dados.adicionaisTexto} (+ ${formatarMoeda(dados.valorAdicionais)})`
          : "Nenhum item opcional selecionado";
    }
    if (elResumoTempo) {
      elResumoTempo.textContent = dados.servicoObj.tempoEstimado;
    }
  }

  function selecionarNoSimulador(servicoId) {
    const selectServico = document.getElementById("simulador-servico");
    if (selectServico) {
      estadoSimulador.servicoId = servicoId;
      selectServico.value = servicoId;
      if (servicoId === "cuidados_gatos" && !estadoSimulador.porteId.startsWith("gato")) {
        estadoSimulador.porteId = "gato_curto";
        document.querySelectorAll("#simulador-portes .porte-pill").forEach((p) => {
          const ativo = p.getAttribute("data-porte-id") === "gato_curto";
          p.classList.toggle("is-active", ativo);
          p.setAttribute("aria-pressed", ativo ? "true" : "false");
        });
      }
      atualizarCalculoSimulador();
    }
    const secaoSimulador = document.getElementById("simulador");
    if (secaoSimulador) {
      secaoSimulador.scrollIntoView({ behavior: "smooth", block: "start" });
      if (selectServico) {
        setTimeout(() => selectServico.focus({ preventScroll: true }), 450);
      }
    }
  }

  /**
   * 5. Renderização da Tabela/Cards de Pacotes e botões de pré-seleção
   */
  function inicializarPacotes() {
    const container = document.getElementById("pacotes-grid");
    if (!container) return;

    container.innerHTML = "";
    config.pacotesTabela.forEach((pacote) => {
      const card = document.createElement("article");
      card.className = `pacote-card ${pacote.destaque ? "pacote-card--destaque" : ""}`;

      const beneficiosHtml = pacote.beneficios
        .map((b) => `<li><span aria-hidden="true">✓</span> ${b}</li>`)
        .join("");

      card.innerHTML = `
        ${pacote.badge ? `<span class="pacote-card__badge">${pacote.badge}</span>` : ""}
        <div class="pacote-card__header">
          <h3 class="pacote-card__title">${pacote.nome}</h3>
          <p class="pacote-card__freq">${pacote.frequencia}</p>
          <p class="pacote-card__desc">${pacote.descricao}</p>
        </div>
        <ul class="pacote-card__beneficios" aria-label="Benefícios do ${pacote.nome}">
          ${beneficiosHtml}
        </ul>
        <div class="pacote-card__tabela" role="region" aria-label="Valores exemplificativos para ${pacote.nome}">
          <div class="pacote-preco-row">
            <span>Porte Pequeno</span>
            <strong>${pacote.precosPorPorte.pequeno}</strong>
          </div>
          <div class="pacote-preco-row">
            <span>Porte Médio</span>
            <strong>${pacote.precosPorPorte.medio}</strong>
          </div>
          <div class="pacote-preco-row">
            <span>Porte Grande</span>
            <strong>${pacote.precosPorPorte.grande}</strong>
          </div>
          <div class="pacote-preco-row">
            <span>Porte Gigante</span>
            <strong>${pacote.precosPorPorte.gigante}</strong>
          </div>
          <div class="pacote-preco-row pacote-preco-row--gatos">
            <span>Felinos</span>
            <strong>${pacote.precosPorPorte.gatos}</strong>
          </div>
        </div>
        <button type="button" class="btn ${pacote.destaque ? "btn--primary" : "btn--secondary"} btn--full" data-selecionar-pacote="${pacote.nome}">
          Escolher ${pacote.nome}
        </button>
      `;

      container.appendChild(card);
    });

    container.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-selecionar-pacote]");
      if (!btn) return;
      const nomePacote = btn.getAttribute("data-selecionar-pacote");
      preencherFormularioAgendamento({
        servicoId: "pacote_mensal",
        observacaoExtra: `Interesse no pacote: ${nomePacote}`
      });
    });
  }

  /**
   * 6. Galeria Antes/Depois com Lightbox Acessível
   */
  function inicializarGaleriaLightbox() {
    const gridGaleria = document.getElementById("galeria-grid");
    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("lightbox-img");
    const modalTitulo = document.getElementById("lightbox-titulo");
    const modalMeta = document.getElementById("lightbox-meta");
    const modalAntes = document.getElementById("lightbox-antes");
    const modalDepois = document.getElementById("lightbox-depois");
    const modalAviso = document.getElementById("lightbox-aviso");
    const modalContador = document.getElementById("lightbox-contador");
    const btnFechar = document.getElementById("lightbox-fechar");
    const btnAnterior = document.getElementById("lightbox-prev");
    const btnProximo = document.getElementById("lightbox-next");

    if (!gridGaleria || !modal) return;

    let indiceAtual = 0;
    let ultimoElementoFocado = null;
    const itens = config.galeriaAntesDepois;

    gridGaleria.innerHTML = "";
    itens.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "galeria-card";
      card.innerHTML = `
        <button type="button" class="galeria-card__trigger" data-galeria-index="${index}" aria-label="Ampliar comparativo ilustrativo: ${item.titulo}">
          <div class="galeria-card__img-wrap">
            <img src="${item.imagem}" alt="${item.alt}" width="640" height="420" loading="lazy">
            <span class="galeria-card__tag-demo">Ilustração Demonstrativa</span>
            <span class="galeria-card__zoom-hint" aria-hidden="true">🔍 Ampliar Antes/Depois</span>
          </div>
          <div class="galeria-card__content">
            <span class="galeria-card__especie">${item.especie} • ${item.tempoAtendimento}</span>
            <h3 class="galeria-card__title">${item.titulo}</h3>
            <p class="galeria-card__servico">${item.servicoRealizado}</p>
          </div>
        </button>
      `;
      gridGaleria.appendChild(card);
    });

    function atualizarConteudoModal(idx) {
      indiceAtual = (idx + itens.length) % itens.length;
      const item = itens[indiceAtual];
      if (modalImg) {
        modalImg.src = item.imagem;
        modalImg.alt = item.alt;
      }
      if (modalTitulo) modalTitulo.textContent = item.titulo;
      if (modalMeta) modalMeta.textContent = `${item.especie} • ${item.servicoRealizado} (${item.tempoAtendimento})`;
      if (modalAntes) modalAntes.textContent = item.descricaoAntes;
      if (modalDepois) modalDepois.textContent = item.descricaoDepois;
      if (modalAviso) modalAviso.textContent = item.avisoIlustrativo;
      if (modalContador) modalContador.textContent = `Item ${indiceAtual + 1} de ${itens.length}`;
    }

    function abrirLightbox(idx, elementoOrigem) {
      ultimoElementoFocado = elementoOrigem || document.activeElement;
      atualizarConteudoModal(idx);
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-modal-open");
      if (btnFechar) {
        btnFechar.focus();
      }
    }

    function fecharLightbox() {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-modal-open");
      if (ultimoElementoFocado && typeof ultimoElementoFocado.focus === "function") {
        ultimoElementoFocado.focus();
      }
    }

    gridGaleria.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-galeria-index]");
      if (!trigger) return;
      const idx = Number(trigger.getAttribute("data-galeria-index") || 0);
      abrirLightbox(idx, trigger);
    });

    if (btnFechar) btnFechar.addEventListener("click", fecharLightbox);
    if (btnAnterior) {
      btnAnterior.addEventListener("click", () => atualizarConteudoModal(indiceAtual - 1));
    }
    if (btnProximo) {
      btnProximo.addEventListener("click", () => atualizarConteudoModal(indiceAtual + 1));
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        fecharLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (modal.hidden) return;
      if (e.key === "Escape") {
        e.preventDefault();
        fecharLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        atualizarConteudoModal(indiceAtual - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        atualizarConteudoModal(indiceAtual + 1);
      }
    });
  }

  /**
   * 7. Renderização de Depoimentos Demonstrativos
   */
  function inicializarDepoimentos() {
    const grid = document.getElementById("depoimentos-grid");
    if (!grid) return;

    grid.innerHTML = "";
    config.depoimentos.forEach((dep) => {
      const card = document.createElement("article");
      card.className = "depoimento-card";
      card.innerHTML = `
        <div class="depoimento-card__top">
          <span class="depoimento-card__badge-demo">Relato Demonstrativo</span>
          <span class="depoimento-card__stars" aria-label="5 de 5 patinhas ilustrativas">🐾🐾🐾🐾🐾</span>
        </div>
        <blockquote class="depoimento-card__quote">
          “${dep.texto}”
        </blockquote>
        <footer class="depoimento-card__footer">
          <strong class="depoimento-card__autor">${dep.nomeTutor}</strong>
          <span class="depoimento-card__pet">${dep.petInfo}</span>
          <span class="depoimento-card__servico">${dep.servico}</span>
        </footer>
      `;
      grid.appendChild(card);
    });
  }

  /**
   * 8. FAQ em Acordeão Acessível
   */
  function inicializarFaq() {
    const container = document.getElementById("faq-lista");
    if (!container) return;

    container.innerHTML = "";
    config.faq.forEach((item, index) => {
      const idBotao = `faq-btn-${index}`;
      const idPainel = `faq-panel-${index}`;
      const abertoInicial = index === 0;

      const wrapper = document.createElement("div");
      wrapper.className = "faq-item";
      wrapper.innerHTML = `
        <h3 class="faq-item__heading">
          <button
            type="button"
            id="${idBotao}"
            class="faq-item__trigger"
            aria-expanded="${abertoInicial ? "true" : "false"}"
            aria-controls="${idPainel}"
          >
            <span>${item.pergunta}</span>
            <span class="faq-item__icon" aria-hidden="true"></span>
          </button>
        </h3>
        <div
          id="${idPainel}"
          class="faq-item__panel"
          role="region"
          aria-labelledby="${idBotao}"
          ${abertoInicial ? "" : "hidden"}
        >
          <p>${item.resposta}</p>
        </div>
      `;
      container.appendChild(wrapper);
    });

    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq-item__trigger");
      if (!btn) return;
      const expandido = btn.getAttribute("aria-expanded") === "true";
      const painelId = btn.getAttribute("aria-controls");
      const painel = painelId ? document.getElementById(painelId) : null;

      btn.setAttribute("aria-expanded", expandido ? "false" : "true");
      if (painel) {
        painel.hidden = expandido;
      }
    });
  }

  /**
   * 9. Formulário de Pré-Agendamento sem Backend (WhatsApp / mailto:)
   */
  function preencherFormularioAgendamento(opcoes) {
    const form = document.getElementById("form-agendamento");
    const selectPorte = document.getElementById("campo-porte");
    const selectServico = document.getElementById("campo-servico");
    const campoObs = document.getElementById("campo-observacoes");
    const campoNomePet = document.getElementById("campo-nome-pet");

    if (opcoes && opcoes.porteId && selectPorte) {
      selectPorte.value = opcoes.porteId;
    }
    if (opcoes && opcoes.servicoId && selectServico) {
      selectServico.value = opcoes.servicoId;
    }
    if (opcoes && Array.isArray(opcoes.adicionaisIds) && campoObs) {
      const resumo = obterResumoSimulador();
      campoObs.value =
        `Simulação realizada no site: ${resumo.servicoTitulo} (${resumo.porteRotulo})` +
        (resumo.adicionaisSelecionados.length > 0 ? ` + ${resumo.adicionaisTexto}` : "") +
        ` — Estimativa visualizada: ${formatarMoeda(resumo.total)}.`;
    } else if (opcoes && opcoes.observacaoExtra && campoObs) {
      campoObs.value = opcoes.observacaoExtra;
    }

    const secaoAgendamento = document.getElementById("agendamento");
    if (secaoAgendamento) {
      secaoAgendamento.scrollIntoView({ behavior: "smooth", block: "start" });
      if (campoNomePet) {
        setTimeout(() => campoNomePet.focus({ preventScroll: true }), 450);
      }
    }
    if (form) {
      atualizarPreviewMensagem();
    }
  }

  function inicializarFormularioAgendamento() {
    const form = document.getElementById("form-agendamento");
    const selectPorte = document.getElementById("campo-porte");
    const selectServico = document.getElementById("campo-servico");
    const inputData = document.getElementById("campo-data");
    const btnEmailAlternativo = document.getElementById("btn-enviar-email");
    const feedbackBox = document.getElementById("form-feedback");

    if (!form || !selectPorte || !selectServico) return;

    // Popular opções de porte
    selectPorte.innerHTML = `<option value="">Selecione a espécie e o porte...</option>`;
    config.portes.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.rotulo} — ${p.detalhe}`;
      selectPorte.appendChild(opt);
    });

    // Popular opções de serviço
    selectServico.innerHTML = `<option value="">Selecione o cuidado desejado...</option>`;
    config.servicos.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.titulo;
      selectServico.appendChild(opt);
    });

    // Definir data mínima como hoje
    if (inputData) {
      const hoje = new Date();
      const yyyy = hoje.getFullYear();
      const mm = String(hoje.getMonth() + 1).padStart(2, "0");
      const dd = String(hoje.getDate()).padStart(2, "0");
      inputData.min = `${yyyy}-${mm}-${dd}`;
    }

    form.addEventListener("input", atualizarPreviewMensagem);
    form.addEventListener("change", atualizarPreviewMensagem);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      processarEnvioFormulario("whatsapp", feedbackBox);
    });

    if (btnEmailAlternativo) {
      btnEmailAlternativo.addEventListener("click", () => {
        processarEnvioFormulario("email", feedbackBox);
      });
    }

    atualizarPreviewMensagem();
  }

  function coletarDadosFormulario() {
    const nomePet = (document.getElementById("campo-nome-pet")?.value || "").trim();
    const porteId = (document.getElementById("campo-porte")?.value || "").trim();
    const servicoId = (document.getElementById("campo-servico")?.value || "").trim();
    const dataPref = (document.getElementById("campo-data")?.value || "").trim();
    const turnoPref = (document.getElementById("campo-turno")?.value || "").trim();
    const nomeTutor = (document.getElementById("campo-nome-tutor")?.value || "").trim();
    const telefoneTutor = (document.getElementById("campo-telefone")?.value || "").trim();
    const observacoes = (document.getElementById("campo-observacoes")?.value || "").trim();

    const porteObj = config.portes.find((p) => p.id === porteId);
    const servicoObj = config.servicos.find((s) => s.id === servicoId);

    let dataFormatada = dataPref;
    if (dataPref && /^\d{4}-\d{2}-\d{2}$/.test(dataPref)) {
      const [ano, mes, dia] = dataPref.split("-");
      dataFormatada = `${dia}/${mes}/${ano}`;
    }

    return {
      nomePet,
      porteId,
      porteRotulo: porteObj ? porteObj.rotulo : "",
      servicoId,
      servicoTitulo: servicoObj ? servicoObj.titulo : "",
      dataPref,
      dataFormatada,
      turnoPref,
      nomeTutor,
      telefoneTutor,
      observacoes
    };
  }

  function construirMensagemAgendamento(dados) {
    return (
      `Olá, equipe da ${config.marca.nome}! Gostaria de solicitar um *pré-agendamento*:\n\n` +
      `🐾 *Nome do pet:* ${dados.nomePet || "(não informado)"}\n` +
      `📏 *Espécie/Porte:* ${dados.porteRotulo || "(não informado)"}\n` +
      `🛁 *Serviço desejado:* ${dados.servicoTitulo || "(não informado)"}\n` +
      `📅 *Data preferida:* ${dados.dataFormatada || "(a combinar)"} — *Turno:* ${dados.turnoPref || "(a combinar)"}\n` +
      `👤 *Tutor(a):* ${dados.nomeTutor || "(não informado)"}\n` +
      `📱 *Contato:* ${dados.telefoneTutor || "(não informado)"}\n` +
      (dados.observacoes ? `💬 *Observações:* ${dados.observacoes}\n` : "") +
      `\n_Estou ciente de que este pedido é uma solicitação inicial e aguardo a confirmação de disponibilidade da agenda._`
    );
  }

  function atualizarPreviewMensagem() {
    const previewEl = document.getElementById("agendamento-preview-texto");
    if (!previewEl) return;
    const dados = coletarDadosFormulario();
    previewEl.textContent = construirMensagemAgendamento(dados);
  }

  function validarFormulario() {
    const camposObrigatorios = [
      { id: "campo-nome-pet", msg: "Informe o nome do seu pet." },
      { id: "campo-porte", msg: "Selecione a espécie e o porte do pet." },
      { id: "campo-servico", msg: "Selecione o serviço desejado." },
      { id: "campo-data", msg: "Escolha uma data preferida para consulta." },
      { id: "campo-turno", msg: "Selecione o turno de preferência." },
      { id: "campo-nome-tutor", msg: "Informe seu nome para atendimento." },
      { id: "campo-telefone", msg: "Informe seu WhatsApp ou telefone de contato." }
    ];

    let primeiroInvalido = null;
    camposObrigatorios.forEach((item) => {
      const input = document.getElementById(item.id);
      const erroEl = document.getElementById(`erro-${item.id}`);
      if (!input) return;

      const valor = String(input.value || "").trim();
      const valido = valor.length > 0;

      if (!valido) {
        input.setAttribute("aria-invalid", "true");
        if (erroEl) {
          erroEl.textContent = item.msg;
          erroEl.hidden = false;
        }
        if (!primeiroInvalido) primeiroInvalido = input;
      } else {
        input.setAttribute("aria-invalid", "false");
        if (erroEl) {
          erroEl.textContent = "";
          erroEl.hidden = true;
        }
      }
    });

    return {
      valido: !primeiroInvalido,
      primeiroInvalido
    };
  }

  function processarEnvioFormulario(canal, feedbackBox) {
    const resultado = validarFormulario();
    if (!resultado.valido) {
      if (feedbackBox) {
        feedbackBox.className = "form-feedback form-feedback--erro";
        feedbackBox.textContent =
          "Por favor, revise os campos destacados acima antes de gerar sua solicitação de pré-agendamento.";
        feedbackBox.hidden = false;
      }
      if (resultado.primeiroInvalido) {
        resultado.primeiroInvalido.focus();
      }
      return;
    }

    const dados = coletarDadosFormulario();
    const mensagem = construirMensagemAgendamento(dados);

    if (canal === "email") {
      const assunto = encodeURIComponent(`Pré-agendamento Banho & Tosa - Pet: ${dados.nomePet}`);
      const corpo = encodeURIComponent(mensagem);
      const mailtoUrl = `mailto:${config.contato.email}?subject=${assunto}&body=${corpo}`;

      if (feedbackBox) {
        feedbackBox.className = "form-feedback form-feedback--sucesso";
        feedbackBox.innerHTML =
          `<strong>Solicitação formatada para e-mail!</strong> Abrimos seu aplicativo de e-mail padrão. ` +
          `Importante: o horário só é reservado após o retorno da nossa equipe confirmando disponibilidade. ` +
          `<a href="${mailtoUrl}">Clique aqui caso seu aplicativo de e-mail não tenha aberto</a>.`;
        feedbackBox.hidden = false;
      }
      window.location.href = mailtoUrl;
      return;
    }

    const whatsUrl = gerarUrlWhatsApp(mensagem);
    if (feedbackBox) {
      feedbackBox.className = "form-feedback form-feedback--sucesso";
      feedbackBox.innerHTML =
        `<strong>Mensagem de pré-agendamento pronta!</strong> Redirecionamos para o WhatsApp da Pata & Prosa com os dados do(a) <strong>${dados.nomePet}</strong>. ` +
        `Lembre-se: a reserva do horário será confirmada pela recepção na conversa. ` +
        `<a href="${whatsUrl}" target="_blank" rel="noopener noreferrer">Abrir conversa no WhatsApp manualmente</a>.`;
      feedbackBox.hidden = false;
    }
    window.open(whatsUrl, "_blank", "noopener,noreferrer");
  }

  /**
   * Inicialização geral após DOM pronto
   */
  document.addEventListener("DOMContentLoaded", () => {
    inicializarContatosGlobais();
    inicializarMenuMobile();
    inicializarServicos();
    inicializarSimulador();
    inicializarPacotes();
    inicializarGaleriaLightbox();
    inicializarDepoimentos();
    inicializarFaq();
    inicializarFormularioAgendamento();
  });
})();
