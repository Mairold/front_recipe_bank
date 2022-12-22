import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView";
import MainView from "@/views/MainView";
import CreateUserView from "@/views/CreateUserView";
import NewIngredientView from "@/views/NewIngredientView";
import AddToMenuMainView from "@/views/AddToMenuMainView";
import AddRecipeView from "@/views/AddRecipeView";
import AddToMenuInsertView from "@/views/AddToMenuInsertView";
import AddToMenuChangeView from "@/views/AddToMenuChangeView";
import CreateMenuView from "@/views/CreateMenuView";
import CreateSectionView from "@/views/CreateSectionView";
import CreateShoppingListView from "@/views/CreateShoppingListView";
import ChangeShoppingListView from "@/views/ChangeShoppingListView";
import RecipeView from "@/views/RecipeView";
import MenuView from "@/views/MenuView";
import ShoppingListView from "@/views/ShoppingListView";

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/addRecipe',
        name: 'addRecipeRoute',
        component: AddRecipeView
    },
    {
        path: '/recipe',
        name: 'recipeRoute',
        component: RecipeView
    },
    {
        path: '/main',
        name: 'mainRoute',
        component: MainView
    },
    {
        path: '/create-user',
        name: 'createUserRoute',
        component: CreateUserView
    },
    {
        path: '/ingredient',
        name: 'newIngredientRoute',
        component: NewIngredientView
    },
    {
        path: '/add-to-menu',
        name: 'addToMenuRoute',
        component: AddToMenuMainView
    },
    {
        path: '/add-to-menu-insert',
        name: 'addToMenuInsertRoute',
        component: AddToMenuInsertView
    },
    {
        path: '/add-to-menu-change',
        name: 'addToMenuChangeRoute',
        component: AddToMenuChangeView
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
        path: '/create-shopping-list',
        name: 'createShoppingListRoute',
        component: CreateShoppingListView
    },
    {
        path: '/change_shopping_list',
        name: 'changeShoppingListRoute',
        component: ChangeShoppingListView
    },
    {
        path: '/logout',
        name: 'logoutRoute',
        component: LoginView
    },
    {
        path: '/menu',
        name: 'menuRoute',
        component: MenuView
    },
    {
        path: '/shopping-list',
        name: 'shoppingListRoute',
        component: ShoppingListView
    },
]

const router = new VueRouter({
    routes
})

export default router
