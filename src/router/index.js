import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import PageNotFoundView from "@/views/PageNotFoundView.vue";
import ProductManager from "@/components/ProductManager.vue";
import ProductDetail from "@/components/ProductDetail.vue";
import ProductTracker from "@/components/ProductTracker.vue";
import UserProductManager from "@/components/UserProductManager.vue";
import UserCartList from "@/components/UserCartList.vue";
import UserManager from "@/components/UserManager.vue";
import UserTracking from "@/components/UserTracking.vue";
import UserProductDetails from "@/components/UserProductDetails.vue";
import UserProfile from "@/components/UserProfile.vue";
import TopUp from "@/components/TopUp.vue";
const history = createWebHistory();
const routes = [
  {
    path: "/",
    redirect: { name: "Home" },
  },
  {
    path: "/user-products",
    name: "UserProduct",
    component: UserProductManager,
  },
  {
    path: "/user-carts",
    name: "UserCarts",
    component: UserCartList,
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUpView,
  },
  {
    path: "/product-manager",
    name: "ProductManager",
    component: ProductManager,
  },
  {
    path: "/product-tracker",
    name: "ProductTracker",
    component: ProductTracker,
  },
  {
    path: "/product-detail/:productId",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/user-product-detail/:productId",
    name: "UserProductDetail",
    component: UserProductDetails,
  },
  {
    path: "/user-manager",
    name: "UserManager",
    component: UserManager,
  },
  {
    path: "/user-tracking/:userId",
    name: "UserTracking",
    component: UserTracking,
  },
  {
    path: "/user-profile/:userId",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/top-up",
    name: "topUp",
    component: TopUp,
  },
  {
    path: "/:notMatch(.*)",
    name: "PageNotFound",
    component: PageNotFoundView,
  },
];
const router = createRouter({ history, routes });

//062 Pongsakorn's

router.beforeEach((to, from) => {
  const isAuthenticated = localStorage.getItem("currentUser") !== null;
  const publicPaths = [
    "UserProduct",
    "UserProductDetail",
    "Home",
    "Login",
    "SignUp",
    "PageNotFound",
  ];
  const adminPaths = [
    "ProductManager",
    "ProductTracker",
    "ProductDetail",
    "UserManager",
  ];

  if (adminPaths.includes(to.name) && isAuthenticated) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser.role !== "admin") {
      return { name: "UserProduct" };
    }
  }
  if (!isAuthenticated && !publicPaths.includes(to.name)) {
    return { name: "Login" };
  }
  if (to.name === "Login" && isAuthenticated) {
    return { name: "Home" };
  }
});


export default router;