(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-navigation');
  if (toggle && nav) toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  const header = document.querySelector('.site-header');
  if (header) window.addEventListener('scroll', function () { header.classList.toggle('is-scrolled', window.scrollY > 20); }, { passive: true });
})();
