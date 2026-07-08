const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'menu.html');
let html = fs.readFileSync(filePath, 'utf8');

// Simple regex extraction since we know the exact HTML structure we generated
const cardsRegex = /<article class="menu-card[^"]*" data-category="([^"]+)"[\s\S]*?<img src="([^"]+)"[\s\S]*?<h3 class="menu-card-title">([^<]+)<\/h3>[\s\S]*?<p class="menu-card-desc">([^<]*)<\/p>([\s\S]*?)<\/article>/g;

let csvContent = 'Category,Title,Description,Image,Size1,Price1,Size2,Price2\n';

let match;
while ((match = cardsRegex.exec(html)) !== null) {
  const category = match[1];
  const image = match[2];
  const title = match[3];
  const desc = match[4].trim();
  const sizesBlock = match[5];

  // Extract sizes and prices
  const sizePriceRegex = /<span class="menu-card-size">([^<]+)<\/span>[\s\S]*?<span class="menu-card-price"[^>]*>([^<]+)<\/span>/g;
  let spMatch;
  let sizes = [];
  let prices = [];
  while ((spMatch = sizePriceRegex.exec(sizesBlock)) !== null) {
    sizes.push(spMatch[1].trim());
    prices.push(spMatch[2].trim().replace(' ₴', ''));
  }

  const s1 = sizes[0] || '';
  const p1 = prices[0] || '';
  const s2 = sizes[1] || '';
  const p2 = prices[1] || '';

  // Escape CSV quotes if needed
  const escapeCSV = (str) => `"${str.replace(/"/g, '""')}"`;
  
  csvContent += `${category},${escapeCSV(title)},${escapeCSV(desc)},${image},${escapeCSV(s1)},${p1},${escapeCSV(s2)},${p2}\n`;
}

// Save CSV
fs.writeFileSync(path.join(__dirname, 'menu.csv'), "\uFEFF" + csvContent, 'utf8'); // BOM for Excel

// Now, rewrite menu.html to be dynamic
// Find the menu-grid block
const gridRegex = /(<div class="menu-grid" id="menu-grid" role="list">)[\s\S]*?(<\/div>\s*<!-- FOOTER -->)/;

const dynamicScript = `
        <!-- Cards will be generated here by JavaScript -->
      </div>
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          // CHANGE THIS URL to your published Google Sheets CSV link!
          const CSV_URL = 'menu.csv'; 

          const grid = document.getElementById('menu-grid');
          const tabs = document.querySelectorAll('.tab-btn');
          let allItems = [];

          // Fetch and parse CSV
          Papa.parse(CSV_URL, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
              allItems = results.data;
              renderCards('all'); // Initial render
            },
            error: function(err) {
              grid.innerHTML = '<p style="text-align:center; width:100%; color:var(--terracotta);">Помилка завантаження меню з Google Sheets.</p>';
            }
          });

          // Function to render cards
          function renderCards(filterCategory) {
            grid.innerHTML = ''; // clear
            let delay = 0;
            
            allItems.forEach((item) => {
              if (filterCategory !== 'all' && item.Category !== filterCategory) return;
              
              let priceHTML = '';
              if (item.Size1 && item.Price1) {
                priceHTML += \`
                  <div style="display:flex; justify-content:space-between; width:100%;">
                    <span class="menu-card-size">\${item.Size1}</span>
                    <span class="menu-card-price" style="font-size:1.1rem; font-weight:800;">\${item.Price1} ₴</span>
                  </div>\`;
              }
              if (item.Size2 && item.Price2) {
                priceHTML += \`
                  <div style="display:flex; justify-content:space-between; width:100%;">
                    <span class="menu-card-size">\${item.Size2}</span>
                    <span class="menu-card-price" style="font-size:1.1rem; font-weight:800;">\${item.Price2} ₴</span>
                  </div>\`;
              }

              const delayClass = delay > 0 ? \`reveal-delay-\${delay > 3 ? 3 : delay}\` : '';
              
              const cardHTML = \`
                <article class="menu-card reveal \${delayClass}" data-category="\${item.Category}">
                  <div class="menu-card-img">
                    <img src="\${item.Image}" alt="\${item.Title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div class="menu-card-body">
                    <h3 class="menu-card-title" style="font-family: var(--font-accent);">\${item.Title}</h3>
                    <p class="menu-card-desc">\${item.Description}</p>
                    <div class="menu-card-footer" style="flex-direction:column; align-items:flex-start; gap:8px;">
                      \${priceHTML}
                    </div>
                  </div>
                </article>
              \`;
              grid.innerHTML += cardHTML;
              delay++;
            });
            
            // Trigger animation
            setTimeout(() => {
              document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
            }, 50);
          }

          // Tab click logic
          tabs.forEach(tab => {
            tab.addEventListener('click', () => {
              tabs.forEach(t => t.classList.remove('active', 'aria-selected'));
              tab.classList.add('active');
              tab.setAttribute('aria-selected', 'true');
              renderCards(tab.dataset.category);
            });
          });
        });
      </script>

    <!-- FOOTER -->`;

html = html.replace(gridRegex, `$1${dynamicScript}`);

// Remove any existing manual tab logic from bottom if it exists
html = html.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>\s*(?=<\/body>)/, '');

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully converted menu to dynamic CSV loading.');
