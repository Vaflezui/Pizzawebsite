const fs = require('fs');
const path = require('path');

const menuBakPath = path.join(__dirname, 'menu.html.bak');
const appDir = path.join(__dirname, 'src', 'app');
const menuDir = path.join(appDir, 'menu');
const pagePath = path.join(menuDir, 'page.tsx');

if (!fs.existsSync(menuDir)) {
  fs.mkdirSync(menuDir, { recursive: true });
}

let html = '';
if (fs.existsSync(menuBakPath)) {
  html = fs.readFileSync(menuBakPath, 'utf8');
} else {
  console.log('menu.html.bak not found!');
  process.exit(1);
}

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
bodyContent = bodyContent.replace(/href="menu\.html"/g, 'href="/menu"');
bodyContent = bodyContent.replace(/href="index\.html"/g, 'href="/"');
bodyContent = bodyContent.replace(/<img([^>]+[^\/])>/g, '<img$1 />');
bodyContent = bodyContent.replace(/<br([^>]+)?>/g, '<br />');

// We need to inject the dynamic rendering part into <div className="menu-grid" ...> ... </div>
const gridRegex = /(<div className="menu-grid"[^>]*>)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/;

const dynamicCode = `
        {products.filter(p => p.active).map((item, idx) => {
          const delayClass = idx > 0 ? \` reveal-delay-\${idx > 3 ? 3 : idx}\` : '';
          return (
            <article key={item.id} className={\`menu-card reveal\${delayClass} visible\`} data-category={item.category}>
              <div className="menu-card-img">
                <img src={item.image} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
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
    </div>
  </section>`;

if (gridRegex.test(bodyContent)) {
  bodyContent = bodyContent.replace(gridRegex, `$1${dynamicCode}`);
}

const pageContent = `import { readDb } from '@/lib/db-helper';
import Link from 'next/link';

export default async function MenuPage() {
  const db = readDb();
  const products = db.products;

  return (
    <>
      ${bodyContent}
    </>
  );
}
`;

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('Created menu/page.tsx');
