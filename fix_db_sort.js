require('dotenv').config({path:'.env.local'});
const {sql} = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0`;
    console.log('Column order_index added');

    const dbPath = path.join(__dirname, 'src', 'lib', 'db.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const products = data.products || [];

    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      await sql`UPDATE products SET order_index = ${i} WHERE id = ${p.id}`;
    }
    console.log('Order indexes updated based on db.json!');
  } catch(e) {
    console.log(e);
  }
}
run();
