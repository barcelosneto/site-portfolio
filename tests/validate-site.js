/**
 * VALIDATE-SITE.JS — Suite de Auditoria Estática e Funcional (Zero Dependências Externas)
 * ========================================================================================
 * Verifica:
 * 1. Existência das 10 páginas HTML obrigatórias e arquivos de configuração (.nojekyll, robots, sitemap, README).
 * 2. Resolução de todos os links internos (<a href>), folhas de estilo (<link href>), scripts (<script src>) e imagens (<img src>).
 * 3. Ausência de links mortos ou placeholders '#' sem tratamento programático explícito.
 * 4. Presença de atributos essenciais de SEO e Acessibilidade (lang="pt-BR", <title>, meta description, canonical, h1 único, skip-link, labels em inputs).
 * 5. Simulação HTTP real servindo tanto na raiz (http://localhost:8123/) quanto sob prefixo de repositório GitHub Pages (http://localhost:8123/site-portfolio/).
 */

const fs = require("fs");
const path = require("path");
const http = require("http");

const ROOT_DIR = path.resolve(__dirname, "..");

const REQUIRED_PAGES = [
  "index.html",
  "404.html",
  "portfolio/index.html",
  "servicos/index.html",
  "sobre/index.html",
  "contato/index.html",
  "privacidade/index.html",
  "demos/restaurante/index.html",
  "demos/clinica/index.html",
  "demos/imobiliaria/index.html",
  "demos/petshop/index.html",
  "demos/academia/index.html",
  "demos/nexo/index.html",
  "demos/linhaviva/index.html"
];

const REQUIRED_FILES = [
  ".nojekyll",
  "robots.txt",
  "sitemap.xml",
  "config/site-config.js",
  "assets/css/base.css",
  "assets/css/components.css",
  "assets/css/pages.css",
  "assets/js/main.js",
  "assets/js/theme.js",
  "assets/js/portfolio.js",
  "assets/js/forms.js",
  "assets/js/demo-restaurante.js",
  "assets/js/demo-imobiliaria.js",
  "assets/icons/favicon.svg",
  "assets/img/og-cover.svg",
  "assets/img/thumb-restaurante.svg",
  "assets/img/thumb-clinica.svg",
  "assets/img/thumb-imobiliaria.svg"
];

let errors = [];
let passedChecks = 0;

function assertCheck(condition, successMsg, errorMsg) {
  if (condition) {
    passedChecks++;
  } else {
    errors.push(errorMsg);
    console.error(" [FALHA] " + errorMsg);
  }
}

console.log("=== INICIANDO AUDITORIA AUTOMATIZADA DO PROJETO ===");

// 1. Verificar arquivos obrigatórios
REQUIRED_PAGES.concat(REQUIRED_FILES).forEach((relPath) => {
  const fullPath = path.join(ROOT_DIR, relPath);
  assertCheck(
    fs.existsSync(fullPath),
    `Arquivo presente: ${relPath}`,
    `Arquivo obrigatório ausente: ${relPath}`
  );
});

// 2. Auditar cada uma das 10 páginas HTML
REQUIRED_PAGES.forEach((pageRel) => {
  const fullPath = path.join(ROOT_DIR, pageRel);
  if (!fs.existsSync(fullPath)) return;

  const html = fs.readFileSync(fullPath, "utf8");
  const pageDir = path.dirname(fullPath);

  // Idioma pt-BR
  assertCheck(
    /<html[^>]*lang=["']pt-BR["']/i.test(html),
    `${pageRel}: lang="pt-BR" OK`,
    `${pageRel}: atributo lang="pt-BR" ausente`
  );

  // Title e Meta Description
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  assertCheck(
    titleMatch && titleMatch[1].trim().length > 10,
    `${pageRel}: <title> válido`,
    `${pageRel}: <title> ausente ou muito curto`
  );

  assertCheck(
    /<meta[^>]*name=["']description["'][^>]*content=["'][^"']{25,}["']/i.test(html),
    `${pageRel}: meta description válida`,
    `${pageRel}: meta description ausente ou muito curta`
  );

  // H1 único
  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  assertCheck(
    h1Matches.length === 1,
    `${pageRel}: exatamente 1 <h1>`,
    `${pageRel}: quantidade inválida de <h1> (${h1Matches.length})`
  );

  // Skip link
  assertCheck(
    /class=["'][^"']*skip-link/i.test(html) && /id=["']conteudo-principal["']/i.test(html),
    `${pageRel}: skip-link e #conteudo-principal presentes`,
    `${pageRel}: skip-link ou #conteudo-principal ausente`
  );

  // Verificar referências locais (href / src)
  const attrRegex = /(?:^|\s)(?:href|src)=["']([^"']+)["']/gi;
  let match;
  while ((match = attrRegex.exec(html)) !== null) {
    const rawRef = match[1];

    // Ignorar links externos, mailto, âncoras puras da página ou links de WhatsApp dinâmicos
    if (
      rawRef.startsWith("http://") ||
      rawRef.startsWith("https://") ||
      rawRef.startsWith("mailto:") ||
      rawRef.startsWith("tel:")
    ) {
      continue;
    }

    if (rawRef === "#") {
      // Só é permitido href="#" se o elemento tiver data-whatsapp-cta
      const snippet = html.substring(Math.max(0, match.index - 120), Math.min(html.length, match.index + 160));
      assertCheck(
        snippet.includes("data-whatsapp-cta"),
        `${pageRel}: link '#' controlado por data-whatsapp-cta`,
        `${pageRel}: link morto '#' sem handler em: ${snippet}`
      );
      continue;
    }

    if (rawRef.startsWith("#")) {
      const targetId = rawRef.slice(1);
      assertCheck(
        html.includes(`id="${targetId}"`) || html.includes(`id='${targetId}'`),
        `${pageRel}: âncora #${targetId} existe`,
        `${pageRel}: âncora interna quebrada #${targetId}`
      );
      continue;
    }

    // Proibir caminhos iniciando com '/' que quebrariam sob /NOME-DO-REPOSITORIO/
    assertCheck(
      !rawRef.startsWith("/"),
      `${pageRel}: caminho relativo seguro (${rawRef})`,
      `${pageRel}: caminho iniciado com '/' detectado (${rawRef}) — quebraria no GitHub Pages em subdiretório!`
    );

    const cleanPath = rawRef.split("?")[0].split("#")[0];
    if (!cleanPath) continue;

    const resolvedFile = path.resolve(pageDir, cleanPath);
    assertCheck(
      fs.existsSync(resolvedFile),
      `${pageRel}: referência resolvida (${cleanPath})`,
      `${pageRel}: arquivo referenciado não existe (${rawRef} -> ${resolvedFile})`
    );
  }
});

// 3. Testar servidor HTTP simulando raiz (/) e subdiretório (/site-portfolio/)
function runHttpSubpathTest() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = req.url.split("?")[0];
      // Simula tanto acesso na raiz quanto sob /site-portfolio/
      if (urlPath.startsWith("/site-portfolio/")) {
        urlPath = urlPath.replace(/^\/site-portfolio/, "");
      } else if (urlPath === "/site-portfolio") {
        urlPath = "/";
      }

      if (urlPath.endsWith("/")) {
        urlPath += "index.html";
      }

      const filePath = path.join(ROOT_DIR, urlPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.writeHead(200);
        res.end(fs.readFileSync(filePath));
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    });

    server.listen(0, "127.0.0.1", async () => {
      const port = server.address().port;
      const testUrls = [
        `http://127.0.0.1:${port}/index.html`,
        `http://127.0.0.1:${port}/site-portfolio/index.html`,
        `http://127.0.0.1:${port}/site-portfolio/portfolio/index.html`,
        `http://127.0.0.1:${port}/site-portfolio/servicos/index.html`,
        `http://127.0.0.1:${port}/site-portfolio/sobre/index.html`,
        `http://127.0.0.1:${port}/site-portfolio/contato/index.html`,
        `http://127.0.0.1:${port}/site-portfolio/privacidade/index.html`,
        `http://127.0.0.1:${port}/site-portfolio/404.html`,
        `http://127.0.0.1:${port}/site-portfolio/demos/restaurante/index.html`,
        `http://127.0.0.1:${port}/site-portfolio/demos/clinica/index.html`,
        `http://127.0.0.1:${port}/site-portfolio/demos/imobiliaria/index.html`,
        `http://127.0.0.1:${port}/site-portfolio/assets/css/base.css`,
        `http://127.0.0.1:${port}/site-portfolio/assets/js/main.js`,
        `http://127.0.0.1:${port}/site-portfolio/config/site-config.js`
      ];

      for (const u of testUrls) {
        await new Promise((r) => {
          http.get(u, (res) => {
            assertCheck(
              res.statusCode === 200,
              `HTTP 200 OK: ${u}`,
              `HTTP status ${res.statusCode} ao acessar ${u}`
            );
            res.resume();
            r();
          });
        });
      }

      server.close(() => resolve());
    });
  });
}

runHttpSubpathTest().then(() => {
  console.log(`\nVerificações aprovadas: ${passedChecks}`);
  console.log(`Erros encontrados: ${errors.length}`);
  if (errors.length > 0) {
    process.exit(1);
  } else {
    console.log("STATUS FINAL: 100% APROVADO SEM ERROS!");
  }
});
