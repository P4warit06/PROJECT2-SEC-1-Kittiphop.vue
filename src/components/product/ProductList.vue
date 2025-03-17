<script setup>
import ListModel from "../model/ListModel.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import UpdateProduct from "./updateProduct.vue";

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
const goToUpdateProduct = (product) => {
  router.push({
    name: 'updateProduct',
    params: {
      productId: product.id,
      name: product.name,
      stock: product.stock,
      price: product.price,
      status: product.status,
      category: product.category,
      image: product.image,
      description: product.description
    }
  });
};


const filter = ref("")
function filteredProducts (){
  let a = props.products.filter( p => p.name.toLowerCase().includes(filter.value.toLowerCase()))
  console.log(a)
}

const isUpdate = ref(false)

const updateProduct = (id, product) => { 
  console.log(`update id:${id}, product:${product}`);

}

</script>

<template>
  <div>
    <UpdateProduct v-show="isUpdate" @update-product="updateProduct"></UpdateProduct>
  </div>
  <div class="container mx-auto p-4">
    <ListModel :items="products" listType="card" :singleItem="false">
      <template #heading>
        <input v-model="filter" @input="filteredProducts" type="text" placeholder="Search..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </template>
      <template #listItems="{ item }">
        <div class="h-full flex flex-col cursor-pointer">
          <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover" />
          <div class="p-6 flex flex-col flex-grow">
            <h2 class="text-xl font-semibold mb-2">{{ item.name }}</h2>
            <p class="text-gray-600 mb-4 flex-grow">{{ item.description }}</p>
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-bold text-blue-600">${{ item.price }}</span>
              <span :class="{
              'bg-green-200 text-green-800': item.status === 'Active',
              'bg-yellow-200 text-yellow-800': item.status === 'Low Stock',
              'bg-red-200 text-red-800': item.status === 'Out of Stock'
            }" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ item.status }}
              </span>
            </div>
            <p class="text-gray-500">Stock: {{ item.stock }}</p>
          </div>

          <div class="inline-flex justify-between mt-auto">
            <button class="text-base w-full px-12 py-2 bg-red-600 text-white rounded-l-xl hover:bg-red-700 transition-colors"
              @click="$emit('deleteProduct', item.id)">
              Delete
            </button>
            <button class="text-base text-white bg-blue-600 hover:bg-blue-800 transition-colors rounded-r-xl py-2 px-12"
              @click="isUpdate = !isUpdate">
              Update
            </button>
          </div>
        </div>
      </template>
    </ListModel>
  </div>

</template>

<style scoped></style>