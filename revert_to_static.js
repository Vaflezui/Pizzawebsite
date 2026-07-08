const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'menu.html');
const csvPath = path.join(__dirname, 'menu.csv');

if (!fs.existsSync(menuPath) || !fs.existsSync(csvPath)) {
  console.log('Required files not found.');
  process.exit(1);
}

let html = fs.readFileSync(menuPath, 'utf8');
const csv = fs.readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, ''); // remove BOM

const lines = csv.split('\n').filter(l => l.trim() !== '');
const headers = lines[0].split(',');

let staticHTML = '<div class="menu-grid" id="menu-grid" role="list">\n\n';

let delayCounter = 0;

for (let i = 1; i < lines.length; i++) {
  // Regex to handle CSV with quotes
  const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
  let matches = [];
  let match;
  while ((match = regex.exec(lines[i])) !== null) {
    matches.push(match[1].replace(/^"|"$/g, '').replace(/""/g, '"'));
  }
  
  if (matches.length < 4) continue;

  const category = matches[0];
  const title = matches[1];
  const desc = matches[2];
  const image = matches[3];
  const size1 = matches[4] || '';
  const price1 = matches[5] || '';
  const size2 = matches[6] || '';
  const price2 = matches[7] || '';

  const delayClass = delayCounter > 0 ? ` reveal-delay-${delayCounter > 3 ? 3 : delayCounter}` : '';

  staticHTML += `        <article class="menu-card reveal${delayClass}" data-category="${category}" role="listitem">\n`;
  staticHTML += `          <div class="menu-card-img">\n`;
  staticHTML += `            <img src="${image}" alt="${title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />\n`;
  staticHTML += `          </div>\n`;
  staticHTML += `          <div class="menu-card-body">\n`;
  staticHTML += `            <h3 class="menu-card-title">${title}</h3>\n`;
  staticHTML += `            <p class="menu-card-desc">${desc}</p>\n\n`;
  staticHTML += `            <div class="menu-card-footer" style="flex-direction:column; align-items:flex-start; gap:8px;">\n`;
  
  if (size1 && price1) {
    staticHTML += `              <div style="display:flex; justify-content:space-between; width:100%;">\n`;
    staticHTML += `                <span class="menu-card-size">${size1}</span>\n`;
    staticHTML += `                <span class="menu-card-price" style="font-size:1.1rem;">${price1} ₴</span>\n`;
    staticHTML += `              </div>\n`;
  }
  if (size2 && price2) {
    staticHTML += `              <div style="display:flex; justify-content:space-between; width:100%;">\n`;
    staticHTML += `                <span class="menu-card-size">${size2}</span>\n`;
    staticHTML += `                <span class="menu-card-price" style="font-size:1.1rem;">${price2} ₴</span>\n`;
    staticHTML += `              </div>\n`;
  }
  
  staticHTML += `            </div>\n`;
  staticHTML += `          </div>\n`;
  staticHTML += `        </article>\n\n`;
  
  delayCounter++;
}

staticHTML += `      </div>\n    </div>\n  </section>\n\n`;

staticHTML += `  <!-- FOOTER -->\n`;
staticHTML += `  <div class="footer-bar">\n`;
staticHTML += `    <p>© 2024 Mini Pekarnya Pitsa Smayl · вул. Героїв Дніпра, 41, Київ · <a href="tel:+380636374306">063 637 43 06</a></p>\n`;
staticHTML += `  </div>\n\n`;

staticHTML += `  <!-- STICKY CALL (mobile) -->\n`;
staticHTML += `  <a href="tel:+380636374306" class="sticky-call" id="sticky-call" aria-label="Зателефонувати: 063 637 43 06">\n`;
staticHTML += `    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>\n`;
staticHTML += `    063 637 43 06\n`;
staticHTML += `  </a>\n\n`;

staticHTML += `  <script>\n`;
staticHTML += `    'use strict';\n`;
staticHTML += `    // Menu tabs\n`;
staticHTML += `    const tabBtns = document.querySelectorAll('.tab-btn');\n`;
staticHTML += `    const menuCards = document.querySelectorAll('.menu-card');\n`;
staticHTML += `    tabBtns.forEach(btn => {\n`;
staticHTML += `      btn.addEventListener('click', () => {\n`;
staticHTML += `        const cat = btn.dataset.category;\n`;
staticHTML += `        tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });\n`;
staticHTML += `        btn.classList.add('active');\n`;
staticHTML += `        btn.setAttribute('aria-selected', 'true');\n`;
staticHTML += `        menuCards.forEach(card => {\n`;
staticHTML += `          const show = cat === 'all' || card.dataset.category === cat;\n`;
staticHTML += `          card.style.display = show ? 'flex' : 'none';\n`;
staticHTML += `          if (show) { card.style.animation = 'none'; void card.offsetHeight; card.style.animation = 'fadeInUp .45s ease both'; }\n`;
staticHTML += `        });\n`;
staticHTML += `      });\n`;
staticHTML += `    });\n`;
staticHTML += `    // Scroll reveal\n`;
staticHTML += `    const ro = new IntersectionObserver((entries) => {\n`;
staticHTML += `      entries.forEach(e => {\n`;
staticHTML += `        if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }\n`;
staticHTML += `      });\n`;
staticHTML += `    }, { threshold: 0.1 });\n`;
staticHTML += `    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));\n`;
staticHTML += `  </script>\n`;

// Find the dynamic part and replace it
const dynamicRegex = /(<div class="menu-grid" id="menu-grid" role="list">)[\s\S]*?(<\/script>\s*(?:<\/body>|\Z))/;

if (dynamicRegex.test(html)) {
  html = html.replace(dynamicRegex, staticHTML);
  
  // also remove the PapaParse script tag if it's there
  html = html.replace(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/PapaParse\/[^"]+"><\/script>/, '');

  fs.writeFileSync(menuPath, html, 'utf8');
  console.log('Reverted successfully to static HTML.');
} else {
  console.log('Could not find dynamic block to replace.');
}
