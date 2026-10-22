# Pata & Prosa | Pet Shop e Banho & Tosa

Landing page estática de alta conversão desenvolvida para **Pata & Prosa | Pet Shop e Banho & Tosa**, focada em agendamento de banho e tosa via WhatsApp, simulação transparente de orçamento estimado por porte/espécie e apresentação acolhedora do processo de cuidado para cães e gatos.

---

## Visão Geral do Projeto

- **Objetivo Comercial:** Converter visitantes (tutores de cães e gatos) em solicitações qualificadas de pré-agendamento e orçamento via WhatsApp ou e-mail (`mailto:`), destacando diferenciais reais de bem-estar animal (atendimento com hora marcada, secagem com ruído reduzido, toalhas individuais esterilizadas e janelas exclusivas para gatos).
- **Identidade Visual:** Paleta acolhedora em **Verde Sálvia** (`#4A6B5D` / `#688B7B`), **Creme** (`#FAF6F0` / `#F2ECE1`) e **Coral** (`#E06D53` / `#C8553D`), tipografia elegante (`Fraunces` + `Plus Jakarta Sans` com fallbacks nativos), ilustrações afetivas autorais em SVG e microanimações suaves.
- **Arquitetura 100% Estática:** HTML5 semântico, CSS3 moderno e JavaScript ES6+ modular sem dependências externas pesadas e sem necessidade de backend, banco de dados ou chaves de API. Compatível imediatamente com **GitHub Pages** (`https://USUARIO.github.io/REPOSITORIO/` ou domínio próprio).

---

## Estrutura de Arquivos

```text
pet-shop/
├── index.html                  # Página principal semântica e acessível (WCAG 2.2 AA)
├── favicon.svg                 # Ícone vetorial na raiz
├── .nojekyll                   # Desativa processamento Jekyll no GitHub Pages
├── robots.txt                  # Configuração de indexação (noindex por padrão em modo demo)
├── sitemap.xml                 # Mapa do site com URL de exemplo substituível
├── README.md                   # Documentação geral do projeto
├── PUBLICACAO_GITHUB.md        # Passo a passo para publicar no GitHub Pages
├── CONFIGURACAO_CLIENTE.md     # Guia de personalização de preços, WhatsApp e textos
├── CHECKLIST_TESTES.md         # Relatório real de testes automatizados e responsividade
├── LICENSE_ASSETS.md           # Documentação de licença e autoria das ilustrações SVG
└── assets/
    ├── css/
    │   └── styles.css          # Estilos responsivos (360px a 1440px+), variáveis e acessibilidade
    ├── js/
    │   ├── config.js           # Central de dados: marca, matriz de preços, serviços, FAQ e contatos
    │   └── main.js             # Lógica de filtro, simulador, lightbox, FAQ e pré-agendamento
    └── img/
        ├── favicon.svg
        ├── og-image.svg
        ├── hero-pets.svg
        ├── servico-banho.svg
        ├── servico-tosa-higienica.svg
        ├── servico-tosa-raca.svg
        ├── servico-hidratacao.svg
        ├── servico-gatos.svg
        ├── servico-pacotes.svg
        ├── galeria-1.svg
        ├── galeria-2.svg
        ├── galeria-3.svg
        ├── galeria-4.svg
        └── mapa-ilustrativo.svg
```

---

## Funcionalidades Implementadas

1. **Aviso de Demonstração Transparente:** Faixa superior e avisos contextuais informando que preços, avaliações, endereço e contatos são demonstrativos, além de deixar explícito que o estúdio **não realiza atendimento clínico ou veterinário**.
2. **Filtro de Serviços por Tipo de Pet:** Alternância instantânea entre *Todos os cuidados*, *Para Cães*, *Para Gatos* e *Pacotes Mensais* com atualização de `aria-pressed` e região `aria-live`.
3. **Simulador de Orçamento Estimado:** Cálculo em tempo real combinando espécie/porte (`Pequeno`, `Médio`, `Grande`, `Gigante`, `Gato Pelo Curto`, `Gato Pelo Longo`), serviço principal e cuidados extras opcionais, alimentado integralmente por `assets/js/config.js`.
4. **Integração Direta com Pré-Agendamento:** Tanto os cards de serviço quanto o simulador e a tabela de pacotes preenchem automaticamente o formulário de pré-agendamento e rolam suavemente até ele.
5. **Galeria Antes/Depois com Lightbox Acessível:** Modal com `role="dialog"`, `aria-modal="true"`, navegação por botões (*Anterior* / *Próximo*) e teclado (`ArrowLeft`, `ArrowRight`, `Escape`), com devolução de foco ao card de origem.
6. **FAQ em Acordeão Acessível:** Perguntas e respostas controladas via `aria-expanded` e `aria-controls`.
7. **Formulário de Pré-Agendamento Sem Backend:** Validação no cliente com mensagens claras por campo, prévia em tempo real do texto e abertura segura de link `https://wa.me/...` ou `mailto:`, sem fingir confirmação automática de agenda.

---

## Como Executar Localmente

Você pode abrir o arquivo `index.html` diretamente no navegador ou iniciar qualquer servidor estático local:

```bash
# Opção 1: Usando Node.js (npx serve)
npx serve .

# Opção 2: Usando Python 3
python -m http.server 8080
```

Depois, acesse `http://localhost:8080` no navegador.

---

## Documentação Complementar

- Consulte [`CONFIGURACAO_CLIENTE.md`](./CONFIGURACAO_CLIENTE.md) para alterar telefone/WhatsApp, preços do simulador, endereço e imagens.
- Consulte [`PUBLICACAO_GITHUB.md`](./PUBLICACAO_GITHUB.md) para publicar gratuitamente no GitHub Pages.
- Consulte [`CHECKLIST_TESTES.md`](./CHECKLIST_TESTES.md) para verificar a bateria de testes executada neste projeto.
- Consulte [`LICENSE_ASSETS.md`](./LICENSE_ASSETS.md) para informações de licença dos recursos visuais.
