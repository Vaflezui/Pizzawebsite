const fs = require('fs');

const filePath = 'C:\\Users\\Admin\\Desktop\\pizza\\menu.html';
let html = fs.readFileSync(filePath, 'utf8');

const oldUrl = "const CSV_URL = 'menu.csv';";
const newUrl = "const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSXJK2jJjWfrOYOOa9FE49M20uHyrNoU6boUt8-ey5cIPspirxZVrwu5lYoA-as_lTQOjet2jvlPXzz/pub?output=csv';";

html = html.replace(oldUrl, newUrl);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Updated CSV URL to Google Sheets.');
