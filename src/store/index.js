import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({isCompression: false});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    authToken: null,
    user: null
  },
  getters: {
    isAuthenticated(state){
      return state.isAuthenticated;
    },
    authToken(state){
      return state.authToken;
    },
    user(state){
      return state.user;
    }
  },
  mutations: {
    setIsAuthenticated(state, isAuth){
      state.isAuthenticated = isAuth;
    },
    setAuthToken(state, token){
      state.authToken = token;
    },
    setUser(state, user){
      state.user = user;
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
})
