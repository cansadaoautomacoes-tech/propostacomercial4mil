/* ===================================================
   SCOPE AGENCY — JavaScript
   Scroll animations, counters, navbar, and interactivity
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- NAVBAR SCROLL ----------
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ---------- MOBILE MENU ----------
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- INTERSECTION OBSERVER — Fade In ----------
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // ---------- STAT COUNTER ANIMATION ----------
  const statValues = document.querySelectorAll('.stat-card__value[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = current.toLocaleString('pt-BR');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ---------- BAR FILL ANIMATION ----------
  const barFills = document.querySelectorAll('.stat-card__bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  barFills.forEach(el => barObserver.observe(el));

  // ---------- CHART BAR ANIMATION ----------
  const chartBars = document.querySelectorAll('.chart__bar');

  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger the bar animations
        const bars = entry.target.closest('.chart').querySelectorAll('.chart__bar');
        bars.forEach((bar, i) => {
          setTimeout(() => {
            bar.classList.add('animate');
          }, i * 120);
        });
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Only observe the first chart bar to trigger all
  if (chartBars.length > 0) {
    chartObserver.observe(chartBars[0]);
  }

  // ---------- SMOOTH SCROLL for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offsetTop = targetEl.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- PARALLAX GLOW EFFECT ----------
  const heroGlow = document.querySelector('.hero__glow');
  
  if (heroGlow) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      heroGlow.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
    }, { passive: true });
  }

  // ---------- MAGNETIC BUTTONS ----------
  document.querySelectorAll('.btn--glow').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ---------- TABLE ROW HIGHLIGHT ----------
  document.querySelectorAll('.premium-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.querySelectorAll('.col-new').forEach(cell => {
        cell.style.textShadow = '0 0 12px rgba(0, 230, 118, 0.4)';
      });
    });
    row.addEventListener('mouseleave', () => {
      row.querySelectorAll('.col-new').forEach(cell => {
        cell.style.textShadow = 'none';
      });
    });
  });

});
