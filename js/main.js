document.addEventListener('DOMContentLoaded', () => {
  // Copy buttons
  document.querySelectorAll('pre').forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    block.style.position = 'relative';
    block.appendChild(btn);
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
});
