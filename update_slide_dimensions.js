const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, 'htmlslides');
const files = fs.readdirSync(slidesDir);

files.forEach(file => {
  if (file.startsWith('Slide') && file.endsWith('.html')) {
    const filePath = path.join(slidesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace slide dimensions
    content = content.replace(
      /\.slide\s*{[\s\S]*?width:\s*1280px;[\s\S]*?height:\s*720px;/g, 
      `.slide {
            width: 1600px;
            height: 900px;`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated dimensions in ${file}`);
  }
});

console.log('Slide dimensions updated successfully!'); 