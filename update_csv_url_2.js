const fs = require('fs');

const filePath = 'C:\\Users\\Admin\\Desktop\\pizza\\menu.html';
if (fs.existsSync(filePath)) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace any existing Google Sheets CSV URL with the new one
  const newUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRpOFNbHE2CFyiLtbwOk20xHEZ0lUFiMyMqaaCI-RMT08Z1rNOk5dh1b3eh84KtvTjSOGQwvsUG5e7/pub?output=csv';
  html = html.replace(/https:\/\/docs\.google\.com\/spreadsheets\/d\/e\/[^']+\/pub\?output=csv/g, newUrl);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Updated CSV URL to the new one.');
} else {
  console.log('menu.html not found.');
}
