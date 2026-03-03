/* ============================================
   SPAH - Spa Parties at Home
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initTabs();
  initFAQ();
  initSmoothScroll();
});

/* --- Sticky Navbar --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');
  if (!hamburger || !navLinks) return;

  const toggle = (open) => {
    const isOpen = typeof open === 'boolean' ? open : !navLinks.classList.contains('open');
    hamburger.classList.toggle('active', isOpen);
    navLinks.classList.toggle('open', isOpen);
    if (overlay) overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => toggle());
  if (overlay) overlay.addEventListener('click', () => toggle(false));

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });
}

/* --- Scroll Reveal Animations --- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --- Tab Switching --- */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      const container = btn.closest('.tabs-container') || document;

      // Sync ALL tab buttons in the container (top and bottom sets)
      container.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === target);
      });
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      const panel = container.querySelector(`#${target}`);
      if (panel) panel.classList.add('active');

      // If clicked from bottom tabs, scroll up to content
      const firstTabs = container.querySelector('.tabs');
      if (firstTabs && btn.closest('.tabs') !== firstTabs) {
        const offset = document.querySelector('.navbar')?.offsetHeight || 80;
        const top = firstTabs.getBoundingClientRect().top + window.scrollY - offset - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* --- FAQ Accordion --- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
      answer.style.maxHeight = isActive ? '0' : answer.scrollHeight + 'px';
    });
  });
}

/* --- Smooth Scroll for anchor links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const offset = document.querySelector('.navbar')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
