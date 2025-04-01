// Typewriter Effect
const tagline = "Software Engineer | Game Developer | Visionary";
const taglineElement = document.querySelector(".typewriter");
let i = 0;

function typeWriter() {
    if (i < tagline.length) {
        taglineElement.textContent += tagline.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
    } else {
        setTimeout(() => {
            taglineElement.textContent = "";
            i = 0;
            typeWriter();
        }, 2000);
    }
}
typeWriter();

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".glass-card, .project-card").forEach(el => observer.observe(el));

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Add scrolled class to nav on scroll
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});
