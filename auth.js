// ==============================
// Supabase
// ==============================

const supabaseUrl = "https://whiwuwqgocsdobposkyz.supabase.co";
const supabaseKey = "sb_publishable_wy9sTXANsf04XMlupTQBog_hI7Meucz";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);


// ==============================
// Register
// ==============================

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const fullName =
    document.getElementById("registerName").value.trim();

  const email =
    document.getElementById("registerEmail").value.trim();

  const password =
    document.getElementById("registerPassword").value;


  // Create Auth user
  const { data, error } =
    await supabaseClient.auth.signUp({
      email: email,
      password: password
    });


  if (error) {
    document.getElementById("message").textContent =
      error.message;
    return;
  }


  if (profileError) {
    document.getElementById("message").textContent =
      profileError.message;
    return;
  }


  document.getElementById("message").textContent =
    "Registration successful.";
});


// ==============================
// Login
// ==============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;


  const { error } =
    await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });


  if (error) {
    document.getElementById("message").textContent =
      error.message;
    return;
  }


  window.location.href = "dashboard.html";
});
// ==============================
// Current User
// ==============================

async function getCurrentUser() {

  const {
    data: { user },
    error
  } = await supabaseClient.auth.getUser();

  if (error) {
    console.error(error);
    return null;
  }

  return user;
}


// ==============================
// Require Login
// ==============================

async function requireLogin() {

  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "index.html";
    return null;
  }

  return user;
}


// ==============================
// Load Profile
// ==============================

async function loadProfile(user) {

  const { data, error } =
    await supabaseClient
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .single();

  if (error) {
    console.error(error);
    return;
  }

  const name = document.getElementById("userName");
  const email = document.getElementById("userEmail");

  if (name) {
    name.textContent = `Name: ${data.full_name}`;
  }

  if (email) {
    email.textContent = `Email: ${user.email}`;
  }
}


// ==============================
// Logout
// ==============================

async function logout() {

  await supabaseClient.auth.signOut();

  window.location.href = "index.html";
}


// ==============================
// Dashboard
// ==============================

async function initDashboard() {

  const user = await requireLogin();

  if (!user) return;

  await loadProfile(user);

  const logoutBtn =
    document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
}


// Run only on Dashboard
if (document.getElementById("logoutBtn")) {
  initDashboard();
}
