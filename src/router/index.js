import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import PageNotFoundView from '../views/PageNotFoundView.vue'
import ProductManager from '../components/ProductManager.vue'
import ProductDetail from '../components/ProductDetail.vue'

const history = createWebHistory()
const routes = [
    {
        path: '/',
        redirect: {name : "Home"}
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUpView
    },
    {
        path: '/product-manager',
        name: 'ProductManager',
        component: ProductManager
    },
    {
        path: '/product-detail/:productId',
        name: 'ProductDetail',
        component: ProductDetail
    },
    {
        path: '/:notMatch(.*)',
        name: 'PageNotFound',
        component: PageNotFoundView
    }
    
]
const router = createRouter({ history,
     routes, 
    //  linkActiveClass: 'text-yellow-600', 
    //  linkExactActiveClass: 'text-purple-600' 
    })
export default router