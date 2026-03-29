// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile menu toggle =====
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Animated stat counters =====
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    stats.forEach(stat => {
        if (stat.dataset.animated) return;
        const target = parseInt(stat.dataset.target);
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            stat.textContent = Math.round(target * eased);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                stat.dataset.animated = 'true';
            }
        }
        requestAnimationFrame(update);
    });
}

// ===== Intersection Observer for scroll animations =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Problem cards
            if (entry.target.classList.contains('problem-card')) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }

            // Flow steps
            if (entry.target.classList.contains('flow-step')) {
                const index = Array.from(document.querySelectorAll('.flow-step')).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }

            // Chat messages
            if (entry.target.classList.contains('chat-mockup')) {
                const messages = entry.target.querySelectorAll('.chat-msg');
                messages.forEach((msg, i) => {
                    setTimeout(() => {
                        msg.classList.add('visible');
                    }, 300 + i * 400);
                });
            }

            // Stat counters
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.problem-card, .flow-step, .chat-mockup, .hero-stats').forEach(el => {
    observer.observe(el);
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        }
    });
});
