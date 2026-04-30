/* ============================================================
   Kevin-Brandon J. Corbett — Portfolio v2
   ============================================================ */

(() => {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* --------------------------------------------------------
       Cycling typewriter — rotates through multiple roles
       -------------------------------------------------------- */
    const phrases = [
        "software, games, and AI.",
        "engineering and design.",
        "research and shipped product.",
        "code, story, and play.",
    ];

    const tw = document.querySelector(".typewriter");
    if (tw) {
        if (prefersReducedMotion) {
            tw.textContent = phrases[0];
            tw.style.borderRight = "none";
        } else {
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const typeSpeed = 60;
            const deleteSpeed = 32;
            const pauseAfterType = 1800;
            const pauseAfterDelete = 220;

            function tick() {
                const current = phrases[phraseIndex];

                if (!isDeleting) {
                    tw.textContent = current.slice(0, charIndex + 1);
                    charIndex++;
                    if (charIndex === current.length) {
                        isDeleting = true;
                        return setTimeout(tick, pauseAfterType);
                    }
                    return setTimeout(tick, typeSpeed);
                }

                tw.textContent = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    return setTimeout(tick, pauseAfterDelete);
                }
                return setTimeout(tick, deleteSpeed);
            }

            tick();
        }
    }

    /* --------------------------------------------------------
       Reveal-on-scroll
       -------------------------------------------------------- */
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            reveals.forEach(el => el.classList.add("visible"));
        } else {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Stagger siblings that share a parent for a nicer cascade
                        const siblings = Array.from(entry.target.parentElement?.querySelectorAll(".reveal") || []);
                        const indexInGroup = Math.max(0, siblings.indexOf(entry.target));
                        const delay = Math.min(indexInGroup * 80, 320);
                        entry.target.style.transitionDelay = `${delay}ms`;
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

            reveals.forEach(el => observer.observe(el));
        }
    }

    /* --------------------------------------------------------
       Sticky nav — add scrolled class
       -------------------------------------------------------- */
    const nav = document.getElementById("nav");
    if (nav) {
        const onScroll = () => {
            if (window.scrollY > 24) nav.classList.add("scrolled");
            else nav.classList.remove("scrolled");
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* --------------------------------------------------------
       Mobile nav toggle
       -------------------------------------------------------- */
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            navToggle.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        // Close menu when a link is tapped
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navToggle.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* --------------------------------------------------------
       Smooth scroll for in-page anchors
       Native CSS scroll-behavior handles this, but we also
       respect reduced-motion and offset for the fixed nav.
       -------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const offset = 64; // approx nav height
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });
        });
    });

    /* --------------------------------------------------------
       Contact form — graceful local handling
       (No backend; mails via mailto fallback or shows confirmation)
       -------------------------------------------------------- */
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();

            const name = form.querySelector("#name").value.trim();
            const email = form.querySelector("#email").value.trim();
            const message = form.querySelector("#message").value.trim();

            if (!name || !email || !message) {
                form.querySelector("button[type=submit]").animate(
                    [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
                    { duration: 320, easing: "ease-in-out" }
                );
                return;
            }

            // Hand off to user's mail client until a backend is wired.
            const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
            const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
            window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
        });
    }

})();
