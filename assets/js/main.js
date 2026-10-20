/**
 * MAIN.JS — Inicialização Global, Navegação Acessível, Reveal & Microinterações V2.0
 * ==================================================================================
 * Consome dados de window.SITE_CONFIG (definido em config/site-config.js)
 * e gerencia menu mobile, header dinâmico, scroll reveal (IntersectionObserver),
 * showcase interativo da Hero, botão voltar ao topo e links inteligentes.
 */

(function () {
  var config = window.SITE_CONFIG || {};

  function isValidUrl(value) {
    return typeof value === "string" && /^https?:\/\/.+/i.test(value.trim());
  }

  function isValidEmail(value) {
    return (
      typeof value === "string" &&
      value.trim().length > 3 &&
      value.indexOf("@") !== -1
    );
  }

  function isValidWhatsapp(value) {
    if (typeof value !== "string") return false;
    var digits = value.replace(/\D/g, "");
    return digits.length >= 10;
  }

  /**
   * Injeta valores do config/site-config.js nos elementos marcados com data-config-*
   */
  function injectConfigValues() {
    var brandName = config.brandName || "Barcelos Neto — Desenvolvimento Web";
    var identity =
      config.professionalIdentity || "Barcelos Neto — Desenvolvedor Web";
    var email =
      config.contact && config.contact.email ? config.contact.email.trim() : "";
    var whatsapp =
      config.contact && config.contact.whatsapp
        ? config.contact.whatsapp.trim()
        : "";
    var socials = config.socialLinks || {};

    // Nome da marca / assinatura
    document.querySelectorAll("[data-config-brand]").forEach(function (el) {
      el.textContent = brandName;
    });

    document.querySelectorAll("[data-config-identity]").forEach(function (el) {
      el.textContent = identity;
    });

    // E-mail
    document.querySelectorAll("[data-config-email]").forEach(function (el) {
      if (isValidEmail(email)) {
        if (el.tagName === "A") {
          el.setAttribute("href", "mailto:" + email);
        }
        el.textContent = email;
      } else {
        if (el.tagName === "A") {
          el.removeAttribute("href");
          el.classList.add("text-muted");
        }
        el.textContent = "A confirmar (config/site-config.js)";
      }
    });

    // Botões de WhatsApp opcionais
    document.querySelectorAll("[data-whatsapp-cta]").forEach(function (el) {
      if (isValidWhatsapp(whatsapp)) {
        var digits = whatsapp.replace(/\D/g, "");
        var msg = encodeURIComponent(
          (config.contact && config.contact.whatsappDefaultMessage) ||
            "Olá! Gostaria de solicitar um orçamento para um site."
        );
        el.setAttribute("href", "https://wa.me/" + digits + "?text=" + msg);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
        el.style.display = "inline-flex";
        el.removeAttribute("hidden");
      } else {
        el.style.display = "none";
        el.setAttribute("hidden", "hidden");
      }
    });

    document.querySelectorAll("[data-whatsapp-notice]").forEach(function (el) {
      if (isValidWhatsapp(whatsapp)) {
        el.textContent = whatsapp;
      } else {
        el.textContent = "Atendimento inicial via formulário ou e-mail direto";
      }
    });

    // Links sociais dinâmicos (renderiza apenas os que estão preenchidos com URL válida)
    document.querySelectorAll("[data-social-list]").forEach(function (container) {
      container.innerHTML = "";

      var items = [
        {
          key: "github",
          label: "GitHub",
          url: socials.github,
          icon: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>'
        },
        {
          key: "linkedin",
          label: "LinkedIn",
          url: socials.linkedin,
          icon: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>'
        },
        {
          key: "instagram",
          label: "Instagram",
          url: socials.instagram,
          icon: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>'
        }
      ];

      items.forEach(function (item) {
        if (isValidUrl(item.url)) {
          var a = document.createElement("a");
          a.href = item.url.trim();
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.className = "btn btn--secondary btn--sm social-pill";
          a.setAttribute("aria-label", item.label + " de " + brandName);
          a.innerHTML = item.icon + "<span>" + item.label + "</span>";
          container.appendChild(a);
        }
      });
    });
  }

  /**
   * Gerencia menu mobile responsivo com acessibilidade (aria-expanded, Escape, clique fora)
   */
  function initMobileNavigation() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var nav = document.querySelector("[data-main-nav]");
    if (!toggle || !nav) return;

    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu de navegação");
    }

    function openMenu() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu de navegação");
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });
  }

  /**
   * Estado de scroll do Header e botão "Voltar ao topo"
   */
  function initBackToTop() {
    var btn = document.querySelector("[data-back-to-top]");
    var header = document.querySelector(".site-header");

    function handleScroll() {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      if (header) {
        if (y > 24) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
      }
      if (btn) {
        if (y > 380) {
          btn.classList.add("is-visible");
        } else {
          btn.classList.remove("is-visible");
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    if (btn) {
      btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /**
   * Animações sutis de entrada com IntersectionObserver (respeita prefers-reduced-motion)
   */
  function initScrollReveal() {
    var revealEls = document.querySelectorAll("[data-reveal], .reveal");
    if (!revealEls.length) return;

    var prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof window.IntersectionObserver !== "function") {
      revealEls.forEach(function (el) {
        el.classList.add("is-revealed");
      });
      return;
    }

    document.documentElement.classList.add("js-reveal-ready");

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -48px 0px",
        threshold: 0.08
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * Showcase interativo na Hero (permite alternar preview das 3 demos na Home)
   */
  function initHeroShowcase() {
    var tabs = Array.prototype.slice.call(
      document.querySelectorAll("[data-showcase-tab]")
    );
    var panes = Array.prototype.slice.call(
      document.querySelectorAll("[data-showcase-pane]")
    );
    if (!tabs.length || !panes.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-showcase-tab");
        tabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", active ? "true" : "false");
        });
        panes.forEach(function (pane) {
          var match = pane.getAttribute("data-showcase-pane") === target;
          pane.classList.toggle("is-active", match);
          if (match) {
            pane.removeAttribute("hidden");
          } else {
            pane.setAttribute("hidden", "hidden");
          }
        });
      });
    });
  }

  /**
   * Toast global acessível para feedbacks rápidos
   */
  window.showToast = function (message) {
    var toast = document.getElementById("global-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "global-toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3500);
  };

  /**
   * Botão de compartilhamento / cópia de link da página ou demo
   */
  function initShareButtons() {
    document.querySelectorAll("[data-share-page]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var url = window.location.href;
        if (navigator.share) {
          navigator
            .share({
              title: document.title,
              url: url
            })
            .catch(function () {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () {
            window.showToast("Link copiado para a área de transferência!");
          });
        } else {
          window.showToast("URL: " + url);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectConfigValues();
    initMobileNavigation();
    initBackToTop();
    initScrollReveal();
    initHeroShowcase();
    initShareButtons();
  });
})();
