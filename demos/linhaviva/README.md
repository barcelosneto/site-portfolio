# LINHA VIVA | Arquitetura e Interiores

Landing page institucional e comercial de alto padrão desenvolvida sob o conceito de **Minimalismo Editorial Sofisticado** (paleta em tons de areia, off-white quente, carvão arquitetônico e terracota), projetada especificamente para captação qualificada de solicitações de projetos residenciais, reformas/retrofit, arquitetura comercial e consultoria de ambientes.

> **Aviso de Demonstração:** Este repositório encontra-se configurado inicialmente em **Modo de Demonstração**. A marca *Linha Viva Arquitetura e Interiores*, os 7 estudos arquitetônicos conceituais, os contatos e os depoimentos exibidos são ilustrativos. Nenhum projeto é atribuído a terceiros e nenhum número de registro profissional (CAU/CREA) real é inventado. Consulte [`CONFIGURACAO_CLIENTE.md`](./CONFIGURACAO_CLIENTE.md) antes de publicar em produção.

---

## 1. Visão Geral e Funcionalidades Implementadas

- **Estética Editorial Silenciosa:** Tipografia *Cormorant Garamond* (títulos editoriais), *Plus Jakarta Sans* (leitura fluida) e *JetBrains Mono* (cotas, índices e metadados técnicos).
- **Aviso de Demonstração Transparente:** Barra superior discreta e avisos éticos nas seções de portfólio, estúdio, depoimentos e rodapé.
- **Hero com Projeto Destaque:** Apresentação da *Residência Vale Sereno — Conceito Editorial*, métricas de metodologia, CTA primário (*Solicitar proposta*) e abertura direta da ficha conceitual no Lightbox.
- **Manifesto Autoral:** Posicionamento sobre arquitetura silenciosa, luz natural, circulação fluida e precisão executiva.
- **Portfólio Conceitual Filtrável + Lightbox Acessível:**
  - Filtro interativo em tempo real por **Todos (6)**, **Residencial (2)**, **Interiores (2)** e **Comercial (2)** com `aria-pressed` e contador dinâmico (`aria-live="polite"`).
  - Galeria modal (**Lightbox**) com atributos `role="dialog"`, `aria-modal="true"`, navegação por botões Anterior/Próximo e teclado (`ArrowLeft`, `ArrowRight`, `Escape`), retenção de foco (*focus trap*) e devolução de foco ao botão de origem.
- **Slider de Comparação Antes / Depois:**
  - Comparador interativo (*Estudo de Reforma — Living Integrado Jardins*) controlável por arraste de mouse/toque, controle nativo `<input type="range">` acessível por teclado e botões rápidos de preset (*Ver Antes*, *50/50*, *Ver Depois*).
- **Serviços e Etapas de Projeto:**
  - 4 modalidades detalhadas (*Arquitetura de Interiores*, *Reforma & Retrofit*, *Arquitetura Comercial* e *Consultoria de Ambientes*) com entregáveis claros e CTAs que pré-selecionam o serviço no formulário.
  - Linha do tempo com as 5 etapas metodológicas sem prometer prazos irreais.
- **Simulador Interativo de Escopo (Sem Preço Enganoso):**
  - Permite combinar **Tipologia**, **Metragem Aproximada** e **Modalidade**, retornando a complexidade técnica, lista de entregáveis previstos e faixa de prazo orientativa em semanas, com botão funcional para transferir o escopo direto para o briefing.
- **FAQ em Acordeão Acessível:** Perguntas essenciais respondidas com suporte completo a teclado (`aria-expanded`, `aria-controls`).
- **Formulário de Briefing Sem Backend:**
  - Campos de Nome, Contato, Tipo de Imóvel, Serviço Desejado, Metragem, Cidade/UF, Previsão de Início e Descrição.
  - **Indicador de Progresso em Tempo Real (0% a 100%)** sem persistência em banco de dados ou `localStorage`.
  - Validação no cliente com mensagens claras em português.
  - Envio funcional via **WhatsApp** (`https://wa.me/...`) ou **E-mail** (`mailto:...`) com texto codificado.
  - Botão funcional **Copiar resumo do briefing** com feedback acessível.

---

## 2. Estrutura de Diretórios e Arquivos

```text
arquitetura-interiores/
├── index.html                  # Página principal semântica (HTML5 + JSON-LD + Open Graph)
├── favicon.svg                 # Ícone vetorial na raiz para compatibilidade ampla
├── .nojekyll                   # Desativa processamento Jekyll no GitHub Pages
├── robots.txt                  # Configurado com Disallow por padrão no modo demonstração
├── sitemap.xml                 # Sitemap XML com URL de exemplo substituível
├── README.md                   # Documentação geral do projeto
├── PUBLICACAO_GITHUB.md        # Passo a passo para publicar no GitHub Pages e domínio próprio
├── CONFIGURACAO_CLIENTE.md     # Guia rápido para personalizar contatos, marca e SEO
├── CHECKLIST_TESTES.md         # Relatório de testes reais executados (HTML, links, responsivo)
├── LICENSE_ASSETS.md           # Documentação de licença e autoria dos assets locais
└── assets/
    ├── css/
    │   └── styles.css          # Sistema de design, layout responsivo e acessibilidade
    ├── js/
    │   ├── config.js           # Central de parâmetros editáveis pelo cliente
    │   └── main.js             # Lógica de filtros, lightbox, slider, simulador e briefing
    └── img/
        ├── favicon.svg
        ├── og-image.svg
        ├── hero-vale-sereno.svg
        ├── proj-casa-mirante.svg
        ├── proj-apartamento-jardins.svg
        ├── proj-atelier-botanico.svg
        ├── proj-cobertura-leblon.svg
        ├── proj-galeria-croma.svg
        ├── proj-refugio-mantiqueira.svg
        ├── reforma-antes.svg
        ├── reforma-depois.svg
        └── estudio-materiais.svg
```

---

## 3. Como Executar Localmente

Por utilizar apenas tecnologias estáticas nativas (**HTML5, CSS3 e JavaScript ES6+** com caminhos relativos), não há etapa de compilação (*build*) obrigatória.

Para visualizar localmente com protocolo HTTP:

```bash
# Opção 1 — Usando Node.js (npx serve ou http-server)
npx --yes serve -l 8080 .

# Opção 2 — Usando Python 3
python -m http.server 8080
```

Em seguida, acesse `http://localhost:8080` no navegador.
