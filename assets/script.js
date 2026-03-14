// ============================================
// RIZE CREDIT UNION - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initTestimonialCarousel();
    initLoginState();
    initOpenAccountButtons();
    initFAQAccordion();
    initSmoothScroll();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('mainNav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = toggle.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Dropdown toggles on mobile
    const dropdowns = document.querySelectorAll('.has-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonialCarousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let autoRotateInterval;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoRotate();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoRotate();
    });
    
    // Auto-rotate every 5 seconds
    function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }
    
    startAutoRotate();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
    carousel.addEventListener('mouseleave', startAutoRotate);
}

// Login State Management
function initLoginState() {
    const isLoggedIn = localStorage.getItem('rizeLoggedIn') === 'true';
    const userName = localStorage.getItem('rizeUser') || 'Adienne Dawn LLC';
    
    // Update all user name displays
    const userNameElements = document.querySelectorAll('.user-name, #accountName, #dashboardUserName');
    userNameElements.forEach(el => {
        if (el) el.textContent = userName;
    });
    
    // Show/hide login button and user info
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    
    if (isLoggedIn) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userInfo) userInfo.classList.remove('hidden');
        
        // Show all user info elements across pages
        document.querySelectorAll('.user-info').forEach(el => {
            el.classList.remove('hidden');
        });
        document.querySelectorAll('#loginBtn').forEach(el => {
            el.classList.add('hidden');
        });
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userInfo) userInfo.classList.add('hidden');
    }
    
    // Logout functionality
    const logoutBtns = document.querySelectorAll('#logoutBtn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('rizeLoggedIn');
            localStorage.removeItem('rizeUser');
            alert('You have been logged out.');
            window.location.href = 'index.html';
        });
    });
    
    // Protect dashboard pages
    const protectedPages = ['dashboard.html', 'transaction-history.html', 'transfer.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Open Account Buttons (Simulated)
function initOpenAccountButtons() {
    const buttons = document.querySelectorAll('.open-account-btn');
    
    buttons.forEach(btn => {
        // Skip if it's a real link with href
        if (btn.getAttribute('href') && btn.getAttribute('href') !== '#') return;
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This is a local prototype – no real account opening available. In production, this would open the account opening application.');
        });
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Category filtering
    const catButtons = document.querySelectorAll('.faq-cat-btn');
    catButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.cat;
            
            // Update active button
            catButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            faqItems.forEach(item => {
                if (category === 'general' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation helper
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--danger)';
        } else {
            field.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(date));
}

// Debounce function for search/inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Console greeting
console.log('%cRize Credit Union', 'color: #003366; font-size: 24px; font-weight: bold;');
console.log('%cLocal Prototype Version', 'color: #9f2b7f; font-size: 14px;');
console.log('Demo credentials: adienne / dawn2026');
