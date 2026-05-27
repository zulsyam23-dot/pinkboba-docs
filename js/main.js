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
});
