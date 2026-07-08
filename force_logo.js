const fs = require('fs');

function forceFixLogo(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace ALL instances of .nav-logo-text-img { ... }
  // Then we will manually inject the correct ones for Desktop and Mobile.
  
  html = html.replace(/\.nav-logo-text-img\s*\{[^}]+\}/g, '/*REPLACED_LOGO_TEXT*/');

  // Now, the first occurrence is desktop, second is mobile.
  
  let desktopCSS = `.nav-logo-text-img {
        position: absolute;
        left: 50px;
        top: 50%;
        transform: translateY(-42%);
        height: 120px;
        width: auto;
        max-width: none;
        object-fit: contain;
        pointer-events: none;
      }`;
      
  let mobileCSS = `.nav-logo-text-img {
          position: absolute;
          left: 40px;
          top: 50%;
          transform: translateY(-42%);
          height: 60px;
          width: auto;
          max-width: none;
          object-fit: contain;
          pointer-events: none;
        }`;

  // Replace first (desktop)
  html = html.replace('/*REPLACED_LOGO_TEXT*/', desktopCSS);
  // Replace second (mobile)
  html = html.replace('/*REPLACED_LOGO_TEXT*/', mobileCSS);
  
  fs.writeFileSync(filePath, html, 'utf8');
}

forceFixLogo('C:\\Users\\Admin\\Desktop\\pizza\\index.html');
forceFixLogo('C:\\Users\\Admin\\Desktop\\pizza\\menu.html');
console.log('Forced logo fix applied.');
