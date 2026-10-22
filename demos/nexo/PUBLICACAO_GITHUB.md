# Guia de Publicação no GitHub Pages (`PUBLICACAO_GITHUB.md`)

Este projeto foi construído seguindo todas as práticas exigidas para funcionamento imediato tanto em subdiretórios do GitHub Pages (`https://USUARIO.github.io/cursos-tecnologia/`) quanto em domínios personalizados (`https://www.suaescola.com.br/`).

---

## 1. Pré-requisitos Antes de Publicar em Produção

1. Edite o arquivo `assets/js/config.js` com os dados reais da sua instituição (WhatsApp, e-mail, endereço, cursos, preços e datas de turmas). Veja detalhes em [`CONFIGURACAO_CLIENTE.md`](CONFIGURACAO_CLIENTE.md).
2. No arquivo `index.html`:
   - Altere `<meta name="robots" content="noindex, nofollow" />` para `<meta name="robots" content="index, follow" />`.
   - Atualize a tag `<link rel="canonical" href="..." />` e `<meta property="og:url" content="..." />` com sua URL definitiva.
   - Atualize os dados do bloco `<script type="application/ld+json">` com os dados reais da escola.
   - Caso não deseje mais exibir a barra superior de demonstração, remova ou oculte `<div class="demo-banner">...</div>`.
3. No arquivo `robots.txt`:
   - Substitua `Disallow: /` por `Allow: /` e descomente a linha `Sitemap:`.
4. No arquivo `sitemap.xml`:
   - Substitua `https://usuario.github.io/cursos-tecnologia/` pela URL real do seu site.

---

## 2. Passo a Passo para Subir no GitHub

No terminal, dentro da pasta `cursos-tecnologia`:

```bash
git init
git branch -M main
git add .
git commit -m "feat: versão inicial da landing page Nexo Academy"
git remote add origin https://github.com/SEU_USUARIO/cursos-tecnologia.git
git push -u origin main
```

---

## 3. Ativando o GitHub Pages

1. Acesse o repositório no GitHub (`https://github.com/SEU_USUARIO/cursos-tecnologia`).
2. Clique na aba **Settings** (Configurações).
3. No menu lateral esquerdo, clique em **Pages**.
4. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
5. Em **Branch**, selecione `main` e a pasta `/ (root)`, depois clique em **Save**.
6. Aguarde cerca de 1 a 2 minutos. O site estará disponível em:
   `https://SEU_USUARIO.github.io/cursos-tecnologia/`

> **Nota técnica:** O arquivo `.nojekyll` já está incluído na raiz do projeto para garantir que o GitHub Pages sirva todos os arquivos estáticos diretamente sem processamento desnecessário.
