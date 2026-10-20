/**
 * DEMO-RESTAURANTE.JS — Filtros de Cardápio, Busca e Lightbox Acessível de Galeria
 * =================================================================================
 * Projeto Demonstrativo: Sabor & Brasa (Preços e pratos explicitamente ilustrativos)
 */

(function () {
  function normalize(str) {
    if (!str) return "";
    return String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  document.addEventListener("DOMContentLoaded", function () {
    // 1. FILTROS DO CARDÁPIO
    var menuGrid = document.querySelector("[data-menu-grid]");
    if (menuGrid) {
      var items = Array.prototype.slice.call(
        menuGrid.querySelectorAll("[data-menu-item]")
      );
      var catButtons = Array.prototype.slice.call(
        document.querySelectorAll("[data-menu-cat]")
      );
      var dietCheckboxes = Array.prototype.slice.call(
        document.querySelectorAll("[data-menu-diet]")
      );
      var searchInput = document.querySelector("[data-menu-search]");
      var resetBtn = document.querySelector("[data-menu-reset]");
      var emptyMsg = document.querySelector("[data-menu-empty]");
      var countMsg = document.querySelector("[data-menu-count]");

      var currentCat = "todos";
      var searchTerm = "";

      function applyMenuFilters() {
        var normSearch = normalize(searchTerm);
        var requiredDiets = dietCheckboxes
          .filter(function (cb) {
            return cb.checked;
          })
          .map(function (cb) {
            return cb.getAttribute("data-menu-diet");
          });

        var visible = 0;

        items.forEach(function (item) {
          var itemCat = item.getAttribute("data-category") || "";
          var itemDiets = (item.getAttribute("data-diets") || "").split(",");
          var itemText = normalize(item.textContent);

          var matchCat = currentCat === "todos" || itemCat === currentCat;
          var matchSearch =
            normSearch === "" || itemText.indexOf(normSearch) !== -1;
          var matchDiet = requiredDiets.every(function (d) {
            return itemDiets.indexOf(d) !== -1;
          });

          if (matchCat && matchSearch && matchDiet) {
            item.style.display = "";
            item.removeAttribute("hidden");
            visible++;
          } else {
            item.style.display = "none";
            item.setAttribute("hidden", "hidden");
          }
        });

        if (emptyMsg) {
          emptyMsg.style.display = visible === 0 ? "block" : "none";
          if (visible === 0) emptyMsg.removeAttribute("hidden");
          else emptyMsg.setAttribute("hidden", "hidden");
        }

        if (countMsg) {
          countMsg.textContent =
            visible === 1
              ? "1 prato ilustrativo exibido"
              : visible + " pratos ilustrativos exibidos";
        }
      }

      catButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentCat = btn.getAttribute("data-menu-cat") || "todos";
          catButtons.forEach(function (b) {
            var active = b === btn;
            b.classList.toggle("is-active", active);
            b.setAttribute("aria-pressed", active ? "true" : "false");
          });
          applyMenuFilters();
        });
      });

      dietCheckboxes.forEach(function (cb) {
        cb.addEventListener("change", applyMenuFilters);
      });

      if (searchInput) {
        searchInput.addEventListener("input", function (e) {
          searchTerm = e.target.value || "";
          applyMenuFilters();
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener("click", function () {
          currentCat = "todos";
          searchTerm = "";
          if (searchInput) searchInput.value = "";
          dietCheckboxes.forEach(function (cb) {
            cb.checked = false;
          });
          catButtons.forEach(function (b) {
            var isAll = b.getAttribute("data-menu-cat") === "todos";
            b.classList.toggle("is-active", isAll);
            b.setAttribute("aria-pressed", isAll ? "true" : "false");
          });
          applyMenuFilters();
        });
      }

      applyMenuFilters();
    }

    // 2. LIGHTBOX ACESSÍVEL DA GALERIA
    var modal = document.getElementById("gallery-lightbox");
    if (!modal) return;

    var triggers = Array.prototype.slice.call(
      document.querySelectorAll("[data-lightbox-trigger]")
    );
    var titleEl = document.getElementById("lightbox-title");
    var descEl = document.getElementById("lightbox-desc");
    var artworkContainer = document.getElementById("lightbox-artwork");
    var counterEl = document.getElementById("lightbox-counter");
    var closeBtn = document.getElementById("lightbox-close");
    var prevBtn = document.getElementById("lightbox-prev");
    var nextBtn = document.getElementById("lightbox-next");

    var currentIndex = 0;
    var lastFocusedTrigger = null;

    function renderSlide(idx) {
      if (triggers.length === 0) return;
      currentIndex = (idx + triggers.length) % triggers.length;
      var btn = triggers[currentIndex];
      var title = btn.getAttribute("data-title") || "Fotografia gastronômica";
      var desc = btn.getAttribute("data-description") || "";
      var imgEl = btn.querySelector("img");
      var mediaMarkup = "";

      if (imgEl) {
        var src = imgEl.getAttribute("src") || "";
        var alt = imgEl.getAttribute("alt") || title;
        mediaMarkup =
          '<img src="' +
          src +
          '" alt="' +
          alt.replace(/"/g, "&quot;") +
          '" width="1200" height="750" style="width:100%;max-height:480px;object-fit:cover;border-radius:var(--radius-md);display:block;" />';
      } else if (btn.querySelector("svg")) {
        mediaMarkup = btn.querySelector("svg").outerHTML;
      }

      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;
      if (artworkContainer) artworkContainer.innerHTML = mediaMarkup;
      if (counterEl) {
        counterEl.textContent =
          "Item " + (currentIndex + 1) + " de " + triggers.length;
      }
    }

    function openLightbox(idx, triggerEl) {
      lastFocusedTrigger = triggerEl || document.activeElement;
      renderSlide(idx);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      if (!modal.classList.contains("is-open")) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") {
        lastFocusedTrigger.focus();
      }
    }

    triggers.forEach(function (btn, index) {
      btn.addEventListener("click", function () {
        openLightbox(index, btn);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        renderSlide(currentIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        renderSlide(currentIndex + 1);
      });
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        renderSlide(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        renderSlide(currentIndex + 1);
      }
    });
  });
})();
