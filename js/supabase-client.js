// Supabase JS SDK (يُحمَّل من CDN في HTML)
// ننتظر حتى يتم تحميل SDK ثم نهيئ العميل
let supabase;

function initSupabase() {
  if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return true;
  }
  return false;
}

// محاولة التهيئة عند تحميل الصفحة
window.addEventListener('load', () => {
  if (!initSupabase()) {
    console.warn('Supabase SDK not loaded yet');
  }
});
