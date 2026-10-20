const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = 'C:\\Users\\82033625\\Documents\\GitHub\\site-portfolio';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(rootDir, 'assets', 'img', 'home');

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
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
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8123, () => {
  console.log('Server running on http://127.0.0.1:8123');

  const targets = [
    { url: 'http://127.0.0.1:8123/demos/restaurante/index.html', name: 'showcase-restaurante-desktop.png', w: 1440, h: 900 },
    { url: 'http://127.0.0.1:8123/demos/restaurante/index.html', name: 'showcase-restaurante-mobile.png', w: 390, h: 844 },
    { url: 'http://127.0.0.1:8123/demos/clinica/index.html', name: 'showcase-clinica-desktop.png', w: 1440, h: 900 },
    { url: 'http://127.0.0.1:8123/demos/clinica/index.html', name: 'showcase-clinica-mobile.png', w: 390, h: 844 },
    { url: 'http://127.0.0.1:8123/demos/imobiliaria/index.html', name: 'showcase-imobiliaria-desktop.png', w: 1440, h: 900 },
    { url: 'http://127.0.0.1:8123/demos/imobiliaria/index.html', name: 'showcase-imobiliaria-mobile.png', w: 390, h: 844 },
  ];

  for (const t of targets) {
    const dest = path.join(outDir, t.name);
    console.log(`Capturing ${t.name}...`);
    const cmd = `"${chromePath}" --headless=new --disable-gpu --hide-scrollbars --window-size=${t.w},${t.h} --screenshot="${dest}" "${t.url}"`;
    try {
      execSync(cmd, { stdio: 'inherit' });
      const stat = fs.statSync(dest);
      console.log(`OK: ${t.name} (${stat.size} bytes)`);
    } catch (err) {
      console.error(`Failed ${t.name}:`, err.message);
    }
  }

  server.close(() => {
    console.log('Capture script finished.');
  });
});
