# Guia de Publicação no GitHub Pages (`PUBLICACAO_GITHUB.md`)

Este projeto foi construído com HTML5, CSS3, JavaScript ES6+ e assets locais utilizando **exclusivamente caminhos relativos** e arquivo `.nojekyll`, garantindo funcionamento imediato tanto em subdiretórios (`https://USUARIO.github.io/academia/`) quanto em domínios personalizados (`https://www.suaacademia.com.br`).

---

## 1. Preparação do Repositório Git

No terminal (PowerShell, Git Bash ou Prompt), dentro da pasta do projeto `academia`:

```bash
git init
git branch -M main
git add .
git commit -m "feat: entrega inicial landing page Pulso Fit"
```

---

## 2. Envio para o GitHub

1. Acesse [https://github.com/new](https://github.com/new) e crie um repositório público chamado **`academia`** (sem inicializar com README para evitar conflito).
2. Conecte seu repositório local ao remoto e envie os arquivos:

```bash
git remote add origin https://github.com/SEU_USUARIO/academia.git
git push -u origin main
```

---

## 3. Ativação do GitHub Pages

1. No repositório do GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
4. Em **Branch**, escolha `main` e a pasta `/ (root)`, depois clique em **Save**.
5. Aguarde cerca de 1 a 2 minutos. O site estará disponível em:
   `https://SEU_USUARIO.github.io/academia/`

---

## 4. Configuração de Domínio Personalizado (Opcional)

Se desejar usar um domínio próprio (ex.: `www.pulsofit.com.br`):

1. Em **Settings > Pages > Custom domain**, digite seu domínio e salve.
2. No painel DNS do seu provedor de domínio (Registro.br, Cloudflare, etc.), configure os registros `A` ou `CNAME` conforme a documentação oficial do GitHub Pages.
3. Marque a opção **Enforce HTTPS**.
4. Atualize a URL canônica e Open Graph no `index.html`, no `assets/js/config.js` e no `sitemap.xml`.
5. Quando todos os dados fictícios tiverem sido substituídos pelos dados reais da academia, remova a meta tag `<meta name="robots" content="noindex, nofollow" />` do `index.html` e libere o `robots.txt` (`Allow: /`).
