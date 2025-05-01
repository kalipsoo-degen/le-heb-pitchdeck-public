// Script to ensure consistent slide styling and vertical centering

document.addEventListener('DOMContentLoaded', function() {
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
    window.addEventListener('resize', setConsistentDimensions);
}); 