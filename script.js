const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Efecto flotante del logo: se aplica en CSS con keyframes para no cargar JS.

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('nav-open', isOpen);
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            siteNav.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Efecto hover de tarjetas y bloques visuales compartido en toda la web.
document.querySelectorAll([
    '.feature-card',
    '.info-card',
    '.lead-panel',
    '.copy-block',
    '.contact-panel',
    '.contact-form',
    '.event-card',
    '.timeline',
    '.gallery-strip img',
    '.gallery-grid img',
    '.image-stack img',
    '.image-frame img',
    '.cta-section',
    '.btn'
].join(',')).forEach((element) => {
    element.classList.add('lift-hover');
});

// Animación de títulos: divide los grandes titulares en letras con entradas alternas.
const animatedTitles = document.querySelectorAll('.page-hero-content h1, .section-heading h2, .cta-section h2');

if (!prefersReducedMotion) {
    const directions = [
        { x: '-18px', y: '0' },
        { x: '18px', y: '0' },
        { x: '0', y: '-18px' },
        { x: '0', y: '18px' }
    ];

    animatedTitles.forEach((title) => {
        const originalText = title.textContent.trim();

        title.setAttribute('aria-label', originalText);
        title.classList.add('title-animate');
        title.textContent = '';

        originalText.split(' ').forEach((word, wordIndex, words) => {
            const wordSpan = document.createElement('span');

            wordSpan.className = 'title-word';
            wordSpan.setAttribute('aria-hidden', 'true');

            Array.from(word).forEach((character) => {
                const span = document.createElement('span');
                const index = title.querySelectorAll('.title-letter').length;
                const direction = directions[index % directions.length];

                span.className = 'title-letter';
                span.textContent = character;
                span.style.setProperty('--i', index);
                span.style.setProperty('--from-x', direction.x);
                span.style.setProperty('--from-y', direction.y);
                wordSpan.appendChild(span);
            });

            title.appendChild(wordSpan);

            if (wordIndex < words.length - 1) {
                const space = document.createElement('span');

                space.className = 'title-space';
                space.setAttribute('aria-hidden', 'true');
                space.textContent = ' ';
                title.appendChild(space);
            }
        });
    });
} else {
    animatedTitles.forEach((title) => title.classList.add('title-visible'));
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    // Activación al hacer scroll: revela bloques y títulos cuando entran en pantalla.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));

    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('title-visible');
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    animatedTitles.forEach((title) => titleObserver.observe(title));
} else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
    animatedTitles.forEach((title) => title.classList.add('title-visible'));
}

document.querySelectorAll('.contact-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const note = form.querySelector('.form-note');

        if (note) {
            note.textContent = 'El formulario queda listo para conectarse a un backend.';
        }
    });
});
