document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.slides-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const slideIndicator = document.getElementById('slideIndicator');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const navControls = document.querySelector('.nav-controls');
    
    const totalSlides = 13;
    let currentSlideIndex = 0;
    let navTimeout;
    let isNavVisible = true;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    // Auto-hide navigation functionality
    function startNavHideTimer() {
        clearTimeout(navTimeout);
        
        // Make navigation visible
        if (!isNavVisible) {
            navControls.style.opacity = '1';
            navControls.style.pointerEvents = 'auto';
            fullscreenBtn.style.opacity = '1';
            fullscreenBtn.style.pointerEvents = 'auto';
            isNavVisible = true;
        }
        
        navTimeout = setTimeout(() => {
            navControls.style.opacity = '0';
            navControls.style.pointerEvents = 'none';
            fullscreenBtn.style.opacity = '0';
            fullscreenBtn.style.pointerEvents = 'none';
            isNavVisible = false;
        }, 3000);
    }
    
    // Initialize nav hide timer
    startNavHideTimer();
    
    // Track mouse position
    function updateMousePosition(e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        startNavHideTimer();
    }
    
    // Show nav on mouse events
    const showNavOnMouseActivity = (e) => {
        if (e) updateMousePosition(e);
        startNavHideTimer();
    };
    
    // Add multiple event listeners to increase reliability
    window.addEventListener('mousemove', showNavOnMouseActivity);
    window.addEventListener('mouseenter', showNavOnMouseActivity);
    document.body.addEventListener('mouseover', showNavOnMouseActivity);
    
    // Check for mouse position changes periodically
    let checkInterval = setInterval(() => {
        function handleMouseMove(e) {
            if (e.clientX !== lastMouseX || e.clientY !== lastMouseY) {
                updateMousePosition(e);
                window.removeEventListener('mousemove', handleMouseMove);
            }
        }
        window.addEventListener('mousemove', handleMouseMove);
        
        // Force navigation to show on hover over navigation area
        navControls.addEventListener('mouseenter', () => {
            if (!isNavVisible) {
                startNavHideTimer();
            }
        });
        
        fullscreenBtn.addEventListener('mouseenter', () => {
            if (!isNavVisible) {
                startNavHideTimer();
            }
        });
    }, 500);
    
    // Update total slides count
    totalSlidesEl.textContent = totalSlides;
    
    // Create slides using iframes
    createSlides();
    
    // Get all slide elements after creating them
    const slides = document.querySelectorAll('.slide-frame');
    
    // Add event listeners to each iframe when it loads
    slides.forEach(iframe => {
        iframe.addEventListener('load', () => {
            try {
                // Try to add event listener to iframe content
                const iframeContent = iframe.contentDocument || iframe.contentWindow.document;
                iframeContent.addEventListener('mousemove', showNavOnMouseActivity);
                iframeContent.addEventListener('mouseenter', showNavOnMouseActivity);
            } catch (e) {
                console.log('Could not add listeners to iframe:', e);
            }
        });
    });
    
    // Create indicator dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('indicator-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
            startNavHideTimer();
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
        startNavHideTimer();
    }
    
    // Previous slide
    function prevSlide() {
        let prevIndex = currentSlideIndex - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1; // Loop to the last slide
        }
        goToSlide(prevIndex);
        startNavHideTimer();
    }
    
    // Function to create all slides using iframes
    function createSlides() {
        // Define the order of slides
        const slideOrder = [1, 2, 9, 4, 5, 3, 6, 14, 12, 13, 10, 15, 16];
        
        // Define the titles for each slide
        const slideTitles = {
            1: "Introduction",
            2: "StudioOverview", 
            3: "MHSProd",
            4: "TheLegend",
            5: "Bananium",
            6: "MarketOpportunity",
            9: "BusinessModel",
            10: "FinancialProjections",
            12: "Team",
            13: "Roadmap",
            14: "Partnerships",
            15: "Investment",
            16: "Contact"
        };
        
        for (let i = 0; i < slideOrder.length; i++) {
            const slideNum = slideOrder[i];
            const slideTitle = slideTitles[slideNum];
            const slideIndex = (i + 1).toString().padStart(2, '0');
            
            // Create iframe element
            const iframe = document.createElement('iframe');
            iframe.src = `htmlslides/${slideIndex}_${slideTitle}.html`;
            iframe.className = 'slide-frame';
            iframe.id = `slide${slideNum}`;
            iframe.title = `Slide ${slideNum} - ${slideTitle}`;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('scrolling', 'no');
            
            // Make the first slide active
            if (slideNum === 1) iframe.classList.add('active');
            
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
        startNavHideTimer();
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
        startNavHideTimer();
    });
    
    // Handle fullscreen change
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
        startNavHideTimer();
    });
    
    // Clean up interval when page unloads
    window.addEventListener('beforeunload', () => {
        clearInterval(checkInterval);
    });
}); 