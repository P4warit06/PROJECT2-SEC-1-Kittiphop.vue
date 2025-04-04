<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getItemById } from '@/libs/fetchUtils';
import { ref } from 'vue';

const {params: {productId}} = useRoute();
const selectProduct = ref({})

const getSelectProduct = async () => {
    try {
        selectProduct.value = await getItemById(`${import.meta.env.VITE_APP_URL}/products`, productId)
    } catch(error) {
        console.log(error);
    }
}

const router = useRouter()
function goBack() {
  router.go(-1)
}
getSelectProduct()
</script>

<template>
 <div class="p-5">
    <div class="p-16 shadow-2xl items-center max-w-lg">
      <p class="flex flex-col"></p>
      <p><span class="font-semibold">id: </span> {{ selectProduct.id }}</p>
      <p>
        <span class="font-semibold">name: </span>{{ selectProduct.name }}
      </p>
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
      <div>
        <button class="underline text-green-500 mr-1">
            Buy
        </button>
        <button
            @click="goBack"
            class="pt-5 ml-5 underline text-purple-500 cursor-pointer"
        >
        Back
        </button>
        </div>
    </div>
  </div>
</template>