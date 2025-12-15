// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);
themeToggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
});
function updateThemeIcon(theme) {
  // Update all theme-toggle buttons (main + any cloned mobile ones)
  const sunPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
  const moonPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
  const svgHtml = theme === 'dark' ? sunPath : moonPath;
  document.querySelectorAll('.theme-toggle svg').forEach(icon => {
    if (icon) icon.innerHTML = svgHtml;
  });
}
// Mobile Menu Toggle (create mobile menu if missing and toggle)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
let mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn) {
  const header = document.querySelector('header');
  const nav = header ? header.querySelector('nav') : null;
  if (!mobileMenu && header && nav) {
    mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobileMenu';
    mobileMenu.className = 'mobile-menu hidden';
    const ul = nav.querySelector('ul');
    if (ul) {
      const cloned = ul.cloneNode(true);
      // remove duplicate ids inside cloned menu to avoid ID conflicts
      cloned.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      mobileMenu.appendChild(cloned);
    }
    header.appendChild(mobileMenu);
    // wire mobile theme button (if cloned nav contains a theme-toggle)
    const mobileThemeBtn = mobileMenu.querySelector('.theme-toggle');
    if (mobileThemeBtn) {
      mobileThemeBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        // delegate to main theme toggle so state stays consistent
        if (themeToggle) themeToggle.click();
      });
    }
  }

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileMenu) mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu) return;
    if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && e.target !== mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  });
}
// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    contactForm.reset();
  });
}
// Blog Search and Filter
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const postsContainer = document.getElementById('postsContainer');
if (searchInput && categoryFilter && postsContainer) {
  const allPosts = Array.from(postsContainer.querySelectorAll('.post-card'));
  
  function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    allPosts.forEach(post => {
      const title = post.querySelector('h3').textContent.toLowerCase();
      const category = post.dataset.category;
      
      const matchesSearch = title.includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      
      if (matchesSearch && matchesCategory) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  }
  
  searchInput.addEventListener('input', filterPosts);
  categoryFilter.addEventListener('change', filterPosts);
}
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

