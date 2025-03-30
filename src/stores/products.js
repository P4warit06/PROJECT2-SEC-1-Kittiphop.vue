import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useProducts = defineStore("products", () => {
  //state
  const products = ref([]);

  //getter
  const getProducts = () => products.value;

  //actions

  const initialProducts = (initializedProducts) => {
    products.value.push(...initializedProducts);
  };

  const addProduct = (product) => {
    products.value.push(product);
  };

  const editProduct = (editProduct, index) => {
    products.value.splice(index, 1, editProduct);
  };

  const deleteProduct = (index) => {
    products.value.splice(index, 1);
  };

  return {
    products,
    initialProducts,
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProducts, import.meta.hot));
}
