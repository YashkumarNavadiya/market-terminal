const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.copyFileSync(path.join(rootDir, 'index.html'), path.join(distDir, 'index.html'));

const headersPath = path.join(rootDir, '_headers');
if (fs.existsSync(headersPath)) {
  fs.copyFileSync(headersPath, path.join(distDir, '_headers'));
}

console.log('Build output successfully written to dist/index.html and dist/_headers.');
