<template>
  <div class="p-6">
    <div v-if="this.blog !== null" class="text-left border-2 p-4 border-blue-900 my-2">
      <p class="text-center py-4 text-4xl text-blue-900 font-bold">
        {{ blog.title }}
      </p>
      <div v-if="blog.image_code !== null">
        <div class="flex flex-wrap justify-center">
          <img
              :src="imageUrl(blog.image_code)"
              class="p-1 bg-white border rounded max-w-sm"
              alt="image"
          />
        </div>
      </div>
      <p class="text-4xl">
        {{ blog.body }}
      </p>
      <p class="py-4">
        <b>Created At: </b> {{ blog.created_at }}
      </p>
      <hr class="border-dotted border-blue-900">

      <div class="py-4">
        <div class="font-bold">
          Comments
        </div>
        <div>
          <textarea v-model="body" class="border-2 p-2 w-full" cols="40" rows="4" placeholder="Write comment"></textarea>
          <button v-on:click="postComment" type="submit" class="bg-blue-900 w-full text-center text-white p-2 hover:bg-blue-500">
            {{ this.loadingText !== null ? this.loadingText : 'Post Comment'}}
          </button>
        </div>
      </div>

      <hr class="border-dotted border-blue-900">

      <div class="py-4" v-if="comments !== null">
        <p v-for="comment in this.comments" v-bind:key="comment.id" class="py-4">
          <b>
            {{ comment.user.name }} commented:
          </b>
          "{{ comment.body }}"
          <span v-on:click="doDelete(comment.id)" class="text-sm text-red-900 font-bold cursor-pointer hover:underline" v-if="$store.getters.user && $store.getters.user.role === 'admin'" >
            Delete
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {cloudName} from "../../config";

export default {
  name: "BlogView",
  data(){
    return {
      blog: null,
      comments: null,
      body: null,
      loadingText: null
    }
  },
  methods: {
    async getBlog(){
      const id = this.$route.params.id;
      await this.axios.get('blogs/' + id).then(response => {
        this.blog = response.data.data;
        this.comments = this.blog.comments;
      }).catch(error => {
        alert(error.response.data.message);
        this.$router.push('/')
      })
    },
    async postComment() {
      this.loadingText = 'Please wait...';
      const id = this.$route.params.id;
      await this.axios.post('blogs/comments', {
        body: this.body,
        blog_id: id
      }).then(() => {
        this.body = null;
       this.getBlog();
      }).catch(error => {
        alert(error.response.data.message);
      })
      this.loadingText = null;
    },
    async doDelete(id) {
      await this.axios.delete('blogs/comments/' + id).then(response => {
        this.getBlog();
        alert(response.data.message);
      }).catch(error => {
        alert(error.response.data.message);
      })
    },
    imageUrl(id){
      return 'https://res.cloudinary.com/'+ cloudName +'/image/upload/' + id;
    }
  },
  created() {
    this.getBlog();
  }
}
</script>

<style scoped>

</style>