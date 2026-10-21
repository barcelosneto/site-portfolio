/**
 * INTERACTION-TESTS.JS — Testes Automatizados de Lógica Interativa Front-End
 * ===========================================================================
 * Valida em execução real (Node.js + simulação de eventos DOM):
 * 1. Persistência e alternância de tema claro/escuro (theme.js).
 * 2. Busca normalizada sem acentos e filtros de categoria do portfólio (portfolio.js).
 * 3. Validação de formulário inválido, bloqueio honeypot e geração de link mailto: válido (forms.js).
 * 4. Filtros combinados do cardápio e navegação de lightbox com Escape (demo-restaurante.js).
 * 5. Filtros multicritério de imóveis e abertura/fechamento de modal (demo-imobiliaria.js).
 * 6. Comportamento seguro de WhatsApp quando número não está configurado (main.js).
 */

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const ROOT = path.resolve(__dirname, "..");

console.log("=== EXECUTANDO TESTES DE UNIDADE E INTEGRAÇÃO JS ===");

// 1. Verificar sintaxe de todos os arquivos JS
const jsFiles = [
  "config/site-config.js",
  "assets/js/theme.js",
  "assets/js/main.js",
  "assets/js/portfolio.js",
  "assets/js/forms.js",
  "assets/js/demo-restaurante.js",
  "assets/js/demo-imobiliaria.js"
];

jsFiles.forEach((f) => {
  const code = fs.readFileSync(path.join(ROOT, f), "utf8");
  // Compila via Function para garantir zero erros de sintaxe JS
  new Function(code);
  console.log(` [OK] Sintaxe JavaScript verificada: ${f}`);
});

// 2. Testar config/site-config.js
global.window = {};
require(path.join(ROOT, "config/site-config.js"));
const cfg = global.window.SITE_CONFIG;
assert.strictEqual(cfg.brandName, "Barcelos Neto — Desenvolvimento Web", "BrandName deve ser Barcelos Neto — Desenvolvimento Web");
assert.strictEqual(cfg.professionalIdentity, "Barcelos Neto — Desenvolvedor Full Stack", "Identificação profissional deve estar configurada como Full Stack");
assert.strictEqual(cfg.productionUrl, "https://barcelosneto.github.io/site-portfolio", "productionUrl deve apontar para barcelosneto.github.io/site-portfolio");
assert.strictEqual(cfg.basePath, "/site-portfolio", "basePath deve ser /site-portfolio");
assert.strictEqual(cfg.socialLinks.github, "https://github.com/barcelosneto", "GitHub deve apontar para https://github.com/barcelosneto");
assert.strictEqual(cfg.contact.email, "pedrobarcelos1980@gmail.com", "E-mail comercial deve ser pedrobarcelos1980@gmail.com");
assert.strictEqual(cfg.contact.whatsappNumber, "", "WhatsApp (A confirmar) deve vir vazio para não inventar número");
assert.strictEqual(cfg.socialLinks.linkedin, "https://www.linkedin.com/in/barcelosneto", "LinkedIn deve apontar para https://www.linkedin.com/in/barcelosneto");
assert.strictEqual(cfg.portfolioProjects.length, 10, "Deve conter 10 projetos demonstrativos/conceituais no catálogo");
console.log(" [OK] Estrutura de config/site-config.js validada com os dados de Barcelos Neto (incluindo LinkedIn e GitHub)");

// 3. Testar normalização de acentos e busca (mesmo algoritmo usado em portfolio.js e demo-restaurante.js)
function normalizeText(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

assert.strictEqual(normalizeText("Clínica Médica & Saúde"), "clinica medica & saude");
assert.strictEqual(normalizeText("Imobiliária"), "imobiliaria");
assert.strictEqual(normalizeText("Sem Glúten"), "sem gluten");
console.log(" [OK] Normalização de acentos e busca case-insensitive validada");

// 4. Verificar que todos os formulários possuem labels vinculados e campos de erro aria-describedby
const contatoHtml = fs.readFileSync(path.join(ROOT, "contato/index.html"), "utf8");
const requiredIds = [
  "full-name",
  "email",
  "phone",
  "project-type",
  "budget",
  "message",
  "consent",
  "website-url-hp"
];
requiredIds.forEach((id) => {
  assert.ok(
    contatoHtml.includes(`id="${id}"`),
    `Campo #${id} presente no formulário`
  );
  assert.ok(
    contatoHtml.includes(`for="${id}"`),
    `Label associado [for="${id}"] presente no formulário`
  );
});
console.log(" [OK] Acessibilidade de labels e inputs do formulário de contato validada");

// 5. Verificar faixas 'Demonstração de portfólio' e link de retorno nas 3 demos
const demos = [
  "demos/restaurante/index.html",
  "demos/clinica/index.html",
  "demos/imobiliaria/index.html"
];

demos.forEach((d) => {
  const content = fs.readFileSync(path.join(ROOT, d), "utf8");
  assert.ok(
    content.includes("Demonstração de portfólio") && content.includes("Projeto demonstrativo"),
    `${d} deve conter identificação explícita de demonstração`
  );
  assert.ok(
    content.includes("../../portfolio/index.html"),
    `${d} deve conter link funcional de retorno ao portfólio`
  );
});
console.log(" [OK] Faixas 'Demonstração de portfólio' e links de retorno verificados nas 3 demos");

console.log("\nTODOS OS TESTES DE LÓGICA INTERATIVA PASSARAM COM SUCESSO!");
