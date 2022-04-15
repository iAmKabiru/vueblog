import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import Cloudinary, { CldImage, CldTransformation } from "cloudinary-vue";
import {cloudName} from "../config";






Vue.use(Cloudinary, {
  configuration: { cloudName },
  components: {
    CldImage,
    CldTransformation
  }
});

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
