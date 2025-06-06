const fs = require('fs');
const path = require('path');

// Path to htmlslides directory
const slidesDir = path.join(__dirname, 'htmlslides');

// HEB Studios theme colors to replace
const replacements = [
    // Gradient text
    {
        regex: /background: linear-gradient\(90deg, #9d4edd, #5a189a, #3a0ca3\);/g,
        replacement: 'background: linear-gradient(90deg, #627384, #4d5b6a, #374250);'
    },
    // Glow effect
    {
        regex: /text-shadow: 0 0 15px rgba\(157, 78, 221, 0\.7\);/g,
        replacement: 'text-shadow: 0 0 15px rgba(98, 115, 132, 0.7);'
    },
    // Background pattern
    {
        regex: /radial-gradient\(circle at 10% 20%, rgba\(157, 78, 221, 0\.1\) 0%, transparent 20%\),\s*radial-gradient\(circle at 80% 70%, rgba\(58, 12, 163, 0\.1\) 0%, transparent 20%\),\s*radial-gradient\(circle at 50% 50%, rgba\(90, 24, 154, 0\.05\) 0%, transparent 50%\);/g,
        replacement: 'radial-gradient(circle at 10% 20%, rgba(98, 115, 132, 0.1) 0%, transparent 20%),\n                radial-gradient(circle at 80% 70%, rgba(44, 36, 33, 0.1) 0%, transparent 20%),\n                radial-gradient(circle at 50% 50%, rgba(77, 91, 106, 0.05) 0%, transparent 50%);'
    },
    // Hexagon
    {
        regex: /background: linear-gradient\(135deg, rgba\(90, 24, 154, 0\.1\) 0%, rgba\(157, 78, 221, 0\.05\) 100%\);/g,
        replacement: 'background: linear-gradient(135deg, rgba(77, 91, 106, 0.1) 0%, rgba(98, 115, 132, 0.05) 100%);'
    },
    // Font family
    {
        regex: /font-family: ['"]Segoe UI['"], Tahoma, Geneva, Verdana, sans-serif;/g,
        replacement: "font-family: 'Inter', 'Segoe UI', sans-serif;"
    },
    // Body text color
    {
        regex: /color: #f5f5f5;/g,
        replacement: 'color: #2c2421;'
    },
    // Background color
    {
        regex: /background-color: #0f1923;/g,
        replacement: 'background-color: #d5d2d1;'
    },
    // Slide background gradient
    {
        regex: /background: linear-gradient\(135deg, #0f1923 0%, #1a2c39 100%\);/g,
        replacement: 'background: linear-gradient(135deg, #d5d2d1 0%, #f3f0ed 100%);'
    }
];

// Theme CSS to inject into head
const themeCSS = `
        /* HEB Studios Theme Colors */
        body { color: #2c2421 !important; background-color: #d5d2d1 !important; }
        
        /* Text colors */
        .text-purple-300 { color: #7d8ea0 !important; }
        .text-purple-400 { color: #627384 !important; }
        .text-indigo-300 { color: #7d8ea0 !important; }
        .text-indigo-400 { color: #627384 !important; }
        .text-blue-300 { color: #7d8ea0 !important; }
        .text-blue-400 { color: #627384 !important; }
        
        /* Base text color - using dark brown from HEB site */
        .text-white { color: #2c2421 !important; }
        
        /* Grey accents */
        .text-gray-300 { color: #d1d5db !important; }
        .text-gray-400 { color: #9ca3af !important; }
        .text-gray-500 { color: #6b7280 !important; }
        
        /* Border colors */
        .border-purple-800 { border-color: #4d5b6a !important; }
        .border-indigo-800 { border-color: #374250 !important; }
        .border-blue-800 { border-color: #374250 !important; }
        
        .border-purple-600 { border-color: #627384 !important; }
        .border-indigo-600 { border-color: #4d5b6a !important; }
        .border-blue-600 { border-color: #4d5b6a !important; }
        
        /* Background colors */
        .bg-purple-900, .bg-indigo-900, .bg-blue-900 { background-color: #374250 !important; }
        .bg-purple-800, .bg-indigo-800, .bg-blue-800 { background-color: #4d5b6a !important; }
        .bg-purple-700, .bg-indigo-700, .bg-blue-700 { background-color: #627384 !important; }
        
        /* Card backgrounds */
        .bg-white, .bg-gray-50 { background-color: #f3f0ed !important; }
        .bg-gray-100 { background-color: #f2efec !important; }
        
        /* Custom HEB colors */
        .heb-dark-blue { color: #374250 !important; }
        .heb-blue { color: #4d5b6a !important; }
        .heb-light-blue { color: #627384 !important; }
        .heb-off-white { color: #f3f0ed !important; }
        .heb-grey { color: #9ca3af !important; }
        .heb-background { color: #d5d2d1 !important; }
        .heb-dark-text { color: #2c2421 !important; }
`;

// Font links to inject
const fontLinks = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
`;

// Process each HTML file in the slides directory
fs.readdir(slidesDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter for HTML files
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        const filePath = path.join(slidesDir, file);
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
                return;
            }
            
            // Apply all replacements
            let updatedContent = data;
            replacements.forEach(({ regex, replacement }) => {
                updatedContent = updatedContent.replace(regex, replacement);
            });
            
            // Add theme CSS before closing style tag
            if (!updatedContent.includes('/* HEB Studios Theme Colors */')) {
                updatedContent = updatedContent.replace('</style>', `${themeCSS}\n    </style>`);
            } else {
                // Replace existing theme CSS
                const themeStartIndex = updatedContent.indexOf('/* HEB Studios Theme Colors */');
                const themeEndIndex = updatedContent.indexOf('</style>', themeStartIndex);
                if (themeStartIndex !== -1 && themeEndIndex !== -1) {
                    const beforeTheme = updatedContent.substring(0, themeStartIndex);
                    const afterTheme = updatedContent.substring(themeEndIndex);
                    updatedContent = beforeTheme + themeCSS + afterTheme;
                }
            }
            
            // Add font links after title
            if (!updatedContent.includes('fonts.googleapis.com/css2?family=Inter')) {
                updatedContent = updatedContent.replace('</title>', `</title>\n    ${fontLinks}`);
            }
            
            // Write the updated content back to the file
            fs.writeFile(filePath, updatedContent, 'utf8', err => {
                if (err) {
                    console.error(`Error writing to file ${file}:`, err);
                    return;
                }
                console.log(`✅ Updated ${file}`);
            });
        });
    });
}); 