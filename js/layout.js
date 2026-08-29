const NAV_ITEMS = [
  { key: 'dashboard',        href: 'dashboard.html',        icon: 'fa-chart-line' },
  { key: 'patients',         href: 'patients.html',         icon: 'fa-user-injured' },
  { key: 'notifications',    href: 'notifications.html',    icon: 'fa-bell' },
  { key: 'library',          href: 'library.html',          icon: 'fa-book-medical' },
  { key: 'quick_calc',       href: 'quick-calculator.html', icon: 'fa-calculator' },
  { key: 'finances',         href: 'patient-finances.html', icon: 'fa-money-bill-wave' },
  { key: 'profile',          href: 'doctor-profile.html',   icon: 'fa-user-doctor' },
  { key: 'admin',            href: 'admin-dashboard.html',  icon: 'fa-user-shield', adminOnly: true },
  { key: 'about',            href: 'about.html',            icon: 'fa-circle-info' },
];

function renderHeader() {
  const header = document.getElementById('app-header');
  if (!header) return;

  header.innerHTML = `
    <div class="header-inner">
      <a href="dashboard.html" class="brand">
        <div class="brand-logo">
          <i class="fa-solid fa-heart-pulse"></i>
        </div>
        <span data-i18n="app_name">${t('app_name')}</span>
      </a>
      <div class="header-actions">
        <button class="lang-toggle" onclick="toggleLanguage()">
          ${currentLang === 'en' ? 'العربية' : 'English'}
        </button>
        <div class="user-chip" id="user-chip">
          <i class="fa-solid fa-circle-user"></i>
          <span id="user-name">...</span>
        </div>
        <button class="btn-icon" onclick="logout()" title="Logout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </div>
  `;
}

function renderNavbar() {
  const nav = document.getElementById('app-nav');
  if (!nav) return;

  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  const userRole = localStorage.getItem('user_role') || 'doctor';

  const links = NAV_ITEMS
    .filter(item => !item.adminOnly || userRole === 'admin')
    .map(item => {
      const active = currentPage === item.href ? 'active' : '';
      return `
        <a href="${item.href}" class="nav-link ${active}">
          <i class="fa-solid ${item.icon}"></i>
          <span data-i18n="nav_${item.key}">${t('nav_' + item.key)}</span>
        </a>
      `;
    }).join('');

  nav.innerHTML = `<div class="nav-inner">${links}</div>`;
}

function initLayout() {
  applyLanguage();
  renderHeader();
  renderNavbar();
}

// تشغيل تلقائي عند تحميل DOM
document.addEventListener('DOMContentLoaded', initLayout);
