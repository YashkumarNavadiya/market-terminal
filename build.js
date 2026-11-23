const fs = require('fs');
if (!fs.existsSync('dist')) fs.mkdirSync('dist');
fs.copyFileSync('index.html', 'dist/index.html');
if (fs.existsSync('_headers')) fs.copyFileSync('_headers', 'dist/_headers');
console.log('Build output prepared in dist/ and root.');
