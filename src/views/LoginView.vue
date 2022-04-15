<template>
    <div class="row">
      <div class="col-md-6 offset-md-3 main">
        <div class="card shadow">
          <div class="card-header fw-bold fs-3 text-muted">Login</div>
          <div class="card-body">
            <div class="form-group mb-3">
              <input
                type="text"
                v-model="email"
                class="form-control form-control-lg"
                placeholder="Enter Email Address"
              />
            </div>

            <div class="form-group mb-3">
              <input
                type="password"
                v-model="password"
                class="form-control form-control-lg"
                placeholder="Enter Password"
              />
            </div>

            <button
              type="submit"
              v-on:click="doLogin"
              class="btn btn-outline-primary form-control form-control-lg"
            >
              {{ this.loadingText !== null ? this.loadingText : "Login" }}
            </button>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      loadingText: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async doLogin() {
      this.loadingText = "Please wait..";
      const data = {
        email: this.email,
        password: this.password,
      };
      await this.axios
        .post("login", data)
        .then((response) => {
          this.$store.commit("setUser", response.data.data.user);
          this.$store.commit("setAuthToken", response.data.data.access_token);
          this.$store.commit("setIsAuthenticated", true);
          document.querySelector(".card").insertAdjacentHTML(
            "beforeBegin", `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong>${response.data.message}.
            <button type="button" :click="reload" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
            </div>`
          );
   
          window.location.href = "/";
        })
        .catch((error) => {
          this.loadingText = "Login";
          document.querySelector(".card").insertAdjacentHTML(
            "beforeBegin", `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong>    ${error.response.data.message}.
            <button type="button" :click="reload" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
            </div>`
          );
        });
    },
  },
};
</script>
