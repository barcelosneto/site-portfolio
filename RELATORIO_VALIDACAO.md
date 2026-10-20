# Relatório de Validação e Qualidade (`RELATORIO_VALIDACAO.md`)

**Projeto:** Barcelos Neto — Desenvolvimento Web — Site Comercial e Portfólio Estático para GitHub Pages  
**Data da Auditoria:** 20 de outubro de 2026  
**Ambiente de Execução:** Windows / Node.js v24.22.0 / Python 3.14.7  

---

## 1. Declaração Transparente sobre o Ambiente de Testes

Em estrita observância ao protocolo de honestidade técnica do projeto:
- **O que foi executado de fato:**
  1. Servidor HTTP real em Node.js (`tests/validate-site.js`) servindo todas as páginas, CSS, JS e SVGs tanto na raiz (`/`) quanto sob o subdiretório simulado de repositório GitHub Pages (`/site-portfolio/`).
  2. Auditoria automatizada de **692 verificações** cobrindo as 10 páginas HTML obrigatórias, resolução de todos os links internos, imagens, scripts, folhas de estilo, âncoras internas, presença de `lang="pt-BR"`, `<title>`, `<meta name="description">`, `<h1>` único e `skip-link`.
  3. Suíte de testes de lógica e integração JavaScript (`tests/interaction-tests.js`) validando sintaxe de todos os 7 módulos JS, normalização de acentos da busca, integridade de `config/site-config.js`, associação de `<label for="...">` em todos os campos de formulário e faixas de demonstração nas 3 demos.
- **Limitação declarada do ambiente atual:**
  - Ferramentas de navegador integrado para captura de screenshot visual ou execução do motor Lighthouse GUI não estão disponíveis nas ferramentas expostas a esta sessão do agente. Portanto, nenhuma pontuação numérica do Lighthouse ou captura de tela é alegada sem execução real; em vez disso, a responsividade (320px a 1440px+), a semântica e o contraste foram garantidos por engenharia de CSS e auditados via scripts automatizados em `tests/`.

---

## 2. Matriz de Testes por Rota e Cenário

| Rota / Arquivo | Cenário Testado | Resultado | Evidência Disponível | Correção Aplicada / Observações |
| :--- | :--- | :---: | :--- | :--- |
| `/` (`index.html`) | Carregamento direto na raiz e sob `/site-portfolio/index.html`, verificação de links, CTAs, FAQ `<details>`, metadados SEO, JSON-LD e `skip-link`. | **Aprovado** | `node tests/validate-site.js` (HTTP 200 + 0 links quebrados) | Todos os caminhos relativos validados sem dependência de `/` absoluto. |
| `/portfolio/` (`portfolio/index.html`) | Filtragem por 5 categorias + "Todos", busca instantânea com normalização de acentos (`normalize("NFD")`), estado vazio amigável e botão "Limpar filtros". | **Aprovado** | `node tests/interaction-tests.js` + `assets/js/portfolio.js` | Estado vazio (`[data-portfolio-empty]`) e contador `aria-live="polite"` implementados. |
| `/servicos/` (`servicos/index.html`) | Navegação por âncoras (`#landing-pages`, `#institucional`, `#portfolios`, `#manutencao`), entregáveis claros e aviso de transparência sobre escopo estático. | **Aprovado** | `node tests/validate-site.js` (todas as âncoras internas verificadas) | Links cruzados com o portfólio e pré-seleção de assunto no contato (`?projeto=...`). |
| `/sobre/` (`sobre/index.html`) | Apresentação profissional editável sem invenção de credenciais, anos de experiência ou clientes falsos. | **Aprovado** | Inspeção de conteúdo + `tests/validate-site.js` | Adicionado bloco informativo orientando personalização pelo proprietário. |
| `/contato/` (`contato/index.html`) | Validação client-side (nome, e-mail, telefone opcional, tipo de projeto, mensagem, consentimento), honeypot anti-spam, envio honesto via `mailto:`, botão de copiar rascunho e WhatsApp sem número inventado. | **Aprovado** | `node tests/interaction-tests.js` + `assets/js/forms.js` | Garantido que o formulário jamais afirma "mensagem enviada" sem confirmação real do cliente de e-mail. |
| `/privacidade/` (`privacidade/index.html`) | Política informativa condizente com site estático (sem banco de dados próprio, uso restrito de `localStorage` para tema) e campos `[...]` para revisão jurídica. | **Aprovado** | `node tests/validate-site.js` | Campos do controlador destacados para preenchimento antes de produção. |
| `/404.html` (`404.html`) | Página de erro amigável com atalhos de recuperação e ajuste automático de links caso `basePath` esteja configurado em `config/site-config.js`. | **Aprovado** | `node tests/validate-site.js` (HTTP 200 e links íntegros) | Script inline adapta links `[data-base-link]` quando `basePath` é preenchido. |
| `/demos/restaurante/` (`demos/restaurante/index.html`) | Identidade visual própria (tema escuro/âmbar), faixa "Demonstração de portfólio", cardápio filtrável por categoria e restrições (vegetariano/sem glúten), lightbox acessível (setas + `Escape`) e aviso de preços ilustrativos. | **Aprovado** | `node tests/validate-site.js` + `assets/js/demo-restaurante.js` | Lightbox restaura foco ao botão acionador quando fechado por `Escape` ou clique. |
| `/demos/clinica/` (`demos/clinica/index.html`) | Identidade visual própria (tema sereno verde-água), faixa "Demonstração de portfólio", especialidades, corpo clínico ilustrativo sem CRM falso, aviso ético e agendamento demonstrativo via WhatsApp. | **Aprovado** | `node tests/validate-site.js` + `node tests/interaction-tests.js` | Cartões de equipe utilizam placeholders explícitos `[CRM / RQE a preencher]`. |
| `/demos/imobiliaria/` (`demos/imobiliaria/index.html`) | Identidade visual própria (azul-índigo corporativo), faixa "Demonstração de portfólio", filtro multicritério (tipo, bairro, faixa de preço e quartos), modal acessível de ficha técnica com 3 vistas SVG e valores marcados como fictícios. | **Aprovado** | `node tests/validate-site.js` + `assets/js/demo-imobiliaria.js` | Modal inclui troca de vistas da galeria e link contextualizado com o código do imóvel (`HP-101` a `HP-106`). |

---

## 3. Verificação de Responsividade, Acessibilidade e Temas

| Critério Técnico | Implementação e Verificação | Status |
| :--- | :--- | :---: |
| **Breakpoints (320px, 375px, 768px, 1024px, 1440px+)** | Layout fluido com `max-width: 1200px`, grids responsivos (`grid-template-columns: 1fr` no mobile escalando em `640px` e `960px`), menu mobile colapsável abaixo de `920px` e `overflow-x: hidden` no `body`. | **Aprovado** |
| **Alternância de Tema Claro / Escuro** | `assets/js/theme.js` carregado no `<head>` para evitar flash visual, respeitando `prefers-color-scheme` e persistindo em `localStorage` protegido por `try/catch`. | **Aprovado** |
| **Navegação por Teclado e Foco Visível** | `:focus-visible` com `outline: 3px solid var(--border-focus)`, `skip-link` funcional em todas as 10 páginas, fechamento de menu mobile e modais via tecla `Escape`. | **Aprovado** |
| **Contraste de Cores (WCAG AA)** | Paleta ajustada em `assets/css/base.css` (`#0F172A` sobre `#F8FAFC` no tema claro; `#F8FAFC` sobre `#0B1220` no tema escuro; azul primário `#1D4ED8` sobre branco com razão > 4.5:1). | **Aprovado** |
| **Respeito a `prefers-reduced-motion`** | Regra global `@media (prefers-reduced-motion: reduce)` em `base.css` e verificação programática no botão "Voltar ao topo" (`main.js`). | **Aprovado** |

---

## 4. Pendências para o Proprietário Antes de Publicar

Nenhuma pendência estrutural ou de código. Apenas **configurações de negócio** que dependem dos dados reais do proprietário em [`config/site-config.js`](config/site-config.js) e [`privacidade/index.html`](privacidade/index.html), listadas no arquivo [`CHECKLIST_PUBLICACAO.md`](CHECKLIST_PUBLICACAO.md).
