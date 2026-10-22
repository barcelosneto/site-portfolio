# Guia de Publicação no GitHub Pages — LINHA VIVA | Arquitetura e Interiores

Este projeto foi desenvolvido com caminhos 100% relativos e inclui o arquivo `.nojekyll`, garantindo funcionamento imediato tanto em subdiretórios do GitHub Pages (`https://USUARIO.github.io/arquitetura-interiores/`) quanto em domínios personalizados (`https://www.seudominio.arq.br/`).

---

## 1. Publicação Inicial no GitHub Pages

1. Crie um novo repositório no GitHub com o nome sugerido **`arquitetura-interiores`** (público ou privado com suporte a Pages).
2. No terminal, dentro da pasta do projeto (`arquitetura-interiores`), execute:

```bash
git init
git branch -M main
git add .
git commit -m "feat: entrega inicial landing page Linha Viva Arquitetura e Interiores"
git remote add origin https://github.com/SEU-USUARIO/arquitetura-interiores.git
git push -u origin main
```

3. No painel do repositório no GitHub:
   - Acesse **Settings** (Configurações) → **Pages** (no menu lateral esquerdo).
   - Em **Build and deployment** → **Source**, selecione **Deploy from a branch**.
   - Em **Branch**, escolha `main` e a pasta `/ (root)`, depois clique em **Save**.
4. Aguarde cerca de 1 a 2 minutos. O site estará publicado em:
   `https://SEU-USUARIO.github.io/arquitetura-interiores/`

---

## 2. Configuração de Domínio Personalizado (Opcional)

Caso deseje utilizar um domínio próprio (ex.: `www.linhaviva.arq.br`):

1. No painel do seu provedor de DNS (Registro.br, Cloudflare, etc.):
   - Crie um registro `CNAME` apontando `www` para `SEU-USUARIO.github.io`.
   - Para o domínio raiz (`@`), aponte registros `A` para os IPs oficiais do GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
2. Em **Settings → Pages → Custom domain**, informe seu domínio, clique em **Save** e marque a opção **Enforce HTTPS** assim que o certificado for emitido.

---

## 3. Liberação de Indexação (SEO) após Personalização

Por segurança ética e técnica, o projeto sai de fábrica com `noindex, nofollow` para evitar que buscadores indexem dados fictícios de demonstração.

Quando já tiver substituído os dados reais do escritório (conforme [`CONFIGURACAO_CLIENTE.md`](./CONFIGURACAO_CLIENTE.md)):

1. Em `index.html`, substitua:
   ```html
   <meta name="robots" content="noindex, nofollow" id="meta-robots">
   ```
   por:
   ```html
   <meta name="robots" content="index, follow" id="meta-robots">
   ```
2. Atualize a URL em `<link rel="canonical" ...>`, `<meta property="og:url" ...>` e no bloco JSON-LD do `index.html`.
3. Em `robots.txt`, altere `Disallow: /` para `Allow: /` e ajuste a URL do `Sitemap:`.
4. Em `sitemap.xml`, substitua `https://usuario.github.io/arquitetura-interiores/` pela sua URL definitiva.
