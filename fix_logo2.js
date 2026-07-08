const fs = require('fs');

function fixLogo(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // We need to carefully replace the first instance (desktop) and the second instance (mobile).
  // The easiest way is to match the CSS blocks.

  // Let's just find the first .nav-logo:hover block and replace the next .nav-logo-text-img block
  // because desktop logo is always right after nav-logo-img hover.
  
  const desktopRegex = /(\.nav-logo:hover\s*\.nav-logo-img\s*\{[^}]+\}\s*)\.nav-logo-text-img\s*\{[^}]+\}/;
  html = html.replace(desktopRegex, `$1.nav-logo-text-img {
      position: absolute;
      left: 55px;
      top: 50%;
      transform: translateY(-42%);
      height: 110px;
      width: auto;
      max-width: none;
      object-fit: contain;
      pointer-events: none;
    }`);

  // Now for mobile, it's inside @media (max-width: 700px) or 900px
  // In index.html: .nav-logo-img { width: 42px; height: 42px; }
  // In menu.html: .nav-logo-img { height: 46px; }
  const mobileRegexIndex = /(\.nav-logo-img\s*\{\s*width:\s*42px;\s*height:\s*42px;\s*\}\s*)\.nav-logo-text-img\s*\{[^}]+\}/;
  html = html.replace(mobileRegexIndex, `$1.nav-logo-text-img {
        position: absolute;
        left: 42px;
        top: 50%;
        transform: translateY(-42%);
        height: 48px;
        width: auto;
        max-width: none;
        pointer-events: none;
      }`);

  const mobileRegexMenu = /(\.nav-logo-img\s*\{\s*height:\s*46px;\s*\}\s*)\.nav-logo-text-img\s*\{[^}]+\}/;
  html = html.replace(mobileRegexMenu, `$1.nav-logo-text-img {
        position: absolute;
        left: 42px;
        top: 50%;
        transform: translateY(-42%);
        height: 48px;
        width: auto;
        max-width: none;
        object-fit: contain;
        pointer-events: none;
      }`);

  fs.writeFileSync(filePath, html, 'utf8');
}

fixLogo('C:\\Users\\Admin\\Desktop\\pizza\\index.html');
fixLogo('C:\\Users\\Admin\\Desktop\\pizza\\menu.html');
console.log('Logo positions fixed.');
