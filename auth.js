(function () {
  const client = window.supabaseClient;

  function requireClient() {
    if (!client) {
      throw new Error('Supabase client is unavailable.');
    }
    return client;
  }

  async function signUp(email, password) {
    const { data, error } =
      await requireClient().auth.signUp({
        email,
        password
      });

    if (error) throw error;
    return data;
  }

  async function login(email, password) {
    const { data, error } =
      await requireClient().auth.signInWithPassword({
        email,
        password
      });

    if (error) throw error;
    return data;
  }

  async function logout() {
    const { error } =
      await requireClient().auth.signOut();

    if (error) throw error;
  }

  async function getCurrentUser() {
    const { data, error } =
      await requireClient().auth.getUser();

    if (error) return null;

    return data.user || null;
  }

  async function getSession() {
    const { data, error } =
      await requireClient().auth.getSession();

    if (error) throw error;

    return data.session;
  }

  async function protectPage({
    redirect = '../index.html'
  } = {}) {

    const session = await getSession();

    if (!session) {
      window.location.replace(redirect);
      return null;
    }

    return session;
  }

  async function requestPasswordReset(email, redirectTo) {

    const options = redirectTo
      ? { redirectTo }
      : undefined;

    const { data, error } =
      await requireClient()
        .auth
        .resetPasswordForEmail(email, options);

    if (error) throw error;

    return data;
  }

  function onAuthStateChange(callback) {
    return requireClient()
      .auth
      .onAuthStateChange(callback);
  }

  window.NSCAuth = {
    signUp,
    login,
    logout,
    getCurrentUser,
    getSession,
    protectPage,
    requestPasswordReset,
    onAuthStateChange
  };
})();
