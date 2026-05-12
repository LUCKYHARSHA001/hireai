const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  { regex: /rgba\(59,\s*163,\s*255/g, replacement: 'rgba(255, 140, 0' },
  { regex: /rgba\(124,\s*92,\s*255/g, replacement: 'rgba(255, 69, 0' },
  { regex: /rgba\(31,\s*171,\s*120/g, replacement: 'rgba(255, 165, 0' },
  { regex: /rgba\(34,\s*57,\s*89/g, replacement: 'rgba(30, 15, 0' },
  { regex: /rgba\(16,\s*24,\s*39/g, replacement: 'rgba(15, 10, 5' },
  { regex: /rgba\(7,\s*17,\s*31/g, replacement: 'rgba(5, 5, 5' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(directoryPath);
console.log('Done replacing colors.');
