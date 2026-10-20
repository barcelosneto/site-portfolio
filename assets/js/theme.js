/**
 * THEME.JS — Gerenciamento de Tema Claro / Escuro
 * ===============================================
 * Respeita prefers-color-scheme e persiste escolha no localStorage (com try/catch).
 */

(function () {
  var STORAGE_KEY = "vertice_theme_preference";

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Ambientes com bloqueio de cookies/storage continuam funcionando em memória
    }
  }

  function getPreferredTheme() {
    var stored = getStoredTheme();
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    var buttons = document.querySelectorAll("[data-theme-toggle]");
    buttons.forEach(function (btn) {
      var isDark = theme === "dark";
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        isDark ? "Ativar tema claro" : "Ativar tema escuro"
      );
      btn.setAttribute(
        "title",
        isDark ? "Mudar para tema claro" : "Mudar para tema escuro"
      );
    });
  }

  // Aplica imediatamente para evitar flash
  var currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(currentTheme);

    var buttons = document.querySelectorAll("[data-theme-toggle]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setStoredTheme(currentTheme);
        applyTheme(currentTheme);
      });
    });

    if (window.matchMedia) {
      var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", function (e) {
          if (!getStoredTheme()) {
            currentTheme = e.matches ? "dark" : "light";
            applyTheme(currentTheme);
          }
        });
      }
    }
  });
})();
