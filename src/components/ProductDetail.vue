<script setup>
import { ref } from "vue";
import { getItemById } from "../libs/fetchUtils.js";
import { useRoute, useRouter } from "vue-router";
const {
  params: { productId },
} = useRoute();
const selectProduct = ref({});

async function getProductById() {
  try {
    selectProduct.value = await getItemById(
      `${import.meta.env.VITE_APP_URL}/products`,
      productId
    );
  } catch (error) {
    console.log(error);
  }
}

getProductById();

const router = useRouter();
function goBack() {
  router.go(-1);
}
// console.log(productId)
</script>

<template>
  <div class="p-5">
    <div class="p-16 shadow-2xl items-center max-w-lg">
      <p class="flex flex-col"></p>
      <p><span class="font-semibold">id: </span> {{ selectProduct.id }}</p>
      <p><span class="font-semibold">name: </span>{{ selectProduct.name }}</p>
      <p>
        <span class="font-semibold">price: </span> {{ selectProduct.price }}
      </p>
      <p>
        <span class="font-semibold">description: </span
        >{{ selectProduct.description }}
      </p>
      <p>
        <span class="font-semibold">instock: </span> {{ selectProduct.stock }}
      </p>
      <p>
        <span class="font-semibold">status: </span> {{ selectProduct.status }}
      </p>
      <button
        @click="goBack"
        class="pt-5 underline text-purple-500 cursor-pointer"
      >
        Back
      </button>
    </div>
  </div>
</template>

<style scoped></style>
