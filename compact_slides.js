// This script updates all slide files to make content more compact and fit without scrolling
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
  
  // 1. Change body and slide overflow from auto to hidden
  if (content.includes('overflow: auto;')) {
    content = content.replace(/overflow: auto;/g, 'overflow: hidden;');
    modified = true;
  }
  
  // 2. Reduce margins and padding even more aggressively
  if (content.includes('mb-6')) {
    content = content.replace(/mb-6/g, 'mb-3');
    modified = true;
  }
  if (content.includes('mb-5')) {
    content = content.replace(/mb-5/g, 'mb-2');
    modified = true;
  }
  if (content.includes('mb-4')) {
    content = content.replace(/mb-4/g, 'mb-2');
    modified = true;
  }
  if (content.includes('p-5')) {
    content = content.replace(/p-5/g, 'p-3');
    modified = true;
  }
  if (content.includes('p-4')) {
    content = content.replace(/p-4/g, 'p-2');
    modified = true;
  }
  if (content.includes('gap-6')) {
    content = content.replace(/gap-6/g, 'gap-3');
    modified = true;
  }
  if (content.includes('gap-4')) {
    content = content.replace(/gap-4/g, 'gap-2');
    modified = true;
  }
  
  // 3. Reduce font sizes and line heights further
  if (content.includes('text-3xl')) {
    content = content.replace(/text-3xl/g, 'text-2xl');
    modified = true;
  }
  if (content.includes('text-2xl')) {
    content = content.replace(/text-2xl/g, 'text-xl');
    modified = true;
  }
  if (content.includes('text-xl')) {
    content = content.replace(/text-xl/g, 'text-lg');
    modified = true;
  }
  
  // 4. Further optimize padding in content wrapper
  if (content.includes('content-wrapper w-full px-12 pt-8 pb-6')) {
    content = content.replace('content-wrapper w-full px-12 pt-8 pb-6', 'content-wrapper w-full px-8 pt-5 pb-4');
    modified = true;
  }
  if (content.includes('content-wrapper w-full px-10 pt-6 pb-4')) {
    content = content.replace('content-wrapper w-full px-10 pt-6 pb-4', 'content-wrapper w-full px-8 pt-5 pb-4');
    modified = true;
  }
  
  // 5. Move footer up even more and make it smaller
  if (content.includes('absolute bottom-1 right-6 text-gray-500 text-xs')) {
    content = content.replace('absolute bottom-1 right-6 text-gray-500 text-xs', 'absolute bottom-0.5 right-4 text-gray-500 text-xs opacity-80');
    modified = true;
  }
  
  // 6. Further reduce size of chart containers
  if (content.includes('chart-container')) {
    content = content.replace(/height: 180px;/g, 'height: 150px;');
    content = content.replace(/height: 200px;/g, 'height: 150px;');
    modified = true;
  }
  
  // 7. Add more aggressive compact styles
  if (content.includes('/* Additional styles for compact layout */')) {
    // Already has compact styles, replace with more aggressive ones
    const start = content.indexOf('/* Additional styles for compact layout */');
    const end = content.indexOf('</style>', start);
    const moreCompactStyles = `
        /* Additional styles for compact layout */
        .grid { margin-bottom: 0 !important; }
        .text-4xl { font-size: 1.5rem !important; line-height: 1.75rem !important; }
        .text-3xl { font-size: 1.25rem !important; line-height: 1.5rem !important; }
        .text-2xl { font-size: 1.125rem !important; line-height: 1.35rem !important; }
        .text-xl { font-size: 1rem !important; line-height: 1.25rem !important; }
        .text-lg { font-size: 0.9rem !important; line-height: 1.1rem !important; }
        p { margin-bottom: 0.375rem !important; line-height: 1.2 !important; }
        .p-3 { padding: 0.5rem !important; }
        .p-2 { padding: 0.375rem !important; }
        .py-4 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
        .py-3 { padding-top: 0.375rem !important; padding-bottom: 0.375rem !important; }
        .px-4 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
        .px-3 { padding-left: 0.375rem !important; padding-right: 0.375rem !important; }
        .rounded-xl { border-radius: 0.375rem !important; }
        .rounded-lg { border-radius: 0.25rem !important; }
        .h-16, .w-16 { height: 2.5rem !important; width: 2.5rem !important; }
        .h-14, .w-14 { height: 2.25rem !important; width: 2.25rem !important; }
        .h-12, .w-12 { height: 2rem !important; width: 2rem !important; }
        .h-10, .w-10 { height: 1.75rem !important; width: 1.75rem !important; }
        .h-8, .w-8 { height: 1.5rem !important; width: 1.5rem !important; }
        .h-5, .w-5 { height: 1.125rem !important; width: 1.125rem !important; }
        .space-y-4 > * + * { margin-top: 0.5rem !important; }
        .space-y-3 > * + * { margin-top: 0.375rem !important; }
        .space-y-2 > * + * { margin-top: 0.25rem !important; }
    `;
    content = content.substring(0, start) + moreCompactStyles + content.substring(end);
    modified = true;
  } else if (content.includes('</style>')) {
    // Add compact styles if not present
    const compactStyles = `
        /* Additional styles for compact layout */
        .grid { margin-bottom: 0 !important; }
        .text-4xl { font-size: 1.5rem !important; line-height: 1.75rem !important; }
        .text-3xl { font-size: 1.25rem !important; line-height: 1.5rem !important; }
        .text-2xl { font-size: 1.125rem !important; line-height: 1.35rem !important; }
        .text-xl { font-size: 1rem !important; line-height: 1.25rem !important; }
        .text-lg { font-size: 0.9rem !important; line-height: 1.1rem !important; }
        p { margin-bottom: 0.375rem !important; line-height: 1.2 !important; }
        .p-3 { padding: 0.5rem !important; }
        .p-2 { padding: 0.375rem !important; }
        .py-4 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
        .py-3 { padding-top: 0.375rem !important; padding-bottom: 0.375rem !important; }
        .px-4 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
        .px-3 { padding-left: 0.375rem !important; padding-right: 0.375rem !important; }
        .rounded-xl { border-radius: 0.375rem !important; }
        .rounded-lg { border-radius: 0.25rem !important; }
        .h-16, .w-16 { height: 2.5rem !important; width: 2.5rem !important; }
        .h-14, .w-14 { height: 2.25rem !important; width: 2.25rem !important; }
        .h-12, .w-12 { height: 2rem !important; width: 2rem !important; }
        .h-10, .w-10 { height: 1.75rem !important; width: 1.75rem !important; }
        .h-8, .w-8 { height: 1.5rem !important; width: 1.5rem !important; }
        .h-5, .w-5 { height: 1.125rem !important; width: 1.125rem !important; }
        .space-y-4 > * + * { margin-top: 0.5rem !important; }
        .space-y-3 > * + * { margin-top: 0.375rem !important; }
        .space-y-2 > * + * { margin-top: 0.25rem !important; }
    `;
    content = content.replace('</style>', compactStyles + '\n    </style>');
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