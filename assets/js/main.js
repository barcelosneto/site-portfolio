/**
 * MAIN.JS — Navegação, Menu Mobile, Config/BASE_PATH, WhatsApp, Share e Back-to-top
 * =================================================================================
 */

(function () {
  var config = window.SITE_CONFIG || {};

  /**
   * Resolve um caminho relativo à raiz do projeto usando o atributo data-root do <html>
   * ou basePath configurado. Garante funcionamento na raiz ou em /site-portfolio/.
   */
  function resolveProjectUrl(relativePath) {
    var rootPrefix = document.documentElement.getAttribute("data-root") || ".";
    var cleanPrefix = rootPrefix.replace(/\/+$/, "");
    var cleanRel = (relativePath || "").replace(/^\/+/, "");
    if (!cleanRel) return cleanPrefix + "/";
    return cleanPrefix + "/" + cleanRel;
  }

  window.resolveProjectUrl = resolveProjectUrl;

  /**
   * 1. MENU MOBILE ACESSÍVEL (aria-expanded, Escape, clique fora)
   */
  function initMobileMenu() {
    var toggleBtn = document.querySelector("[data-menu-toggle]");
    var nav = document.querySelector("[data-main-nav]");
    if (!toggleBtn || !nav) return;

    function closeMenu(restoreFocus) {
      if (!nav.classList.contains("is-open")) return;
      nav.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "Abrir menu de navegação");
      if (restoreFocus) {
        toggleBtn.focus();
      }
    }

    function openMenu() {
      nav.classList.add("is-open");
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.setAttribute("aria-label", "Fechar menu de navegação");
    }

    toggleBtn.addEventListener("click", function () {
      var isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    // Fechar com Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMenu(true);
      }
    });

    // Fechar ao clicar fora do menu ou botão
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMenu(false);
      }
    });

    // Fechar ao clicar em um link âncora do menu
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu(false);
      });
    });
  }

  /**
   * 2. CONFIGURAÇÃO HONESTA DE WHATSAPP E CONTATOS
   * Se whatsappNumber não estiver preenchido em config/site-config.js,
   * desativa/ajusta o botão com aviso claro e jamais inventa um número.
   */
  function initWhatsAppButtons() {
    var rawNumber =
      config.contact && typeof config.contact.whatsappNumber === "string"
        ? config.contact.whatsappNumber.replace(/\D/g, "")
        : "";
    var defaultMsg =
      (config.contact && config.contact.whatsappDefaultMessage) ||
      "Olá! Gostaria de solicitar informações.";

    var waElements = document.querySelectorAll("[data-whatsapp-cta]");
    var waStatusNotices = document.querySelectorAll("[data-whatsapp-notice]");

    waElements.forEach(function (el) {
      var customMsg = el.getAttribute("data-whatsapp-msg") || defaultMsg;
      if (rawNumber.length >= 10) {
        var waUrl =
          "https://wa.me/" +
          rawNumber +
          "?text=" +
          encodeURIComponent(customMsg);
        if (el.tagName.toLowerCase() === "a") {
          el.setAttribute("href", waUrl);
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener noreferrer");
        } else {
          el.addEventListener("click", function () {
            window.open(waUrl, "_blank", "noopener,noreferrer");
          });
        }
        el.classList.remove("btn--disabled");
        el.removeAttribute("aria-disabled");
      } else {
        // Número marcado como "A confirmar": comportamento transparente e honesto
        var hideIfUnset = el.getAttribute("data-whatsapp-hide-if-unset") === "true";
        if (hideIfUnset) {
          el.style.display = "none";
          return;
        }
        if (el.tagName.toLowerCase() === "a") {
          el.removeAttribute("href");
        }
        el.setAttribute("aria-disabled", "true");
        el.classList.add("btn--disabled");
        el.setAttribute(
          "title",
          "WhatsApp a confirmar em config/site-config.js"
        );
        el.addEventListener("click", function (e) {
          e.preventDefault();
          showToast(
            "WhatsApp a confirmar: defina seu número real em config/site-config.js para ativar o redirecionamento."
          );
        });
      }
    });

    waStatusNotices.forEach(function (notice) {
      if (rawNumber.length >= 10) {
        notice.textContent = "Atendimento rápido via WhatsApp configurado.";
      } else {
        notice.textContent =
          "Status do WhatsApp: A confirmar. Assim que o número oficial for inserido em config/site-config.js, o botão abrirá a conversa automaticamente.";
      }
    });
  }

  /**
   * 3. PREENCHIMENTO DINÂMICO DE MARCA, E-MAIL E REDES SOCIAIS CONFIGURÁVEIS
   */
  function initBrandBindings() {
    var rawEmail =
      config.contact && typeof config.contact.email === "string"
        ? config.contact.email.trim()
        : "";
    var emailStatusLabel =
      (config.contact && config.contact.emailStatusLabel) ||
      "A confirmar (configurar em config/site-config.js)";

    document.querySelectorAll("[data-config-email]").forEach(function (el) {
      if (rawEmail && rawEmail.indexOf("@") !== -1) {
        el.textContent = rawEmail;
        if (el.tagName.toLowerCase() === "a") {
          el.setAttribute("href", "mailto:" + rawEmail);
          el.removeAttribute("aria-disabled");
        }
      } else {
        el.textContent = emailStatusLabel;
        if (el.tagName.toLowerCase() === "a") {
          el.removeAttribute("href");
          el.setAttribute("aria-disabled", "true");
          el.style.textDecoration = "none";
          el.style.cursor = "default";
        }
      }
    });

    document.querySelectorAll("[data-config-brand]").forEach(function (el) {
      if (config.brandName) {
        el.textContent = config.brandName;
      }
    });

    // Redes sociais: exibe apenas URLs confirmadas (ex.: GitHub de Barcelos Neto)
    var socialContainerList = document.querySelectorAll("[data-social-list]");
    var socialLinks = config.socialLinks || {};
    var labelMap = {
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      behance: "Behance"
    };
    var activeSocials = Object.keys(socialLinks).filter(function (key) {
      return typeof socialLinks[key] === "string" && socialLinks[key].trim() !== "";
    });

    socialContainerList.forEach(function (container) {
      if (activeSocials.length === 0) {
        container.innerHTML =
          '<p class="form-help">Links de redes sociais aparecerão automaticamente aqui quando configurados em <code>config/site-config.js</code>.</p>';
        return;
      }
      var listHtml = '<div class="tag-list">';
      activeSocials.forEach(function (network) {
        var label = labelMap[network] || network.charAt(0).toUpperCase() + network.slice(1);
        listHtml +=
          '<a href="' +
          socialLinks[network] +
          '" class="btn btn--secondary btn--sm" target="_blank" rel="noopener noreferrer">' +
          label +
          "</a>";
      });
      listHtml += "</div>";
      container.innerHTML = listHtml;
    });
  }

  /**
   * 4. CANONICAL E COMPARTILHAMENTO (Web Share API + Fallback de Cópia)
   */
  function initShareAndCanonical() {
    var canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && config.productionUrl) {
      var prodBase = config.productionUrl.replace(/\/+$/, "");
      var pagePath = canonicalLink.getAttribute("data-page-path") || "";
      var normalizedPath = pagePath.replace(/^\/+/, "");
      canonicalLink.setAttribute(
        "href",
        normalizedPath ? prodBase + "/" + normalizedPath : prodBase + "/"
      );
    }

    var shareBtns = document.querySelectorAll("[data-share-page]");
    shareBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var shareData = {
          title: document.title,
          text:
            (config.brandName || "Barcelos Neto — Desenvolvimento Web") +
            " — " +
            (config.brandSlogan || "Sites profissionais que transformam visitas em oportunidades"),
          url: window.location.href
        };

        if (navigator.share && typeof navigator.share === "function") {
          navigator
            .share(shareData)
            .then(function () {
              showToast("Link compartilhado com sucesso!");
            })
            .catch(function (err) {
              if (err && err.name !== "AbortError") {
                copyUrlFallback(window.location.href);
              }
            });
        } else {
          copyUrlFallback(window.location.href);
        }
      });
    });
  }

  function copyUrlFallback(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(function () {
          showToast("Endereço da página copiado para a área de transferência!");
        })
        .catch(function () {
          legacyCopy(url);
        });
    } else {
      legacyCopy(url);
    }
  }

  function legacyCopy(text) {
    try {
      var input = document.createElement("input");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      showToast("Endereço da página copiado para a área de transferência!");
    } catch (e) {
      showToast("Copie o endereço diretamente da barra do navegador: " + text);
    }
  }

  /**
   * 5. TOAST ACESSÍVEL (aria-live="polite")
   */
  var toastTimer = null;
  function showToast(message) {
    var toast = document.getElementById("site-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "site-toast";
      toast.className = "toast-notification";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 4500);
  }

  window.showToast = showToast;

  /**
   * 6. BOTÃO VOLTAR AO TOPO
   */
  function initBackToTop() {
    var btn = document.querySelector("[data-back-to-top]");
    if (!btn) return;

    function toggleVisibility() {
      if (window.scrollY > 360) {
        btn.classList.add("is-visible");
      } else {
        btn.classList.remove("is-visible");
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener("click", function () {
      var prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? "auto" : "smooth"
      });
      var skipTarget = document.getElementById("conteudo-principal");
      if (skipTarget) {
        skipTarget.setAttribute("tabindex", "-1");
        skipTarget.focus({ preventScroll: true });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initWhatsAppButtons();
    initBrandBindings();
    initShareAndCanonical();
    initBackToTop();
  });
})();
