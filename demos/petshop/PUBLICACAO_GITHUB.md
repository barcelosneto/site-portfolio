# Guia de Publicação no GitHub Pages (`PUBLICACAO_GITHUB.md`)

Este projeto foi construído com caminhos 100% relativos e inclui o arquivo `.nojekyll`, garantindo funcionamento imediato tanto em subdiretórios do GitHub Pages (`https://SEU-USUARIO.github.io/pet-shop/`) quanto em domínios personalizados (`https://www.seudominio.com.br`).

---

## Passo 1: Criar o Repositório no GitHub

1. Acesse [https://github.com/new](https://github.com/new).
2. Em **Repository name**, digite `pet-shop` (ou o nome desejado).
3. Defina a visibilidade como **Public** (necessário para GitHub Pages gratuito em contas pessoais).
4. Clique em **Create repository**.

---

## Passo 2: Enviar os Arquivos pelo Terminal (Git)

Abra o terminal na pasta do projeto (`pet-shop`) e execute:

```bash
git init
git branch -M main
git add .
git commit -m "feat: entrega inicial da landing page Pata & Prosa"
git remote add origin https://github.com/SEU-USUARIO/pet-shop.git
git push -u origin main
```

*(Substitua `SEU-USUARIO` pelo seu nome de usuário real do GitHub).*

---

## Passo 3: Ativar o GitHub Pages

1. No repositório do GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
4. Em **Branch**, escolha `main` e a pasta `/ (root)`, depois clique em **Save**.
5. Aguarde cerca de 1 a 2 minutos e recarregue a página. O link oficial aparecerá no topo:
   `https://SEU-USUARIO.github.io/pet-shop/`

---

## Passo 4: Liberar Indexação no Google (Quando os Dados Reais Estiverem Prontos)

Por segurança e boas práticas de SEO, o projeto vem configurado como `noindex` enquanto exibe dados demonstrativos. Assim que você personalizar os dados reais do cliente (seguindo o arquivo `CONFIGURACAO_CLIENTE.md`):

1. No arquivo `index.html`:
   - Substitua `<meta name="robots" content="noindex, nofollow">` por `<meta name="robots" content="index, follow">`.
   - Atualize a tag `<link rel="canonical" href="...">` e `<meta property="og:url" content="...">` com a URL final.
2. No arquivo `robots.txt`:
   - Substitua `Disallow: /` por `Allow: /` e ajuste o link do `Sitemap:`.
3. No arquivo `sitemap.xml`:
   - Substitua `https://SEU-USUARIO.github.io/pet-shop/` pela URL definitiva.
4. Faça um novo commit e push:
   ```bash
   git add index.html robots.txt sitemap.xml assets/js/config.js
   git commit -m "chore: configura dados reais de producao e libera indexacao"
   git push
   ```
