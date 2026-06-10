// ─── NAVBAR SCROLL
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ─── HAMBURGER
const hambBtn = document.getElementById('hambBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (hambBtn && mobileMenu) {
  hambBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
}
if (mobileClose && mobileMenu) {
  mobileClose.addEventListener('click', closeMobile);
}
function closeMobile() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// ─── COUNTER ANIMATION
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString() + (target >= 1000 ? '+' : '+');
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// ─── SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── COUNTER TRIGGER
let countersDone = false;
const heroEl = document.getElementById('hero');
if (heroEl) {
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersDone) {
      countersDone = true;
      animateCounters();
    }
  }, { threshold: 0.3 });
  heroObserver.observe(heroEl);
}

// ─── GALLERY LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.dataset.img;
    if (img && lightbox && lightboxImg) {
      lightboxImg.src = img;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});
function closeLightbox(e) {
  if (!lightbox) return;
  if (e.target === lightbox || e.target.tagName !== 'IMG') {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ─── FAQ ACCORDION
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.faq-q').forEach(b => { b.classList.remove('open'); b.nextElementSibling.classList.remove('open'); });
    if (!isOpen) { btn.classList.add('open'); btn.nextElementSibling.classList.add('open'); }
  });
});

// ─── TESTIMONIAL SLIDER
const track = document.getElementById('testTrack');
const dots = document.querySelectorAll('.test-dot');
if (track && dots.length) {
  let testIdx = 0;
  const slideTo = (idx) => {
    const cards = track.querySelectorAll('.test-card');
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const visible = isMobile ? 1 : isTablet ? 2 : 3;
    const cardW = cards[0].offsetWidth + 24;
    testIdx = Math.max(0, Math.min(idx, cards.length - visible));
    track.style.transform = `translateX(-${testIdx * cardW}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === testIdx));
  };
  dots.forEach(dot => dot.addEventListener('click', () => slideTo(parseInt(dot.dataset.idx))));
  setInterval(() => slideTo((testIdx + 1) % dots.length), 5000);
  window.addEventListener('resize', () => slideTo(testIdx));
}

// ─── CONTACT FORM
function submitForm(btn) {
  const form = btn.closest('.contact-form');
  const inputs = form.querySelectorAll('input[required], input[type="email"]');
  let valid = true;
  inputs.forEach(i => { if (!i.value.trim()) { valid = false; i.style.borderColor = '#ef4444'; } else { i.style.borderColor = ''; } });
  if (!valid) return;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 1200);
}

// ─── NEWSLETTER
function subscribeNewsletter() {
  const email = document.getElementById('nlEmail').value;
  if (!email.includes('@')) { alert('Please enter a valid email address.'); return; }
  const btn = document.querySelector('#newsletter .btn-gold');
  btn.textContent = '✓ Subscribed!';
  btn.disabled = true;
  document.getElementById('nlEmail').value = '';
}

// ─── KEYBOARD ESCAPE FOR LIGHTBOX
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (lightbox) lightbox.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.hero-bg, .page-hero-bg').forEach(el => el.style.animation = 'none');
}
