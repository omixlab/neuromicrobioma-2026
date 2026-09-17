// NeuroMicrobioma 2026 - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile navbar if open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      }
    });
  });


});

// Copy PIX Key function
function copyPixKey() {
  const pixKey = '14.457.158/0001-08';
  navigator.clipboard.writeText(pixKey).then(() => {
    const toastEl = document.getElementById('pixToast');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    } else {
      alert('Chave PIX copiada com sucesso: ' + pixKey);
    }
  }).catch(err => {
    alert('Chave PIX: ' + pixKey);
  });
}
