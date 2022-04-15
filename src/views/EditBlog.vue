<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 main">
      <div class="card shadow">
        <div class="card-header fw-bold fs-3 text-muted">Add a blog post</div>
        <div class="card-body">
          <div class="form-group mb-3">
            <input
              type="text"
              v-model="title"
              class="form-control form-control-lg"
              placeholder="Enter post title"
            />
          </div>

          <div class="form-group mb-3">
            <textarea
              v-model="body"
              class="border-2 p-2 w-full"
              cols="40"
              rows="10"
              placeholder="Write Post Content"
            ></textarea>
          </div>

          <div v-if="image_code !== null">
            <div class="flex flex-wrap justify-center">
              <img
                :src="imageUrl(image_code)"
                class="p-1 bg-white border rounded max-w-sm"
                alt="image"
              />
            </div>
          </div>
  <button type="submit" v-on:click="changeImage" class="btn btn-outline-success">
        Update Image
      </button>
          

          <button
            type="submit"
            v-on:click="doUpdate"
            class="btn btn-outline-primary form-control mt-3"
          >
            {{ this.loadingText !== null ? this.loadingText : "Update post" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {cloudName} from "../../config";

export default {
  name: "EditBlog",
  data(){
    return {
      loadingText: null,
      title: null,
      body: null,
      id: null,
      image_code: null
    }
  },
  methods: {
    async getBlog(){
      const id = this.$route.params.id;
      await this.axios.get('blogs/' + id).then(response => {
        const blog = response.data.data;
        this.id = blog.id;
        this.title = blog.title;
        this.body = blog.body;
        this.image_code = blog.image_code;
      }).catch(error => {
        alert(error.response.data.message);
        this.$router.push('/')
      })
    },
    changeImage(){
      // eslint-disable-next-line
      let cloudWidget = cloudinary.createUploadWidget({
            cloudName, uploadPreset: 'ufas405z', showCompletedButton: true,
            multiple: false, cropping: true, maxFileSize: 5000000, resourceType: 'image'}, (error, result) => {
            if (!error && result && result.event === "success") {
              this.image_code = result.info.public_id;
              cloudWidget.close()
            }
          }
      )

      cloudWidget.open();
    },
    async doUpdate() {
      this.loadingText = 'Please wait..';
      const data = {
        title: this.title,
        body: this.body,
        image_code: this.image_code
      }
      await this.axios.put('blogs/' + this.id, data).then(response => {
          console.log(response.data.message)
             this.$router.push("/");
      }).catch(error => {
          document.querySelector(".card").insertAdjacentHTML(
            "beforeBegin",
            `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong>    ${error.response.data.message}.
            <button type="button" :click="reload" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
            </div>`
          );
      });
    },
    imageUrl(id){
      return 'https://res.cloudinary.com/'+ cloudName +'/image/upload/' + id;
    }
  },
  mounted() {
    let externalScript = document.createElement('script')
    externalScript.setAttribute('src', 'https://upload-widget.cloudinary.com/global/all.js')
    document.head.appendChild(externalScript)
  },
  created() {
    this.getBlog();
  }
}
</script>

<style scoped>

</style>