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
  setupCalendar();

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

// Event days for "Adicionar à agenda" (Brasília time, UTC−3).
// If these change, also update assets/neuromicrobioma-2026.ics and data/programacao.json.
const AGENDA = [
  { inicio: '2026-11-17T12:30:00-03:00', fim: '2026-11-17T17:30:00-03:00' },
  { inicio: '2026-11-18T09:00:00-03:00', fim: '2026-11-18T17:30:00-03:00' }
];

// Google Calendar takes one event per link, so each day gets its own option.
// The links are rebuilt whenever the sheet opens, in the current language.
function setupCalendar() {
  const sheetEl = document.getElementById('agendaSheet');
  const address = document.getElementById('enderecoLink');
  if (!sheetEl) return;

  const utc = iso => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, ''); // 20261117T153000Z
  const site = location.origin + location.pathname;
  const place = address ? `${address.dataset.nome}, ${address.dataset.endereco}` : '';

  sheetEl.addEventListener('show.bs.offcanvas', () => {
    const { t } = window.i18n;
    sheetEl.querySelectorAll('[data-agenda="google"]').forEach(option => {
      const n = Number(option.dataset.dia);
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: `${t('cal.evento', 'NeuroMicrobioma 2026 — Dia')} ${n + 1}`,
        dates: `${utc(AGENDA[n].inicio)}/${utc(AGENDA[n].fim)}`,
        details: `${t('cal.detalhes', '1º Simpósio sobre Microbioma, Eixo Intestino-Cérebro e Saúde Mental.\nProgramação:')} ${site}#programacao`,
        location: place
      });
      option.href = `https://calendar.google.com/calendar/render?${params}`;
    });
  });

  const sheet = bootstrap.Offcanvas.getOrCreateInstance(sheetEl);
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
