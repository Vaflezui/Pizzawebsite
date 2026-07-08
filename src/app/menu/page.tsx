import { getProducts } from '@/lib/data';
import Link from 'next/link';
import MenuGrid from './MenuGrid';

export default async function MenuPage() {
  const products = await getProducts();

  return (
    <>
      

  {/*  HEADER  */}
  <header className="site-header" id="site-header">
    <a href="/" className="nav-logo" aria-label="Повернутись на головну">
      <img src="/images/magnific_Uy1pWm4wny.png" className="nav-logo-img" alt="Логотип Smayl Pitsa" />
      <img src="/images/magnific_1sunOfcr4r.png" className="nav-logo-text-img" alt="міні ПЕКАРНЯ" />
    </a>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <a href="/" className="nav-back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        На головну
      </a>
      <a href="tel:+380636374306" className="nav-cta">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
        Зателефонувати
      </a>
    </div>
  </header>

  {/*  HERO BANNER  */}
  <div className="menu-page-hero">
    <span className="section-label">Mini Pekarnya</span>
    <h1>Загальне меню</h1>
  </div>

  {/*  MENU  */}
  <section className="menu-content" aria-label="Меню">
    <div className="container">

      <MenuGrid products={products} />
    </div>
  </section>

  
  

  {/*  FOOTER  */}
  <div className="footer-bar">
    <p>© 2024 Mini Pekarnya Pitsa Smayl · вул. Героїв Дніпра, 41, Київ · <a href="tel:+380636374306">063 637 43 06</a></p>
  </div>

  {/*  STICKY CALL (mobile)  */}
  <a href="tel:+380636374306" className="sticky-call" id="sticky-call" aria-label="Зателефонувати: 063 637 43 06">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
    063 637 43 06
  </a>

  

    </>
  );
}
