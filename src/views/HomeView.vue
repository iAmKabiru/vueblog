<template>
    <div class="row">
      <div class="col-md-6 offset-md-3 main">
      <div v-if="this.blogs.length > 0">
        <div class="card mb-5" v-for="blog in this.blogs" v-bind:key="blog.id">
          <img
            :src="imageUrl(blog.image_code)"
            class="card-img-top"
            alt="..."
          />

          <div class="card-body">
            <router-link
              :to="{ name: 'view-blog', params: { id: blog.id } }"
              class="text-primary text-decoration-none"
            >
              {{ blog.title }}
            </router-link>

            <br />

            <small>{{ blog.created_at }}</small>
          </div>

          <div class="card-footer">
            <router-link
              :to="{ name: 'update-blog', params: { id: blog.id } }"
              class="btn btn-success mr-3"
              v-if="$store.getters.user && $store.getters.user.role === 'admin'"
            >
              Edit
            </router-link>

            <p
              v-on:click="doDelete(blog.id)"
              class="btn btn-danger"
              v-if="$store.getters.user && $store.getters.user.role === 'admin'"
            >
              Delete
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center fw-bold text-muted">No Blog Post to show</div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloudName } from "../../config";

export default {
  name: "HomeView",
  data() {
    return {
      blogs: [],
    };
  },
  methods: {
    async getBlogs() {
      await this.axios
        .get("blogs")
        .then((response) => {
          this.blogs = response.data.data;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    async doDelete(id) {
      await this.axios
        .delete("blogs/" + id)
        .then((response) => {
          this.getBlogs();
               document.querySelector(".card").insertAdjacentHTML(
            "beforeBegin", `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong>${response.data.message}.
            <button type="button" :click="reload" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
            </div>`
          );
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },

    imageUrl(id) {
      return "https://res.cloudinary.com/" + cloudName + "/image/upload/" + id;
    },
  },

  created() {
    this.getBlogs();
  },
};
</script>
