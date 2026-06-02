const fs = require('fs');
const path = require('path');

const base = process.env.VITE_API_BASE || 'http://localhost:8088';
const distDir = path.join(__dirname, '..', 'dist');
const content = `window.__ENV__ = { VITE_API_BASE: ${JSON.stringify(base)} };\n`;

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'env.js'), content);
