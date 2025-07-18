document.addEventListener('DOMContentLoaded', () => {
  // === Scroll-to-Top Button ===
  const scrollBtn = document.createElement('button');
  scrollBtn.textContent = '↑';
  scrollBtn.id = 'scrollTopBtn';
  Object.assign(scrollBtn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    padding: '0.5rem 0.7rem',
    background: '#FDE4C3',
    color: '#E50914',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'none',
    zIndex: 999
  });
  document.body.appendChild(scrollBtn);
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === Scroll Progress Bar ===
  const updateScrollProgress = () => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrollTop / scrollHeight) * 100;
    bar.style.width = `${percent}%`;
  };
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    requestAnimationFrame(updateScrollProgress);
  });
  updateScrollProgress();

  // === Typing Effect (Hero) ===
  const typingEl = document.getElementById('typing');
  const roles = ['Web Developer 💻', 'Python Programmer 🐍', 'Cybersecurity Enthusiast 🔐'];
  let roleIndex = 0, charIndex = 0;
  function typeRole() {
    if (!typingEl) return;
    const role = roles[roleIndex];
    typingEl.textContent = role.slice(0, ++charIndex);
    if (charIndex <= role.length) setTimeout(typeRole, 90);
    else setTimeout(eraseRole, 1500);
  }
  function eraseRole() {
    const role = roles[roleIndex];
    typingEl.textContent = role.slice(0, --charIndex);
    if (charIndex > 0) setTimeout(eraseRole, 50);
    else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400);
    }
  }
  if (typingEl) typeRole();

  // === Welcome Capsule ===
  if (!localStorage.getItem('capsuleWelcomeShown')) {
    const welcome = document.createElement('div');
    welcome.className = 'capsule-welcome show';
    welcome.textContent = 'Welcome to my Portfolio';
    document.body.appendChild(welcome);
    setTimeout(() => welcome.classList.remove('show'), 1200);
    setTimeout(() => welcome.remove(), 2000);
    localStorage.setItem('capsuleWelcomeShown', 'true');
  }

  // === Skills Bar Animation ===
  const skillBars = document.querySelectorAll('.fill');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(fill => {
          const level = fill.dataset.level || fill.style.width;
          fill.style.width = '0';
          setTimeout(() => fill.style.width = level, 150);
        });
        skillObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  const skillSection = document.querySelector('.skills-section, .skills-container');
  if (skillSection) skillObserver.observe(skillSection);

  // === Scroll Reveal ===
  const revealEls = document.querySelectorAll('.scroll-fade, .flip-card');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.style.transition = 'all 0.6s ease';
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      } else {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(40px)';
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  // === Contact Form Toggle ===
  const contactBtn = document.getElementById('toggleFormBtn');
  const contactForm = document.getElementById('contactForm');
  if (contactBtn && contactForm) {
    contactBtn.addEventListener('click', () => {
      contactForm.classList.toggle('hidden-form');
      contactBtn.textContent = contactForm.classList.contains('hidden-form')
        ? '📝 Send a Message'
        : '❌ Hide Form';
    });
  }

  // === Certificate Modal Preview ===
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.close-modal');
  if (modal && modalImg && closeBtn) {
    document.querySelectorAll('.preview-image').forEach(img => {
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.classList.add('show');
      });
    });
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      modalImg.src = '';
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        modal.classList.remove('show');
        modalImg.src = '';
      }
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('show');
        modalImg.src = '';
      }
    });
  }

  // === Certificate Filtering ===
  const searchInput = document.getElementById('cert-search');
  const yearFilter = document.getElementById('cert-year');
  const issuerFilter = document.getElementById('cert-issuer');
  const certCards = document.querySelectorAll('.flip-card[data-year]');

  if (searchInput && yearFilter && issuerFilter && certCards.length) {
    const years = new Set();
    const issuers = new Set();

    certCards.forEach(card => {
      years.add(card.dataset.year);
      issuers.add(card.dataset.issuer);
    });

    [...years].sort().forEach(y => {
      yearFilter.innerHTML += `<option value="${y}">${y}</option>`;
    });
    [...issuers].sort().forEach(i => {
      issuerFilter.innerHTML += `<option value="${i}">${i}</option>`;
    });

    function filterCards() {
      const query = searchInput.value.toLowerCase();
      const year = yearFilter.value;
      const issuer = issuerFilter.value;

      certCards.forEach(card => {
        const nameMatch = card.dataset.name.toLowerCase().includes(query);
        const yearMatch = year === 'all' || card.dataset.year === year;
        const issuerMatch = issuer === 'all' || card.dataset.issuer === issuer;
        card.style.display = (nameMatch && yearMatch && issuerMatch) ? 'block' : 'none';
      });
    }

    searchInput.addEventListener('input', filterCards);
    yearFilter.addEventListener('change', filterCards);
    issuerFilter.addEventListener('change', filterCards);
  }

  // === Certificate Carousel ===
  initCertificateCarousel(3, 5000);
});

// === Dev Section Typing Effect ===
const devTypingEl = document.getElementById("devTyping");
const devLines = [
  "Building full-stack Projects...",
  "Designing responsive Web Pages...",
  "Cyber Based web applications...",
  "Python Programming..."
];
let devIndex = 0, devChar = 0;
function typeDev() {
  if (!devTypingEl) return;
  const line = devLines[devIndex];
  devTypingEl.textContent = line.slice(0, devChar++);
  if (devChar <= line.length) setTimeout(typeDev, 100);
  else setTimeout(() => eraseDev(), 1600);
}
function eraseDev() {
  const line = devLines[devIndex];
  devTypingEl.textContent = line.slice(0, --devChar);
  if (devChar > 0) setTimeout(eraseDev, 40);
  else {
    devIndex = (devIndex + 1) % devLines.length;
    setTimeout(typeDev, 400);
  }
}
if (devTypingEl) typeDev();

// === Certificate Carousel Logic ===
function initCertificateCarousel(limit = 3, interval = 5000) {
  const container = document.getElementById('certificate-carousel');
  const prevBtn = document.getElementById('cert-prev');
  const nextBtn = document.getElementById('cert-next');
  if (!container) return;

  const cards = Array.from(container.children).filter(el => el.classList.contains('flip-card'));
  if (cards.length <= limit) {
    cards.forEach(card => card.style.display = 'block');
    return;
  }

  let currentIndex = 0;
  let carouselInterval;

  const showCards = () => {
    cards.forEach((card, index) => {
      card.style.display = (index >= currentIndex && index < currentIndex + limit) ? 'block' : 'none';
    });
  };

  const next = () => {
    currentIndex = (currentIndex + limit) % cards.length;
    showCards();
  };

  const prev = () => {
    currentIndex -= limit;
    if (currentIndex < 0) {
      const remainder = cards.length % limit;
      currentIndex = remainder === 0 ? cards.length - limit : cards.length - remainder;
    }
    showCards();
  };

  const startAuto = () => { carouselInterval = setInterval(next, interval); };
  const stopAuto = () => { clearInterval(carouselInterval); };

  container.addEventListener('mouseenter', stopAuto);
  container.addEventListener('mouseleave', startAuto);
  nextBtn?.addEventListener('click', () => { stopAuto(); next(); });
  prevBtn?.addEventListener('click', () => { stopAuto(); prev(); });

  // Touch Support
  let touchStartX = 0;
  container.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
  container.addEventListener('touchend', e => {
    const deltaX = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      stopAuto();
      deltaX < 0 ? next() : prev();
    }
  });

  showCards();
  startAuto();
}
// === Glowing Animated Cursor ===
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  });
});
