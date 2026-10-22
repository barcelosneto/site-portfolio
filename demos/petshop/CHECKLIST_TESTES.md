# Relatório e Checklist de Testes (`CHECKLIST_TESTES.md`)

**Projeto:** Pata & Prosa | Pet Shop e Banho & Tosa  
**Ambiente de Execução:** Servidor HTTP Local (`http://127.0.0.1`) + Google Chrome Headless via Chrome DevTools Protocol (`chrome.exe --headless=new`)  
**Data da Execução:** 20/10/2026  

---

## 1. Teste de Responsividade e Ausência de Overflow Horizontal

Verificação executada via `Emulation.setDeviceMetricsOverride` comparando `document.documentElement.scrollWidth` e `window.innerWidth`:

| Largura da Viewport | `innerWidth` | `scrollWidth` | Overflow Horizontal (`scrollWidth > innerWidth`) | Status |
| :--- | :---: | :---: | :---: | :---: |
| **360px** (Mobile Compacto) | 360px | 360px | `false` | ✅ Aprovado |
| **390px** (Mobile Padrão) | 390px | 390px | `false` | ✅ Aprovado |
| **768px** (Tablet) | 768px | 753px | `false` | ✅ Aprovado |
| **1024px** (Laptop / Tablet Horizontal) | 1024px | 1009px | `false` | ✅ Aprovado |
| **1440px** (Desktop Widescreen) | 1440px | 1425px | `false` | ✅ Aprovado |

---

## 2. Integridade de Imagens, Links e Console

| Item Verificado | Resultado Obtido | Status |
| :--- | :--- | :---: |
| **Imagens Renderizadas (`<img>`)** | 14 imagens carregadas (`complete === true` e `naturalWidth > 0`), `brokenImgs: []` | ✅ Aprovado |
| **Favicons e Open Graph** | `favicon.svg` (raiz), `assets/img/favicon.svg` e `assets/img/og-image.svg` presentes e válidos | ✅ Aprovado |
| **Links (`<a>`)** | 22 links inspecionados; `0` links vazios ou `href="#"` (`badLinks: []`) | ✅ Aprovado |
| **Console JavaScript (`Runtime.exceptionThrown`)** | `0` erros e `0` exceções (`ERROS_CONSOLE: []`) | ✅ Aprovado |

---

## 3. Testes Funcionais das Interações Obrigatórias

| Interação Testada | Comportamento Verificado | Status |
| :--- | :--- | :---: |
| **Menu Mobile Acessível** | Botão `#menu-toggle` alterna `aria-expanded` (`false`/`true`), controla `#nav-menu` e fecha com tecla `Escape` | ✅ Aprovado |
| **Filtro de Serviços por Tipo de Pet** | Alternância entre *Todos* (`6` cards), *Para Cães* (`5` cards), *Para Gatos* (`5` cards) e *Pacotes Mensais* (`1` card), atualizando `aria-pressed` e texto `aria-live` | ✅ Aprovado |
| **Simulador de Orçamento Estimado** | Valor inicial `R$ 65,00` (Porte Pequeno + Banho Completo); ao selecionar `Porte Grande` + `Tosa por Raça` (`R$ 210,00`) + adicional `Desembolo` (`R$ 25,00`), atualizou imediatamente para `R$ 235,00` | ✅ Aprovado |
| **Integração Simulador → Pré-Agendamento** | Clique em `#btn-simulador-agendar` preencheu automaticamente `#campo-porte` (`grande`) e `#campo-servico` (`tosa_raca`) no formulário | ✅ Aprovado |
| **Galeria Antes/Depois & Lightbox Acessível** | Clique no card abriu `#lightbox-modal` (`role="dialog"`, `aria-modal="true"`), botão `Próximo` avançou para `Item 2 de 4`, fechamento devolveu foco ao elemento de origem | ✅ Aprovado |
| **FAQ em Acordeão Acessível** | Clique em `#faq-btn-1` alterou `aria-expanded` de `"false"` para `"true"` e exibiu `#faq-panel-1` | ✅ Aprovado |
| **Validação e Pré-Agendamento Sem Backend** | Tentativa de envio com campo vazio marcou `aria-invalid="true"` e exibiu mensagem de erro; preenchimento completo gerou prévia estruturada para WhatsApp (`wa.me`) e `mailto:` sem prometer confirmação automática | ✅ Aprovado |
| **Botão Flutuante WhatsApp Configurável** | Link `.whatsapp-float` sincronizado com `window.PATA_PROSA_CONFIG.contato.whatsappNumero` (`https://wa.me/5511999990000?...`) | ✅ Aprovado |

---

## 4. Conformidade Ética, SEO e Acessibilidade (WCAG 2.2 AA)

- [x] **Transparência de Demonstração:** Aviso visível no topo e rodapé explicando que preços, avaliações, contatos e endereço são exemplificativos.
- [x] **Sem Promessa Veterinária:** Avisos explícitos informando que o estúdio atua apenas com higiene e estética animal, sem consultas clínicas ou vacinas.
- [x] **Acessibilidade:** Skip link funcional para `#conteudo-principal`, contraste validado, navegação por teclado e suporte a `prefers-reduced-motion`.
- [x] **SEO Seguro para Ambiente Demonstrativo:** Meta tag `noindex, nofollow` e `robots.txt` configurados por padrão com instruções claras de liberação em `PUBLICACAO_GITHUB.md`.
