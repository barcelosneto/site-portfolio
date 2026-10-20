/**
 * DEMO-IMOBILIARIA.JS — Filtros Locais Combinados e Modal Acessível de Detalhes do Imóvel
 * =======================================================================================
 * Projeto Demonstrativo: Horizonte Prime (Valores e disponibilidade explicitamente fictícios)
 */

(function () {
  var PROPERTIES_DATA = {
    "HP-101": {
      code: "HP-101",
      title: "Residencial Aurora — Cobertura Duplex com Terraço Panorâmico",
      type: "Cobertura",
      neighborhood: "Jardim Europa (Bairro Fictício)",
      priceFormatted: "R$ 1.850.000 (Valor Ilustrativo)",
      condoFee: "R$ 1.420/mês (fictício)",
      area: "210 m² privativos",
      bedrooms: "3 suítes",
      parking: "3 vagas cobertas",
      description:
        "Imóvel fictício para demonstração de interface imobiliária. Planta integrada com iluminação natural abundante, terraço gourmet privativo, preparação para automação residencial e isolamento acústico nas esquadrias.",
      features: [
        "Terraço com espera para hidromassagem",
        "Pé-direito duplo no living principal",
        "Portaria remota e controle de acesso 24h",
        "Vaga com ponto de recarga para veículo elétrico"
      ]
    },
    "HP-102": {
      code: "HP-102",
      title: "Edifício Vértice Park — Apartamento Contemporâneo com Varanda",
      type: "Apartamento",
      neighborhood: "Vila Nova (Bairro Fictício)",
      priceFormatted: "R$ 920.000 (Valor Ilustrativo)",
      condoFee: "R$ 890/mês (fictício)",
      area: "118 m² privativos",
      bedrooms: "3 quartos (2 suítes)",
      parking: "2 vagas",
      description:
        "Imóvel fictício para demonstração de catálogo. Apartamento de andar alto com vista livre, varanda gourmet integrada à cozinha e lazer completo no condomínio.",
      features: [
        "Varanda nivelada com o living",
        "Persianas integradas nos dormitórios",
        "Piscina aquecida e espaço coworking no prédio",
        "Depósito privativo no subsolo"
      ]
    },
    "HP-103": {
      code: "HP-103",
      title: "Casa Bosque das Águas — Residência Térrea em Condomínio Fechado",
      type: "Casa",
      neighborhood: "Alto da Boa Vista (Bairro Fictício)",
      priceFormatted: "R$ 1.480.000 (Valor Ilustrativo)",
      condoFee: "R$ 1.150/mês (fictício)",
      area: "245 m² construídos",
      bedrooms: "4 quartos (2 suítes)",
      parking: "4 vagas",
      description:
        "Imóvel fictício de demonstração. Projeto arquitetônico contemporâneo em lote plano, com jardim central integrado à sala de jantar, energia solar fotovoltaica e área de lazer privativa.",
      features: [
        "Jardim com paisagismo tropical",
        "Sistema de aquecimento solar instalado",
        "Escritório reservado com entrada independente",
        "Segurança perimetral 24h no residencial"
      ]
    },
    "HP-104": {
      code: "HP-104",
      title: "Studio Urbano Linha Central — Compacto Funcional Próximo ao Metrô",
      type: "Apartamento",
      neighborhood: "Centro Histórico (Bairro Fictício)",
      priceFormatted: "R$ 490.000 (Valor Ilustrativo)",
      condoFee: "R$ 510/mês (fictício)",
      area: "54 m² privativos",
      bedrooms: "1 quarto",
      parking: "1 vaga rotativa",
      description:
        "Imóvel fictício de demonstração. Layout inteligente pensado para mobilidade urbana, com marcenaria planejada ilustrativa, lavanderia coletiva equipada e rooftop com vista para a cidade.",
      features: [
        "Planta flexível sem vigas aparentes",
        "Fechadura digital na porta de entrada",
        "Bicicletário e academia no condomínio",
        "Excelente ventilação cruzada"
      ]
    },
    "HP-105": {
      code: "HP-105",
      title: "Conjunto Corporativo Prime Tower — Sala Comercial Pronta",
      type: "Comercial",
      neighborhood: "Vila Nova (Bairro Fictício)",
      priceFormatted: "R$ 740.000 (Valor Ilustrativo)",
      condoFee: "R$ 780/mês (fictício)",
      area: "86 m² privativos",
      bedrooms: "2 ambientes + recepção",
      parking: "2 vagas privativas",
      description:
        "Imóvel comercial fictício para demonstração de portfólio. Conjunto corporativo com piso elevado instalado, forro modular, dois lavabos e auditório compartilhado no edifício.",
      features: [
        "Piso elevado e cabeamento estruturado",
        "Catracas eletrônicas e recepção bilíngue",
        "Gerador de energia para áreas comuns e privativas",
        "Estacionamento rotativo para visitantes"
      ]
    },
    "HP-106": {
      code: "HP-106",
      title: "Residência Mirante do Vale — Arquitetura Autoral com Vista",
      type: "Casa",
      neighborhood: "Jardim Europa (Bairro Fictício)",
      priceFormatted: "R$ 2.150.000 (Valor Ilustrativo)",
      condoFee: "R$ 1.600/mês (fictício)",
      area: "310 m² construídos",
      bedrooms: "4 suítes",
      parking: "4 vagas",
      description:
        "Imóvel fictício de demonstração. Residência com estrutura mista em concreto e madeira, esquadrias piso-teto, adega climatizada ilustrativa e área gourmet voltada para o pôr do sol.",
      features: [
        "Suíte master com closet e varanda privativa",
        "Cozinha com ilha central em quartzo",
        "Reuso de águas pluviais para irrigação",
        "Espaço fogo de chão no jardim"
      ]
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.querySelector("[data-imob-grid]");
    if (!grid) return;

    var cards = Array.prototype.slice.call(
      grid.querySelectorAll("[data-property-card]")
    );
    var typeSelect = document.getElementById("filter-type");
    var neighborhoodSelect = document.getElementById("filter-neighborhood");
    var priceSelect = document.getElementById("filter-price");
    var bedroomsSelect = document.getElementById("filter-bedrooms");
    var resetBtn = document.getElementById("filter-reset");
    var emptyBox = document.getElementById("imob-empty");
    var countEl = document.getElementById("imob-count");

    function filterProperties() {
      var selType = typeSelect ? typeSelect.value : "todos";
      var selNeigh = neighborhoodSelect ? neighborhoodSelect.value : "todos";
      var selPrice = priceSelect ? priceSelect.value : "todos";
      var selBeds = bedroomsSelect ? parseInt(bedroomsSelect.value, 10) || 0 : 0;

      var visible = 0;

      cards.forEach(function (card) {
        var cType = card.getAttribute("data-type") || "";
        var cNeigh = card.getAttribute("data-neighborhood") || "";
        var cPriceBand = card.getAttribute("data-price-band") || "";
        var cBeds = parseInt(card.getAttribute("data-bedrooms"), 10) || 0;

        var okType = selType === "todos" || cType === selType;
        var okNeigh = selNeigh === "todos" || cNeigh === selNeigh;
        var okPrice = selPrice === "todos" || cPriceBand === selPrice;
        var okBeds = selBeds === 0 || cBeds >= selBeds;

        if (okType && okNeigh && okPrice && okBeds) {
          card.style.display = "";
          card.removeAttribute("hidden");
          visible++;
        } else {
          card.style.display = "none";
          card.setAttribute("hidden", "hidden");
        }
      });

      if (emptyBox) {
        emptyBox.style.display = visible === 0 ? "block" : "none";
        if (visible === 0) emptyBox.removeAttribute("hidden");
        else emptyBox.setAttribute("hidden", "hidden");
      }

      if (countEl) {
        countEl.textContent =
          visible === 1
            ? "1 imóvel demonstrativo encontrado"
            : visible + " imóveis demonstrativos encontrados";
      }
    }

    [typeSelect, neighborhoodSelect, priceSelect, bedroomsSelect].forEach(
      function (sel) {
        if (sel) sel.addEventListener("change", filterProperties);
      }
    );

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        if (typeSelect) typeSelect.value = "todos";
        if (neighborhoodSelect) neighborhoodSelect.value = "todos";
        if (priceSelect) priceSelect.value = "todos";
        if (bedroomsSelect) bedroomsSelect.value = "0";
        filterProperties();
      });
    }

    filterProperties();

    // MODAL DE DETALHES DO IMÓVEL + GALERIA INTERNA
    var modal = document.getElementById("property-modal");
    if (!modal) return;

    var closeBtn = document.getElementById("property-modal-close");
    var closeFooterBtn = document.getElementById("property-modal-close-btn");
    var titleEl = document.getElementById("prop-modal-title");
    var codeEl = document.getElementById("prop-modal-code");
    var priceEl = document.getElementById("prop-modal-price");
    var metaEl = document.getElementById("prop-modal-meta");
    var descEl = document.getElementById("prop-modal-desc");
    var featuresEl = document.getElementById("prop-modal-features");
    var contactLink = document.getElementById("prop-modal-contact");
    var galleryStage = document.getElementById("prop-modal-stage");
    var galleryCaption = document.getElementById("prop-modal-caption");
    var slideBtns = Array.prototype.slice.call(
      modal.querySelectorAll("[data-prop-slide]")
    );

    var lastTrigger = null;
    var activeProp = null;

    function renderGalleryView(viewIndex) {
      if (!activeProp || !galleryStage) return;
      var views = [
        {
          caption: "Vista 1/3 — Fachada e Perspectiva Arquitetônica Ilustrativa (" + activeProp.code + ")",
          bg: "#1E1B4B",
          accent: "#4F46E5",
          label: "FACHADA & VOLUMETRIA"
        },
        {
          caption: "Vista 2/3 — Living Integrado & Iluminação Natural Ilustrativa (" + activeProp.code + ")",
          bg: "#0F172A",
          accent: "#06B6D4",
          label: "LIVING & TERRAÇO"
        },
        {
          caption: "Vista 3/3 — Planta Humanizada Esquemática (" + activeProp.code + ")",
          bg: "#172554",
          accent: "#38BDF8",
          label: "ESQUEMA DE PLANTA (" + activeProp.area + ")"
        }
      ];
      var v = views[viewIndex] || views[0];
      galleryStage.innerHTML =
        '<svg viewBox="0 0 700 320" width="100%" height="100%" role="img" aria-label="' +
        v.caption +
        '">' +
        '<rect width="700" height="320" rx="10" fill="' +
        v.bg +
        '"/>' +
        '<rect x="45" y="40" width="610" height="240" rx="8" fill="none" stroke="' +
        v.accent +
        '" stroke-width="2" stroke-dasharray="6 4"/>' +
        '<path d="M120 240 L230 110 L350 240 Z" fill="' +
        v.accent +
        '" opacity="0.35"/>' +
        '<rect x="310" y="95" width="240" height="145" rx="6" fill="' +
        v.accent +
        '" opacity="0.25"/>' +
        '<text x="350" y="160" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="20" font-weight="800" text-anchor="middle">' +
        v.label +
        "</text>" +
        '<text x="350" y="192" fill="#CBD5E1" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">Representação Gráfica Demonstrativa — ' +
        activeProp.title.split("—")[0] +
        "</text>" +
        "</svg>";
      if (galleryCaption) galleryCaption.textContent = v.caption;

      slideBtns.forEach(function (b, idx) {
        var isCurr = idx === viewIndex;
        b.classList.toggle("is-active", isCurr);
        b.setAttribute("aria-pressed", isCurr ? "true" : "false");
      });
    }

    function openPropertyModal(code, trigger) {
      var prop = PROPERTIES_DATA[code];
      if (!prop) return;
      activeProp = prop;
      lastTrigger = trigger || document.activeElement;

      if (titleEl) titleEl.textContent = prop.title;
      if (codeEl)
        codeEl.textContent =
          "Código Fictício: " + prop.code + " • " + prop.neighborhood;
      if (priceEl) priceEl.textContent = prop.priceFormatted;
      if (metaEl) {
        metaEl.innerHTML =
          "<span><strong>Tipo:</strong> " +
          prop.type +
          "</span>" +
          "<span><strong>Área:</strong> " +
          prop.area +
          "</span>" +
          "<span><strong>Dormitórios:</strong> " +
          prop.bedrooms +
          "</span>" +
          "<span><strong>Vagas:</strong> " +
          prop.parking +
          "</span>" +
          "<span><strong>Condomínio:</strong> " +
          prop.condoFee +
          "</span>";
      }
      if (descEl) descEl.textContent = prop.description;
      if (featuresEl) {
        featuresEl.innerHTML = prop.features
          .map(function (f) {
            return "<li>" + f + "</li>";
          })
          .join("");
      }
      if (contactLink) {
        contactLink.setAttribute(
          "href",
          "../../contato/index.html?projeto=imobiliaria&assunto=" +
            encodeURIComponent(
              "Demonstração Imobiliária (" + prop.code + " - " + prop.title + ")"
            )
        );
      }

      renderGalleryView(0);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      if (closeBtn) closeBtn.focus();
    }

    function closePropertyModal() {
      if (!modal.classList.contains("is-open")) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
      }
    }

    document.querySelectorAll("[data-open-property]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var code = btn.getAttribute("data-open-property");
        openPropertyModal(code, btn);
      });
    });

    slideBtns.forEach(function (btn, idx) {
      btn.addEventListener("click", function () {
        renderGalleryView(idx);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closePropertyModal);
    if (closeFooterBtn)
      closeFooterBtn.addEventListener("click", closePropertyModal);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closePropertyModal();
    });

    document.addEventListener("keydown", function (e) {
      if (modal.classList.contains("is-open") && e.key === "Escape") {
        closePropertyModal();
      }
    });
  });
})();
