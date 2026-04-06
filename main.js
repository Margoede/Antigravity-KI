/* =============================================
   MAIN.JS – CFMOTO LANDING PAGE
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. NAVIGATION – scroll effect + burger menu
  // =============================================
  const navHeader = document.getElementById('main-nav');
  const burgerBtn = document.getElementById('burger-btn');
  const navLinks  = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    burgerBtn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    // animate burger spans
    const spans = burgerBtn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = burgerBtn.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });


  // =============================================
  // 2. HERO CAROUSEL
  // =============================================
  const slides     = document.querySelectorAll('.carousel-slide');
  const dots       = document.querySelectorAll('.dot');
  const prevBtn    = document.getElementById('carousel-prev');
  const nextBtn    = document.getElementById('carousel-next');
  let   current    = 0;
  let   autoTimer  = null;
  const AUTO_DELAY = 5500;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(nextSlide, AUTO_DELAY);
  }
  function stopAuto() {
    clearInterval(autoTimer);
  }

  nextBtn.addEventListener('click', () => { nextSlide(); startAuto(); });
  prevBtn.addEventListener('click', () => { prevSlide(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); startAuto(); });
  });

  // Pause on hover
  const carousel = document.getElementById('main-carousel');
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Touch/swipe support
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      startAuto();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { prevSlide(); startAuto(); }
    if (e.key === 'ArrowRight') { nextSlide(); startAuto(); }
  });

  startAuto();


  // =============================================
  // 3. INTERSECTION OBSERVER – fade-up animation
  // =============================================
  const fadeEls = document.querySelectorAll(
    '.offers-content > *, .dealer-content > *, .racing-content > *, ' +
    '.app-content > *, .stat-item, .tagline-text, .footer-brand, .footer-col'
  );

  fadeEls.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));


  // =============================================
  // 4. ANIMATED COUNTER – Stats Section
  // =============================================
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const prefix  = el.textContent.startsWith('+') ? '+' : '';
    const dur     = 2000; // ms
    const step    = 30;   // ms
    const steps   = dur / step;
    let   current = 0;
    const inc     = target / steps;

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + Math.round(current).toLocaleString('de-DE');
    }, step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));


  // =============================================
  // 5. SMOOTH ACTIVE NAV LINK on scroll
  // =============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.remove('active-link');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-link');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => sectionObserver.observe(s));


  // =============================================
  // 6. PARALLAX – tagline & bg text
  // =============================================
  const dealerBgText = document.querySelector('.dealer-bg-text');

  if (dealerBgText) {
    window.addEventListener('scroll', () => {
      const rect = dealerBgText.parentElement.getBoundingClientRect();
      const offset = rect.top * 0.2;
      dealerBgText.style.transform = `translateX(calc(-50% + ${offset}px))`;
    }, { passive: true });
  }

});
