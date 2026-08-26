import { supabase } from '../supabase.js';

export async function getCurrentSubscription() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*, plans(id,name,price,duration_days,description)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function hasPermission(permissionKey) {
  const { data, error } = await supabase.rpc('has_permission', {
    permission: permissionKey
  });
  if (error) throw error;
  return Boolean(data);
}

export async function requirePermission(permissionKey, redirect = '../index.html') {
  const allowed = await hasPermission(permissionKey);
  if (!allowed) {
    window.location.href = redirect;
    return false;
  }
  return true;
}
