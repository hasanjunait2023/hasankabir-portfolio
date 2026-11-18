const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-navigation');
const revealItems = document.querySelectorAll('[data-reveal]');
const yearNode = document.querySelector('[data-year]');
const projectForm = document.querySelector('#project-form');
const formStatus = document.querySelector('[data-form-status]');

if (yearNode) yearNode.textContent = new Date().getFullYear();

const syncHeader = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);
};

window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

if (menuToggle && header) {
  menuToggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) {
      header.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}

projectForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(projectForm);
  const subject = encodeURIComponent(`হাসান কবীরের সাথে ${data.get('topic')} আলোচনা`);
  const body = encodeURIComponent(`নাম: ${data.get('name')}\nইমেইল: ${data.get('email')}\nবিষয়: ${data.get('topic')}\n\nবার্তা:\n${data.get('message')}`);
  if (formStatus) formStatus.textContent = 'আপনার ইমেইল অ্যাপ খুলছে—বার্তাটি পাঠিয়ে দিন।';
  window.location.href = `mailto:hasankabir274733@gmail.com?subject=${subject}&body=${body}`;
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
