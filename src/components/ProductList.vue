<script setup>
import ListModel from './model/ListModel.vue'
import { ref } from 'vue'
defineEmits(['deleteProduct', 'setEditing','update:selectedProducts'])
const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  selectedProducts: { 
    type: Array,
    required: true
  }
})
console.log(props.products)

const filter = ref("")
function filteredProducts() {
  let a = props.products.filter( p => p.name.toLowerCase().includes(filter.value.toLowerCase()))
  console.log(a)
}


</script>

<template>
  <div>
    <ListModel :items="products" listType="card">
      <template #heading> 
        Product List
        <input
          v-model="filter"
          type="text"
          placeholder="Search..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </template>
      
      <template #listItems="{ yourItem }">
        <!-- Checkbox selectProduct-->
        <input
          type="checkbox"
          :value="yourItem.id"
          v-model="props.selectedProducts" 
          class="mr-2"
        />
        <button @click="$emit('setEditing', yourItem)" class="text-purple-600 hover:text-purple-400 cursor-pointer">
          Edit |
        </button>
        <button
          @click="$emit('deleteProduct', yourItem.id)"
          class="text-red-600 hover:text-red-400 cursor-pointer"
        >
          Delete
        </button>
        <p>
          <span class="italic">id: </span> 
          <router-link :to="{name : 'ProductDetail', params: {productId: yourItem.id}}" active-class="text-600-blue" class="underline">
            {{ yourItem.id }}
          </router-link>,
          <span class="italic">product name:</span>{{ yourItem.name }}
          <span class="italic">price:</span>{{ yourItem.price }}
        </p>
      </template>
    </ListModel>
  </div>
</template>
<style scoped></style>
