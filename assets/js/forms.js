/**
 * FORMS.JS — Validação Acessível no Cliente, Honeypot e Envio Transparente via mailto:
 * ====================================================================================
 * NUNCA exibe "mensagem enviada com sucesso" sem que um backend real tenha confirmado.
 * Quando o e-mail oficial ainda está "A confirmar" em config/site-config.js, prepara o
 * rascunho completo, permite copiá-lo e avisa claramente que o endereço destinatário
 * aguarda confirmação no arquivo de configuração.
 */

(function () {
  var config = window.SITE_CONFIG || {};

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var feedbackBox = document.getElementById("form-feedback");
    var copyDraftBtn = document.getElementById("copy-draft-btn");
    var lastPreparedDraft = "";

    // Pré-seleciona tipo de projeto ou mensagem caso venha via query string
    try {
      var params = new URLSearchParams(window.location.search);
      var projParam = params.get("projeto");
      var assuntoParam = params.get("assunto");
      var projectSelect = form.querySelector("#project-type");
      var messageInput = form.querySelector("#message");

      if (projParam && projectSelect) {
        var options = Array.prototype.slice.call(projectSelect.options);
        options.forEach(function (opt) {
          if (opt.value.toLowerCase() === projParam.toLowerCase()) {
            projectSelect.value = opt.value;
          }
        });
      }
      if (assuntoParam && messageInput && !messageInput.value) {
        messageInput.value =
          "Olá, Barcelos Neto! Tenho interesse em conversar sobre: " +
          assuntoParam +
          ".\n\n";
      }
    } catch (e) {
      // Ignora caso URLSearchParams não esteja disponível
    }

    function setFieldError(input, errorId, message) {
      var errEl = document.getElementById(errorId);
      if (message) {
        input.setAttribute("aria-invalid", "true");
        if (errEl) {
          errEl.textContent = message;
          errEl.classList.add("is-visible");
        }
      } else {
        input.setAttribute("aria-invalid", "false");
        if (errEl) {
          errEl.textContent = "";
          errEl.classList.remove("is-visible");
        }
      }
    }

    function validateField(input) {
      var id = input.id;
      var val = (input.value || "").trim();

      if (id === "full-name") {
        if (val.length < 2) {
          setFieldError(
            input,
            "error-full-name",
            "Por favor, informe seu nome completo (mínimo de 2 caracteres)."
          );
          return false;
        }
        setFieldError(input, "error-full-name", "");
        return true;
      }

      if (id === "email") {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!val || !emailRegex.test(val)) {
          setFieldError(
            input,
            "error-email",
            "Informe um endereço de e-mail válido (ex.: nome@empresa.com.br)."
          );
          return false;
        }
        setFieldError(input, "error-email", "");
        return true;
      }

      if (id === "phone") {
        if (val !== "") {
          var digits = val.replace(/\D/g, "");
          if (digits.length < 10 || digits.length > 13) {
            setFieldError(
              input,
              "error-phone",
              "Se preenchido, informe um telefone válido com DDD (10 ou 11 dígitos)."
            );
            return false;
          }
        }
        setFieldError(input, "error-phone", "");
        return true;
      }

      if (id === "project-type") {
        if (!val) {
          setFieldError(
            input,
            "error-project-type",
            "Selecione o tipo de projeto desejado."
          );
          return false;
        }
        setFieldError(input, "error-project-type", "");
        return true;
      }

      if (id === "message") {
        if (val.length < 15) {
          setFieldError(
            input,
            "error-message",
            "Descreva brevemente sua necessidade (mínimo de 15 caracteres)."
          );
          return false;
        }
        setFieldError(input, "error-message", "");
        return true;
      }

      if (id === "consent") {
        if (!input.checked) {
          setFieldError(
            input,
            "error-consent",
            "Confirme ciência sobre a Política de Privacidade e a forma de envio para prosseguir."
          );
          return false;
        }
        setFieldError(input, "error-consent", "");
        return true;
      }

      return true;
    }

    var trackedInputs = form.querySelectorAll(
      "#full-name, #email, #phone, #project-type, #message, #consent"
    );
    trackedInputs.forEach(function (input) {
      input.addEventListener("blur", function () {
        validateField(input);
      });
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") {
          validateField(input);
        }
      });
      input.addEventListener("change", function () {
        if (input.getAttribute("aria-invalid") === "true") {
          validateField(input);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Verificação de Honeypot Anti-Spam (Proteção básica no cliente)
      var honey = form.querySelector("#website-url-hp");
      if (honey && honey.value.trim() !== "") {
        if (feedbackBox) {
          feedbackBox.className = "alert alert--warning";
          feedbackBox.removeAttribute("hidden");
          feedbackBox.textContent =
            "Submissão bloqueada pelo filtro anti-spam local. Caso seja um visitante humano, limpe o campo oculto e tente novamente.";
        }
        return;
      }

      var firstInvalid = null;
      var allValid = true;

      trackedInputs.forEach(function (input) {
        var ok = validateField(input);
        if (!ok) {
          allValid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (!allValid) {
        if (feedbackBox) {
          feedbackBox.className = "alert alert--error";
          feedbackBox.removeAttribute("hidden");
          feedbackBox.textContent =
            "Verifique os campos destacados em vermelho antes de preparar sua solicitação.";
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Monta o resumo estruturado para envio
      var nameVal = form.querySelector("#full-name").value.trim();
      var emailVal = form.querySelector("#email").value.trim();
      var phoneVal = form.querySelector("#phone").value.trim() || "Não informado";
      var typeSelect = form.querySelector("#project-type");
      var typeText =
        typeSelect.options[typeSelect.selectedIndex].text || typeSelect.value;
      var budgetSelect = form.querySelector("#budget");
      var budgetText =
        budgetSelect && budgetSelect.value
          ? budgetSelect.options[budgetSelect.selectedIndex].text
          : "A definir / Não informado";
      var messageVal = form.querySelector("#message").value.trim();

      var configuredEmail =
        config.contact && typeof config.contact.email === "string"
          ? config.contact.email.trim()
          : "";
      var hasValidRecipient =
        configuredEmail.length > 3 && configuredEmail.indexOf("@") !== -1;

      var subject =
        "[Solicitação de Orçamento] " + typeText + " — " + nameVal;
      var bodyLines = [
        "Olá, " + (config.professionalIdentity || "Barcelos Neto — Desenvolvedor Web") + ",",
        "",
        "Gostaria de solicitar um orçamento com os seguintes dados:",
        "------------------------------------------------------------",
        "Nome: " + nameVal,
        "E-mail: " + emailVal,
        "Telefone / WhatsApp: " + phoneVal,
        "Tipo de Projeto: " + typeText,
        "Orçamento Estimado: " + budgetText,
        "------------------------------------------------------------",
        "Mensagem / Escopo Inicial:",
        messageVal,
        "",
        "Enviado através da página de contato do site."
      ];
      var bodyString = bodyLines.join("\r\n");
      lastPreparedDraft =
        "Destinatário: " +
        (hasValidRecipient ? configuredEmail : "[E-mail a confirmar em config/site-config.js]") +
        "\nAssunto: " +
        subject +
        "\n\n" +
        bodyLines.join("\n");

      if (copyDraftBtn) {
        copyDraftBtn.removeAttribute("hidden");
        copyDraftBtn.style.display = "inline-flex";
      }

      if (hasValidRecipient) {
        var mailtoHref =
          "mailto:" +
          encodeURIComponent(configuredEmail) +
          "?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(bodyString);

        if (feedbackBox) {
          feedbackBox.className = "alert alert--info";
          feedbackBox.removeAttribute("hidden");
          feedbackBox.innerHTML =
            "<strong>Rascunho de orçamento preparado!</strong> Como este é um site estático sem armazenamento em servidor próprio, estamos abrindo seu aplicativo de e-mail padrão (para <code>" +
            configuredEmail +
            "</code>). <strong>Importante:</strong> o envio só será concluído após você clicar em <em>Enviar</em> dentro do seu programa de e-mail. Se preferir, use o botão abaixo para copiar o texto completo.";
        }

        window.location.href = mailtoHref;
      } else {
        if (feedbackBox) {
          feedbackBox.className = "alert alert--warning";
          feedbackBox.removeAttribute("hidden");
          feedbackBox.innerHTML =
            "<strong>Rascunho validado e pronto para cópia!</strong> O endereço de e-mail de destino ainda está marcado como <em>A confirmar</em> em <code>config/site-config.js</code>. Clique no botão <strong>Copiar texto da mensagem</strong> abaixo ou configure o e-mail definitivo em <code>config/site-config.js</code> para abrir o programa de e-mail automaticamente.";
        }
      }
    });

    if (copyDraftBtn) {
      copyDraftBtn.addEventListener("click", function () {
        if (!lastPreparedDraft) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(lastPreparedDraft).then(function () {
            if (window.showToast) {
              window.showToast(
                "Mensagem copiada! Cole no seu canal de contato de preferência."
              );
            }
          });
        }
      });
    }
  });
})();
