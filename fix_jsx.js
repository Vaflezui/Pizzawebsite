const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src', 'app');

function fixComments(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace HTML comments with JSX comments
  content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  fs.writeFileSync(filePath, content, 'utf8');
}

fixComments(path.join(appDir, 'page.tsx'));
fixComments(path.join(appDir, 'menu', 'page.tsx'));
console.log('Fixed comments');
