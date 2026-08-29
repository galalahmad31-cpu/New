async function loadDashboardStats() {
  if (!supabase) return;

  const user = await getCurrentUser();
  if (!user) return;

  // إجمالي المرضى
  const { data: allPatients, count: totalCount } = await supabase
    .from('patients')
    .select('*', { count: 'exact', head: true })
    .eq('doctor_id', user.id);

  // المرضى النشطون
  const { count: activeCount } = await supabase
    .from('patients')
    .select('*', { count: 'exact', head: true })
    .eq('doctor_id', user.id)
    .eq('status', 'current');

  // متابعات الأسبوع
  const today = new Date();
  const weekEnd = new Date();
  weekEnd.setDate(today.getDate() + 7);
  const { count: followupsCount } = await supabase
    .from('patients')
    .select('*', { count: 'exact', head: true })
    .eq('doctor_id', user.id)
    .eq('status', 'current')
    .gte('next_follow_up', today.toISOString().split('T')[0])
    .lte('next_follow_up', weekEnd.toISOString().split('T')[0]);

  // إيرادات الشهر
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const { data: monthPatients } = await supabase
    .from('patients')
    .select('final_price, payment_state')
    .eq('doctor_id', user.id)
    .eq('payment_state', 'paid')
    .gte('sub_start_date', firstDay.toISOString().split('T')[0]);

  const revenue = (monthPatients || []).reduce((sum, p) => sum + (parseFloat(p.final_price) || 0), 0);

  document.getElementById('stat-total').textContent = totalCount || 0;
  document.getElementById('stat-active').textContent = activeCount || 0;
  document.getElementById('stat-followups').textContent = followupsCount || 0;
  document.getElementById('stat-revenue').textContent = formatCurrency(revenue);
}

async function loadRecentPatients() {
  if (!supabase) return;
  const user = await getCurrentUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('patients')
    .select('id, name, medical_id, status, created_at')
    .eq('doctor_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const container = document.getElementById('recent-patients-list');

  if (error || !data || data.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-user-slash"></i>
        <p>${t('no_data')}</p>
      </div>`;
    return;
  }

  container.innerHTML = data.map(p => {
    const initials = p.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const statusBadge = p.status === 'current'
      ? `<span class="badge badge-success">${t('filter_current')}</span>`
      : `<span class="badge badge-danger">${t('filter_discharged')}</span>`;

    return `
      <div class="patient-row">
        <div class="patient-info">
          <div class="patient-avatar">${initials}</div>
          <div>
            <div class="patient-name">
              <a href="patient-details.html?id=${p.id}" class="patient-name-link">${p.name}</a>
            </div>
            <div class="patient-id">#${p.medical_id}</div>
          </div>
        </div>
        ${statusBadge}
      </div>
    `;
  }).join('');
}

async function loadUpcomingFollowups() {
  if (!supabase) return;
  const user = await getCurrentUser();
  if (!user) return;

  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('patients')
    .select('id, name, next_follow_up')
    .eq('doctor_id', user.id)
    .eq('status', 'current')
    .gte('next_follow_up', today)
    .order('next_follow_up', { ascending: true })
    .limit(5);

  const container = document.getElementById('upcoming-followups-list');

  if (error || !data || data.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-calendar-xmark"></i>
        <p>${t('no_data')}</p>
      </div>`;
    return;
  }

  container.innerHTML = data.map(p => {
    const daysLeft = Math.ceil((new Date(p.next_follow_up) - new Date(today)) / 86400000);
    const urgentClass = daysLeft <= 2 ? 'urgent' : '';
    return `
      <div class="followup-row">
        <div>
          <a href="patient-details.html?id=${p.id}" class="patient-name-link">${p.name}</a>
          <div class="followup-date">${formatDate(p.next_follow_up)}</div>
        </div>
        <span class="days-left ${urgentClass}">${daysLeft}d</span>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  // انتظار تحميل Supabase
  const wait = setInterval(() => {
    if (supabase) {
      clearInterval(wait);
      loadDashboardStats();
      loadRecentPatients();
      loadUpcomingFollowups();
    }
  }, 100);
});
