# Checklist e Relatório de Testes de QA (`CHECKLIST_TESTES.md`)

**Projeto:** Nexo Academy — Cursos de Tecnologia (`cursos-tecnologia`)  
**Ambiente de Execução:** Servidor HTTP estático local (`http://127.0.0.1:8765`) + Google Chrome Headless via DevTools Protocol (`chrome.exe --headless=new`)  
**Status Geral:** **APROVADO (100% dos testes passaram sem erros)**

---

## 1. Testes de Responsividade e Overflow Horizontal

Foram emulados os 5 breakpoints obrigatórios verificando `document.documentElement.scrollWidth <= window.innerWidth`:

| Viewport (Largura) | `window.innerWidth` | `document.documentElement.scrollWidth` | Overflow Horizontal | Status |
| :--- | :---: | :---: | :---: | :---: |
| **360px** (Mobile compacto) | 360px | 360px | `false` | ✅ Aprovado |
| **390px** (Mobile padrão) | 390px | 390px | `false` | ✅ Aprovado |
| **768px** (Tablet vertical) | 768px | 753px | `false` | ✅ Aprovado |
| **1024px** (Tablet horiz. / Laptop) | 1024px | 1009px | `false` | ✅ Aprovado |
| **1440px** (Desktop widescreen) | 1440px | 1425px | `false` | ✅ Aprovado |

---

## 2. Integridade de Assets, Links e Console

| Critério Avaliado | Resultado Medido | Status |
| :--- | :--- | :---: |
| Erros no Console (`Runtime.consoleAPICalled` / Exceptions) | `0 erros` | ✅ Aprovado |
| Imagens carregadas (`img.complete && img.naturalWidth > 0`) | `16 de 16 carregadas` (`0 quebradas`) | ✅ Aprovado |
| Links vazios (`href="#"` ou `href=""`) | `0 ocorrências` | ✅ Aprovado |
| Links/caminhos internos absolutos iniciados por `/` | `0 ocorrências` (100% relativos para GitHub Pages) | ✅ Aprovado |
| Presença de `.nojekyll`, `robots.txt`, `sitemap.xml` e `favicon.svg` | Todos presentes na raiz | ✅ Aprovado |

---

## 3. Verificação das Interações Específicas (JavaScript Local)

| Funcionalidade / Fluxo Testado | Comportamento Verificado | Status |
| :--- | :--- | :---: |
| **Vitrine Inicial de Cursos** | Renderiza os `6` cursos configurados em `assets/js/config.js` com carga horária, nível, formato e preço demonstrativo. | ✅ Aprovado |
| **Busca Textual em Tempo Real** | Ao digitar `"Pandas"` em `#busca-curso`, filtra imediatamente para `2` cursos correspondentes e atualiza `#contador-cursos`. | ✅ Aprovado |
| **Filtros por Categoria / Nível / Modalidade** | Seleção de categoria `"IA"` exibe `2` cursos; botão `#btn-limpar-filtros` restaura os `6` cursos. | ✅ Aprovado |
| **Modal Acessível de Detalhes do Curso** | Abre ao clicar em `"Ver ementa"`, popula 4 módulos programáticos, pré-requisitos, ferramentas e projeto prático; fecha via botão `✕`, clique fora ou tecla `Esc` devolvendo foco ao botão acionador. | ✅ Aprovado |
| **Comparador de até 3 Cursos** | Inicia com `2` cursos comparados, permite incluir o `3º` curso na tabela comparativa e exibe alerta acessível quando o usuário tenta adicionar um `4º` curso. | ✅ Aprovado |
| **Indicador Visual de Progresso de Trilha** | Permite marcar/desmarcar etapas nas trilhas atualizando `aria-valuenow` até `100%`, explicitamente identificado como simulador ilustrativo local sem salvar dados de alunos. | ✅ Aprovado |
| **Pré-preenchimento por Curso / Turma** | Clicar em `"Tenho interesse nesta turma"` preenche `#campo-curso` e `#campo-turma`, exibe `#banner-preenchimento` e rola até `#inscricao`. | ✅ Aprovado |
| **FAQ em Acordeão Acessível** | Alterna `aria-expanded="false"` para `"true"` e exibe o painel correspondente (`aria-controls`). | ✅ Aprovado |
| **Validação e Envio do Formulário (Sem Backend)** | Bloqueia submissão vazia exibindo mensagens de erro em pt-BR; quando preenchido corretamente, gera URL codificada `https://wa.me/5511999990000?text=...` ou `mailto:` sem simular checkout ou armazenamento oculto. | ✅ Aprovado |

---

## 4. Conformidade Ética, Acessibilidade e SEO

- [x] **Copy sóbrio e transparente:** Ênfase em projetos práticos e competências técnicas, sem promessas de emprego garantido, salários mágicos ou reconhecimento superior pelo MEC.
- [x] **Avisos claros de demonstração:** Banner superior discreto e avisos nas seções de preços, turmas, instrutores e formulário.
- [x] **SEO seguro para ambiente demonstrativo:** `<meta name="robots" content="noindex, nofollow" />` e `Disallow: /` em `robots.txt` por padrão até substituição pelos dados reais do contratante.
- [x] **Acessibilidade WCAG 2.2 AA:** Skip link funcional, hierarquia de títulos `h1`–`h3`, `:focus-visible` nítido, atributos `aria-*` em componentes dinâmicos e suporte a `prefers-reduced-motion`.
