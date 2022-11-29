import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import MainView from "@/views/MainView";
import CreateUserView from "@/views/CreateUserView";
import NewIngredientView from "@/views/NewIngredientView";
import CreateMenuView from "@/views/CreateMenuView";
import CreateSectionView from "@/views/CreateSectionView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/main',
    name: 'mainRoute',
    component: MainView
  },
 {
    path: '/create_user',
    name: 'createUserRoute',
    component: CreateUserView
  },
 {
    path: '/create_menu',
    name: 'createMenuRoute',
    component: CreateMenuView
  },
 {
    path: '/create_menu/create_section',
    name: 'createSectionRoute',
    component: CreateSectionView
  },
  {
    path: '/ingredient',
    name: 'newIngredientRoute',
    component: NewIngredientView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
