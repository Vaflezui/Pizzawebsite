const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'menu.csv');
const dbDir = path.join(__dirname, 'src', 'lib');
const dbPath = path.join(dbDir, 'db.json');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db = { products: [], orders: [] };

if (fs.existsSync(csvPath)) {
  const csv = fs.readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, '');
  const lines = csv.split('\n').filter(l => l.trim() !== '');
  
  for (let i = 1; i < lines.length; i++) {
    const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
    let matches = [];
    let match;
    while ((match = regex.exec(lines[i])) !== null) {
      matches.push(match[1].replace(/^"|"$/g, '').replace(/""/g, '"'));
    }
    
    if (matches.length < 4) continue;

    const category = matches[0];
    const title = matches[1];
    const desc = matches[2];
    const image = matches[3];
    const size1 = matches[4] || '';
    const price1 = matches[5] || '';
    const size2 = matches[6] || '';
    const price2 = matches[7] || '';

    db.products.push({
      id: 'prod_' + Date.now() + '_' + i,
      category,
      title,
      description: desc,
      image,
      active: true,
      variants: [
        ...(size1 && price1 ? [{ size: size1, price: price1 }] : []),
        ...(size2 && price2 ? [{ size: size2, price: price2 }] : [])
      ]
    });
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Created db.json with ' + db.products.length + ' products.');
