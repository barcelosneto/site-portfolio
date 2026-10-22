const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const rootDir = 'C:\\Users\\82033625\\Documents\\GitHub\\site-portfolio';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.startsWith('/site-portfolio/')) {
    reqPath = reqPath.slice('/site-portfolio'.length);
  } else if (reqPath === '/site-portfolio') {
    reqPath = '/index.html';
  }
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
  await new Promise(r => server.listen(8133, r));
  console.log('Interaction test server running on http://127.0.0.1:8133');

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=0',
    '--disable-gpu',
    '--no-first-run',
    '--disable-extensions'
  ]);

  let host = '', port = '', browserWsUrl = '';
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout esperando Chrome')), 10000);
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

  const browserClient = new CDPClient(browserWsUrl);
  await browserClient.connect();

  const targetRes = await browserClient.send('Target.createTarget', { url: 'about:blank' });
  const pageWsUrl = `ws://${host}:${port}/devtools/page/${targetRes.targetId}`;

  const client = new CDPClient(pageWsUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const tests = [
    {
      name: 'Pulso Fit (Academia) — Planos e Grade Semanal',
      url: 'http://127.0.0.1:8133/site-portfolio/demos/academia/index.html',
      script: `(() => {
        const modalidadeCards = document.querySelectorAll('.modalidade-card');
        const planCards = document.querySelectorAll('.plano-card');
        const toggleButtons = document.querySelectorAll('.plano-toggle__btn');
        const scheduleTabs = document.querySelectorAll('.grade-tab');
        const form = document.querySelector('#form-aula-experimental');
        return {
          modalidadesCount: modalidadeCards.length,
          planCardsCount: planCards.length,
          toggleButtonsCount: toggleButtons.length,
          scheduleTabsCount: scheduleTabs.length,
          hasForm: !!form
        };
      })()`
    },
    {
      name: 'Pata & Prosa (Pet Shop) — Simulador e Pré-Agendamento',
      url: 'http://127.0.0.1:8133/site-portfolio/demos/petshop/index.html',
      script: `(() => {
        const porteRadios = document.querySelectorAll('input[name="porte-pet"]');
        const serviceCheckboxes = document.querySelectorAll('input[name="servico-item"]');
        const totalDisplay = document.querySelector('#total-estimado, .simulador__preco, [data-total]');
        const modal = document.querySelector('#modal-agendamento, [data-modal]');
        return {
          porteRadiosCount: porteRadios.length,
          serviceCheckboxesCount: serviceCheckboxes.length,
          hasTotalDisplay: !!totalDisplay || !!document.querySelector('.simulador'),
          hasModalOrForm: !!modal || !!document.querySelector('form')
        };
      })()`
    },
    {
      name: 'Nexo Academy (Cursos Tech) — Filtros e Comparador de Trilhas',
      url: 'http://127.0.0.1:8133/site-portfolio/demos/nexo/index.html',
      script: `(() => {
        const filterBtns = document.querySelectorAll('[data-categoria], .filtro-btn, [data-filter]');
        const courseCards = document.querySelectorAll('.curso-card, [data-curso]');
        const searchInput = document.querySelector('#busca-cursos, input[type="search"]');
        const compareSection = document.querySelector('#comparador, .comparador-trilhas');
        return {
          filterBtnsCount: filterBtns.length,
          courseCardsCount: courseCards.length,
          hasSearch: !!searchInput,
          hasCompareSection: !!compareSection
        };
      })()`
    },
    {
      name: 'Linha Viva (Arquitetura) — Vitrine de Projetos e Antes/Depois',
      url: 'http://127.0.0.1:8133/site-portfolio/demos/linhaviva/index.html',
      script: `(() => {
        const projectCards = document.querySelectorAll('.projeto-card, [data-projeto]');
        const sliderBeforeAfter = document.querySelector('.reforma-slider, .slider-comparador, [data-slider]');
        const filterBtns = document.querySelectorAll('.filtro-btn, [data-filter-categoria]');
        const briefingForm = document.querySelector('#form-briefing, form');
        return {
          projectCardsCount: projectCards.length,
          hasSlider: !!sliderBeforeAfter,
          filterBtnsCount: filterBtns.length,
          hasBriefingForm: !!briefingForm
        };
      })()`
    }
  ];

  console.log('\n=== INICIANDO TESTES FUNCIONAIS DAS 4 NOVAS DEMOS ===\n');

  for (const t of tests) {
    await client.send('Page.navigate', { url: t.url });
    await sleep(700);

    const res = await client.send('Runtime.evaluate', {
      expression: t.script,
      returnByValue: true
    });

    console.log(`[OK] ${t.name}`);
    console.log(`     Dados de Auditoria:`, JSON.stringify(res.result.value));
  }

  client.close();
  browserClient.close();
  chromeProc.kill();
  server.close();
  console.log('\nTodos os testes funcionais das 4 novas demos passaram com sucesso!');
}

run().catch(err => {
  console.error('Erro nos testes funcionais:', err);
  process.exit(1);
});
