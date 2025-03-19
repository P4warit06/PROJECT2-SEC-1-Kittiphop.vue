import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PageNotFound from '../views/PageNotFound.vue'
import ProductManager from '../components/ProductManager.vue'
import ProductDetail from '../components/ProductDetail.vue'
import UserProductManager from '@/components/UserProductManager.vue'
import { resolveDirective } from 'vue'

const history = createWebHistory()
const routes = [
    {
        path: '/',
        redirect: {name : "UserProduct"}
    },
    {
        path: '/user-produuct',
        name: 'UserProduct',
        component: UserProductManager
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
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
        component: PageNotFound
    }
]
const router = createRouter({ history,
     routes, 
    //  linkActiveClass: 'text-yellow-600', 
    //  linkExactActiveClass: 'text-purple-600' 
    })
export default router