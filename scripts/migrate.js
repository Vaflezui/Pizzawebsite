require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function migrate() {
  if (!process.env.POSTGRES_URL) {
    console.error('ПОМИЛКА: Не знайдено POSTGRES_URL у файлі .env.local!');
    console.error('Будь ласка, додайте рядок підключення від Vercel у файл .env.local і спробуйте знову.');
    process.exit(1);
  }

  console.log('⏳ Створюємо таблицю products...');
  
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(255) PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      image VARCHAR(255),
      active BOOLEAN DEFAULT true,
      variants JSONB NOT NULL
    )
  `;
  
  console.log('✅ Таблиця створена успішно!');
  
  const dbPath = path.join(__dirname, '..', 'src', 'lib', 'db.json');
  if (fs.existsSync(dbPath)) {
    console.log('⏳ Читаємо дані з db.json...');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const products = data.products || [];
    
    console.log(`⏳ Знайдено ${products.length} товарів. Починаємо міграцію...`);
    
    let added = 0;
    for (const p of products) {
      try {
        await sql`
          INSERT INTO products (id, category, title, description, image, active, variants)
          VALUES (${p.id}, ${p.category}, ${p.title}, ${p.description || ''}, ${p.image || ''}, ${p.active}, ${JSON.stringify(p.variants)}::jsonb)
          ON CONFLICT (id) DO NOTHING
        `;
        added++;
      } catch (err) {
        console.error(`Помилка при додаванні ${p.title}:`, err.message);
      }
    }
    
    console.log(`✅ Міграція завершена! Успішно перенесено ${added} товарів.`);
  } else {
    console.log('⚠️ Файл db.json не знайдено, перенесення даних пропущено.');
  }
}

migrate().catch(console.error);
