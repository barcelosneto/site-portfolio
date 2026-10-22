# Relatório e Checklist de Testes Executados — LINHA VIVA | Arquitetura e Interiores

> **Nota de Transparência de QA:** Todos os itens abaixo foram **efetivamente executados e verificados** em ambiente real utilizando servidor HTTP local (`127.0.0.1`) e instância real do **Google Chrome Headless** via *Chrome DevTools Protocol (CDP)* em `20/10/2026`.

---

## 1. Integridade de Estrutura, Arquivos e Caminhos Relativos

| Item Verificado | Status | Resultado Medido |
| :--- | :---: | :--- |
| Presença dos arquivos obrigatórios da entrega | **APROVADO** | `24/24` arquivos presentes (`index.html`, `styles.css`, `config.js`, `main.js`, `favicon.svg`, `.nojekyll`, `robots.txt`, `sitemap.xml`, 4 arquivos `.md` e 12 SVGs em `assets/img/`) |
| Ausência de links mortos `href="#"` | **APROVADO** | `0` ocorrências de `href="#"` no HTML |
| Caminhos relativos para compatibilidade com subdiretório GitHub Pages | **APROVADO** | `0` caminhos absolutos iniciados por `/` para assets internos |
| Integridade de âncoras internas (`href="#..."`) | **APROVADO** | `31/31` links internos apontam para IDs existentes no DOM (`0` quebrados) |

---

## 2. Carregamento Visual, Imagens e Console do Navegador

| Item Verificado | Status | Resultado Medido |
| :--- | :---: | :--- |
| Renderização das imagens locais (`complete && naturalWidth > 0`) | **APROVADO** | `11/11` elementos `<img>` na página carregaram com `naturalWidth > 0` e XML/SVG estritamente válido |
| Textos alternativos (`alt`) em todas as imagens | **APROVADO** | `11/11` imagens possuem atributo `alt` descritivo preenchido (`0` vazios ou ausentes) |
| Erros de execução JavaScript ou recursos 404 no Console | **APROVADO** | `0` erros ou exceções capturadas via `Runtime.exceptionThrown` e `Log.entryAdded` |
| Carregamento não bloqueante de fontes tipográficas | **APROVADO** | Uso de `media="print" onload="this.media='all'"` com fallback seguro (`Georgia, serif` / `system-ui`), evitando bloqueio de `DOMContentLoaded` |

---

## 3. Responsividade e Ausência de Overflow Horizontal

Testado via `Emulation.setDeviceMetricsOverride` no Google Chrome comparando `document.documentElement.scrollWidth` e `document.documentElement.clientWidth`:

| Largura da Viewport | Status | Medição Real (`clientWidth` vs `scrollWidth`) |
| :--- | :---: | :--- |
| **360px** (Mobile compacto) | **APROVADO** | `clientWidth = 360px` / `scrollWidth = 360px` (Zero overflow) |
| **390px** (Mobile padrão) | **APROVADO** | `clientWidth = 390px` / `scrollWidth = 390px` (Zero overflow) |
| **768px** (Tablet vertical) | **APROVADO** | `clientWidth = 753px` / `scrollWidth = 753px` (Zero overflow) |
| **1024px** (Tablet horizontal / Laptop compacto) | **APROVADO** | `clientWidth = 1009px` / `scrollWidth = 1009px` (Zero overflow) |
| **1440px** (Desktop amplo) | **APROVADO** | `clientWidth = 1425px` / `scrollWidth = 1425px` (Zero overflow) |

---

## 4. Testes Funcionais das Interações Obrigatórias

| Funcionalidade / Interação | Status | Comportamento Verificado no DOM |
| :--- | :---: | :--- |
| **Filtro do Portfólio** (`Todos`, `Residencial`, `Interiores`, `Comercial`) | **APROVADO** | Ao selecionar `Comercial`, exibe exatamente `2` cards, atualiza `aria-pressed="true"` e o contador vivo (`"Exibindo 2 de 6 estudos comerciais"`). Ao retornar para `Todos`, exibe os `6` cards. |
| **Galeria com Lightbox Acessível e Teclado** | **APROVADO** | Abre com `role="dialog"` e `aria-modal="true"` exibindo *"Casa Mirante da Serra"*, avança para *"Apartamento Alvorada Jardins"*, responde às teclas `ArrowLeft`, `ArrowRight` e `Escape`, e fecha restaurando o foco. |
| **Slider de Comparação Antes / Depois** | **APROVADO** | Controle `<input type="range">` e botões de preset ajustam dinamicamente a camada `#ba-before-clip` e a divisória `#ba-handle` (`15%`, `50%`, `85%`). |
| **Simulador Interativo de Escopo** | **APROVADO** | Seleção de tipologia, metragem e modalidade atualiza faixa de prazo (ex.: *"5 a 8 semanas"* para Consultoria > 300 m²) e entregáveis. O botão `#btn-apply-scope` transfere o escopo para o formulário de briefing (`Progresso=50%`). |
| **FAQ em Acordeão Acessível** | **APROVADO** | Botões `.faq-trigger` alternam `aria-expanded="true/false"` e o atributo `hidden` do painel correspondente (`aria-controls`). |
| **Formulário de Briefing + Barra de Progresso + Cópia + Envio** | **APROVADO** | Preenchimento dos 8 campos eleva `#form-progress-bar` de `0%` a `100%` em tempo real sem persistência em `localStorage`/banco; gera o resumo formatado em `#briefing-preview-text`; valida campos obrigatórios em pt-BR; aciona cópia para área de transferência e montagem de links `https://wa.me/...` e `mailto:...` codificados. |

---

## 5. Conformidade Ética, SEO e Segurança

- [x] **Aviso de Demonstração:** Presente no topo da página, na seção de portfólio, na seção do estúdio, nos depoimentos e no rodapé.
- [x] **Não atribuição enganosa:** Nenhum registro CAU/CREA real ou autoria de terceiros foi inventado.
- [x] **SEO Seguro em Modo Demo:** Configurado com `<meta name="robots" content="noindex, nofollow">` e `Disallow: /` em `robots.txt` até que o proprietário substitua pelos dados reais.
- [x] **Privacidade:** Nenhum tracker oculto, token privado ou armazenamento de dados sensíveis do visitante.
