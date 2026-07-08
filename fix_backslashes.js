const fs = require('fs');
const path = require('path');

function fixBackslashes(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(filePath, content, 'utf8');
}

fixBackslashes(path.join(__dirname, 'src/app/menu/page.tsx'));
fixBackslashes(path.join(__dirname, 'src/app/admin/products/ProductItem.tsx'));
console.log('Fixed backslashes');
