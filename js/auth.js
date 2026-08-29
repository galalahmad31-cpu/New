async function getCurrentUser() {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

async function loadUserProfile() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile) {
    localStorage.setItem('user_role', profile.role || 'doctor');
    localStorage.setItem('user_name', profile.full_name || user.email);
    const chip = document.getElementById('user-name');
    if (chip) chip.textContent = profile.full_name || user.email;
  }

  return profile;
}

async function logout() {
  if (!supabase) return;
  await supabase.auth.signOut();
  localStorage.clear();
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  // تأكد من تحميل SDK قبل التحقق
  const checkAuth = setInterval(async () => {
    if (typeof window.supabase !== 'undefined' && !supabase) {
      initSupabase();
    }
    if (supabase) {
      clearInterval(checkAuth);
      const user = await getCurrentUser();
      if (!user && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
      } else if (user) {
        loadUserProfile();
      }
    }
  }, 100);
});
