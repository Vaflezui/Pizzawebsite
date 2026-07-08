const fs = require('fs');
const path = require('path');

const indexBakPath = path.join(__dirname, 'index.html.bak');
const appDir = path.join(__dirname, 'src', 'app');
const cssPath = path.join(appDir, 'globals.css');
const layoutPath = path.join(appDir, 'layout.tsx');
const pagePath = path.join(appDir, 'page.tsx');

if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

let html = '';
if (fs.existsSync(indexBakPath)) {
  html = fs.readFileSync(indexBakPath, 'utf8');
} else {
  console.log('index.html.bak not found!');
  process.exit(1);
}

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
let css = styleMatch ? styleMatch[1] : '';

css = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n` + css;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Created globals.css');

const layoutContent = `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Pekarnya Pitsa Smayl — Піца та випічка у Києві",
  description: "Mini Pekarnya Pitsa Smayl — затишна міні-пекарня та піцерія у Києві на вулиці Героїв Дніпра 41.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
`;
fs.writeFileSync(layoutPath, layoutContent, 'utf8');
console.log('Created layout.tsx');

const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

bodyContent = bodyContent.replace(/class=/g, 'className=');
bodyContent = bodyContent.replace(/for=/g, 'htmlFor=');
bodyContent = bodyContent.replace(/stroke-width/g, 'strokeWidth');
bodyContent = bodyContent.replace(/stroke-linecap/g, 'strokeLinecap');
bodyContent = bodyContent.replace(/stroke-linejoin/g, 'strokeLinejoin');
bodyContent = bodyContent.replace(/fill-rule/g, 'fillRule');
bodyContent = bodyContent.replace(/clip-rule/g, 'clipRule');

bodyContent = bodyContent.replace(/style="([^"]+)"/g, (match, p1) => {
  const parts = p1.split(';').filter(p => p.trim() !== '');
  const objStr = parts.map(p => {
    const splitIndex = p.indexOf(':');
    if (splitIndex === -1) return '';
    const key = p.slice(0, splitIndex).trim();
    const value = p.slice(splitIndex + 1).trim();
    if (!key || !value) return '';
    const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
    return `${camelKey}: '${value}'`;
  }).filter(s => s !== '').join(', ');
  return `style={{ ${objStr} }}`;
});

bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/g, '');

const pageContent = `'use client';

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
      ${bodyContent}
    </>
  );
}
`;

let finalPageContent = pageContent;
finalPageContent = finalPageContent.replace(/href="menu\.html"/g, 'href="/menu"');
finalPageContent = finalPageContent.replace(/href="index\.html"/g, 'href="/"');

finalPageContent = finalPageContent.replace(/<button className="burger" id="burger"/g, '<button className="burger" id="burger" onClick={toggleMenu}');
finalPageContent = finalPageContent.replace(/<a href="#([^"]+)"/g, '<a href="#$1" onClick={closeMenu}');

// Fix self-closing tags
finalPageContent = finalPageContent.replace(/<img([^>]+[^\/])>/g, '<img$1 />');
finalPageContent = finalPageContent.replace(/<br([^>]+)?>/g, '<br />');

fs.writeFileSync(pagePath, finalPageContent, 'utf8');
console.log('Created page.tsx');
