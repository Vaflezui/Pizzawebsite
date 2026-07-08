'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) heroBg.classList.add('loaded');
    
    const handleScroll = () => {
      const sy = window.scrollY;
      const maxMove = window.innerHeight * 0.15;
      if (sy <= window.innerHeight && heroBg) {
        heroBg.style.transform = 'translateY(' + Math.min(sy * 0.25, maxMove) + 'px)';
      }
      const hdr = document.getElementById('site-header');
      if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 60);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ro.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    if (burger && navLinks) {
      const open = burger.classList.toggle('open');
      navLinks.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
  };

  const closeMenu = () => {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    if (burger && navLinks) {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  return (
    <>
      

  {/*  HEADER  */}
  <header className="site-header" id="site-header">
    {/* 
      Fix #1: logo image clipped to circle via clip-path (removes cream bg)
      Fix #2: "міні ПЕКАРНЯ" as generated image with matching letterforms
     */}
    <a href="#hero" onClick={closeMenu} className="nav-logo" aria-label="Mini Pekarnya Pitsa Smayl — головна">
      <img
        src="/images/magnific_Uy1pWm4wny.png"
        className="nav-logo-img"
        alt="Логотип Smayl Pitsa"
      />
      <img
        src="/images/magnific_1sunOfcr4r.png"
        className="nav-logo-text-img"
        alt="міні ПЕКАРНЯ"
      />
    </a>
    <nav aria-label="Основна навігація">
      <ul className="nav-links" id="nav-links" role="menubar">
        <li><a href="#about" onClick={closeMenu} role="menuitem">Про нас</a></li>
        <li><a href="/menu" role="menuitem">Меню</a></li>
        <li><a href="#gallery" onClick={closeMenu} role="menuitem">Галерея</a></li>
        <li><a href="#contacts" onClick={closeMenu} role="menuitem">Контакти</a></li>
        <li>
          <a href="tel:+380636374306" className="nav-cta" role="menuitem" rel="noopener">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="14" height="14" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            Зателефонувати
          </a>
        </li>
      </ul>
    </nav>
    <button className="burger" id="burger" onClick={toggleMenu} aria-label="Відкрити меню" aria-expanded="false" aria-controls="nav-links">
      <span></span><span></span><span></span>
    </button>
  </header>

  {/*  HERO  */}
  <section className="hero" id="hero" aria-label="Головний банер">
    <div className="hero-bg" id="hero-bg" role="img" aria-label="Апетитна піца від Mini Pekarnya Pitsa Smayl"></div>
    <div className="hero-overlay"></div>
    <div className="hero-content">

      <div className="hero-badge">Піца &middot; Випічка &middot; Київ</div>

      <h1 className="hero-title">міні Пекарня</h1>

      <p className="hero-slogan">
        Домашня піца з посмішкою —<br />
        свіже тісто, щирі інгредієнти, тепла атмосфера
      </p>
      <div className="hero-actions">
        <a href="tel:+380636374306" className="btn btn-primary" id="hero-call-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
          Зателефонувати
        </a>
        <a href="/menu" className="btn btn-secondary">
          Переглянути меню
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
    <div className="scroll-hint" aria-hidden="true">
      <span>гортай вниз</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
  </section>

  {/*  ABOUT  */}
  <section className="section about" id="about" aria-labelledby="about-title">
    <div className="container">
      <div className="about-inner">
        {/* 
          Fix #4: 3D enhanced store image with removed background (bakery_store_3d.jpg)
          Fix #5: Removed "з 2020 року" badge
         */}
        <div className="about-image-wrap reveal">
          <img
            src="/images/bakery_store_3d-Photoroom.png"
            className="about-store-img"
            alt="Міні пекарня Pitsa Smayl — фасад магазину"
            loading="lazy"
            width="600" height="500"
          />
        </div>
        <div className="about-text">
          <span className="section-label reveal">Про нас</span>
          <h2 className="section-title reveal reveal-delay-1" id="about-title">Маленька пекарня,<br />великий смак</h2>
          <p className="reveal reveal-delay-2">
            <strong>Mini Pekarnya</strong> — це затишне місце на вулиці Героїв Дніпра, 41, де кожен гість відчуває себе як удома. Ми готуємо піцу та випічку з душею — на свіжому тісті, з натуральних інгредієнтів, без зайвих добавок.
          </p>
          <p className="reveal reveal-delay-3">
            У нас немає великих залів та гучної музики — зате є справжній домашній смак, привітний персонал та аромат свіжоспеченого тіста, який зустрічає вас від порогу. Заходьте — будемо раді!
          </p>
          <div className="about-features">
            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--terracotta)' }}><path d="M12 22V12M12 12C12 7 7 4 3 6c0 4 3 8 9 6zM12 12c0-5 5-8 9-6-1 4-4 7-9 6z"/><path d="M12 17c-3 0-5-1-6-3M12 17c3 0 5-1 6-3"/></svg>
              </div>
              <h4>Свіже тісто</h4>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--terracotta)' }}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h4>Швидке приготування</h4>
            </div>
            <div className="feature-card reveal reveal-delay-3">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--terracotta)' }}><path d="M17 8C8 10 5.9 16.17 3.82 19.43A10 10 0 0 0 17 8zM3.82 19.43L2 22"/></svg>
              </div>
              <h4>Домашні інгредієнти</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  {/*  GALLERY  */}

  <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
    <div className="container">
      <div className="gallery-header reveal">
        <span className="section-label">Наші страви</span>
        <h2 className="section-title" id="gallery-title">Галерея смаку</h2>
      </div>
      <div className="gallery-grid reveal">
        <div className="gallery-item">
          <img src="/images/pizza_hero.jpg" alt="Апетитна піца від Mini Pekarnya Pitsa Smayl" loading="lazy" width="600" height="520" />
          <div className="gallery-overlay"></div>
        </div>
        <div className="gallery-item">
          <img src="/images/pizza_margherita.jpg" alt="Класична Маргарита" loading="lazy" width="400" height="260" />
          <div className="gallery-overlay"></div>
        </div>
        <div className="gallery-item">
          <img src="/images/pizza_pepperoni.jpg" alt="Гостра Пепероні" loading="lazy" width="400" height="260" />
          <div className="gallery-overlay"></div>
        </div>
        <div className="gallery-item">
          <img src="/images/pizza_four_cheese.jpg" alt="Піца Чотири Сири" loading="lazy" width="400" height="260" />
          <div className="gallery-overlay"></div>
        </div>
        <div className="gallery-item">
          <img src="/images/bakery_pastry.jpg" alt="Свіжа домашня випічка" loading="lazy" width="400" height="260" />
          <div className="gallery-overlay"></div>
        </div>
      </div>
    </div>
  </section>

  {/*  CONTACTS  */}
  <section className="contacts-section" id="contacts" aria-labelledby="contacts-title">
    <div className="container">
      <div className="contacts-inner">
        <div className="contacts-info">
          <span className="section-label reveal">Знайдіть нас</span>
          <h2 className="section-title reveal reveal-delay-1" id="contacts-title">Контакти</h2>

          <div className="contact-block reveal reveal-delay-2">
            <div className="contact-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            </div>
            <div className="contact-details">
              <h4>Телефон</h4>
              <a href="tel:+380636374306" className="contact-phone-big" aria-label="Зателефонувати: 063 637 43 06">063 637 43 06</a>
            </div>
          </div>

          <div className="contact-block reveal reveal-delay-3">
            <div className="contact-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <div className="contact-details">
              <h4>Адреса</h4>
              <p>вулиця Героїв Дніпра 41<br />Київ, 02000</p>
            </div>
          </div>

          <div className="contact-block reveal reveal-delay-4">
            <div className="contact-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
            </div>
            <div className="contact-details">
              <h4>Графік роботи</h4>
              <p>Щодня: <strong style={{ color: 'var(--cream)' }}>09:00 – 20:00</strong></p>
            </div>
          </div>

          
        </div>

        <div className="map-container reveal reveal-delay-2">
          <iframe
            title="Розташування Mini Pekarnya Pitsa Smayl на карті"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.5!2d30.484!3d50.483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cef9c8f09049%3A0x1!2z0LLRg9C70LjRhtGPINCT0LXRgNC-0ZfQsiDQlNC90ZbQv9GA0LAsIDQxLCDQmtC40ZfQsywgMDIwMDA!5e0!3m2!1suk!2sua!4v1719000000000!5m2!1suk!2sua"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-popups"
            allowFullScreen
            aria-label="Карта: вулиця Героїв Дніпра 41, Київ"
          ></iframe>
        </div>
      </div>
    </div>
    <div className="footer-bar">
      <p>© 2024 Mini Pekarnya Pitsa Smayl · вул. Героїв Дніпра 41, Київ · Усі права захищені</p>
    </div>
  </section>
  {/*  STICKY CALL (mobile)  */}
  <a href="tel:+380636374306" className="sticky-call" id="sticky-call" aria-label="Зателефонувати: 063 637 43 06">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
    063 637 43 06
  </a>

  

    </>
  );
}
