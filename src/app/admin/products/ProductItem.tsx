'use client';

import { useState } from 'react';
import { Product } from '@/lib/db-helper';
import { toggleProductActive, updateProduct } from '../actions';

export default function ProductItem({ product }: { product: Product }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...product });

  const handleToggle = async () => {
    await toggleProductActive(product.id);
  };

  const handleSave = async () => {
    await updateProduct(product.id, {
      title: formData.title,
      description: formData.description,
      variants: formData.variants,
    });
    setIsEditing(false);
  };

  return (
    <>
      <tr className="border-b">
        <td className="p-3">
          <div className="font-semibold">{product.title}</div>
          <div className="text-sm text-gray-500">{product.category}</div>
        </td>
        <td className="p-3 text-sm text-gray-700 max-w-xs truncate">
          {product.description}
        </td>
        <td className="p-3">
          {product.variants.map((v, i) => (
            <div key={i} className="text-sm">{v.size}: <b>{v.price} ₴</b></div>
          ))}
        </td>
        <td className="p-3">
          <button 
            onClick={handleToggle}
            className={`px-3 py-1 rounded-full text-xs font-bold ${product.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
          >
            {product.active ? 'Активний' : 'Неактивний'}
          </button>
        </td>
        <td className="p-3">
          <button 
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Редагувати
          </button>
        </td>
      </tr>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Редагувати товар</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назва</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded-md p-2 bg-gray-50 focus:ring outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded-md p-2 bg-gray-50 focus:ring outline-none h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ціни та розміри</label>
                {formData.variants.map((v, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input 
                      type="text"
                      value={v.size}
                      readOnly
                      className="w-1/2 border rounded-md p-2 bg-gray-200 text-gray-600 outline-none cursor-not-allowed"
                    />
                    <div className="relative w-1/2">
                      <input 
                        type="text"
                        value={v.price}
                        onChange={e => {
                          const newVariants = [...formData.variants];
                          newVariants[i].price = e.target.value;
                          setFormData({ ...formData, variants: newVariants });
                        }}
                        className="w-full border rounded-md p-2 bg-gray-50 focus:ring outline-none pr-8"
                      />
                      <span className="absolute right-3 top-2.5 text-gray-500 font-medium">₴</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  Скасувати
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Зберегти
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
