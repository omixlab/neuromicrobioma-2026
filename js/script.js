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

  // Toggle Abstract Fields in Modal based on participation mode
  const modalModalidade = document.getElementById('modalModalidade');
  const abstractFieldsSection = document.getElementById('abstractFieldsSection');
  const modalCategoria = document.getElementById('modalCategoria');
  const pitchNotice = document.getElementById('pitchNotice');

  if (modalModalidade && abstractFieldsSection) {
    modalModalidade.addEventListener('change', function () {
      if (this.value === 'trabalho') {
        abstractFieldsSection.classList.remove('d-none');
      } else {
        abstractFieldsSection.classList.add('d-none');
      }
    });
  }

  if (modalCategoria && pitchNotice) {
    modalCategoria.addEventListener('change', function () {
      if (this.value === 'pos') {
        pitchNotice.classList.remove('d-none');
      } else {
        pitchNotice.classList.add('d-none');
      }
    });
  }

  // Registration Form Submission Simulation
  const registrationForm = document.getElementById('registrationForm');
  const registrationSuccessAlert = document.getElementById('registrationSuccessAlert');

  if (registrationForm) {
    registrationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Basic check
      if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
      }

      // Hide form and show success message
      registrationForm.style.display = 'none';
      if (registrationSuccessAlert) {
        registrationSuccessAlert.classList.remove('d-none');
      }
    });
  }
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
