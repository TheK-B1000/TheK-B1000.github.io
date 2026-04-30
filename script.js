// ===============================
// Portfolio Interaction Script
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    initTypewriter();
    initScrollAnimations();
    initSmoothScrolling();
    initNavbarScrollState();
});

// ===============================
// Typewriter Effect
// ===============================

function initTypewriter() {
    const typewriterElement = document.querySelector(".typewriter");

    if (!typewriterElement) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const taglines = [
        "Software Engineer",
        "Game Developer",
        "AI Developer",
        "Reinforcement Learning Researcher",
        "Mixed Reality Creator"
    ];

    if (prefersReducedMotion) {
        typewriterElement.textContent = "Software Engineer | Game Developer | AI Developer";
        return;
    }

    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 75;
    const deletingSpeed = 40;
    const pauseAfterTyping = 1400;
    const pauseAfterDeleting = 300;

    function type() {
        const currentTagline = taglines[taglineIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typewriterElement.textContent = currentTagline.substring(0, charIndex);

        let delay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentTagline.length) {
            delay = pauseAfterTyping;
            isDeleting = true;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            delay = pauseAfterDeleting;
        }

        setTimeout(type, delay);
    }

    type();
}

// ===============================
// Scroll Reveal Animations
// ===============================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        ".glass-card, .project-card"
    );

    if (!animatedElements.length) return;

    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===============================
// Smooth Scroll for Nav Links
// ===============================

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.pushState(null, "", targetId);
        });
    });
}

// ===============================
// Navbar Scroll State
// ===============================

function initNavbarScrollState() {
    const navbar = document.querySelector("nav");

    if (!navbar) return;

    let ticking = false;

    function updateNavbarState() {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbarState);
            ticking = true;
        }
    });

    updateNavbarState();
}
