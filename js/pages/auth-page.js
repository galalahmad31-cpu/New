// إضافة ترجمات خاصة بصفحة الدخول
Object.assign(translations.en, {
  auth_login_title: 'Welcome Back',
  auth_login_subtitle: 'Sign in to continue to your dashboard',
  auth_register_title: 'Create Account',
  auth_register_subtitle: 'Join our clinical nutrition platform',
  auth_email: 'Email Address',
  auth_email_placeholder: 'doctor@example.com',
  auth_password: 'Password',
  auth_password_placeholder: '••••••••',
  auth_password_hint: 'Minimum 6 characters',
  auth_full_name: 'Full Name',
  auth_name_placeholder: 'Dr. John Smith',
  auth_specialty: 'Specialty',
  auth_specialty_placeholder: 'Clinical Nutritionist',
  auth_phone: 'Phone Number',
  auth_remember: 'Remember me',
  auth_forgot: 'Forgot password?',
  auth_sign_in: 'Sign In',
  auth_sign_up: 'Sign Up',
  auth_no_account: "Don't have an account?",
  auth_have_account: 'Already have an account?',
  auth_sign_in_link: 'Sign In',
  auth_create_account: 'Create Account',
});

Object.assign(translations.ar, {
  auth_login_title: 'مرحباً بعودتك',
  auth_login_subtitle: 'سجل دخولك للمتابعة إلى لوحة التحكم',
  auth_register_title: 'إنشاء حساب',
  auth_register_subtitle: 'انضم إلى منصة التغذية العلاجية',
  auth_email: 'البريد الإلكتروني',
  auth_email_placeholder: 'doctor@example.com',
  auth_password: 'كلمة المرور',
  auth_password_placeholder: '••••••••',
  auth_password_hint: '6 أحرف على الأقل',
  auth_full_name: 'الاسم الكامل',
  auth_name_placeholder: 'د. أحمد محمد',
  auth_specialty: 'التخصص',
  auth_specialty_placeholder: 'أخصائي تغذية علاجية',
  auth_phone: 'رقم الهاتف',
  auth_remember: 'تذكرني',
  auth_forgot: 'نسيت كلمة المرور؟',
  auth_sign_in: 'تسجيل الدخول',
  auth_sign_up: 'إنشاء حساب',
  auth_no_account: 'ليس لديك حساب؟',
  auth_have_account: 'لديك حساب بالفعل؟',
  auth_sign_in_link: 'تسجيل الدخول',
  auth_create_account: 'إنشاء الحساب',
});

// ============ Toggle Forms ============
function showLogin() {
  document.getElementById('login-card').classList.remove('hidden');
  document.getElementById('register-card').classList.add('hidden');
  clearAlerts();
}

function showRegister() {
  document.getElementById('register-card').classList.remove('hidden');
  document.getElementById('login-card').classList.add('hidden');
  clearAlerts();
}

function clearAlerts() {
  document.querySelectorAll('.alert').forEach(a => a.classList.add('hidden'));
}

function showAlert(id, message) {
  const el = document.getElementById(id);
  el.textContent = message;
  el.classList.remove('hidden');
}

// ============ Toggle Password Visibility ============
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// ============ Login Handler ============
async function handleLogin(event) {
  event.preventDefault();
  clearAlerts();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const btn = document.getElementById('login-btn');

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing in...';

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    // Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    localStorage.setItem('user_role', profile?.role || 'doctor');
    localStorage.setItem('user_name', profile?.full_name || data.user.email);

    // Redirect
    window.location.href = 'dashboard.html';
  } catch (err) {
    console.error(err);
    let msg = 'Invalid email or password';
    if (err.message.includes('Email not confirmed')) {
      msg = 'Please confirm your email first';
    }
    showAlert('login-error', msg);
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span data-i18n="auth_sign_in">${t('auth_sign_in')}</span> <i class="fa-solid fa-arrow-right"></i>`;
  }
}

// ============ Register Handler ============
async function handleRegister(event) {
  event.preventDefault();
  clearAlerts();

  const fullname = document.getElementById('reg-fullname').value.trim();
  const specialty = document.getElementById('reg-specialty').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const password = document.getElementById('reg-password').value;
  const btn = document.getElementById('register-btn');

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating...';

  try {
    // 1. Create Auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullname }
      }
    });

    if (authError) throw authError;

    // 2. Create profile (إذا لم يُنشأ تلقائياً)
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          full_name: fullname,
          specialty: specialty || null,
          phone: phone || null,
          role: 'doctor'
        });

      if (profileError) console.warn('Profile creation:', profileError);
    }

    showAlert('register-success', 'Account created! Please check your email to confirm, then sign in.');
    document.getElementById('register-form').reset();

    // Auto-switch to login after 3 seconds
    setTimeout(() => {
      showLogin();
      document.getElementById('login-email').value = email;
    }, 3000);

  } catch (err) {
    console.error(err);
    let msg = err.message || 'Registration failed';
    if (msg.includes('already')) msg = 'This email is already registered';
    showAlert('register-error', msg);
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span data-i18n="auth_create_account">${t('auth_create_account')}</span> <i class="fa-solid fa-user-plus"></i>`;
  }
}

// ============ Initialize ============
document.addEventListener('DOMContentLoaded', async () => {
  // انتظار تحميل Supabase
  const wait = setInterval(async () => {
    if (typeof window.supabase !== 'undefined' && !supabase) {
      initSupabase();
    }
    if (supabase) {
      clearInterval(wait);
      applyLanguage();

      // Update lang button text
      document.getElementById('lang-btn').textContent = 
        currentLang === 'en' ? 'العربية' : 'English';

      // Check if already logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        window.location.href = 'dashboard.html';
      }
    }
  }, 100);
});
