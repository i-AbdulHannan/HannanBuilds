/* ============================================
   ABDUL HANNAN | Main JavaScript
   Premium Motion System · GSAP · Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Register GSAP plugins (must be inside DOMContentLoaded to ensure GSAP is loaded)
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ============================================
  // TOUCH DEVICE DETECTION
  // ============================================
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.body.classList.add('touch-device');
  }

  // ============================================
  // LOADING SCREEN — Hacking Terminal
  // ============================================
  const loadingScreen = document.querySelector('.loading-screen');
  const loadingMatrix = document.querySelector('.loading-matrix');
  const loadingBarFill = document.querySelector('.loading-bar-fill');
  const loadingPercent = document.querySelector('.loading-percent');
  const typedEls = document.querySelectorAll('.typed');
  const statusEls = document.querySelectorAll('.status');
  const accessLine = document.querySelector('.access-line');
  const accessText = document.querySelector('.access-text');
  const terminalLines = document.querySelectorAll('.terminal-line');

  // --- Matrix rain canvas ---
  let matrixInterval = null;
  function startMatrix(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const fontSize = 9;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1).map(() => Math.random() * 100);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() * 0.6 + 0.2;
        const isAccent = Math.random() > 0.9;
        ctx.fillStyle = isAccent ? `rgba(249, 87, 0, ${alpha})` : `rgba(3, 38, 252, ${alpha})`;
        ctx.font = fontSize + 'px monospace';
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    draw();
    matrixInterval = setInterval(draw, 40);
  }

  function stopMatrix() {
    if (matrixInterval) { clearInterval(matrixInterval); matrixInterval = null; }
  }

  // --- Typing effect ---
  function typeText(element, text, speed) {
    return new Promise(resolve => {
      element.textContent = '';
      let i = 0;
      const timer = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }

  // --- Init ---
  if (loadingScreen && loadingBarFill && typedEls.length && typeof gsap !== 'undefined') {
    const texts = ['Initializing kernel...', 'Loading AI modules...', 'Establishing secure tunnel...', 'Decrypting payload...'];
    const speeds = [22, 18, 25, 20];

    startMatrix(loadingMatrix);

    const loadingTl = gsap.timeline();

    loadingTl
      .set(terminalLines, { opacity: 0, y: 6 })
      .to(terminalLines, { opacity: 1, y: 0, duration: 0.3, stagger: 0.12, ease: 'power2.out' })
      .call(async () => {
        for (let i = 0; i < texts.length; i++) {
          await typeText(typedEls[i], texts[i], speeds[i]);
          if (statusEls[i]) {
            statusEls[i].style.opacity = '1';
            statusEls[i].textContent = '✓';
          }
          const pct = Math.round(((i + 1) / texts.length) * 100);
          if (loadingPercent) loadingPercent.textContent = pct + '%';
        }
        // ACCESS GRANTED
        if (accessLine && accessText) {
          accessLine.style.display = 'flex';
          accessText.textContent = 'ACCESS GRANTED';
          accessLine.style.opacity = '0';
          gsap.to(accessLine, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        }
        if (loadingPercent) loadingPercent.textContent = '100%';
      })
      .to(loadingBarFill, { width: '100%', duration: 0.3, ease: 'power1.out' }, '+=0.3')
      .call(() => { stopMatrix(); })
      .to(loadingScreen, { clipPath: 'circle(0% at 50% 50%)', duration: 0.9, ease: 'power4.inOut' }, '-=0.1')
      .set(loadingScreen, { display: 'none', clearProps: 'clipPath' });
  } else if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 2000);
  }

  // ============================================
  // CUSTOM CURSOR
  // ============================================
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing && !isTouchDevice && typeof gsap !== 'undefined') {
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let tickerActive = true;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
      if (!tickerActive) return;
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    });

    // Hover effects for interactive elements
    const hoverTargets = document.querySelectorAll(
      'a, button, .service-card, .project-card, .skill-category, .testimonial-card, .contact-link, .btn, .skill-item, .vision-tag'
    );

    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('hover');
        cursorDot.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('hover');
        cursorDot.classList.remove('hover');
      });
    });
  }

  // ============================================
  // SCROLL PROGRESS
  // ============================================
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ============================================
  // NAVIGATION
  // ============================================
  const nav = document.querySelector('.nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  if (menuToggle && mobileMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (isOpen) {
        setTimeout(() => mobileMenu.querySelector('a')?.focus(), 100);
      }
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMenu(false);
        menuToggle?.focus();
      }
    });
  }

  // ============================================
  // HERO PARTICLE SYSTEM
  // ============================================
  const heroParticles = document.querySelector('.hero-particles');
  if (heroParticles && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 2 + 1;
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${Math.random() * 0.5 + 0.1};
        animation: float ${Math.random() * 10 + 8}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      heroParticles.appendChild(particle);
    }
  }

  // ============================================
  // HERO ROTATING TEXT
  // ============================================
  const rotatingEl = document.querySelector('.hero-rotating');
  if (rotatingEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const phrases = [
      'An Engineer Who Turns Chaos Into Products',
      'Building Software With A Founder\'s Mindset',
      'From Business Problems To Scalable Systems',
      'Turning Ideas Into Products People Actually Use',
      'Designing Clarity In Complex Workflows',
      'Building The Future With SaaS And AI',
      'Product Thinking. Fast Execution. Real Outcomes.',
      'Engineering Products, Not Just Features'
    ];
    let currentIndex = 0;
    let rotateInterval;

    function rotateText() {
      if (typeof gsap === 'undefined') {
        currentIndex = (currentIndex + 1) % phrases.length;
        rotatingEl.textContent = phrases[currentIndex];
        return;
      }
      gsap.to(rotatingEl, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          currentIndex = (currentIndex + 1) % phrases.length;
          rotatingEl.textContent = phrases[currentIndex];
          gsap.fromTo(rotatingEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
        }
      });
    }

    rotateInterval = setInterval(rotateText, 4000);

    // Cleanup on page unload
    window.addEventListener('pagehide', () => {
      if (rotateInterval) clearInterval(rotateInterval);
    });
  }

  // ============================================
  // HERO GSAP REVEAL
  // ============================================
  if (typeof gsap !== 'undefined') {
    const heroTl = gsap.timeline({ delay: 1.4 });

    const heroElements = [
      { selector: '.hero-badge', from: { opacity: 0, y: 20 }, duration: 0.6, offset: undefined },
      { selector: '.hero-title', from: { opacity: 0, y: 40 }, duration: 0.8, offset: '-=0.3' },
      { selector: '.hero-subtitle', from: { opacity: 0, y: 30 }, duration: 0.6, offset: '-=0.4' },
      { selector: '.hero-subtitle-sm', from: { opacity: 0, y: 30 }, duration: 0.6, offset: '-=0.3' },
      { selector: '.hero-cta', from: { opacity: 0, y: 30 }, duration: 0.6, offset: '-=0.3' },
      { selector: '.hero-stats', from: { opacity: 0, y: 30 }, duration: 0.8, offset: '-=0.3' },
      { selector: '.hero-portrait-area', from: { opacity: 0, scale: 0.8 }, duration: 1, offset: '-=0.8' },
    ];

    // Set initial state at timeline position 0 to prevent flash between loading screen and animation
    heroElements.forEach(({ selector, from }) => {
      const el = document.querySelector(selector);
      if (el) gsap.set(el, from);
    });

    // Animate in using .to() with shared ease
    heroElements.forEach(({ selector, from, duration, offset }) => {
      const el = document.querySelector(selector);
      if (el) {
        const to = { duration, ease: 'power3.out' };
        Object.keys(from).forEach(k => { to[k] = (k === 'opacity' || k === 'scale') ? 1 : 0; });
        heroTl.to(el, to, offset || undefined);
      }
    });
  }

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  function setupCounters() {
    const stats = document.querySelectorAll('.hero-stat');
    const targets = ['100+', '30+', '3', '7+', '$600+'];

    stats.forEach((stat, index) => {
      const numEl = stat.querySelector('.hero-stat-number');
      if (!numEl || !targets[index] || typeof gsap === 'undefined') return;

      numEl.textContent = '0';

      ScrollTrigger.create({
        trigger: stat,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(numEl, {
            duration: 2,
            ease: 'power3.out',
            onUpdate: function () {
              const p = this.progress();
              numEl.textContent = p < 0.8 ? Math.round(p * 80) : targets[index];
            },
            onComplete: () => { numEl.textContent = targets[index]; }
          });
        },
        once: true
      });
    });
  }

  // ============================================
  // SCROLL REVEAL
  // ============================================
  function setupScrollReveals() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    reveals.forEach(el => {
      if (typeof ScrollTrigger === 'undefined') {
        el.classList.add('visible');
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('visible'),
        once: true
      });
    });
  }

  // ============================================
  // SERVICE CARDS STAGGER
  // ============================================
  function animateServiceCards() {
    const grid = document.querySelector('.services-grid');
    const cards = grid ? grid.querySelectorAll('.service-card') : [];
    if (typeof gsap === 'undefined') {
      cards.forEach(card => { card.style.opacity = '1'; card.style.transform = 'none'; });
      return;
    }
    if (!grid || !cards.length) return;

    // Clear stale inline styles from bFCache restores
    gsap.set(cards, { clearProps: 'all' });
    // Set initial hidden state
    gsap.set(cards, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: grid,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }
    });
  }

  // ============================================
  // TIMELINE ANIMATION
  // ============================================
  function animateTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    if (typeof gsap === 'undefined') {
      items.forEach(item => { item.style.opacity = '1'; item.style.transform = 'none'; });
      return;
    }
    if (!items.length) return;
    gsap.set(items, { clearProps: 'all', opacity: 0, y: 30 });
    items.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out'
          });
        },
        once: true
      });
    });
  }

  // ============================================
  // PROJECT CARDS ANIMATION
  // ============================================
  function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    if (typeof gsap === 'undefined') {
      cards.forEach(card => { card.style.opacity = '1'; card.style.transform = 'none'; });
      return;
    }
    if (!cards.length) return;
    gsap.set(cards, { clearProps: 'all' });
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
          });
        },
        once: true
      });
    });
  }

  // ============================================
  // PARALLAX ON SCROLL
  // ============================================
  function setupParallax() {
    const els = document.querySelectorAll('[data-parallax]');
    if (!els.length || typeof gsap === 'undefined') return;
    els.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      gsap.to(el, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  // ============================================
  // MAGNETIC BUTTONS
  // ============================================
  function setupMagneticButtons() {
    if (isTouchDevice || typeof gsap === 'undefined') return;
    const btns = document.querySelectorAll('.btn, .contact-link');
    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto'
        });
      });
    });
  }

  // ============================================
  // SECTION HEADER REVEAL
  // ============================================
  function animateSectionHeaders() {
    if (typeof gsap === 'undefined') return;
    document.querySelectorAll('.section-header').forEach(header => {
      const label = header.querySelector('.section-label');
      const title = header.querySelector('.section-title');
      const subtitle = header.querySelector('.section-subtitle');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true
        }
      });

      if (label) tl.from(label, { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' });
      if (title) tl.from(title, { opacity: 0, y: 25, duration: 0.6, ease: 'power3.out' }, '-=0.3');
      if (subtitle) tl.from(subtitle, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    });
  }

  // ============================================
  // HERO PORTRAIT MOUSE FOLLOW
  // ============================================
  function setupPortraitFollow() {
    const portrait = document.querySelector('.hero-portrait-area');
    const hero = document.querySelector('.hero');
    if (!portrait || !hero || isTouchDevice || typeof gsap === 'undefined') return;

    hero.addEventListener('mousemove', (e) => {
      const rect = portrait.getBoundingClientRect();
      const deltaX = (e.clientX - rect.left - rect.width / 2) * 0.02;
      const deltaY = (e.clientY - rect.top - rect.height / 2) * 0.02;

      gsap.to(portrait, {
        x: deltaX,
        y: deltaY,
        rotation: deltaX * 0.5,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  }

  // ============================================
  // FLOATING ELEMENTS ANIMATION
  // ============================================
  function animateFloatingElements() {
    const els = document.querySelectorAll('.floating-el');
    if (!els.length || typeof gsap === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    els.forEach((el, i) => {
      gsap.to(el, {
        y: -20 + (i * 5),
        duration: 3 + i * 0.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.3
      });
    });
  }

  // ============================================
  // INIT ALL
  // ============================================
  function init() {
    // Clear stale GSAP inline styles from bFCache restores
    if (typeof gsap !== 'undefined') {
      gsap.set('.service-card, .project-card, .timeline-item, [data-parallax], .section-header, .floating-el', { clearProps: 'all' });
    }
    setupScrollReveals();
    animateServiceCards();
    animateTimeline();
    animateProjectCards();
    setupParallax();
    setupMagneticButtons();
    animateSectionHeaders();
    setupPortraitFollow();
    animateFloatingElements();
    setupCounters();

    if (typeof ScrollTrigger !== 'undefined') {
      setTimeout(() => ScrollTrigger.refresh(), 500);
    }
  }

  init();

  if (typeof ScrollTrigger !== 'undefined') {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
    });
  }

});
