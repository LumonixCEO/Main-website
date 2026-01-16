// API Base URL - Update this to your backend URL in production
const API_BASE_URL = 'http://localhost:5000/api';

// Floating cards animation
function initFloatingCards() {
  const scene = document.getElementById('floating-scene');
  if (!scene) return;

  const cards = scene.querySelectorAll('.floating-card');
  
  function animateCards() {
    cards.forEach((card, index) => {
      const time = Date.now() * 0.001;
      const offset = index * 0.5;
      
      const x = Math.sin(time + offset) * 30;
      const y = Math.cos(time + offset * 1.2) * 20;
      const rotateX = Math.sin(time + offset) * 10;
      const rotateY = Math.cos(time + offset * 0.8) * 15;
      
      card.style.transform = `
        translate3d(${x}px, ${y}px, 0) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `;
    });
    
    requestAnimationFrame(animateCards);
  }
  
  animateCards();
}

// Create background particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    particle.style.animationDuration = `${2 + Math.random() * 3}s`;
    particlesContainer.appendChild(particle);
  }
}

// Toast notification system
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `px-4 py-3 rounded-md shadow-lg ${
    type === 'success' 
      ? 'bg-green-500 text-white' 
      : 'bg-red-500 text-white'
  }`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Newsletter subscription
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput.value.trim();
    const submitButton = form.querySelector('button[type="submit"]');

    if (!email) {
      showToast('Please enter your email address', 'error');
      return;
    }

    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';

    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(data.message || 'Successfully subscribed to newsletter!');
        emailInput.value = '';
      } else {
        showToast(data.message || 'Failed to subscribe. Please try again.', 'error');
      }
    } catch (error) {
      showToast('Unable to connect to server. Please check your connection or contact support.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// Contact form submission
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = {
      name: document.getElementById('contact-name').value.trim(),
      email: document.getElementById('contact-email').value.trim(),
      message: document.getElementById('contact-message').value.trim(),
    };

    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(data.message || "Message sent successfully! We'll get back to you soon.");
        form.reset();
      } else {
        showToast(data.message || 'Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      showToast('Unable to connect to server. Please check your connection or contact support.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// Support form submission
function initSupportForm() {
  const form = document.getElementById('support-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = {
      name: document.getElementById('support-name').value.trim(),
      email: document.getElementById('support-email').value.trim(),
      subject: document.getElementById('support-subject').value.trim(),
      message: document.getElementById('support-message').value.trim(),
      priority: document.getElementById('support-priority').value || 'medium',
    };

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
      const response = await fetch(`${API_BASE_URL}/support/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const ticketId = data.data?.ticketId || data.ticketId || '';
        showToast(`${data.message || 'Support ticket created successfully!'} ${ticketId ? `Ticket ID: ${ticketId}` : ''}`);
        form.reset();
      } else {
        showToast(data.message || 'Failed to create support ticket. Please try again.', 'error');
      }
    } catch (error) {
      showToast('Unable to connect to server. Please check your connection or contact support.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('hidden');
      nav.classList.toggle('md:flex');
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#docs') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initFloatingCards();
  createParticles();
  initNewsletterForm();
  initContactForm();
  initSupportForm();
  initMobileMenu();
  initSmoothScroll();
});
