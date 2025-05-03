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
        // Create an array of slide information with correct ordering
        const slides = [
            { number: 1, file: "01_Introduction.html", title: "Introduction" },
            { number: 2, file: "02_StudioOverview.html", title: "Studio Overview" },
            { number: 3, file: "03_InvestmentOpportunity.html", title: "Investment Opportunity" },
            { number: 4, file: "04_TheLegend.html", title: "The Legend" },
            { number: 5, file: "05_Bananium.html", title: "Bananium" },
            { number: 6, file: "06_MHSProd.html", title: "MHSProd" },
            { number: 7, file: "07_MarketOpportunity.html", title: "Market Opportunity" },
            { number: 8, file: "08_Partnerships.html", title: "Partnerships" },
            { number: 9, file: "09_BillionDollarJourney.html", title: "Billion Dollar Journey" },
            { number: 10, file: "10_RiskAssessment.html", title: "Risk Assessment" },
            { number: 11, file: "11_CompetitiveLandscape.html", title: "Competitive Landscape" },
            { number: 12, file: "12_FinancialProjections.html", title: "Financial Projections" },
            { number: 13, file: "13_Contact.html", title: "Contact" }
        ];
        
        // Create slides in the specified order
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            
            // Create iframe element
            const iframe = document.createElement('iframe');
            iframe.src = `htmlslides/${slide.file}`;
            iframe.className = 'slide-frame';
            iframe.id = `slide${i + 1}`;
            iframe.title = `Slide ${slide.number} - ${slide.title}`;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('scrolling', 'no');
            iframe.setAttribute('allowfullscreen', 'true');
            
            // Make the first slide active
            if (i === 0) iframe.classList.add('active');
            
            // Add to container
            slidesContainer.appendChild(iframe);
            
            // Add event listener to ensure content is centered when loaded
            iframe.onload = function() {
                try {
                    // Access iframe document if possible
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    
                    // Add event listener to iframe content
                    iframeDoc.addEventListener('mousemove', showNavOnMouseActivity);
                    
                    // Inject slide-fix.js script to ensure consistent styling
                    const script = iframeDoc.createElement('script');
                    script.src = '/htmlslides/slide-fix.js';
                    iframeDoc.head.appendChild(script);
                    
                    // Make sure slide content is centered
                    const slideContent = iframeDoc.querySelector('.slide');
                    if (slideContent) {
                        slideContent.style.display = 'flex';
                        slideContent.style.flexDirection = 'column';
                        slideContent.style.alignItems = 'center';
                        slideContent.style.justifyContent = 'center';
                        slideContent.style.width = '100%';
                        slideContent.style.height = 'auto';
                        slideContent.style.minHeight = '100vh';
                        slideContent.style.maxWidth = '1760px';
                        slideContent.style.margin = '0 auto';
                        slideContent.style.boxSizing = 'border-box';
                        slideContent.style.paddingTop = '40px';
                        slideContent.style.paddingBottom = '40px';
                        slideContent.style.overflowY = 'visible';
                        slideContent.style.aspectRatio = '16 / 9';
                    }
                    
                    // Ensure content wrapper is properly styled
                    const contentWrapper = iframeDoc.querySelector('.content-wrapper');
                    if (contentWrapper) {
                        contentWrapper.style.width = '100%';
                        contentWrapper.style.maxWidth = '100%';
                        contentWrapper.style.margin = '0 auto';
                        contentWrapper.style.padding = '20px 40px';
                        contentWrapper.style.boxSizing = 'border-box';
                        contentWrapper.style.overflowX = 'hidden';
                        contentWrapper.style.overflowY = 'visible';
                        contentWrapper.style.maxHeight = 'none';
                        contentWrapper.style.height = 'auto';
                    }
                    
                    // Make sure header elements are properly positioned
                    const headerElements = iframeDoc.querySelectorAll('.absolute.top-6, [class*="absolute top"]');
                    headerElements.forEach(el => {
                        el.style.top = '20px';
                    });
                    
                    // Function to set consistent dimensions based on 16:9 aspect ratio
                    function setConsistentDimensions() {
                        if (slideContent) {
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
                            slideContent.style.width = `${slideWidth}px`;
                            slideContent.style.height = `${slideHeight}px`;
                            slideContent.style.minHeight = `${slideHeight}px`;
                            
                            // Update iframe height to match
                            iframe.style.width = `${slideWidth}px`;
                            iframe.style.height = `${slideHeight}px`;
                            iframe.style.minHeight = `${slideHeight}px`;
                            
                            // Ensure no scroll bars
                            const allElements = iframeDoc.querySelectorAll('div, section, article');
                            allElements.forEach(element => {
                                element.style.maxHeight = 'none';
                                element.style.overflow = 'visible';
                            });
                        }
                    }
                    
                    // Set dimensions immediately and on resize
                    setConsistentDimensions();
                    window.addEventListener('resize', setConsistentDimensions);
                } catch (e) {
                    console.log('Could not access iframe content:', e);
                }
            };
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