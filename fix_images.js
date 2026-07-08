const fs = require('fs');
const path = require('path');

function replaceImages(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/['"]images\//g, (match) => match[0] + '/images/');
  fs.writeFileSync(filePath, content, 'utf8');
}

replaceImages(path.join(__dirname, 'src/app/globals.css'));
replaceImages(path.join(__dirname, 'src/app/page.tsx'));
replaceImages(path.join(__dirname, 'src/app/menu/page.tsx'));
console.log('Fixed image paths');
