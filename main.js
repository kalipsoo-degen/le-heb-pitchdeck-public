document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.slides-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const slideIndicator = document.getElementById('slideIndicator');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    const totalSlides = 15;
    let currentSlideIndex = 0;
    
    // Update total slides count
    totalSlidesEl.textContent = totalSlides;
    
    // Create slides using iframes
    createSlides();
    
    // Get all slide elements after creating them
    const slides = document.querySelectorAll('.slide-frame');
    
    // Create indicator dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('indicator-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        slideIndicator.appendChild(dot);
    }
    
    // Function to show a specific slide
    function goToSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show the current slide
        slides[index].classList.add('active');
        
        // Update the slide number
        currentSlideEl.textContent = index + 1;
        
        // Update indicator dots
        const dots = slideIndicator.querySelectorAll('.indicator-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentSlideIndex = index;
    }
    
    // Next slide
    function nextSlide() {
        let nextIndex = currentSlideIndex + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0; // Loop back to the first slide
        }
        goToSlide(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        let prevIndex = currentSlideIndex - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1; // Loop to the last slide
        }
        goToSlide(prevIndex);
    }
    
    // Function to create all slides using iframes
    function createSlides() {
        for (let i = 1; i <= totalSlides; i++) {
            // Create iframe element
            const iframe = document.createElement('iframe');
            iframe.src = `htmlslides/Slide${i}.html`;
            iframe.className = 'slide-frame';
            iframe.id = `slide${i}`;
            iframe.title = `Slide ${i}`;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('scrolling', 'no');
            
            // Make the first slide active
            if (i === 1) iframe.classList.add('active');
            
            // Add iframe to container
            slidesContainer.appendChild(iframe);
        }
    }
    
    // Event listeners for buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Fullscreen toggle
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        }
    });
    
    // Handle fullscreen change
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });
}); 