import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import { Product } from './db-helper'; // re-use the type

export async function getProducts(): Promise<Product[]> {
  if (process.env.POSTGRES_URL) {
    try {
      const { rows } = await sql`SELECT * FROM products ORDER BY order_index ASC`;
      return rows as Product[];
    } catch (e) {
      console.error('Postgres error:', e);
      // Fallback if table doesn't exist yet
      return getProductsFallback();
    }
  }
  return getProductsFallback();
}

function getProductsFallback(): Product[] {
  const dbPath = path.join(process.cwd(), 'src', 'lib', 'db.json');
  if (fs.existsSync(dbPath)) {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    return data.products || [];
  }
  return [];
}

export async function updateProductStatus(id: string, active: boolean) {
  if (process.env.POSTGRES_URL) {
    await sql`UPDATE products SET active = ${active} WHERE id = ${id}`;
  } else {
    // Fallback logic
    const dbPath = path.join(process.cwd(), 'src', 'lib', 'db.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const product = data.products.find((p: any) => p.id === id);
    if (product) {
      product.active = active;
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    }
  }
}

export async function updateProductDetails(id: string, updates: Partial<Product>) {
  if (process.env.POSTGRES_URL) {
    // We update fields dynamically
    const currentRows = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (currentRows.rowCount === 0) return;
    
    const current = currentRows.rows[0];
    const title = updates.title !== undefined ? updates.title : current.title;
    const description = updates.description !== undefined ? updates.description : current.description;
    const variants = updates.variants !== undefined ? JSON.stringify(updates.variants) : current.variants;
    
    await sql`
      UPDATE products 
      SET title = ${title}, 
          description = ${description}, 
          variants = ${variants}::jsonb
      WHERE id = ${id}
    `;
  } else {
    // Fallback logic
    const dbPath = path.join(process.cwd(), 'src', 'lib', 'db.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const product = data.products.find((p: any) => p.id === id);
    if (product) {
      if (updates.title !== undefined) product.title = updates.title;
      if (updates.description !== undefined) product.description = updates.description;
      if (updates.variants !== undefined) product.variants = updates.variants;
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    }
  }
}
