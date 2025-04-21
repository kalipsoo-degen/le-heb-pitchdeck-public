// This script updates all slide files to fix overflow and padding issues
const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, 'htmlslides');
const slideFiles = fs.readdirSync(slidesDir).filter(file => file.startsWith('Slide') && file.endsWith('.html'));

let updatedCount = 0;

// Process each slide file
for (const file of slideFiles) {
  const filePath = path.join(slidesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Make the necessary changes
  let modified = false;
  
  // 1. Change body overflow from hidden to auto
  if (content.includes('overflow: hidden;')) {
    content = content.replace('overflow: hidden;', 'overflow: auto;');
    modified = true;
  }
  
  // 2. Change slide overflow from hidden to auto
  if (content.includes('.slide {')) {
    content = content.replace(/(\.slide\s*\{[\s\S]*?overflow: )hidden;/, '$1auto;');
    modified = true;
  }
  
  // 3. Adjust content padding
  if (content.includes('content-wrapper w-full px-16 py-12')) {
    content = content.replace('content-wrapper w-full px-16 py-12', 'content-wrapper w-full px-16 pt-10 pb-8');
    modified = true;
  }
  
  // 4. Move footer up
  if (content.includes('absolute bottom-6 right-8 text-gray-500 text-sm')) {
    content = content.replace('absolute bottom-6 right-8 text-gray-500 text-sm', 'absolute bottom-2 right-8 text-gray-500 text-sm');
    modified = true;
  }
  
  // Save the file if changes were made
  if (modified) {
    fs.writeFileSync(filePath, content);
    updatedCount++;
    console.log(`Updated ${file}`);
  } else {
    console.log(`No changes needed for ${file}`);
  }
}

console.log(`\nCompleted! Updated ${updatedCount} of ${slideFiles.length} slide files.`); 