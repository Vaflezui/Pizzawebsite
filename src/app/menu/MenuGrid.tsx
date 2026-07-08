'use client';

import { useState } from 'react';
import { Product } from '@/lib/db-helper';

export default function MenuGrid({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = products.filter(p => {
    if (!p.active) return false;
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  return (
    <>
      <div className="menu-tabs" role="tablist" aria-label="Категорії меню">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} 
          onClick={() => setActiveTab('all')}
        >
          Усі позиції
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pizza' ? 'active' : ''}`} 
          onClick={() => setActiveTab('pizza')}
        >
          Піца
        </button>
        <button 
          className={`tab-btn ${activeTab === 'sauces' ? 'active' : ''}`} 
          onClick={() => setActiveTab('sauces')}
        >
          Соуси
        </button>
        <button 
          className={`tab-btn ${activeTab === 'cheese' ? 'active' : ''}`} 
          onClick={() => setActiveTab('cheese')}
        >
          Сир
        </button>
        <button 
          className={`tab-btn ${activeTab === 'meat' ? 'active' : ''}`} 
          onClick={() => setActiveTab('meat')}
        >
          М'ясні продукти
        </button>
        <button 
          className={`tab-btn ${activeTab === 'veg' ? 'active' : ''}`} 
          onClick={() => setActiveTab('veg')}
        >
          Овочі та зелень
        </button>
      </div>

      <div className="menu-grid" id="menu-grid" role="list">
        {filteredProducts.map((item, idx) => {
          const delayClass = idx > 0 ? ` reveal-delay-${idx > 3 ? 3 : idx}` : '';
          return (
            <article key={item.id} className={`menu-card reveal${delayClass} visible`} data-category={item.category}>
              {item.image && (
                <div className="menu-card-img">
                  <img src={item.image} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div className="menu-card-body">
                <h3 className="menu-card-title" style={{ fontFamily: 'var(--font-accent)' }}>{item.title}</h3>
                <p className="menu-card-desc">{item.description}</p>
                <div className="menu-card-footer" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                  {item.variants.map((v, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span className="menu-card-size">{v.size}</span>
                      <span className="menu-card-price" style={{ fontSize: '1.1rem', fontWeight: 800 }}>{v.price} ₴</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
