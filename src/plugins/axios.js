"use strict";

import Vue from 'vue';
import axios from "axios";
import store from "@/store";
import {url} from "../../config";

axios.defaults.baseURL = url;
if (store.getters.isAuthenticated){
  axios.defaults.headers.common['Authorization'] = 'Bearer '+ store.getters.authToken;
}
axios.defaults.headers.post['Content-Type'] = 'application/json';

let config = {
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
