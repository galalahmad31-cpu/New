const translations = {
  en: {
    appName: 'Nutrition Support Calculator',
    dashboard: 'Dashboard',
    patients: 'Patients',
    notifications: 'Notifications',
    library: 'Library',
    calculator: 'Quick Calculator',
    finances: 'Patient Finances',
    doctor: 'Doctor Profile',
    admin: 'Admin Dashboard',
    about: 'About'
  },
  ar: {
    appName: 'حاسبة الدعم التغذوي',
    dashboard: 'لوحة التحكم',
    patients: 'المرضى',
    notifications: 'التنبيهات',
    library: 'المكتبة',
    calculator: 'الحاسبة السريعة',
    finances: 'الشؤون المالية للمرضى',
    doctor: 'ملف الطبيب',
    admin: 'لوحة الإدارة',
    about: 'حول التطبيق'
  }
};

export function getLanguage() {
  return localStorage.getItem('nsc_language') || 'en';
}

export function setLanguage(language) {
  const lang = language === 'ar' ? 'ar' : 'en';
  localStorage.setItem('nsc_language', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
}

export function initLanguage() {
  setLanguage(getLanguage());
}
