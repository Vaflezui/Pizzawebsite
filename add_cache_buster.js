const fs = require('fs');

const filePath = 'C:\\Users\\Admin\\Desktop\\pizza\\menu.html';
if (fs.existsSync(filePath)) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Find the Papa.parse line and add a cache buster
  if (!html.includes('new Date().getTime()')) {
    html = html.replace(
      /Papa\.parse\(CSV_URL,\s*\{/g,
      "Papa.parse(CSV_URL + '&t=' + new Date().getTime(), {"
    );
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Cache buster added to Papa.parse.');
  } else {
    console.log('Cache buster already present.');
  }
}
