'use server';

import { updateProductStatus, updateProductDetails } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export async function toggleProductStatusAction(id: string, currentStatus: boolean) {
  await updateProductStatus(id, !currentStatus);
  revalidatePath('/admin/products');
  revalidatePath('/menu');
}

export async function updateProductDetailsAction(id: string, formData: { title: string, description: string, variants: any[] }) {
  await updateProductDetails(id, formData);
  revalidatePath('/admin/products');
  revalidatePath('/menu');
}
