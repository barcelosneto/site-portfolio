/**
 * PORTFOLIO.JS — Filtragem por Categoria e Busca Instantânea (Normalização de Acentos)
 * ====================================================================================
 */

(function () {
  /**
   * Normaliza texto removendo acentos/diacríticos e convertendo para minúsculas
   */
  function normalizeText(str) {
    if (!str) return "";
    return String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.querySelector("[data-portfolio-grid]");
    if (!grid) return;

    var cards = Array.prototype.slice.call(
      grid.querySelectorAll("[data-project-card]")
    );
    var filterButtons = Array.prototype.slice.call(
      document.querySelectorAll("[data-portfolio-filter]")
    );
    var searchInput = document.querySelector("[data-portfolio-search]");
    var clearButtons = Array.prototype.slice.call(
      document.querySelectorAll("[data-portfolio-clear]")
    );
    var emptyState = document.querySelector("[data-portfolio-empty]");
    var countLabel = document.querySelector("[data-portfolio-count]");

    var activeCategory = "todos";
    var searchQuery = "";

    function updateFilterUI() {
      var visibleCount = 0;
      var normQuery = normalizeText(searchQuery);

      cards.forEach(function (card) {
        var cat = card.getAttribute("data-category") || "";
        var searchableContent = normalizeText(
          (card.getAttribute("data-search-terms") || "") + " " + card.textContent
        );

        var matchesCategory =
          activeCategory === "todos" || cat === activeCategory;
        var matchesSearch =
          normQuery === "" || searchableContent.indexOf(normQuery) !== -1;

        if (matchesCategory && matchesSearch) {
          card.style.display = "";
          card.removeAttribute("hidden");
          visibleCount++;
        } else {
          card.style.display = "none";
          card.setAttribute("hidden", "hidden");
        }
      });

      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.removeAttribute("hidden");
          emptyState.style.display = "block";
        } else {
          emptyState.setAttribute("hidden", "hidden");
          emptyState.style.display = "none";
        }
      }

      if (countLabel) {
        if (visibleCount === 1) {
          countLabel.textContent = "Exibindo 1 projeto encontrado";
        } else {
          countLabel.textContent =
            "Exibindo " + visibleCount + " projetos encontrados";
        }
      }
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.getAttribute("data-portfolio-filter") || "todos";
        filterButtons.forEach(function (b) {
          var isCurrent = b === btn;
          b.classList.toggle("is-active", isCurrent);
          b.setAttribute("aria-pressed", isCurrent ? "true" : "false");
        });
        updateFilterUI();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", function (e) {
        searchQuery = e.target.value || "";
        updateFilterUI();
      });
    }

    clearButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = "todos";
        searchQuery = "";
        if (searchInput) {
          searchInput.value = "";
          searchInput.focus();
        }
        filterButtons.forEach(function (b) {
          var isAll = b.getAttribute("data-portfolio-filter") === "todos";
          b.classList.toggle("is-active", isAll);
          b.setAttribute("aria-pressed", isAll ? "true" : "false");
        });
        updateFilterUI();
      });
    });

    updateFilterUI();
  });
})();
