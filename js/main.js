document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile nav toggle ──────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // ── Course filter tabs ─────────────────────────────────────
  const filterTabs = document.querySelectorAll('.filter-tab');
  const courseCards = document.querySelectorAll('.course-card');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      courseCards.forEach(card => {
        const match = filter === 'all' || card.dataset.subject === filter;
        card.style.display = match ? '' : 'none';
        if (match) {
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = '';
        }
      });
    });
  });

  // ── Progress bars on landing page ─────────────────────────
  if (typeof Progress !== 'undefined') {
    Progress.applyToCards();
  }

  // ── Smooth scroll for anchor links ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── Mark chapter done on page load if already visited ─────
  const body = document.body;
  if (body.dataset.course && body.dataset.chapter && typeof Progress !== 'undefined') {
    Progress.applyToChapterList(body.dataset.course);
  }

  // ── Animate numbers in hero ────────────────────────────────
  function animateCount(el, target, duration) {
    const start = Date.now();
    const update = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.floor(progress * target) + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }
  document.querySelectorAll('[data-count]').forEach(el => {
    animateCount(el, parseInt(el.dataset.count, 10), 1200);
  });
});
