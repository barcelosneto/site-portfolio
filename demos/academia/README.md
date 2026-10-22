# PULSO FIT | Academia Boutique e Treinamento Orientado

Landing page institucional e de captação de interessados (aula experimental e planos) desenvolvida para **PULSO FIT | Academia e Treinamento**, focada em adultos iniciantes, intermediários e público 50+ que buscam um ambiente acolhedor, sem superlotação e com orientação próxima.

> **Aviso de Demonstração Comercial:** Este projeto contém marca, endereço, contatos, grade de horários, valores de planos (Mensal, Trimestral e Anual), indicadores operacionais e perfis de equipe **fictícios de exemplo**. Nenhuma credencial profissional (como registro CREF) ou avaliação real foi inventada. Antes de publicar em produção para um cliente real, siga o guia [`CONFIGURACAO_CLIENTE.md`](CONFIGURACAO_CLIENTE.md).

---

## Sumário da Arquitetura e Funcionalidades

1. **Identidade Visual Energética Premium:**
   - Paleta de alto contraste com grafite profundo (`#111315` / `#1A1D21`), branco suave (`#F8FAFC`) e lima elétrico (`#C8FF00` / `#B4F000`).
   - Ilustrações vetoriais autorais em SVG retratando diversidade etária (incluindo público 60+ ativo), equipamentos de força, funcional, bike indoor, mobilidade e vestiários.
2. **Seções Obrigatórias Completas:**
   - Aviso de demonstração no topo e em cada seção demonstrativa.
   - Hero com chamada acolhedora, CTA funcional *"Solicitar aula experimental"* e indicadores operacionais explicitamente demonstrativos.
   - **Modalidades:** Musculação Orientada, Treinamento Funcional, Bike Indoor e Mobilidade & Core com intensidade, duração, público indicado e botão que pré-seleciona a modalidade no formulário.
   - **Diferenciais:** Foco em ambiente sem superlotação, acompanhamento próximo, diversidade etária e vestiários completos.
   - **Grade Semanal Interativa:** Filtro combinado por **Modalidade** e **Dia da Semana (Segunda a Sábado)**, contador dinâmico de turmas e botão em cada aula que pré-preenche o formulário de aula experimental.
   - **Planos (Mensal / Trimestral / Anual):** Alternância interativa de periodicidade com cálculo transparente do valor mensal equivalente, valor total do ciclo e economia em relação ao ciclo mensal (valores fictícios explicitados), além de botões para WhatsApp pré-preenchido e seleção no formulário.
   - **Equipe:** Perfis ilustrativos com diversidade e sem credenciais ou números de registro inventados.
   - **Instalações:** Apresentação visual das 4 zonas do estúdio.
   - **FAQ Acessível:** Acordeão com `aria-expanded` e `aria-controls`.
   - **Formulário de Interesse sem Backend:** Validação completa em português no cliente e envio transparente via **WhatsApp** (`https://wa.me/...`) ou **E-mail** (`mailto:`), informando que a aula experimental depende de confirmação da equipe e que o site não realiza avaliação física clínica nem prescrição de exercícios.
3. **Padrões Técnicos:**
   - 100% estático (HTML5 semântico, CSS3 moderno, JavaScript ES6+ sem dependências externas).
   - Caminhos relativos compatíveis com `https://USUARIO.github.io/academia/` ou domínio próprio.
   - Acessibilidade WCAG 2.2 AA (skip link, foco visível, contraste, navegação por teclado, respeito a `prefers-reduced-motion`).

---

## Estrutura de Arquivos

```text
academia/
├── index.html                  # Página principal completa em HTML5 semântico
├── favicon.svg                 # Favicon SVG na raiz
├── .nojekyll                   # Desativa processamento Jekyll no GitHub Pages
├── robots.txt                  # Configuração de crawlers (noindex por padrão em modo demo)
├── sitemap.xml                 # Mapa do site com URL de exemplo substituível
├── README.md                   # Documentação geral do projeto
├── PUBLICACAO_GITHUB.md        # Passo a passo para publicar no GitHub Pages
├── CONFIGURACAO_CLIENTE.md     # Guia para substituir dados fictícios pelos reais
├── CHECKLIST_TESTES.md         # Relatório real de testes automatizados e responsivos
├── LICENSE_ASSETS.md           # Documentação de licença e autoria dos assets SVG
└── assets/
    ├── css/
    │   └── styles.css          # Estilos responsivos (360px a 1440px+) e acessíveis
    ├── js/
    │   ├── config.js           # Dados centralizados da marca, grade, planos e contatos
    │   └── main.js             # Lógica de filtros, calculadora de planos, FAQ e formulário
    └── img/
        ├── favicon.svg
        ├── og-pulso-fit.svg
        ├── hero-treino-diversidade.svg
        ├── modalidade-musculacao.svg
        ├── modalidade-funcional.svg
        ├── modalidade-bike.svg
        ├── modalidade-mobilidade.svg
        ├── instalacao-forca.svg
        ├── instalacao-bike-studio.svg
        ├── instalacao-funcional.svg
        ├── instalacao-vestiarios.svg
        ├── equipe-1.svg
        ├── equipe-2.svg
        └── equipe-3.svg
```

---

## Como Executar Localmente

Como o projeto utiliza apenas HTML, CSS e JavaScript estáticos com caminhos relativos, você pode abri-lo diretamente no navegador ou subir um servidor HTTP simples:

```powershell
# Usando Node.js (npx serve ou http-server) ou Python:
python -m http.server 8080
```

Em seguida, acesse `http://localhost:8080` no navegador.
