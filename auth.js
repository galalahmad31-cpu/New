// ==============================
// Supabase
// ==============================

const supabaseUrl = "https://airycyfsyxkbfhpgkrbw.supabase.co";
const supabaseKey = "sb_publishable_PYNMFT4h02icnwG8bXIodQ_KnQjfL3B";

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


  // Create profile
  const { error: profileError } =
    await supabaseClient
      .from("profiles")
      .insert({
        id: data.user.id,
        full_name: fullName
      });


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
