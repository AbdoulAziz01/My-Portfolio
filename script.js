// Navigation active state
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Skills animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
});

observer.observe(skillsSection);

// Form handling
document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message envoyé ! (Fonctionnalité à implémenter)');
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Typing animation
const typingText = document.querySelector('.typing-text');
const texts = ['Développeur Full Stack', 'Expert React', 'Créateur d\'expériences'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

typeWriter();