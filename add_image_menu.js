const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'src', 'lib', 'db.json');

let db = { products: [], orders: [] };

if (fs.existsSync(dbPath)) {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

const generateId = (prefix) => prefix + '_' + Math.random().toString(36).substr(2, 9);

const newItems = [
  // SAUCES
  { category: 'sauces', title: 'Соус томатний', variants: [{size: 'Мала (75г)', price: '25'}, {size: 'Велика (150г)', price: '50'}] },
  { category: 'sauces', title: 'Соус вершковий', variants: [{size: 'Мала (75г)', price: '25'}, {size: 'Велика (150г)', price: '50'}] },
  { category: 'sauces', title: 'Соус дует', variants: [{size: 'Мала (75г)', price: '25'}, {size: 'Велика (150г)', price: '50'}] },
  { category: 'sauces', title: 'Соус мексика', variants: [{size: 'Мала (75г)', price: '25'}, {size: 'Велика (150г)', price: '50'}] },

  // CHEESE
  { category: 'cheese', title: 'Сир моцарелла', variants: [{size: 'Мала (50г)', price: '25'}, {size: 'Велика (100г)', price: '50'}] },
  { category: 'cheese', title: 'Сир пармезан', variants: [{size: 'Мала (50г)', price: '50'}, {size: 'Велика (100г)', price: '100'}] },
  { category: 'cheese', title: 'Сир фета', variants: [{size: 'Мала (50г)', price: '24'}, {size: 'Велика (100г)', price: '48'}] },

  // MEAT
  { category: 'meat', title: 'Курка гриль', variants: [{size: 'Мала (50г)', price: '25'}, {size: 'Велика (100г)', price: '50'}] },
  { category: 'meat', title: 'Бекон', variants: [{size: 'Мала (50г)', price: '25'}, {size: 'Велика (100г)', price: '50'}] },
  { category: 'meat', title: 'Салямі', variants: [{size: 'Мала (50г)', price: '25'}, {size: 'Велика (100г)', price: '50'}] },
  { category: 'meat', title: 'Папероні', variants: [{size: 'Мала (50г)', price: '25'}, {size: 'Велика (100г)', price: '50'}] },
  { category: 'meat', title: 'Шинка', variants: [{size: 'Мала (50г)', price: '25'}, {size: 'Велика (100г)', price: '50'}] },

  // VEG
  { category: 'veg', title: 'Помідор', variants: [{size: 'Мала (50г)', price: '20'}, {size: 'Велика (100г)', price: '40'}] },
  { category: 'veg', title: 'Перець', variants: [{size: 'Мала (50г)', price: '23'}, {size: 'Велика (100г)', price: '46'}] },
  { category: 'veg', title: 'Маслини б/к', variants: [{size: 'Мала (15г)', price: '8'}, {size: 'Велика (30г)', price: '16'}] },
  { category: 'veg', title: 'Оливки б/к', variants: [{size: 'Мала (15г)', price: '8'}, {size: 'Велика (30г)', price: '16'}] },
  { category: 'veg', title: 'Кукурудза конс.', variants: [{size: 'Мала (15г)', price: '7'}, {size: 'Велика (30г)', price: '14'}] },
  { category: 'veg', title: 'Ананас конс.', variants: [{size: 'Мала (40г)', price: '20'}, {size: 'Велика (80г)', price: '40'}] },
  { category: 'veg', title: 'Цибуля', variants: [{size: 'Мала (20г)', price: '8'}, {size: 'Велика (40г)', price: '16'}] },
  { category: 'veg', title: 'Корнішони', variants: [{size: 'Мала (25г)', price: '15'}, {size: 'Велика (50г)', price: '30'}] },
  { category: 'veg', title: 'Гриби печериці с/в', variants: [{size: 'Мала (25г)', price: '20'}, {size: 'Велика (50г)', price: '40'}] },
  { category: 'veg', title: 'Петрушка с/в', variants: [{size: 'Мала (3г)', price: '3'}, {size: 'Велика (6г)', price: '6'}] },
  { category: 'veg', title: 'Кріп с/в', variants: [{size: 'Мала (3г)', price: '3'}, {size: 'Велика (6г)', price: '6'}] },
  { category: 'veg', title: 'Базилік с/в', variants: [{size: 'Мала (3г)', price: '5'}, {size: 'Велика (6г)', price: '10'}] },
  { category: 'veg', title: 'Перець чілі', variants: [{size: 'Мала (15г)', price: '10'}, {size: 'Велика (30г)', price: '20'}] },
  { category: 'veg', title: 'Перець марин.', variants: [{size: 'Мала (25г)', price: '25'}, {size: 'Велика (50г)', price: '50'}] },
  { category: 'veg', title: 'Рукола', variants: [{size: 'Мала (10г)', price: '20'}, {size: 'Велика (20г)', price: '40'}] },
];

let added = 0;
for (const item of newItems) {
  if (!db.products.find(p => p.title === item.title)) {
    db.products.push({
      id: generateId('prod'),
      category: item.category,
      title: item.title,
      description: 'Додаток до страви',
      image: '/images/pizza_01_base.jpg', // Dummy image for now, user can change it
      active: true,
      variants: item.variants
    });
    added++;
  }
}

if (added > 0) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log(`Added ${added} items.`);
} else {
  console.log('Items already exist.');
}
