# Relatório e Checklist de Testes (`CHECKLIST_TESTES.md`)

**Projeto:** PULSO FIT | Academia e Treinamento (`academia`)  
**Data da Execução:** 20/10/2026  
**Ambiente de Teste:** Servidor HTTP estático Node.js (`http://127.0.0.1:8943/index.html`) + Google Chrome Headless via DevTools Protocol (`C:\Program Files\Google\Chrome\Application\chrome.exe`).

---

## 1. Resumo Executivo

- **Erros de Console JavaScript (`Runtime.exceptionThrown` / `console.error`):** `0`
- **Falhas de Rede (`Network.loadingFailed`):** `0`
- **Imagens Carregadas (`complete && naturalWidth > 0`):** `12 / 12` (`0` imagens quebradas)
- **Links Verificados:** `29 / 29` funcionais (`0` links vazios `#` ou âncoras órfãs)
- **Overflow Horizontal (`scrollWidth > clientWidth`):** `false` em todas as larguras testadas (`360px`, `390px`, `768px`, `1024px`, `1440px`)

---

## 2. Verificação de Responsividade por Viewport

| Largura (Viewport) | `clientWidth` | `scrollWidth` | Overflow Horizontal | Menu Mobile (`#nav-toggle`) Visível | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **360px** (Mobile compacto) | 360px | 360px | Não (`false`) | Sim (`true`) | APROVADO |
| **390px** (Mobile padrão) | 390px | 390px | Não (`false`) | Sim (`true`) | APROVADO |
| **768px** (Tablet retrato) | 753px | 753px | Não (`false`) | Sim (`true`) | APROVADO |
| **1024px** (Laptop / Tablet paisagem) | 1009px | 1009px | Não (`false`) | Não (`false`) | APROVADO |
| **1440px** (Desktop amplo) | 1425px | 1425px | Não (`false`) | Não (`false`) | APROVADO |

---

## 3. Testes Funcionais e Interações Específicas

| Funcionalidade / Interação | Resultado Obtido no Teste Automatizado | Status |
| :--- | :--- | :---: |
| **1. Avisos de Demonstração** | Banner superior visível com badge `MODO DEMONSTRAÇÃO`, além de avisos explícitos nos indicadores do Hero, Grade Semanal, Planos, Equipe e Rodapé. | APROVADO |
| **2. Skip Link e Navegação Mobile** | Skip link aponta para `#conteudo-principal`. No mobile (`390px`), o clique em `#nav-toggle` alterna `aria-expanded="true"` e abre `.is-open`; pressionar `Escape` fecha o menu (`aria-expanded="false"`) e devolve o foco. | APROVADO |
| **3. Botões das Modalidades** | Clicar em *"Quero experimentar..."* pré-seleciona a modalidade correspondente no `<select id="modalidade">` do formulário e exibe o aviso de seleção. | APROVADO |
| **4. Filtro Combinado da Grade Semanal** | Grade inicial renderiza **29 turmas**. Ao filtrar por `Bike Indoor`, exibe **6 turmas**; ao combinar com `Segunda`, exibe **1 turma** (*Pulso Ride — Ritmo & Energia — 19:15*). O clique em *"Solicitar este horário"* preenche `Modalidade = Bike Indoor`, `Período = Noite (18h00 às 21h30)` e observação da turma no formulário. | APROVADO |
| **5. Alternância de Periodicidade dos Planos** | Ciclo **Anual** exibe `R$ 229,00`, `R$ 309,00`, `R$ 399,00` (com total de 12 meses e economia transparente). Ciclo **Trimestral** atualiza para `R$ 259,00`, `R$ 349,00`, `R$ 449,00`. Ciclo **Mensal** atualiza para `R$ 289,00`, `R$ 389,00`, `R$ 499,00`. CTAs de WhatsApp e de seleção no formulário atualizam dinamicamente. | APROVADO |
| **6. Acordeão de FAQ Acessível** | Clique em `#faq-btn-2` altera `aria-expanded` de `"false"` para `"true"` e remove o atributo `hidden` de `#faq-panel-2`. | APROVADO |
| **7. Validação e Envio do Formulário** | Submissão vazia bloqueia o envio e popula mensagens claras em português (`#erro-nome`, `#erro-contato`, `#erro-aceite`, etc.) com `aria-invalid="true"`. Submissão preenchida gera URL codificada de WhatsApp (`https://wa.me/...`) ou `mailto:` e exibe o feedback de confirmação pela equipe. | APROVADO |
| **8. Ética, Saúde e Privacidade** | Sem promessas de emagrecimento/cura; sem avaliação física clínica ou prescrição de exercícios; sem credenciais CREF inventadas; meta `noindex, nofollow` configurada por padrão para ambiente demonstrativo. | APROVADO |
