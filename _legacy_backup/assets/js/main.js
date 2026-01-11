document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.main-nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // 3. Scroll Animation (Fade Up)
    const observerOptions = {
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Once visible, stop watching
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => fadeInObserver.observe(el));

    // 4. Hero Background Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 3 seconds
    setInterval(nextSlide, 3000);

    // 5. Process Section Scroll-Driven Animation
    const processSection = document.querySelector('.process-section');
    const processImages = document.querySelectorAll('.process-image');
    const stageNumber = document.getElementById('stage-number');
    const stageTitle = document.getElementById('stage-title');
    const timelineStages = document.querySelectorAll('.timeline-stage');

    const stageTitles = [
        'The Design Brief',
        'Concept Development',
        'Prototypes & Samples',
        'Tooling & Engineering',
        'Production & Quality',
        'Delivery Of Your Product ✓'
    ];

    const stageDurations = [
        '1 Hour',
        '3 Days (or less)',
        '1 Week (or less)',
        '6 Weeks (or less)',
        '7 Weeks (or less)',
        '8 Weeks (or less)'
    ];

    function updateProcessStage() {
        if (!processSection) return;

        const rect = processSection.getBoundingClientRect();
        const sectionHeight = processSection.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress through the section (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - viewportHeight)));

        // Determine which stage (0-5)
        const currentStage = Math.min(5, Math.floor(scrollProgress * 6));

        // Update active image
        processImages.forEach((img, index) => {
            if (index === currentStage) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });

        // Update stage info
        if (stageNumber && stageTitle) {
            stageNumber.textContent = `STAGE ${currentStage + 1}`;
            stageTitle.textContent = stageTitles[currentStage];

            // Update stage title color for stage 6
            if (currentStage === 5) {
                stageTitle.style.color = '#00D26A';
            } else {
                stageTitle.style.color = '#6B90FF';
            }
        }

        // Update duration
        const stageDuration = document.getElementById('stage-duration');
        if (stageDuration) {
            stageDuration.textContent = stageDurations[currentStage];
        }

        // Update timeline markers
        timelineStages.forEach((stage, index) => {
            if (index === currentStage) {
                stage.classList.add('active');
            } else {
                stage.classList.remove('active');
            }
        });
    }

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProcessStage();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial call
    updateProcessStage();
});
