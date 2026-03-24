// ===================================
// BURGER MENU
// ===================================
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    burger.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
    });
  });
}

// ===================================
// NAVBAR SCROLL SHADOW
// ===================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
function revealOnScroll() {
  const elements = document.querySelectorAll(
    '.card, .tl-item, .tool-card, .tech-badge, .step, .ok-item, .stat-item, .about-card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered animation delay
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ===================================
// ACTIVE NAV LINK (highlight current page)
// ===================================
function setActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===================================
// COPY CODE BLOCKS
// ===================================
document.querySelectorAll('.codeblock').forEach(block => {
  const header = block.querySelector('.codeblock-header');
  if (!header) return;

  const copyBtn = document.createElement('button');
  copyBtn.textContent = 'Копировать';
  copyBtn.style.cssText = `
    font-size: 0.72rem;
    padding: 0.2rem 0.65rem;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.15);
    background: transparent;
    color: #8a92a8;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;
  `;

  copyBtn.addEventListener('mouseenter', () => {
    copyBtn.style.background = 'rgba(255,255,255,0.07)';
    copyBtn.style.color = '#e8eaf0';
  });
  copyBtn.addEventListener('mouseleave', () => {
    copyBtn.style.background = 'transparent';
    copyBtn.style.color = '#8a92a8';
  });

  copyBtn.addEventListener('click', () => {
    const code = block.querySelector('pre code');
    if (code) {
      navigator.clipboard.writeText(code.innerText).then(() => {
        copyBtn.textContent = '✓ Скопировано';
        copyBtn.style.color = '#38d9a9';
        setTimeout(() => {
          copyBtn.textContent = 'Копировать';
          copyBtn.style.color = '#8a92a8';
        }, 2000);
      });
    }
  });

  header.appendChild(copyBtn);
});

// ===================================
// COUNTER ANIMATION (stats strip)
// ===================================
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const isPlus = String(target).includes('+');
  const numTarget = parseInt(target);
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * numTarget) + (isPlus ? '+' : '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const val = el.dataset.target;
      animateCounter(el, val);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => {
  el.dataset.target = el.textContent;
  el.textContent = '0';
  statsObserver.observe(el);
});

// ===================================
// INIT
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  setActiveNav();
});
