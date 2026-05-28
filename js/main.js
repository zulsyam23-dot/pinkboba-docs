document.addEventListener('DOMContentLoaded', () => {
  // Copy buttons — wrap pre to keep button outside scroll area
  document.querySelectorAll('pre').forEach(block => {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    wrapper.appendChild(btn);

    btn.addEventListener('click', async () => {
      const code = block.querySelector('code') || block;
      try {
        await navigator.clipboard.writeText(code.textContent);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch {
        btn.textContent = 'Failed';
      }
    });
  });

  // Hamburger nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close nav on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Active docs nav
  const path = window.location.pathname;
  document.querySelectorAll('.docs-nav a').forEach(a => {
    if (path.endsWith(a.getAttribute('href'))) {
      a.classList.add('active');
    }
  });

  // Scroll progress bar
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);

  // Navbar scroll effect
  const nav = document.querySelector('nav');

  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = `${pct}%`;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // IntersectionObserver for fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.glass, .step, .feature-card, .section-title, .section-sub, .comp-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Sakura falling petals — once on page load
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    const petalCount = 18;
    const container = document.createElement('div');
    container.className = 'sakura-container';
    document.body.prepend(container);

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      const size = 8 + Math.random() * 10;
      petal.style.width = size + 'px';
      petal.style.height = (size * 1.15) + 'px';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (6 + Math.random() * 8) + 's';
      petal.style.animationDelay = (Math.random() * 5) + 's';
      container.appendChild(petal);
    }
  }
});
