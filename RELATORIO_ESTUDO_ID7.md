# Estudo de Referência Visual e Arquitetura de Informação: ID7 Studio (V7)

**Projeto:** Barcelos Neto — Desenvolvimento Web  
**Referências Inspecionadas:**  
- `https://id7.com.br/` (Página Inicial)  
- `https://id7.com.br/portfolio/` (Portfólio de Cases)  
**Data do Estudo:** 20 de outubro de 2026  
**Objetivo:** Mapear o padrão de qualidade, sofisticação editorial, hierarquia visual, uso de espaços e apresentação de cases do ID7 Studio para aplicá-los com identidade própria no redesign V7 da Home de Barcelos Neto.

---

## 1. Análise Estrutural e Visual do ID7 Studio

### 1.1. Estrutura da Home e Proporção das Seções
* **Hero Aberto e Respirado:** O ID7 utiliza uma primeira dobra com bastante respiro (whitespace), tipografia marcante, foco no propósito do estúdio (*"Estúdio de design, identidade visual e sites"*) e chamada de ação clara. Não há poluição com múltiplos widgets, dezenas de métricas ou botões conflitantes.
* **Projetos como Protagonistas Imediatos:** Logo após a introdução da marca, o ID7 apresenta os **Cases em Destaque**. O visitante não precisa passar por blocos cansativos de texto ou serviços genéricos para ver a capacidade de entrega; o trabalho visual vem primeiro.
* **Módulos Editoriais Variados:** Os cases não são exibidos em grades rígidas de três cartões pequenos idênticos. O ID7 alterna cases com fotos amplas full-width ou proporções assimétricas que valorizam a identidade de cada projeto (NAX, Casa Ismael, Alttea, Sagarana, etc.).
* **Serviços / O que Fazemos:** Seção editorial enxuta, focando nos serviços centrais de entrega (Identidade Visual, Criação de Sites, Design Gráfico), com linguagem orientada ao cliente.
* **Sobre & Filosofia do Estúdio:** Breve apresentação humana da equipe/estúdio, reforçando solidez e método de trabalho.
* **CTA Final & Rodapé Elegante:** Chamada convidativa para iniciar novos projetos (*"Vamos dar forma ao que vem a seguir"*), formulário estruturado e rodapé limpo com navegação essencial e redes sociais.

### 1.2. Hierarquia Tipográfica e Ritmo Visual
* **Títulos Marcantes:** Headings com alto contraste, fontes display refinadas e espaçamento de linha calculado para evitar blocos maciços.
* **Micro-tipografia Elegante:** Tags de categorias em caixa alta (`uppercase`), fontes mono ou sans-serif com tracking positivo (+0.04em a +0.06em) e cores de acento sutis.
* **Ritmo e Contraste:** Alternância suave entre seções em superfícies escuras profundas (grafite/slate) e blocos com contraste elevado, permitindo que as imagens dos projetos saltem aos olhos.

### 1.3. Apresentação dos Cases
* **Imagens Grandes e Imersivas:** Mockups em tela cheia ou cartões com proporções generosas (`16:9` / `16:10`), demonstrando o produto digital em ambiente real.
* **Metadados Transparentes:** Título do case, nicho de atuação e indicação objetiva do escopo entregue.
* **Ação Direta:** Botões ou links de texto com setas sutis indicando navegação direta para o case.

---

## 2. Diagnóstico da Home Atual de Barcelos Neto vs. Referência ID7

| Aspecto | Versão Atual | Meta Padrão ID7 (Redesign V7) |
| :--- | :--- | :--- |
| **Posicionamento da Vitrine** | Vitrine vinha após blocos de introdução e painéis densos. | **Imediato após o Hero:** Projetos como centro absoluto das atenções. |
| **Escala dos Projetos** | Cards médios em grade regular de 3 colunas iguais. | **Módulos Editoriais Grandes e Alternados:** Destaque amplo para *Sabor & Brasa*, seguido por duo editorial (*Clínica Vitae* e *Horizonte Prime*). |
| **Hero (Primeira Dobra)** | Acúmulo de badges, mockups em múltiplas camadas pequenas. | **Hero Editorial Sofisticado:** Headline comercial de alto impacto (*"Criamos experiências digitais que fazem sua marca se destacar"*), foto real do desenvolvedor com tratamento autoral nobre, sem poluição visual. |
| **Serviços e Diferenciais** | Foco excessivamente técnico em cards fechados. | **Linguagem Editorial Orientada a Resultados:** 4 soluções claras para negócios + barra subordinada de engenharia. |
| **Identidade de Cor** | Mantida a paleta original autoral. | **Grafite profundo, branco quente e azul como assinatura cromática**, com acabamento de estúdio premium. |

---

## 3. Plano Diretor de Reconstrução da Home V7

1. **Refatoração Completa do HTML (`index.html`):**
   - **Hero:** Headline sugerida: *"Criamos experiências digitais que fazem sua marca se destacar."*, subtítulo focado em sites institucionais, landing pages e experiências web sob medida, CTAs `Ver Projetos` e `Solicitar Orçamento`, e integração editorial da fotografia real de Barcelos Neto.
   - **Vitrine Principal (`#projetos-destaque`):** Posicionada imediatamente sob o hero.
     - *Destaque 01 (Full Editorial):* Sabor & Brasa (Gastronomia Autoral) com grande screenshot da interface real e fotografia na parrilla.
     - *Duo Editorial 02 & 03:* Clínica Vitae (Saúde Integrada) e Horizonte Prime (Mercado Imobiliário) com screenshots reais e diferenciais de negócio.
     - *Faixa de Acesso ao Acervo Completo:* Apresentação dos 6 projetos do catálogo (destacando Estrutura Executiva, LaunchPad e MonoGrid) com link para `/portfolio/index.html`.
   - **Serviços:** Seção enxuta e elegante com os 4 escopos principais.
   - **Diferenciais Verificáveis:** 4 compromissos reais de engenharia e atendimento.
   - **Processo:** 4 etapas leves e transparentes.
   - **Sobre:** Introdução pessoal autêntica com link para a biografia completa.
   - **CTA Final & Rodapé:** Conversão comercial direta e rodapé refinado.

2. **Novos Estilos Editoriais em `assets/css/pages.css`:**
   - Classes dedicadas no padrão estúdio: `.hero-id7`, `.case-showcase-hero`, `.cases-grid-editorial`, `.case-card-featured`, `.case-card-editorial`.
   - Espaçamento generoso entre seções (`padding: var(--space-16) 0`).
   - Bordas refinadas, profundidade com sombras naturais e suporte a `prefers-reduced-motion`.

3. **Validação Rigorosa em Navegador Real:**
   - Captura e inspeção visual em 375px, 768px, 1366px e 1920px.
   - Verificação de 100% de integridade em links, imagens, ausência de overflow horizontal e testes automatizados.
