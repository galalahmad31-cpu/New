/*
 * Supabase client configuration.
 * Replace the placeholders with your project's public URL and anon key.
 * NEVER put the Supabase service_role key in frontend code.
 */
(function () {
  const SUPABASE_URL = 'https://airycyfsyxkbfhpgkrbw.supabase.co/rest/v1/';
  const SUPABASE_ANON_KEY = 'sb_publishable_PYNMFT4h02icnwG8bXIodQ_KnQjfL3B';

  if (!window.supabase) throw new Error('Supabase JS library was not loaded.');

  if (SUPABASE_URL.startsWith('YOUR_') || SUPABASE_ANON_KEY.startsWith('YOUR_')) {
    console.warn('Supabase is not configured yet. Add the project URL and anon key in supabase.js.');
  }

  window.NSC_SUPABASE_CONFIG = { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY };
  window.nscSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
})();
