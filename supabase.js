/*
 * Supabase client configuration.
 * Uses the project URL (NOT /rest/v1/).
 * The publishable/anon key may be used in frontend code when RLS is configured.
 * NEVER put a service_role key in frontend code.
 */
(function () {
  const SUPABASE_URL = 'https://airycyfsyxkbfhpgkrbw.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_PYNMFT4h02icnwG8bXIodQ_KnQjfL3B';

  if (!window.supabase) {
    throw new Error('Supabase JS library was not loaded.');
  }

  window.NSC_SUPABASE_CONFIG = {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY
  };

  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );
})();
