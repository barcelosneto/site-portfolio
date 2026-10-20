# Barcelos Neto — Desenvolvimento Web — Site Comercial e Portfólio Estático (Pronto para GitHub Pages)

Site comercial completo, acessível (WCAG AA), responsivo (*mobile-first*) e **100% estático** (HTML5, CSS3 e JavaScript puro), desenvolvido para apresentar serviços de criação de sites e landing pages, acompanhado de **três demonstrações setoriais completas e interativas** (Restaurante, Clínica e Imobiliária).

---

## 1. Pré-requisitos

- **Navegador web moderno** (Chrome, Edge, Firefox ou Safari).
- **Opcional para visualização local recomendada:** Python 3.x ou Node.js para rodar um servidor HTTP local simples.
- **Conta gratuita no GitHub** para publicação no GitHub Pages.
- *Não requer PHP, MySQL, WordPress, Node.js em produção nem etapa obrigatória de build.*

---

## 2. Como Visualizar Localmente

Embora a navegação funcione por caminhos relativos, **recomendamos utilizar um servidor HTTP local** para reproduzir com fidelidade o comportamento do GitHub Pages:

### Opção A — Usando Python (Recomendado)
No terminal, dentro da pasta `site-portfolio`, execute:
```bash
python -m http.server 8000
```
Depois, abra no navegador:
- `http://localhost:8000/`

### Opção B — Usando Node.js (Validação Automatizada Incluída)
Para rodar a suíte de validação automatizada que testa todas as 10 páginas, links, assets e simulação de subdiretório `/site-portfolio/`:
```bash
node tests/validate-site.js
node tests/interaction-tests.js
```

---

## 3. Como Editar Marca, Textos, Contatos, Projetos, Imagens e `basePath`

### 3.1. Configurações Gerais (`config/site-config.js`)
Quase todas as personalizações rápidas estão concentradas em [`config/site-config.js`](config/site-config.js):
- **`brandName`**: altera automaticamente o nome comercial exibido nos cabeçalhos e rodapés.
- **`contact.email`**: altera o e-mail exibido nas páginas e utilizado pelo formulário `mailto:`.
- **`contact.whatsappNumber`**: informe seu número real apenas com dígitos e código do país (ex.: `"5511999999999"`). Enquanto estiver vazio (`""`), os botões de WhatsApp exibirão um aviso honesto de demonstração sem usar número falso.
- **`socialLinks`**: preencha as URLs completas de `github`, `linkedin`, `instagram` ou `behance`. Apenas as redes preenchidas serão exibidas.
- **`productionUrl` e `basePath`**: configure o endereço final do seu site.

### 3.2. Textos, Biografia e Política de Privacidade
- **Apresentação Profissional:** edite [`sobre/index.html`](sobre/index.html) para incluir sua biografia ou histórico real do estúdio.
- **Política de Privacidade:** antes de publicar comercialmente, revise [`privacidade/index.html`](privacidade/index.html) e preencha os campos entre colchetes `[...]` (Nome Empresarial/Responsável, CPF/CNPJ e Cidade/UF).

### 3.3. Imagens e Ícones
- O logotipo e o ícone da aba ficam em [`assets/icons/favicon.svg`](assets/icons/favicon.svg).
- A imagem de compartilhamento social (Open Graph) fica em [`assets/img/og-cover.svg`](assets/img/og-cover.svg).
- As miniaturas das demonstrações ficam em `assets/img/thumb-*.svg`. Você pode substituí-las por arquivos `.webp`, `.avif` ou `.svg` mantendo as dimensões (`width` e `height`).

---

## 4. Como Criar um Repositório Público no GitHub e Enviar os Arquivos

1. Acesse [github.com/new](https://github.com/new) e crie um repositório **Public** (ex.: `site-portfolio`).
2. No terminal, dentro da pasta deste projeto (`site-portfolio`), inicialize o Git e envie os arquivos:
```bash
git init
git branch -M main
git add .
git commit -m "Entrega inicial do site comercial e portfólio estático"
git remote add origin https://github.com/barcelosneto/site-portfolio.git
git push -u origin main
```

---

## 5. Como Ativar o GitHub Pages

1. No repositório criado no GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
4. Em **Branch**, selecione `main` e a pasta `/(root)` e clique em **Save**.
5. Aguarde de 1 a 2 minutos. O GitHub exibirá o link público do seu site no topo da página!

> O arquivo `.nojekyll` já está incluído na raiz do projeto para garantir que o GitHub Pages publique todos os arquivos sem processamento indesejado do Jekyll.

---

## 6. Como Configurar URL Final e `basePath` (Repositório de Projeto vs. `USUARIO.github.io`)

O projeto foi construído com caminhos relativos inteligentes (`data-root`) que funcionam automaticamente tanto na raiz quanto em subdiretórios! Além disso, para ajustar metadados de SEO (`canonical`, `sitemap.xml` e recuperação `404.html`):

### Caso 1: Repositório de projeto (`https://USUARIO.github.io/NOME-DO-REPOSITORIO/`)
1. Em `config/site-config.js`:
   - `productionUrl: "https://USUARIO.github.io/NOME-DO-REPOSITORIO"`
   - `basePath: "/NOME-DO-REPOSITORIO"`
2. Atualize o domínio em `robots.txt` e `sitemap.xml`.

### Caso 2: Repositório principal de usuário (`https://USUARIO.github.io/`) ou Domínio Próprio
1. Em `config/site-config.js`:
   - `productionUrl: "https://seu-dominio.com.br"`
   - `basePath: ""`
2. Atualize o domínio em `robots.txt` e `sitemap.xml`.

---

## 7. Como Atualizar o Site Após Mudanças

Sempre que editar textos, contatos ou adicionar projetos:
```bash
node tests/validate-site.js
git add .
git commit -m "Atualiza informações comerciais"
git push
```
O GitHub Pages atualizará o site automaticamente em cerca de 1 minuto.

---

## 8. Como Conectar um Domínio Próprio Futuramente (Opcional)

1. No painel onde registrou seu domínio (ex.: Registro.br ou Cloudflare), crie os apontamentos DNS para o GitHub Pages (`CNAME` apontando para `USUARIO.github.io` para o subdomínio `www`, ou registros `A` do GitHub Pages para o domínio raiz).
2. Em **Settings > Pages > Custom domain** no GitHub, digite seu domínio (ex.: `www.seudominio.com.br`) e clique em **Save**.
3. Marque a opção **Enforce HTTPS** assim que o certificado gratuito for emitido.

---

## 9. Limitações Técnicas e Transparência Funcional

- **Ausência de WordPress / PHP / Banco de Dados:** Este projeto é 100% estático. Não há painel `/wp-admin`, login nem banco de dados no servidor.
- **Formulário de Contato (`mailto:`):** Como não há backend próprio nem chaves secretas expostas no front-end, o formulário realiza validação acessível no navegador e prepara a mensagem abrindo o cliente de e-mail do visitante (`mailto:`), oferecendo também botão para copiar o texto completo. O site **nunca** exibe mensagem falsa de "enviado com sucesso" sem confirmação real.
- **Proteção Anti-Spam:** Inclui campo oculto (*honeypot*) validado no cliente, o que filtra preenchimentos automatizados básicos, mas não equivale a um filtro de servidor backend.
- **Projetos Demonstrativos:** As páginas em `demos/restaurante/`, `demos/clinica/` e `demos/imobiliaria/` exibem marcas, horários, valores e imóveis **estritamente fictícios** para fins de demonstração de portfólio.

---

## 10. Observação sobre Políticas do GitHub Pages

Antes de utilizar o GitHub Pages como hospedagem definitiva de uma operação comercial em larga escala, consulte os [Termos de Uso e Limites do GitHub Pages](https://docs.github.com/pt/pages/getting-started-with-github-pages/about-github-pages#limits-on-use-of-github-pages). Para operações comerciais de alto tráfego ou clientes finais, considere também serviços de hospedagem estática comercial como Cloudflare Pages, Netlify, Vercel ou servidor próprio.
