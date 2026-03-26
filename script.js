// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

function getCurrentPageFile() {
    let f = window.location.pathname.split('/').pop();
    if (!f || f === '') {
        return 'index.html';
    }
    return f;
}

function setActiveNav() {
    const current = getCurrentPageFile();
    const pageToNav = {
        'index.html': 'about',
        'education.html': 'education',
        'research.html': 'research',
        'projects.html': 'projects',
        'skills.html': 'skills',
        'awards.html': 'awards',
        'publications.html': 'publications',
        'contact.html': 'contact'
    };
    const navKey = pageToNav[current] || 'about';
    document.querySelectorAll('.nav-link[data-nav]').forEach(link => {
        link.classList.toggle('active', link.dataset.nav === navKey);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
            requestAnimationFrame(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }
});

// Smooth in-page scrolling for hash links on the same HTML file
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || !href.includes('#')) {
            return;
        }
        const hashIdx = href.indexOf('#');
        const pathPart = href.slice(0, hashIdx);
        const hash = href.slice(hashIdx + 1);
        if (!hash) {
            return;
        }
        const linkFile = (!pathPart || pathPart === '') ? 'index.html' : pathPart.split('/').pop();
        const current = getCurrentPageFile();
        const samePage = linkFile === current;
        if (samePage) {
            const target = document.getElementById(hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) {
        return;
    }
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.education-card, .research-item, .skill-category, .award-card, .publication-item');

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
});

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
        font-weight: 600;
    }

    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #2563eb;
    }

    .nav-link {
        position: relative;
    }
`;
document.head.appendChild(style);

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 30);
        }, 1000);
    }
});

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = `
    <div class="preloader-content">
        <div class="spinner"></div>
        <p>Loading...</p>
    </div>
`;
preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
`;

const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    .preloader-content {
        text-align: center;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #2563eb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .preloader-content p {
        color: #2563eb;
        font-weight: 500;
    }
`;
document.head.appendChild(spinnerStyle);
document.body.appendChild(preloader);

window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.remove();
    }, 500);
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

console.log('%c Welcome to Taekyung Lee\'s Academic Website! ', 'background: #2563eb; color: white; padding: 10px; border-radius: 5px; font-size: 16px; font-weight: bold;');
console.log('Interested in multi-agent systems, optimal control, and risk-aware planning? Let\'s connect.');
console.log('Email: tlee2@caltech.edu');
console.log('LinkedIn: linkedin.com/in/taekyunglee04');
console.log('GitHub: github.com/tklee117');
