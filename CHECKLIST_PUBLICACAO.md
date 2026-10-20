# Checklist de Publicação no GitHub Pages (`CHECKLIST_PUBLICACAO.md`)

Siga este passo a passo rápido antes de colocar seu site no ar.

---

## Etapa 1 — Personalizar Dados de Marca e Contato

- [ ] Abra o arquivo [`config/site-config.js`](config/site-config.js).
- [ ] Altere `brandName` caso deseje usar outro nome comercial ou seu próprio nome profissional.
- [ ] Altere `contact.email` para o seu e-mail profissional real e mude `isDemoEmail` para `false`.
- [ ] Preencha `contact.whatsappNumber` apenas com números e código do país (ex.: `"5511999999999"`).
  - *Nota:* se preferir não usar WhatsApp no momento, deixe `""` (vazio) ou adicione `data-whatsapp-hide-if-unset="true"` nos botões que quiser ocultar.
- [ ] Preencha os links das suas redes sociais em `socialLinks` (`github`, `linkedin`, `instagram`, `behance`).

---

## Etapa 2 — Configurar `productionUrl` e `basePath`

- [ ] Defina qual será o endereço final do seu site:
  - **Opção A (Repositório de projeto):** `https://barcelosneto.github.io/site-portfolio`
    - Em `config/site-config.js`, defina:
      - `productionUrl: "https://barcelosneto.github.io/site-portfolio"`
      - `basePath: "/NOME-DO-REPOSITORIO"`
  - **Opção B (Repositório `SEU-USUARIO.github.io` ou domínio próprio):** `https://seudominio.com.br`
    - Em `config/site-config.js`, defina:
      - `productionUrl: "https://seudominio.com.br"`
      - `basePath: ""`
- [ ] Atualize a URL base nos arquivos [`robots.txt`](robots.txt) e [`sitemap.xml`](sitemap.xml).

---

## Etapa 3 — Revisar Textos Editáveis e Privacidade

- [ ] Em [`sobre/index.html`](sobre/index.html), personalize o texto de apresentação profissional com suas informações reais.
- [ ] Em [`privacidade/index.html`](privacidade/index.html), substitua os campos marcados entre colchetes `[...]` (Nome Empresarial/Responsável, CNPJ/CPF e Cidade/UF) e revise o conteúdo juridicamente.

---

## Etapa 4 — Executar a Validação Local Antes do Commit

- [ ] No terminal, dentro da pasta do projeto, execute:
  ```bash
  node tests/validate-site.js
  node tests/interaction-tests.js
  ```
- [ ] Confirme que a saída exibe `STATUS FINAL: 100% APROVADO SEM ERROS!`.

---

## Etapa 5 — Criar o Repositório e Ativar o GitHub Pages

- [ ] Crie um repositório público no GitHub (sem inicializar com README para evitar conflitos).
- [ ] Envie os arquivos da pasta do projeto:
  ```bash
  git init
  git branch -M main
  git add .
  git commit -m "Publicação inicial do site e portfólio"
  git remote add origin https://github.com/barcelosneto/site-portfolio.git
  git push -u origin main
  ```
- [ ] No GitHub, acesse **Settings > Pages**.
- [ ] Em **Source**, escolha **Deploy from a branch**.
- [ ] Selecione a branch **`main`** e a pasta **`/(root)`**, depois clique em **Save**.
- [ ] Aguarde cerca de 1 a 2 minutos e acesse a URL publicada para testar o menu, o tema claro/escuro, as três demonstrações e o formulário de contato.
