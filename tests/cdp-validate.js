const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const rootDir = 'C:\\Users\\82033625\\Documents\\GitHub\\site-portfolio';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\82033625\\.gemini\\antigravity\\brain\\fb590790-ab7c-4316-8d2e-0cde06d509db';

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  if (reqPath === '') reqPath = '/index.html';
  const filePath = path.join(rootDir, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeMap = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.json': 'application/json',
      '.webmanifest': 'application/manifest+json'
    };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found: ' + reqPath);
  }
});

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.callbacks = new Map();
    this.onEvent = null;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id && this.callbacks.has(data.id)) {
          const cb = this.callbacks.get(data.id);
          this.callbacks.delete(data.id);
          if (data.error) cb.reject(new Error(data.error.message));
          else cb.resolve(data.result);
        } else if (data.method) {
          if (this.onEvent) this.onEvent(data);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    try { this.ws.close(); } catch (e) {}
  }
}

async function run() {
  await new Promise(r => server.listen(8128, r));
  console.log('Servidor HTTP local ativo em http://127.0.0.1:8128');

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=0',
    '--disable-gpu',
    '--no-first-run',
    '--disable-extensions'
  ]);

  let host = '', port = '', browserWsUrl = '';
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout esperando Chrome inicializar')), 10000);
    chromeProc.stderr.on('data', d => {
      const match = d.toString().match(/DevTools listening on (ws:\/\/([^:]+):(\d+)\/devtools\/browser\/[^\s]+)/);
      if (match) {
        clearTimeout(timer);
        browserWsUrl = match[1];
        host = match[2];
        port = match[3];
        resolve();
      }
    });
  });

  console.log(`Chrome conectado na porta ${port}`);

  const browserClient = new CDPClient(browserWsUrl);
  await browserClient.connect();

  const targetRes = await browserClient.send('Target.createTarget', { url: 'about:blank' });
  const targetId = targetRes.targetId;
  const pageWsUrl = `ws://${host}:${port}/devtools/page/${targetId}`;

  const client = new CDPClient(pageWsUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Network.enable');

  const consoleErrors = [];
  const network404s = [];

  client.onEvent = (data) => {
    if (data.method === 'Runtime.consoleAPICalled') {
      if (data.params.type === 'error') {
        const text = data.params.args.map(a => a.value || a.description || '').join(' ');
        consoleErrors.push(text);
      }
    } else if (data.method === 'Network.responseReceived') {
      if (data.params.response.status >= 400) {
        network404s.push(`${data.params.response.status} ${data.params.response.url}`);
      }
    }
  };

  const pages = [
    { name: 'Home', url: 'http://127.0.0.1:8128/index.html' },
    { name: 'Portfolio', url: 'http://127.0.0.1:8128/portfolio/index.html' },
    { name: 'Servicos', url: 'http://127.0.0.1:8128/servicos/index.html' },
    { name: 'Sobre', url: 'http://127.0.0.1:8128/sobre/index.html' },
    { name: 'Contato', url: 'http://127.0.0.1:8128/contato/index.html' },
  ];

  const viewports = [
    { w: 1440, h: 900, name: '1440x900' },
    { w: 768, h: 1024, name: '768x1024' },
    { w: 390, h: 844, name: '390x844' },
    { w: 375, h: 812, name: '375x812' },
  ];

  const results = [];

  for (const page of pages) {
    console.log(`\n============================================================`);
    console.log(`AUDITANDO PÁGINA: ${page.name} (${page.url})`);
    console.log(`============================================================`);

    for (const vp of viewports) {
      consoleErrors.length = 0;
      network404s.length = 0;

      await client.send('Emulation.setDeviceMetricsOverride', {
        width: vp.w,
        height: vp.h,
        deviceScaleFactor: 1,
        mobile: vp.w < 768,
      });

      await client.send('Page.navigate', { url: page.url });
      await sleep(750); // espera carregamento e transições

      const evalRes = await client.send('Runtime.evaluate', {
        expression: `(async () => {
          for (const img of document.images) {
            img.loading = 'eager';
          }
          await new Promise(r => setTimeout(r, 600));

          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          const hasOverflow = docWidth > (winWidth + 1); // tolerância de 1px
          const brokenImages = [...document.images]
            .filter(img => !img.complete || img.naturalWidth === 0)
            .map(i => ({ src: i.src, alt: i.alt }));
          const totalImages = document.images.length;
          return {
            docWidth,
            winWidth,
            hasOverflow,
            brokenImages,
            totalImages,
            title: document.title,
            h1: document.querySelector('h1') ? document.querySelector('h1').innerText.trim() : null
          };
        })()`,
        awaitPromise: true,
        returnByValue: true
      });

      const audit = evalRes.result.value;
      const passOverflow = !audit.hasOverflow;
      const passImages = audit.brokenImages.length === 0;
      const passConsole = consoleErrors.length === 0;
      const passNetwork = network404s.length === 0;
      const isPass = passOverflow && passImages && passConsole && passNetwork;

      const pageResult = {
        page: page.name,
        viewport: vp.name,
        width: vp.w,
        height: vp.h,
        overflow: !passOverflow ? `FALHA (docWidth=${audit.docWidth} > winWidth=${audit.winWidth})` : 'OK (0px)',
        brokenImages: audit.brokenImages,
        totalImages: audit.totalImages,
        consoleErrors: [...consoleErrors],
        network404s: [...network404s],
        title: audit.title,
        h1: audit.h1,
        status: isPass ? 'PASS' : 'FAIL'
      };

      results.push(pageResult);

      const statusTag = isPass ? '✓ PASS' : '✗ FAIL';
      console.log(`  [${statusTag}] Viewport ${vp.name.padEnd(9)} | Overflow: ${pageResult.overflow.padEnd(8)} | Imagens: ${audit.totalImages} totais, ${audit.brokenImages.length} quebradas | 404s: ${network404s.length} | Console: ${consoleErrors.length}`);
      if (!passImages) console.log('    Imagens com falha:', audit.brokenImages);
      if (!passConsole) console.log('    Erros console:', consoleErrors);
      if (!passNetwork) console.log('    Requisições 404:', network404s);

      // Salva screenshots dos viewports chave (1440 e 390) para o diretório de artifacts
      if (vp.w === 1440 || vp.w === 390) {
        const screenshot = await client.send('Page.captureScreenshot', { format: 'png' });
        const shotName = `v11-${page.name.toLowerCase()}-${vp.w}.png`;
        const shotPath = path.join(artifactDir, shotName);
        fs.writeFileSync(shotPath, Buffer.from(screenshot.data, 'base64'));
        console.log(`    -> Screenshot gerado: ${shotName}`);
      }
    }
  }

  client.close();
  browserClient.close();
  chromeProc.kill();
  server.close();

  console.log('\n============================================================');
  console.log('RESUMO CONSOLIDADO DA AUDITORIA CDP EM HEADLESS CHROME:');
  console.log('============================================================');
  const failed = results.filter(r => r.status === 'FAIL');
  console.log(`Total de testes executados: ${results.length}`);
  console.log(`Aprovados: ${results.length - failed.length}`);
  console.log(`Falhas: ${failed.length}`);

  if (failed.length === 0) {
    console.log('\nSTATUS: 100% DAS PÁGINAS E VIEWPORTS PASSARAM COM SUCESSO ABSOLUTO!');
    process.exit(0);
  } else {
    console.error('\nSTATUS: DETECTADAS FALHAS QUE PRECISAM DE CORREÇÃO!');
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
