import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProductView from "../views/ProductView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import updateProduct from "@/components/product/updateProduct.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductView,
    },
    {
      path: "/products/:id",
      name: "productDetail",
      component: ProductDetailView,
      props: true,
    },
    {
      path: "/products/update/:productId",
      name: "updateProduct",
      component: updateProduct,
      props: true,
    },
  ],
});

export default router;
