/**
 * THEME.JS — Gerenciamento de Tema Escuro Premium (Default) / Claro Editorial
 * ===========================================================================
 * Define o Tema Escuro Premium como experiência principal padrão e persiste a
 * escolha do visitante no localStorage (com fallback seguro em memória).
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
    return "dark";
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
        isDark ? "Mudar para tema claro editorial" : "Mudar para tema escuro premium"
      );
    });
  }

  // Aplica imediatamente para evitar flash entre páginas
  var currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(currentTheme);

    var buttons = document.querySelectorAll("[data-theme-toggle]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTheme =
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "light"
            : "dark";
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
