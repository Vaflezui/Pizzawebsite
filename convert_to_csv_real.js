const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'menu.html');
let html = fs.readFileSync(filePath, 'utf8');

// The grid starts with: <div class="menu-grid" id="menu-grid" role="list">
// The grid ends before: </div>\s*</div>\s*</section>

const gridRegex = /(<div class="menu-grid" id="menu-grid" role="list">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/;

const dynamicScript = `
        <!-- Cards will be generated here by JavaScript -->
      </div>
    </div>
  </section>
      
  <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // The user's Google Sheets CSV Link with cache buster
      const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRpOFNbHE2CFyiLtbwOk20xHEZ0lUFiMyMqaaCI-RMT08Z1rNOk5dh1b3eh84KtvTjSOGQwvsUG5e7/pub?output=csv'; 
      const fetchUrl = CSV_URL + '&t=' + new Date().getTime();

      const grid = document.getElementById('menu-grid');
      const tabs = document.querySelectorAll('.tab-btn');
      let allItems = [];

      Papa.parse(fetchUrl, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          allItems = results.data;
          renderCards('all'); 
        },
        error: function(err) {
          grid.innerHTML = '<p style="text-align:center; width:100%; color:var(--terracotta);">Помилка завантаження меню.</p>';
        }
      });

      function renderCards(filterCategory) {
        grid.innerHTML = ''; 
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
            <article class="menu-card reveal \${delayClass} visible" data-category="\${item.Category}">
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
      }

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
          renderCards(tab.dataset.category);
        });
      });
    });
  </script>`;

if (gridRegex.test(html)) {
  html = html.replace(gridRegex, `$1${dynamicScript}`);
  
  // Remove any old static scripts
  html = html.replace(/<script>\s*'use strict';[\s\S]*?<\/script>/, '');
  
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('SUCCESS: DOM properly replaced.');
} else {
  console.log('FAIL: Regex did not match!');
}
