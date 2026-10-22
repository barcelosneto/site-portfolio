# Manual de Configuração para o Cliente (`CONFIGURACAO_CLIENTE.md`)

Toda a manutenção cotidiana da página — alteração de WhatsApp, e-mail, preços, carga horária, novas turmas, instrutores e perguntas frequentes — foi centralizada no arquivo **`assets/js/config.js`**, evitando que você precise procurar informações espalhadas pelo código HTML.

---

## 1. Alterando Contatos (WhatsApp, E-mail e Endereço)

Abra o arquivo `assets/js/config.js` em qualquer editor de texto (VS Code, Bloco de Notas, etc.) e localize o bloco `contact`:

```javascript
contact: {
  whatsappNumber: "5511999990000", // Apenas números: DDI (55) + DDD + Número
  whatsappDisplay: "+55 (11) 99999-0000",
  email: "atendimento@suaescola.com.br",
  address: "Rua Exemplo, 500 — Cidade/UF",
  hours: "Segunda a Sexta, das 09h às 19h",
  siteUrl: "https://www.suaescola.com.br/"
}
```

- **`whatsappNumber`**: Deve conter apenas dígitos (código do país `55` + DDD + número). Esse valor é usado pelo formulário para montar o link `https://wa.me/55...`.
- **`email`**: Endereço de e-mail que receberá as solicitações quando o visitante clicar em **"Enviar por E-mail (mailto:)"**.

---

## 2. Editando Cursos, Preços e Ementas

No mesmo arquivo `assets/js/config.js`, localize a lista `courses: [ ... ]`. Cada curso possui a seguinte estrutura:

```javascript
{
  id: "python-dados-automacao",
  title: "Python para Dados e Automação de Rotinas",
  category: "Python", // Opções: "Python", "Excel", "Power BI", "IA"
  level: "Iniciante", // Opções: "Iniciante", "Intermediário", "Avançado"
  modality: "Ao vivo online", // Opções: "Ao vivo online", "Híbrido", "Presencial executivo"
  workload: "48 horas",
  durationWeeks: "8 semanas",
  demoPrice: "R$ 1.290,00",
  demoInstallments: "ou 6x de R$ 215,00 sem juros",
  badge: "Alta procura",
  image: "assets/img/curso-python-dados.svg",
  imageAlt: "Descrição acessível da imagem",
  shortDescription: "Resumo comercial do curso...",
  prerequisites: "Pré-requisitos claros...",
  tools: ["Python 3.12", "Pandas", "Jupyter Lab"],
  portfolioProject: "Descrição do projeto prático que o aluno constrói...",
  syllabus: [
    {
      module: "Módulo 1 — Título",
      topics: "Assuntos abordados no módulo..."
    }
  ]
}
```

Ao alterar qualquer item em `courses`, a **Vitrine de Cursos**, o **Modal de Ementa**, o **Comparador de 3 Cursos** e o **Seletor do Formulário de Interesse** são atualizados automaticamente.

---

## 3. Atualizando o Cronograma de Turmas (`cohorts`)

Para abrir novas turmas ou alterar datas e status (`Inscrições abertas`, `Últimas vagas`, `Lista de interesse`), edite o array `cohorts` em `assets/js/config.js`:

```javascript
{
  code: "TURMA-PY-01",
  courseId: "python-dados-automacao",
  courseName: "Python para Dados e Automação de Rotinas",
  modality: "Ao vivo online",
  schedule: "Terças e Quintas, das 19h30 às 22h30",
  startDate: "10/11/2026",
  status: "Inscrições abertas",
  spotsLabel: "Turma reduzida (máx. 22 alunos)"
}
```

---

## 4. Personalizando Cores da Marca

As cores principais estão definidas como variáveis CSS no topo do arquivo `assets/css/styles.css`:

```css
:root {
  --bg-petrol-deep: #06131f;
  --bg-petrol-main: #081c2e;
  --cyan-400: #22d3ee;
  --cyan-500: #06b6d4;
  --violet-400: #a78bfa;
  --violet-600: #7c3aed;
}
```

---

## 5. Removendo os Avisos de Demonstração para Produção

Quando todos os dados reais estiverem validados:
1. Em `index.html`, remova o bloco `<div class="demo-banner">...</div>` e os elementos `<div class="demo-inline-note">...</div>`.
2. Em `index.html`, troque `<meta name="robots" content="noindex, nofollow" />` por `<meta name="robots" content="index, follow" />`.
3. Em `robots.txt`, troque `Disallow: /` por `Allow: /`.
