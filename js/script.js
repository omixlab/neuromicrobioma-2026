// NeuroMicrobioma 2026 - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  // Close mobile navbar after choosing a link (smooth scrolling is handled in CSS)
  document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });

  // Navbar border once the page scrolls
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  setupDirections();

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  // Fade sections in as they enter the viewport
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Highlight the nav link of the section in view
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('section[id], footer[id]').forEach(section => sectionObserver.observe(section));
});

// Clicking the address opens a chooser of directions apps.
// All links are universal links: they open the app when installed, otherwise the website.
function setupDirections() {
  const address = document.getElementById('enderecoLink');
  if (!address) return;

  const { lat, lng, nome, endereco } = address.dataset;
  const urls = {
    google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    apple: `https://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent(nome)}`,
    waze: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
    uber: 'https://m.uber.com/ul/?action=setPickup&pickup=my_location' +
      `&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}` +
      `&dropoff[nickname]=${encodeURIComponent(nome)}` +
      `&dropoff[formatted_address]=${encodeURIComponent(endereco)}`
  };
  // Apple Maps only makes sense on Apple devices (iPadOS reports itself as a Mac)
  const isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);

  const sheetEl = document.getElementById('rotaSheet');
  const sheet = bootstrap.Offcanvas.getOrCreateInstance(sheetEl);
  sheetEl.querySelectorAll('[data-app]').forEach(option => {
    option.href = urls[option.dataset.app];
    if (option.dataset.app === 'apple') option.hidden = !isApple;
  });

  address.addEventListener('click', e => {
    e.preventDefault();
    sheet.show();
  });
  sheetEl.querySelectorAll('.sheet-option').forEach(option => {
    option.addEventListener('click', () => sheet.hide());
  });
}

// Copy PIX Key function
function copyPixKey() {
  const pixKey = document.getElementById('pixKey').textContent.trim();
  navigator.clipboard.writeText(pixKey).then(() => {
    bootstrap.Toast.getOrCreateInstance(document.getElementById('pixToast')).show();
  }).catch(() => {
    alert('Chave PIX: ' + pixKey);
  });
}
