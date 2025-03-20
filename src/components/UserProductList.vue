<script setup>
import ListModel from './model/ListModel.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const emit = defineEmits(['addToCart'])
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const router = useRouter();
const goToProductDetail = (productId) => {
  router.push({ name: 'productDetail', params: { id: productId } });
};

const filter = ref("")
function filteredProducts (){
  let a = props.products.filter( p => p.name.toLowerCase().includes(filter.value.toLowerCase()))
  console.log(a)
}

</script>

<template>
<div class="container mx-auto p-4">
  <ListModel :items="products" listType="card" :singleItem="false">
    <template #heading>
      <input 
        v-model="filter"
        @input="filteredProducts"
        type="text" 
        placeholder="Search..." 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </template>
    <template #listItems="{ yourItem }">
      <div class="h-full flex flex-col cursor-pointer">
        <img :src="yourItem.image" :alt="yourItem.name" class="w-full h-48 object-cover" />
        <div class="p-6 flex flex-col flex-grow">
          <h2 class="text-xl font-semibold mb-2">{{ yourItem.name }}</h2>
          <p class="text-gray-600 mb-4 flex-grow">{{ yourItem.description }}</p>
          <div class="flex justify-between yourItems-center mb-4">
            <span class="text-lg font-bold text-blue-600">${{ yourItem.price }}</span>
            <span :class="{
              'bg-green-200 text-green-800': yourItem.status === 'Active',
              'bg-yellow-200 text-yellow-800': yourItem.status === 'Low Stock',
              'bg-red-200 text-red-800': yourItem.status === 'Out of Stock'
            }" class="px-3 py-1 rounded-full text-sm font-medium">
              {{ yourItem.status }}
            </span>
          </div>
          <p class="text-gray-500">Stock: {{ yourItem.stock }}</p>
        </div>
        <div class="w-full">
            <div class="flex justify-center items-center">
                <button @click="$emit('addToCart', yourItem)" class="w-full h-13 bg-blue-400 rounded-lg cursor-pointer hover:opacity-90">Add to cart</button>
            </div>
        </div>
      </div>
    </template>
  </ListModel>
</div>

</template>

<style scoped></style>