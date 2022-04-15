import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import BlogView from "@/views/BlogView";
import CreateBlog from "@/views/CreateBlog";
import EditBlog from "@/views/EditBlog";
import store from "@/store";

Vue.use(VueRouter)

function onlyAdmin(to, from, next){
  if (store.getters.isAuthenticated && store.getters.user !== null && store.getters.user.role === 'admin') {
    next();
  }
  else {
    next({ name: 'home' });
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blog/:id',
    name: 'view-blog',
    component: BlogView
  },
  {
    path: '/blog',
    name: 'create-blog',
    component: CreateBlog,
    beforeEnter: onlyAdmin
  },
  {
    path: '/blog/update/:id',
    name: 'update-blog',
    component: EditBlog,
    beforeEnter: onlyAdmin
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
