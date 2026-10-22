# Nexo Academy — Landing Page de Cursos de Tecnologia (`cursos-tecnologia`)

Landing page estática de alta conversão para escola de cursos livres de tecnologia (**Python, Excel Avançado, Power BI e Inteligência Artificial Aplicada**), desenvolvida em HTML5 semântico, CSS3 moderno (identidade Azul Petróleo, Violeta e Ciano) e JavaScript ES6+ puro, pronta para hospedagem no **GitHub Pages** ou qualquer servidor estático.

---

## 1. Visão Geral e Destaques

- **Foco Comercial Realista e Ético:** Promessa pedagógica sóbria orientada a projetos práticos e portfólio técnico, sem promessas enganosas de emprego garantido, salários fixos ou certificações de ensino superior (MEC).
- **100% Estático e Independente:** Zero dependências de backend, banco de dados, PHP, Node.js em runtime ou bibliotecas externas pesadas.
- **Assets 100% Locais em SVG:** Todas as ilustrações de dashboards, código Python, Excel, Power BI, fluxos de IA, avatares de instrutores, `og-image.svg` e `favicon.svg` estão armazenadas localmente em `assets/img/`.
- **Interações Locais Completas:**
  1. **Busca Textual em Tempo Real + Filtros Combinados** por Categoria (`Python`, `Excel`, `Power BI`, `IA`), Nível (`Iniciante`, `Intermediário`, `Avançado`) e Modalidade (`Ao vivo online`, `Híbrido`, `Presencial executivo`).
  2. **Modal Acessível de Detalhes do Curso** (`role="dialog"`, `aria-modal="true"`, fechamento por `Esc`, clique no fundo ou botão `✕` e retorno de foco ao botão de origem).
  3. **Comparador Interativo de até 3 Cursos** com tabela lado a lado, barra de status e seleção rápida.
  4. **Trilhas de Aprendizagem com Simulador Visual de Progresso** (explicitamente identificado como ilustrativo para a sessão atual, sem login ou armazenamento de dados de alunos).
  5. **Cronograma de Turmas Editável** com botão `"Tenho interesse nesta turma"` que pré-preenche automaticamente o formulário de contato.
  6. **Formulário de Interesse Transparente (Sem Backend):** Validação no cliente em português e envio direto via **WhatsApp** (`https://wa.me/`) ou **E-mail** (`mailto:`) com mensagem codificada.

---

## 2. Estrutura de Arquivos

```text
cursos-tecnologia/
├── index.html                  # Página principal semântica e acessível (WCAG 2.2 AA)
├── favicon.svg                 # Favicon principal na raiz
├── .nojekyll                   # Compatibilidade direta com GitHub Pages
├── robots.txt                  # Configurado com Disallow por padrão (modo demonstração)
├── sitemap.xml                 # Sitemap com URL de exemplo substituível
├── README.md                   # Documentação geral do projeto
├── PUBLICACAO_GITHUB.md        # Passo a passo para publicar no GitHub Pages
├── CONFIGURACAO_CLIENTE.md     # Guia de personalização de preços, turmas e contatos
├── CHECKLIST_TESTES.md         # Relatório técnico de testes automatizados e QA
├── LICENSE_ASSETS.md           # Documentação de autoria e licença dos SVGs locais
└── assets/
    ├── css/
    │   └── styles.css          # Folha de estilos responsiva (360px a 1440px+)
    ├── js/
    │   ├── config.js           # Central de dados (marca, cursos, turmas, instrutores, contatos)
    │   └── main.js             # Lógica de filtros, modal, comparador, trilhas, FAQ e formulário
    └── img/
        ├── favicon.svg
        ├── og-image.svg
        ├── hero-edtech-dashboard.svg
        ├── curso-python-dados.svg
        ├── curso-excel-modelagem.svg
        ├── curso-powerbi-storytelling.svg
        ├── curso-ia-aplicada.svg
        ├── curso-sql-analytics.svg
        ├── curso-automacao-ia.svg
        ├── projeto-pipeline-python.svg
        ├── projeto-dashboard-executivo.svg
        ├── projeto-assistente-ia.svg
        ├── instrutor-1.svg
        ├── instrutor-2.svg
        ├── instrutor-3.svg
        └── instrutor-4.svg
```

---

## 3. Como Executar Localmente

Como o projeto utiliza apenas caminhos relativos e assets locais, você pode abri-lo em qualquer servidor HTTP estático:

```bash
# Opção 1: Usando npx serve ou http-server
npx http-server . -p 8080

# Opção 2: Usando Python 3
python -m http.server 8080
```

Em seguida, acesse `http://localhost:8080` no navegador.

---

## 4. Documentação Complementar

- Leia [`CONFIGURACAO_CLIENTE.md`](CONFIGURACAO_CLIENTE.md) para personalizar telefone/WhatsApp, e-mail, cursos, preços e datas de turmas no arquivo `assets/js/config.js`.
- Leia [`PUBLICACAO_GITHUB.md`](PUBLICACAO_GITHUB.md) para publicar gratuitamente no GitHub Pages com ou sem domínio próprio.
- Leia [`CHECKLIST_TESTES.md`](CHECKLIST_TESTES.md) para conferir a validação técnica de responsividade, acessibilidade e interações.
