'use server';

import { readDb, writeDb, Order } from '@/lib/db-helper';
import { revalidatePath } from 'next/cache';
import { updateProductStatus, updateProductDetails } from '@/lib/data';

export async function toggleProductActive(productId: string) {
  const db = readDb();
  const product = db.products.find(p => p.id === productId);
  if (product) {
    await updateProductStatus(productId, !product.active);
    revalidatePath('/menu');
    revalidatePath('/admin/products');
  }
}

export async function updateProduct(productId: string, data: any) {
  await updateProductDetails(productId, data);
  revalidatePath('/menu');
  revalidatePath('/admin/products');
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
  const db = readDb();
  const order = db.orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    writeDb(db);
    revalidatePath('/admin/orders');
  }
}
