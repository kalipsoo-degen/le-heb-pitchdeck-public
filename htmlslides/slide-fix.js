// Script to ensure consistent slide styling and vertical centering

document.addEventListener('DOMContentLoaded', function() {
    // Update slide height and centering
    const slide = document.querySelector('.slide');
    if (slide) {
        // Update slide styling
        slide.style.height = '900px';
        slide.style.width = '100%';
        slide.style.maxWidth = '1600px';
        slide.style.margin = '0 auto';
        slide.style.display = 'flex';
        slide.style.flexDirection = 'column';
        slide.style.justifyContent = 'center';
        slide.style.alignItems = slide.classList.contains('items-start') ? 'flex-start' : 'center';
        slide.style.paddingTop = '60px';
        slide.style.paddingBottom = '40px';
        slide.style.boxSizing = 'border-box';
    }
    
    // Update content wrapper to ensure all content is visible
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.style.maxHeight = '820px';
        contentWrapper.style.overflow = 'visible';
        contentWrapper.style.paddingTop = '50px';
        contentWrapper.style.paddingBottom = '30px';
    }
    
    // Ensure absolute positioned elements are properly placed
    const headerElements = document.querySelectorAll('.absolute.top-6, [class*="absolute top"]');
    headerElements.forEach(el => {
        el.style.top = '30px';
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
    
    // Specifically target financial projections slide
    if (document.title.includes('Financial Projections')) {
        // Ensure the financial table headers are visible
        const tableHeaders = document.querySelectorAll('th');
        tableHeaders.forEach(header => {
            header.style.padding = '0.5rem 0.75rem';
        });
        
        // Adjust the overall slide position
        if (slide) {
            slide.style.paddingTop = '70px';
        }
        
        // Make sure the "12-MONTH REVENUE FORECAST" section is fully visible
        const revenueSection = document.querySelector('.bg-gray-900.card-glow');
        if (revenueSection) {
            revenueSection.style.marginTop = '20px';
        }
    }
}); 