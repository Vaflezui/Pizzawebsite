import { getProducts } from '@/lib/data';
import ProductItem from './ProductItem';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управління товарами</h2>
        {/* Placeholder for Add Product */}
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-3 font-semibold">Товар</th>
              <th className="p-3 font-semibold">Опис</th>
              <th className="p-3 font-semibold">Ціна та розмір</th>
              <th className="p-3 font-semibold">Статус</th>
              <th className="p-3 font-semibold">Дії</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <ProductItem key={p.id} product={p} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
