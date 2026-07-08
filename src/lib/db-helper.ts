import fs from 'fs';
import path from 'path';

export interface ProductVariant {
  size: string;
  price: string;
}

export interface Product {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  active: boolean;
  variants: ProductVariant[];
}

export interface Order {
  id: string;
  date: string;
  status: 'Новое' | 'В работе' | 'Готово' | 'Отменено';
  customerName: string;
  customerPhone: string;
  total: number;
  items: any[];
}

export interface Database {
  products: Product[];
  orders: Order[];
}

const dbPath = path.join(process.cwd(), 'src', 'lib', 'db.json');

export function readDb(): Database {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data) as Database;
  } catch (error) {
    console.error('Error reading db.json', error);
    return { products: [], orders: [] };
  }
}

export function writeDb(data: Database): void {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to db.json', error);
  }
}
