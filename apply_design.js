const fs = require('fs');

function applyDesignChanges(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Typography: Remove --font-accent from section-title, menu-card-title, menu-card-price
  html = html.replace(
    /\.section-title\s*\{\s*font-family:\s*var\(--font-accent\);/g,
    '.section-title { font-weight: 800;'
  );
  html = html.replace(
    /\.menu-card-title\s*\{\s*font-family:\s*var\(--font-accent\);/g,
    '.menu-card-title { font-weight: 800;'
  );
  html = html.replace(
    /\.menu-card-price\s*\{\s*font-family:\s*var\(--font-accent\);/g,
    '.menu-card-price { font-weight: 800;'
  );

  // 2. Animation: Remove floatUpDown from about-store-img and add hover
  if (filePath.includes('index.html')) {
    html = html.replace(
      /animation:\s*floatUpDown[^;]+;/g,
      'transition: transform 0.5s ease;'
    );
    // Add hover rule for about-store-img if not present
    if (!html.includes('.about-store-img:hover')) {
      html = html.replace(
        /\.about-store-img\s*\{/,
        '.about-store-img:hover { transform: translateY(-8px) scale(1.02); }\n    .about-store-img {'
      );
    }
  }

  // 3. Menu Cards: Add subtle border
  html = html.replace(
    /\.menu-card\s*\{\s*background:\s*var\(--white\);/g,
    '.menu-card { background: var(--white); border: 1px solid rgba(192,82,43,0.15);'
  );

  // 4. Logo padding/crop (Mobile adjustment)
  html = html.replace(
    /\.nav-logo-text-img\s*\{\s*position:\s*absolute;\s*left:\s*40px;\s*top:\s*50%;\s*transform:\s*translateY\(-42%\);\s*height:\s*60px;/g,
    '.nav-logo-text-img { position: absolute; left: 42px; top: 50%; transform: translateY(-42%); height: 48px;'
  );
  html = html.replace(
    /\.nav-logo-text-img\s*\{\s*position:\s*absolute;\s*left:\s*50px;\s*top:\s*50%;\s*transform:\s*translateY\(-42%\);\s*height:\s*120px;/g,
    '.nav-logo-text-img { position: absolute; left: 42px; top: 50%; transform: translateY(-42%); height: 48px;'
  ); // For menu.html mobile which might have been left at 120px in media query by mistake

  fs.writeFileSync(filePath, html, 'utf8');
}

applyDesignChanges('C:\\Users\\Admin\\Desktop\\pizza\\index.html');
applyDesignChanges('C:\\Users\\Admin\\Desktop\\pizza\\menu.html');
console.log('Design changes applied successfully.');
