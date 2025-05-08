// Script to ensure consistent slide styling and vertical centering

document.addEventListener('DOMContentLoaded', function() {
    // Apply HEB Studios theme colors
    const applyHEBTheme = () => {
        // HEB Studios color palette
        const colors = {
            darkBlue: '#0a2e50',
            blue: '#1d5b9e',
            lightBlue: '#3c91e6',
            lighterBlue: '#67a9eb',
            offWhite: '#f5f5f5',
            grey: '#9ca3af',
            lightGrey: '#d1d5db',
            darkGrey: '#6b7280'
        };
        
        // Update gradient text elements
        document.querySelectorAll('.gradient-text').forEach(el => {
            el.style.background = `linear-gradient(90deg, ${colors.lightBlue}, ${colors.blue}, ${colors.darkBlue})`;
            el.style.webkitBackgroundClip = 'text';
            el.style.backgroundClip = 'text';
            el.style.color = 'transparent';
        });
        
        // Update glow elements
        document.querySelectorAll('.glow').forEach(el => {
            el.style.textShadow = `0 0 15px rgba(60, 145, 230, 0.7)`;
        });
        
        // Update background pattern
        document.querySelectorAll('.bg-pattern').forEach(el => {
            el.style.backgroundImage = `
                radial-gradient(circle at 10% 20%, rgba(60, 145, 230, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 80% 70%, rgba(10, 46, 80, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 50% 50%, rgba(29, 91, 158, 0.05) 0%, transparent 50%)
            `;
        });
        
        // Update hexagons
        document.querySelectorAll('.hexagon').forEach(el => {
            el.style.background = `linear-gradient(135deg, rgba(29, 91, 158, 0.1) 0%, rgba(60, 145, 230, 0.05) 100%)`;
        });
        
        // Set base text color to off-white
        document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div').forEach(el => {
            // Skip elements with explicit gradient or other special classes
            if (!el.classList.contains('gradient-text') && 
                !el.classList.contains('text-gray-300') && 
                !el.classList.contains('text-gray-400') && 
                !el.classList.contains('text-gray-500') &&
                !el.className.includes('text-blue') &&
                !el.className.includes('text-purple') && 
                !el.className.includes('text-indigo')) {
                
                // Apply off-white color to regular text elements
                if (window.getComputedStyle(el).color === 'rgb(255, 255, 255)' || 
                    window.getComputedStyle(el).color === '#ffffff') {
                    el.style.color = colors.offWhite;
                }
            }
        });
        
        // Update border colors
        document.querySelectorAll('[class*="border-purple"], [class*="border-indigo"], [class*="border-blue"]').forEach(el => {
            // Replace purple/indigo/blue borders with the appropriate blue shades
            if(el.className.includes('border-purple')) {
                el.className = el.className.replace(/border-purple-\d+/g, 'border-blue-600');
            } else if(el.className.includes('border-indigo')) {
                el.className = el.className.replace(/border-indigo-\d+/g, 'border-blue-500');
            } else if(el.className.includes('border-blue')) {
                el.className = el.className.replace(/border-blue-\d+/g, 'border-blue-400');
            }
            
            // Set border colors directly to ensure they appear
            if(el.className.includes('border-blue-600')) {
                el.style.borderColor = colors.lightBlue;
            } else if(el.className.includes('border-blue-500')) {
                el.style.borderColor = colors.blue;
            } else if(el.className.includes('border-blue-400')) {
                el.style.borderColor = colors.darkBlue;
            }
        });
        
        // Update text colors
        document.querySelectorAll('[class*="text-purple"], [class*="text-indigo"]').forEach(el => {
            // Replace purple/indigo text with the appropriate blue shades
            if(el.className.includes('text-purple')) {
                el.className = el.className.replace(/text-purple-\d+/g, 'text-blue-400');
                el.style.color = colors.lightBlue;
            } else if(el.className.includes('text-indigo')) {
                el.className = el.className.replace(/text-indigo-\d+/g, 'text-blue-300');
                el.style.color = colors.lighterBlue;
            }
        });
        
        // Update icon colors
        document.querySelectorAll('.fas, .fa, .far').forEach(el => {
            if(el.className.includes('text-purple')) {
                el.style.color = colors.lightBlue;
            } else if(el.className.includes('text-indigo')) {
                el.style.color = colors.blue;
            } else if(el.className.includes('text-blue')) {
                el.style.color = colors.lightBlue;
            }
        });
        
        // Apply grey tones to elements that should be grey
        document.querySelectorAll('.text-gray-300').forEach(el => {
            el.style.color = colors.lightGrey;
        });
        
        document.querySelectorAll('.text-gray-400').forEach(el => {
            el.style.color = colors.grey;
        });
        
        document.querySelectorAll('.text-gray-500').forEach(el => {
            el.style.color = colors.darkGrey;
        });
    };
    
    // Update slide height and centering
    const slide = document.querySelector('.slide');
    if (slide) {
        // Update slide styling to match the example slide dimensions
        slide.style.width = '100%';
        slide.style.height = 'auto';
        slide.style.minHeight = '100vh';
        slide.style.maxWidth = '1760px';
        slide.style.margin = '0 auto';
        slide.style.display = 'flex';
        slide.style.flexDirection = 'column';
        slide.style.justifyContent = 'center';
        slide.style.alignItems = slide.classList.contains('items-start') ? 'flex-start' : 'center';
        slide.style.paddingTop = '40px';
        slide.style.paddingBottom = '40px';
        slide.style.boxSizing = 'border-box';
        slide.style.overflowY = 'visible';
        slide.style.aspectRatio = '16 / 9';
        
        // Update font
        document.body.style.fontFamily = "'Inter', 'Segoe UI', sans-serif";
        document.body.style.color = '#f5f5f5';
    }
    
    // Update content wrapper to ensure all content is visible and properly positioned
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.style.width = '100%';
        contentWrapper.style.maxWidth = '100%';
        contentWrapper.style.height = 'auto';
        contentWrapper.style.maxHeight = 'none';
        contentWrapper.style.overflow = 'visible';
        contentWrapper.style.paddingTop = '20px';
        contentWrapper.style.paddingBottom = '20px';
        contentWrapper.style.padding = '20px 40px';
        contentWrapper.style.boxSizing = 'border-box';
    }
    
    // Ensure absolute positioned elements are properly placed
    const headerElements = document.querySelectorAll('.absolute.top-6, [class*="absolute top"]');
    headerElements.forEach(el => {
        el.style.top = '20px';
    });
    
    // Update body styles
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.fontFamily = "'Inter', 'Segoe UI', sans-serif";
    document.body.style.color = '#f5f5f5';
    
    // Specific adjustments for different slide types
    if (document.title.includes('Financial Projections')) {
        // Ensure the financial table headers are visible
        const tableHeaders = document.querySelectorAll('th');
        tableHeaders.forEach(header => {
            header.style.padding = '0.5rem 0.75rem';
        });
    }
    
    // Force a consistent aspect ratio for all slides to match the example
    const setConsistentDimensions = () => {
        if (slide) {
            const viewportWidth = Math.min(window.innerWidth, 1760);
            const viewportHeight = window.innerHeight;
            
            // Calculate dimensions based on 16:9 aspect ratio while fitting in viewport
            let slideWidth, slideHeight;
            
            if (viewportWidth / viewportHeight > 16 / 9) {
                // If viewport is wider than 16:9, height is the constraint
                slideHeight = Math.min(viewportHeight, 990);
                slideWidth = slideHeight * (16 / 9);
            } else {
                // If viewport is narrower than 16:9, width is the constraint
                slideWidth = Math.min(viewportWidth, 1760);
                slideHeight = slideWidth * (9 / 16);
            }
            
            // Apply calculated dimensions
            slide.style.width = `${slideWidth}px`;
            slide.style.height = `${slideHeight}px`;
            slide.style.minHeight = `${slideHeight}px`;
            
            // Add extra check to ensure no scroll bars
            document.querySelectorAll('div, section, article').forEach(element => {
                element.style.maxHeight = 'none';
                element.style.overflow = 'visible';
            });
        }
    };
    
    // Apply dimensions immediately and on resize
    setConsistentDimensions();
    
    // Apply theme colors
    applyHEBTheme();
    
    // Add Inter font
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(fontLink);
    }
    
    window.addEventListener('resize', setConsistentDimensions);
}); 