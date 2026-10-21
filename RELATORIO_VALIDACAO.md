# Relatório de Validação Técnica e Visual — Hero V9.1 & Carrossel Sincronizado

**Projeto:** Barcelos Neto — Desenvolvimento Web  
**Diretório local auditado:** `C:\Users\82033625\Documents\GitHub\site-portfolio`  
**URL de produção configurada:** `https://barcelosneto.github.io/site-portfolio` (`basePath: /site-portfolio`)  
**Data da Auditoria:** 20 de outubro de 2026  
**Status Geral:** **100% APROVADO (795 verificações automatizadas aprovadas, 0 erros de console, 0 erros HTTP 404, 0 overflow horizontal em todas as resoluções)**

---

## 1. Resumo Executivo da Implementação do Hero V9.1

A primeira dobra da página inicial (`index.html`) foi atualizada para implementar rigorosamente a composição visual aprovada (Hero V9.1), mantendo a integridade de todas as seções subordinadas já validadas no padrão editorial ID7 (Vitrine de Projetos, Serviços, Diferenciais, Processo, Sobre, FAQ e Contato).

### Principais Elementos do Hero V9.1:
1. **Background e Atmosfera Visual:**
   - Fundo em tom gelo/azul suave (`linear-gradient(135deg, #EEF5FB 0%, #F8FBFE 45%, #EAF2F9 100%)`) com suporte a modo escuro profundo (`linear-gradient(135deg, #0A0F1D 0%, #0D1527 50%, #111C35 100%)`).
   - Grade arquitetônica sutil (`.hero-v9__grid-pattern`) e detalhe orgânico em desfoque no canto superior direito (`assets/img/hero/leaf-accent.webp`).

2. **Coluna Editorial Esquerda:**
   - Tag de identificação: `● Barcelos Neto | Estúdio Front-End & Web`
   - Eyebrow técnico: `DESENVOLVIMENTO WEB SOB MEDIDA`
   - Título principal memorável (`<h1>` único):
     ```
     Sites que
     transformam
     negócios.
     ```
     (com destaque vibrante em azul `#1D64F2` / `#38BDF8`).
   - Descrição comercial persuasiva focada em websites profissionais, landing pages de alta conversão, design sofisticado e velocidade extrema.
   - Ações principais: Botão primário com ícone de seta (`Explorar Projetos →`) e botão secundário com fundo branco e borda discreta (`Solicitar Orçamento`).
   - Faixa de 3 atributos estratégicos com ícones dedicados:
     * **Design estratégico** — Foco em conversão
     * **Alta performance** — Carregamento rápido
     * **Totalmente responsivo** — Mobile first nativo
   - Assinatura autoral do desenvolvedor: Avatar circular com fotografia oficial, nome, cargo (*Desenvolvedor Web*) e citação: *“Tecnologia, design e experiência a serviço da sua marca.”*

3. **Stage Visual à Direita com Carrossel Sincronizado:**
   - Base orgânica translúcida em vidro fosco azulado com ícone flutuante `</>`.
   - **Fotografia recortada do desenvolvedor:** Posicionada em destaque à esquerda do palco (`assets/img/hero/dev-cutout.webp`), preservando fidelidade facial e iluminação natural.
   - **Mockup 3D de Monitor Desktop:** Exibindo capturas reais das interfaces em proporção 16:10, com chassi refinado, suporte chanfrado e base metálica.
   - **Mockup de Smartphone Mobile Sobreposto:** Exibindo capturas reais de alta resolução para dispositivos móveis com notch/alto-falante realista e sombras cinematográficas.
   - **Controles de Navegação:** Botões circulares anterior (`<`) e próximo (`>`), além de 3 indicadores dinâmicos (*dots*) com expansão suave para o slide ativo.
   - **Badge de Destaque Flutuante (`.hero-v9__featured-pill`):**
     * Label: `PROJETO EM DESTAQUE`
     * Nome sincronizado: *Sabor & Brasa*, *Clínica Vitae* ou *Horizonte Prime*
     * Categoria: *GASTRONOMIA*, *SAÚDE* ou *IMÓVEIS DE ALTO PADRÃO*
     * Botão com link direto para a demonstração real correspondente.

4. **Sincronia Total do Carrossel (3 Demonstrações Reais):**
   - **Slide 0:** Sabor & Brasa (Gastronomia Autoral)
   - **Slide 1:** Clínica Vitae (Saúde Integrada)
   - **Slide 2:** Horizonte Prime (Mercado Imobiliário de Alto Padrão)
   - **Transição coordenada:** Ao avançar o carrossel, alternam-se simultaneamente a tela do monitor desktop, a tela do smartphone, o indicador ativo (*dot*), o título, a categoria e os links interativos.
   - **Recursos de Usabilidade:** Autoplay a cada 5 segundos, pausa automática em hover e foco, suspensão inteligente em aba inativa (`visibilitychange`), navegação por teclado (`ArrowLeft` / `ArrowRight`), suporte a gestos de toque (*swipe* mobile) e respeito à preferência de movimento reduzido (`prefers-reduced-motion`).

---

## 2. Inventário de Arquivos e Ativos Criados

| Arquivo | Tipo / Função | Otimização |
| :--- | :--- | :--- |
| `assets/img/hero/slide-restaurante-desktop.webp` | Captura Desktop Demo 1 (1280x800) | WebP 96 KB |
| `assets/img/hero/slide-restaurante-mobile.webp` | Captura Mobile Demo 1 (780x1688) | WebP 87 KB |
| `assets/img/hero/slide-clinica-desktop.webp` | Captura Desktop Demo 2 (1280x800) | WebP 75 KB |
| `assets/img/hero/slide-clinica-mobile.webp` | Captura Mobile Demo 2 (780x1688) | WebP 89 KB |
| `assets/img/hero/slide-imobiliaria-desktop.webp` | Captura Desktop Demo 3 (1280x800) | WebP 106 KB |
| `assets/img/hero/slide-imobiliaria-mobile.webp` | Captura Mobile Demo 3 (780x1688) | WebP 95 KB |
| `assets/img/hero/dev-cutout.webp` | Recorte transparente do desenvolvedor | WebP 24 KB |
| `assets/img/hero/leaf-accent.webp` | Detalhe botânico de ambientação | WebP 6 KB |
| `assets/css/pages.css` | Estilos completos do `.hero-v9` | CSS Otimizado |
| `assets/css/base.css` | Prevenção universal de overflow horizontal | CSS Otimizado |
| `assets/js/main.js` | Motor interativo do carrossel sincronizado | JS Vanilla |
| `index.html` | Marcação semântica da primeira dobra | HTML5 Semântico |

---

## 3. Resultados dos Testes Automatizados e Navegador Real (CDP)

### A. Suíte Estática e de Acessibilidade (`node tests/validate-site.js`)
- **Total de verificações:** 795
- **Erros encontrados:** 0
- **Status:** **100% APROVADO** (único `<h1>` mantido, hierarquia de cabeçalhos íntegra, tags `alt` descritivas em todas as imagens, links e âncoras válidos).

### B. Suíte de Lógica Interativa (`node tests/interaction-tests.js`)
- **Sintaxe JavaScript:** 100% válida em todos os scripts.
- **Configuração de marca:** Dados de Barcelos Neto validados.
- **Filtros e busca:** Case-insensitive e acentuação normalizada.
- **Formulários e acessibilidade:** Conformidade WCAG AA.

### C. Auditoria em Navegador Real via Chrome DevTools Protocol (CDP)

Auditoria conduzida em servidor HTTP local simulando ambiente real do GitHub Pages:

| Viewport Testado | `clientWidth` | `scrollWidth` | Overflow Horizontal (`overflowX`) | Imagens Carregadas | Imagens Quebradas | Monitor Visível | Celular Visível | Foto Dev | Badge Destaque | Console / 404 | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Desktop 1440 (`1440x900`)** | `1425px` | `1425px` | `false` (Zero) | 9 / 9 | 0 | Sim | Sim | Sim | Sim (*Sabor & Brasa*) | 0 / 0 | **APROVADO** |
| **Desktop 1024 (`1024x768`)** | `1009px` | `1009px` | `false` (Zero) | 9 / 9 | 0 | Sim | Sim | Sim | Sim (*Sabor & Brasa*) | 0 / 0 | **APROVADO** |
| **Tablet (`768x1024`)** | `768px` | `768px` | `false` (Zero) | 9 / 9 | 0 | Sim | Sim | Sim | Sim (*Sabor & Brasa*) | 0 / 0 | **APROVADO** |
| **Mobile (`390x844`)** | `390px` | `390px` | `false` (Zero) | 9 / 9 | 0 | Sim | Sim | Sim | Sim (*Sabor & Brasa*) | 0 / 0 | **APROVADO** |
| **Mobile Estreito (`320x568`)** | `320px` | `320px` | `false` (Zero) | 9 / 9 | 0 | Sim | Sim | Sim | Sim (*Clínica Vitae*) | 0 / 0 | **APROVADO** |

### D. Testes Funcionais do Carrossel Sincronizado
- **Avançar para Slide 1:** Ativação simultânea da captura desktop da Clínica Vitae, captura mobile, *dot* 1, título (*Clínica Vitae*) e categoria (*SAÚDE*).
- **Avançar para Slide 2:** Ativação simultânea da captura desktop do Horizonte Prime, captura mobile, *dot* 2, título (*Horizonte Prime*) e categoria (*IMÓVEIS DE ALTO PADRÃO*).
- **Retorno direto por dot:** Clique no *dot* 0 restaurou instantaneamente o Slide 0 (*Sabor & Brasa*).
- **Modo Claro e Modo Escuro:** Testados e validados com contraste nítido e transição fluida.

---

## 4. Diretrizes de Publicação

- **Compromisso de controle de versão:** Nenhuma operação de `git commit` ou `git push` foi executada.
- **Repositório pronto:** Todos os arquivos foram gravados diretamente no diretório local `C:\Users\82033625\Documents\GitHub\site-portfolio`, prontos para inspeção visual do usuário e publicação através do GitHub Desktop.
