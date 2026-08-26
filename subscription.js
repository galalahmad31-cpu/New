(function () {
  async function getMySubscription() {
    if (!window.supabaseClient) throw new Error('Supabase client is unavailable.');
    const user = await NSCAuth.getCurrentUser();
    if (!user) return null;
    const { data, error } = await window.supabaseClient
      .from('subscriptions')
      .select('*, plans(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data;
  }
  window.NSCSubscription = { getMySubscription };
})();
