// حساب العمر من تاريخ الميلاد
function calculateAge(birthDate) {
  if (!birthDate) return '';
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

// حساب تاريخ الانتهاء
function calculateEndDate(startDate, months) {
  if (!startDate || !months) return '';
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + parseInt(months));
  return date.toISOString().split('T')[0];
}

// حساب السعر النهائي بعد الخصم
function calculateFinalPrice(price, discount) {
  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  return (p - (p * d / 100)).toFixed(2);
}

// حساب موعد المتابعة التالي
function calculateNextFollowUp(startDate, interval, unit) {
  if (!startDate || !interval) return '';
  const date = new Date(startDate);
  const n = parseInt(interval);
  if (unit === 'days')   date.setDate(date.getDate() + n);
  if (unit === 'weeks')  date.setDate(date.getDate() + n * 7);
  if (unit === 'months') date.setMonth(date.getMonth() + n);
  return date.toISOString().split('T')[0];
}

// حساب BMI
function calculateBMI(weight, heightCm) {
  const w = parseFloat(weight);
  const h = parseFloat(heightCm) / 100;
  if (!w || !h) return '';
  return (w / (h * h)).toFixed(1);
}

// تنسيق التاريخ
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

// تنسيق العملة
function formatCurrency(amount) {
  const n = parseFloat(amount) || 0;
  return n.toLocaleString(currentLang === 'ar' ? 'ar-EG' : 'en-US', {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  });
}

// Modal helpers
function openModal(id) {
  document.getElementById(id)?.classList.add('active');
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('active');
}

// Dropdown (3 dots)
function setupDropdowns() {
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-dropdown-toggle]');
    if (toggle) {
      e.stopPropagation();
      const dd = toggle.closest('.dropdown');
      document.querySelectorAll('.dropdown.open').forEach(d => {
        if (d !== dd) d.classList.remove('open');
      });
      dd.classList.toggle('open');
      return;
    }
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  });
}
document.addEventListener('DOMContentLoaded', setupDropdowns);
