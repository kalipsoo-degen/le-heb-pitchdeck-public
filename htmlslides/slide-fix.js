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
    }
    
    // Update body styles
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
}); 