const fs = require('fs');

function revertDesign(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Revert Typography
  html = html.replace(
    /\.section-title\s*\{\s*font-weight:\s*800;/g,
    '.section-title { font-family: var(--font-accent);'
  );
  html = html.replace(
    /\.menu-card-title\s*\{\s*font-weight:\s*800;/g,
    '.menu-card-title { font-family: var(--font-accent);'
  );
  html = html.replace(
    /\.menu-card-price\s*\{\s*font-weight:\s*800;/g,
    '.menu-card-price { font-family: var(--font-accent);'
  );

  // 2. Revert Animation in index.html
  if (filePath.includes('index.html')) {
    html = html.replace(
      /\.about-store-img:hover\s*\{\s*transform:\s*translateY\(-8px\)\s*scale\(1\.02\);\s*\}\n\s*\.about-store-img\s*\{/g,
      '.about-store-img {'
    );
    html = html.replace(
      /transition:\s*transform\s*0\.5s\s*ease;/g,
      'animation: floatUpDown 4s ease-in-out infinite;'
    );
  }

  // 3. Revert Menu Cards border
  html = html.replace(
    /border:\s*1px\s*solid\s*rgba\(192,82,43,0\.15\);/g,
    ''
  );

  fs.writeFileSync(filePath, html, 'utf8');
}

revertDesign('C:\\Users\\Admin\\Desktop\\pizza\\index.html');
revertDesign('C:\\Users\\Admin\\Desktop\\pizza\\menu.html');
console.log('Design changes reverted.');
