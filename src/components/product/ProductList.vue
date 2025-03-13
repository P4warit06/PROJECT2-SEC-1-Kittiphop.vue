<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import UpdateProduct from "./updateProduct.vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const router = useRouter();
const goToProductDetail = (productId) => {
  router.push({ name: 'ProductDetail', params: { id: productId } });
};


const updatingProductId = ref(null);

const toggleUpdateProduct = (productId) => {
  updatingProductId.value = updatingProductId.value === productId ? null : productId;
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-8">Product List</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col justify-between">

        <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-md" />

        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold text-blue-600">${{ product.price }}</span>
            <span :class="{
              'bg-green-200 text-green-800': product.status === 'Active',
              'bg-yellow-200 text-yellow-800': product.status === 'Low Stock',
              'bg-red-200 text-red-800': product.status === 'Out of Stock'
            }" class="px-3 py-1 rounded-full text-sm font-medium">
              {{ product.status }}
            </span>
          </div>
          <p class="text-gray-500 mb-3">Stock: {{ product.stock }}</p>

          <!-- ปุ่ม Update Product -->
          <button @click="toggleUpdateProduct(product.id)" :class="{
            'bg-blue-500 hover:bg-blue-600': updatingProductId !== product.id,
            'bg-red-500 hover:bg-red-600': updatingProductId === product.id
          }" class="text-white w-full py-2 rounded-md transition">
            {{ updatingProductId === product.id ? "Cancel Update" : "Update Product" }}
          </button>

          <!-- แสดงฟอร์ม UpdateProduct เฉพาะสินค้าที่ถูกเลือก -->
          <div v-if="updatingProductId === product.id" class="mt-4">
            <UpdateProduct @update-product="updateProduct"></UpdateProduct>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>
