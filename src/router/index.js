import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import PageNotFoundView from '@/views/PageNotFoundView.vue'
import ProductManager from '@/components/ProductManager.vue'
import ProductDetail from '@/components/ProductDetail.vue'
import UserProductManager from '@/components/UserProductManager.vue'
import UserCartList from '@/components/UserCartList.vue'
import UserManager from '@/components/UserManager.vue'
import UserTracking from '@/components/UserTracking.vue'
import Top_up from '@/components/Top_up.vue'
import UserProductDetails from '@/components/UserProductDetails.vue'
import ProductTracker from '@/components/ProductTracker.vue'
const history = createWebHistory()
const routes = [
    {
        path: '/',
        redirect: {name : "Home"}
    },
    {
        path: '/user-products',
        name: 'UserProduct',
        component: UserProductManager
    },
    {
        path: '/user-carts',
        name: 'UserCarts',
        component: UserCartList
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
        path: '/product-tracker',
        name: 'ProductTracker',
        component: ProductTracker
    },
    {
        path: '/product-detail/:productId',
        name: 'ProductDetail',
        component: ProductDetail
    },
    {
        path: '/user-product-detail/:productId',
        name: 'UserProductDetail',
        component: UserProductDetails
    },
    {
        path: '/user-manager',
        name: 'UserManager',
        component: UserManager
    },
    {
        path: '/user-tracking/:userId',
        name: 'UserTracking',
        component: UserTracking
    },
    {
        path: '/top-up',
        name: 'topUp',
        component: Top_up 
    },
    {
        path: '/:notMatch(.*)',
        name: 'PageNotFound',
        component: PageNotFoundView
    }
    
    
]
const router = createRouter({ history,
     routes, 
    })
    router.beforeEach((to, from) => {
        const isAuthenticated = localStorage.getItem('currentUser') !== null;
        const publicPaths = ['UserProduct', 'UserProductDetail', 'Home','Login','SignUp','PageNotFound'];

        if (to.name === 'ProductManager' && 'currentUser' in localStorage) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser.role !== 'admin') {
                return { name: 'UserProduct' };
            }
        }

        if (!isAuthenticated && !publicPaths.includes(to.name)) {
            return { name: 'Login' };
        }

        if (to.name === 'Login' && isAuthenticated) {
            return { name: 'Home' };
        }
    });

    export default router