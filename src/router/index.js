import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import MainView from "@/views/MainView";
import CreateUserView from "@/views/CreateUserView";
import NewIngredientView from "@/views/NewIngredientView";
import MenuView from "@/views/MenuView";
import AddToMenuView from "@/views/AddToMenuView";

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
        path: '/ingredient',
        name: 'newIngredientRoute',
        component: NewIngredientView
    },
    {
        path: '/menu',
        name: 'menuRoute',
        component: MenuView
    },
    {
        path: '/add-to-menu',
        name: 'addToMenuRoute',
        component: AddToMenuView
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
