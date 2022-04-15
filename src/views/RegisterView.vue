<template>

 <div>
    <div class="row">
      <div class="col-md-6 offset-md-3 main">
        <div class="card shadow">
          <div class="card-header fw-bold fs-3 text-muted">Register</div>
          <div class="card-body">
            <div class="form-group mb-3">
              <input
                type="text"
                v-model="name"
                class="form-control form-control-lg"
                placeholder="Enter your name"
              />
            </div>
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
              v-on:click="doRegister"
              class="btn btn-outline-primary form-control form-control-lg"
            >
              {{ this.loadingText !== null ? this.loadingText : "Register" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "RegisterView",
  data(){
    return {
      loadingText: null,
      name: null,
      email: null,
      password: null,
    }
  },
  methods: {
    async doRegister() {
      this.loadingText = 'Please wait..';
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      await this.axios.post('register', data).then(response => {
        this.$store.commit('setUser', response.data.data.user)
        this.$store.commit('setAuthToken', response.data.data.access_token)
        this.$store.commit('setIsAuthenticated', true)
          document.querySelector(".card").insertAdjacentHTML(
            "beforeBegin", `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong>${response.data.message}.
            <button type="button" :click="reload" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
            </div>`
          );
        window.location.href = '/';
      }).catch(error => {
          this.loadingText = "Register";
          document.querySelector(".card").insertAdjacentHTML(
            "beforeBegin", `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong>    ${error.response.data.message}.
            <button type="button" :click="reload" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
            </div>`
          );
      });
    }
  }
}
</script>

<style scoped>

</style>