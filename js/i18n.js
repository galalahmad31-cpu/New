const translations = {
  en: {
    // Brand
    app_name: 'Nutrition Support Calculator',
    app_tagline: 'Professional Clinical Nutrition Management',

    // Nav
    nav_dashboard: 'Dashboard',
    nav_patients: 'Patients',
    nav_notifications: 'Notifications',
    nav_library: 'Library',
    nav_quick_calc: 'Quick Calculator',
    nav_finances: 'Patient Finances',
    nav_profile: 'Doctor Profile',
    nav_admin: 'Admin Dashboard',
    nav_about: 'About',

    // Dashboard
    dashboard_title: 'Dashboard',
    dashboard_subtitle: 'Overview of your clinical practice',
    stat_total_patients: 'Total Patients',
    stat_active_patients: 'Active Patients',
    stat_follow_ups_week: 'Follow-ups This Week',
    stat_revenue_month: 'Revenue This Month',
    recent_patients: 'Recent Patients',
    upcoming_followups: 'Upcoming Follow-ups',
    view_all: 'View All',

    // Patients
    patients_title: 'Patients',
    patients_subtitle: 'Manage your patient records',
    btn_register_patient: 'Register Patient',
    search_placeholder: 'Search by name or medical ID...',
    filter_all: 'All',
    filter_current: 'Current',
    filter_discharged: 'Discharged',
    filter_department: 'All Departments',

    // Patient Form
    form_identification: 'Identification',
    form_patient_name: 'Patient Name',
    form_medical_id: 'Medical ID',
    form_birth_date: 'Birth Date',
    form_age: 'Age (years)',
    form_gender: 'Gender',
    form_male: 'Male',
    form_female: 'Female',
    form_admission_date: 'Admission Date & Time',
    form_department: 'Department',
    form_financial_tracking: 'Financial Tracking',
    form_sub_duration: 'Subscription Duration (months)',
    form_sub_start: 'Start Date',
    form_sub_end: 'End Date',
    form_price: 'Price',
    form_discount: 'Discount %',
    form_final_price: 'Final Price',
    form_payment_state: 'Payment State',
    form_paid: 'Paid',
    form_unpaid: 'Unpaid',
    form_followup_interval: 'Follow-up Interval',
    form_unit_days: 'Days',
    form_unit_weeks: 'Weeks',
    form_unit_months: 'Months',
    form_next_followup: 'Next Follow-up',
    btn_discard: 'Discard',
    btn_register: 'Register',

    // Common
    btn_save: 'Save',
    btn_cancel: 'Cancel',
    btn_edit: 'Edit',
    btn_delete: 'Delete',
    btn_close: 'Close',
    btn_confirm: 'Confirm',
    no_data: 'No data available',
    loading: 'Loading...',
  },

  ar: {
    app_name: 'حاسبة الدعم الغذائي',
    app_tagline: 'إدارة احترافية للتغذية العلاجية',

    nav_dashboard: 'الرئيسية',
    nav_patients: 'المرضى',
    nav_notifications: 'الإشعارات',
    nav_library: 'المكتبة',
    nav_quick_calc: 'حاسبة سريعة',
    nav_finances: 'ماليات المرضى',
    nav_profile: 'بيانات الطبيب',
    nav_admin: 'لوحة الإدارة',
    nav_about: 'عن التطبيق',

    dashboard_title: 'لوحة التحكم',
    dashboard_subtitle: 'نظرة عامة على ممارستك السريرية',
    stat_total_patients: 'إجمالي المرضى',
    stat_active_patients: 'المرضى النشطون',
    stat_follow_ups_week: 'متابعات هذا الأسبوع',
    stat_revenue_month: 'إيرادات الشهر',
    recent_patients: 'أحدث المرضى',
    upcoming_followups: 'المتابعات القادمة',
    view_all: 'عرض الكل',

    patients_title: 'المرضى',
    patients_subtitle: 'إدارة سجلات المرضى',
    btn_register_patient: 'تسجيل مريض',
    search_placeholder: 'ابحث بالاسم أو الرقم الطبي...',
    filter_all: 'الكل',
    filter_current: 'الحاليون',
    filter_discharged: 'الخارجون',
    filter_department: 'كل الأقسام',

    form_identification: 'البيانات الأساسية',
    form_patient_name: 'اسم المريض',
    form_medical_id: 'الرقم الطبي',
    form_birth_date: 'تاريخ الميلاد',
    form_age: 'العمر (سنة)',
    form_gender: 'النوع',
    form_male: 'ذكر',
    form_female: 'أنثى',
    form_admission_date: 'تاريخ ووقت الدخول',
    form_department: 'القسم',
    form_financial_tracking: 'التتبع المالي',
    form_sub_duration: 'مدة الاشتراك (شهر)',
    form_sub_start: 'تاريخ البداية',
    form_sub_end: 'تاريخ النهاية',
    form_price: 'السعر',
    form_discount: 'نسبة الخصم %',
    form_final_price: 'السعر النهائي',
    form_payment_state: 'حالة الدفع',
    form_paid: 'مدفوع',
    form_unpaid: 'غير مدفوع',
    form_followup_interval: 'فترة المتابعة',
    form_unit_days: 'أيام',
    form_unit_weeks: 'أسابيع',
    form_unit_months: 'أشهر',
    form_next_followup: 'الموعد التالي',
    btn_discard: 'إلغاء',
    btn_register: 'تسجيل',

    btn_save: 'حفظ',
    btn_cancel: 'إلغاء',
    btn_edit: 'تعديل',
    btn_delete: 'حذف',
    btn_close: 'إغلاق',
    btn_confirm: 'تأكيد',
    no_data: 'لا توجد بيانات',
    loading: 'جاري التحميل...',
  }
};

let currentLang = localStorage.getItem('app_lang') || 'en';

function t(key) {
  return translations[currentLang][key] || key;
}

function applyLanguage() {
  const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('lang', currentLang);
  document.documentElement.setAttribute('dir', dir);
  document.body.setAttribute('dir', dir);

  // تحديث كل العناصر التي لها data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // تحديث placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('app_lang', currentLang);
  applyLanguage();
  // إعادة بناء الـ Navbar ليظهر باللغة الجديدة
  if (typeof renderNavbar === 'function') renderNavbar();
}
