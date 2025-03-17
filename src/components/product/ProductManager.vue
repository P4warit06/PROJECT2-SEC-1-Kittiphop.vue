<script setup>
import ProductList from "./ProductList.vue";
import AddProduct from "./AddProduct.vue";
import UpdateProduct from "./updateProduct.vue";
import { ref, onMounted } from "vue";
import { getItems, getItemById, addItem, deleteItemById, editItem } from "../../libs/fetchUtils.js"

const myProducts = ref([]);
const isAdding = ref(false);
const isUpdating = ref(false);
const selectedProduct = ref(null);

onMounted(async () => {
  myProducts.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`);
});

const addProduct = async (product) => {
  try {
    if (product) {
      const newProduct = await addItem(`${import.meta.env.VITE_APP_URL}/products`, product);
      myProducts.value.push(newProduct);
      isAdding.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const status = await deleteItemById(`${import.meta.env.VITE_APP_URL}/products`, id);
    if (status === 200) {
      const removeIndex = myProducts.value.findIndex((item) => item.id === id);
      if (removeIndex !== -1) {
        myProducts.value.splice(removeIndex, 1);
      }
    }
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const updateProduct = async (product) => {
  try {
    if (product && product.id) {
      const updatedProduct = await editItem(`${import.meta.env.VITE_APP_URL}/products/${product.id}`, product);
      const index = myProducts.value.findIndex(p => p.id === product.id);
      if (index !== -1) {
        myProducts.value.splice(index, 1, updatedProduct);
      }
      isUpdating.value = false;
    }
  } catch (error) {
    console.error(error);
  }
};

const startUpdate = (product) => {
  selectedProduct.value = product;
  isUpdating.value = true;
};
</script>

<template>
  <div>
    <AddProduct v-show="isAdding" @add-new-product="addProduct" @cancel-adding="isAdding = false"></AddProduct>
    <div class="w-full flex justify-center items-center cursor-pointer">
      <button v-show="!isAdding" @click="isAdding = true" class="bg-green-300 rounded-lg p-3 my-3 cursor-pointer">Add
        product</button>
    </div>
    <ProductList :products="myProducts" @delete-product="deleteProduct" @update-product="startUpdate" />

    <UpdateProduct v-if="isUpdating" :product="selectedProduct" @save-update="updateProduct"
      @cancel="isUpdating = false" />
  </div>
</template>