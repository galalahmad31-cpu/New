(function () {
  const translations = {
    en: {
      'app.kicker':'Clinical Nutrition','app.name':'Nutrition Support Calculator','app.tagline':'A clinical workspace for nutrition assessment, planning and follow-up.',
      'auth.welcome':'Welcome','auth.loginTitle':'Sign in','auth.email':'Email','auth.password':'Password','auth.login':'Sign in','auth.createAccount':'Create account','auth.forgotPassword':'Forgot password?',
      'auth.createTitle':'Create account','auth.create':'Create account','auth.resetTitle':'Reset password','auth.sendReset':'Send reset link','auth.back':'Back to sign in','auth.security':'Your account and data are protected by Supabase Authentication and database security policies.'
    },
    ar: {
      'app.kicker':'التغذية العلاجية','app.name':'حاسبة الدعم الغذائي','app.tagline':'بيئة سريرية لتقييم الحالة الغذائية ووضع الخطط والمتابعة.',
      'auth.welcome':'مرحبًا','auth.loginTitle':'تسجيل الدخول','auth.email':'البريد الإلكتروني','auth.password':'كلمة المرور','auth.login':'تسجيل الدخول','auth.createAccount':'إنشاء حساب','auth.forgotPassword':'نسيت كلمة المرور؟',
      'auth.createTitle':'إنشاء حساب','auth.create':'إنشاء الحساب','auth.resetTitle':'استعادة كلمة المرور','auth.sendReset':'إرسال رابط الاستعادة','auth.back':'العودة لتسجيل الدخول','auth.security':'حسابك وبياناتك محمية بواسطة Supabase Authentication وسياسات أمان قاعدة البيانات.'
    }
  };

  let language = localStorage.getItem('nsc_language') || 'en';

  function applyLanguage(lang) {
    language = lang === 'ar' ? 'ar' : 'en';
    localStorage.setItem('nsc_language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[language][key]) el.textContent = translations[language][key];
    });
    const toggle = document.getElementById('languageToggle');
    if (toggle) {
      toggle.textContent = language === 'ar' ? 'EN' : 'ع';
      toggle.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    }
  }

  function showMessage(message, type = 'error') {
    const el = document.getElementById('authMessage');
    if (!el) return;
    el.textContent = message;
    el.className = `alert ${type}`;
  }

  function clearMessage() {
    const el = document.getElementById('authMessage');
    if (el) el.className = 'alert hidden';
  }

  function switchAuthForm(form) {
    ['loginForm', 'signupForm', 'resetForm'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('hidden', id !== form);
    });
    clearMessage();
  }

  function initAuthUI() {
    applyLanguage(language);
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
      e.preventDefault(); clearMessage();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      try {
        await window.NSCAuth.login(email, password);
        window.location.href = 'dashboard/dashboard.html';
      } catch (err) {
        showMessage(err.message || (language === 'ar' ? 'تعذر تسجيل الدخول.' : 'Unable to sign in.'));
      }
    });
    document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
      e.preventDefault(); clearMessage();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      try {
        const data = await window.NSCAuth.signUp(email, password);
        if (data.session) window.location.href = 'dashboard/dashboard.html';
        else showMessage(language === 'ar' ? 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد الحساب.' : 'Account created. Check your email to confirm your account.', 'success');
      } catch (err) {
        showMessage(err.message || (language === 'ar' ? 'تعذر إنشاء الحساب.' : 'Unable to create the account.'));
      }
    });
    document.getElementById('resetForm')?.addEventListener('submit', async (e) => {
      e.preventDefault(); clearMessage();
      const email = document.getElementById('resetEmail').value.trim();
      try {
        await window.NSCAuth.requestPasswordReset(email, `${window.location.origin}/index.html`);
        showMessage(language === 'ar' ? 'تم إرسال رابط استعادة كلمة المرور إلى بريدك.' : 'A password reset link has been sent to your email.', 'success');
      } catch (err) {
        showMessage(err.message || (language === 'ar' ? 'تعذر إرسال الرابط.' : 'Unable to send the reset link.'));
      }
    });
    document.getElementById('languageToggle')?.addEventListener('click', () => applyLanguage(language === 'en' ? 'ar' : 'en'));
    document.getElementById('showSignup')?.addEventListener('click', () => switchAuthForm('signupForm'));
    document.getElementById('showReset')?.addEventListener('click', () => switchAuthForm('resetForm'));
    document.getElementById('backToLoginFromSignup')?.addEventListener('click', () => switchAuthForm('loginForm'));
    document.getElementById('backToLoginFromReset')?.addEventListener('click', () => switchAuthForm('loginForm'));
  }

  window.NSCCommon = { applyLanguage, showMessage, clearMessage, switchAuthForm };
  document.addEventListener('DOMContentLoaded', initAuthUI);
})();
