<template>
  <div id="app">
    <nav class="navbar fs-5 navbar-expand-lg shadow navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand fs-3" href="#">LaraVueBlog</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/" class="nav-link active">Home</router-link>
            <span v-if="!$store.getters.isAuthenticated" class="d-flex gap-1">
              <router-link to="/login" class="nav-link active"
                >Login</router-link
              >
              <router-link to="/register" class="nav-link active"
                >Register</router-link
              >
            </span>
            <p
              v-if="$store.getters.isAuthenticated"
              v-on:click="doLogout"
              class="nav-link active"
              style=""
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </nav>

    <div
      v-if="$store.getters.isAuthenticated"
      class="d-flex justify-content-between p-5 col-md-6 offset-md-3"
    >
      <p class="fw-bold text-muted">Welcome {{ $store.getters.user.name }}</p>
      <a
        href="/blog"
        v-if="$store.getters.user.role == 'admin'"
        class="btn btn-primary"
        >Add Blog Post</a
      >
    </div>

    <div class="mt-2 container">
      <router-view />
    </div>
    <div class="text-center mt-5">Vue & Laravel Blog</div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    doLogout() {
      this.$store.commit("setAuthToken", null);
      this.$store.commit("setUser", null);
      this.$store.commit("setIsAuthenticated", false);

      window.location.href = "/";
    },
  },
};
</script>