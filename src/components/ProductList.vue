<script setup>
import ListModel from './model/ListModel.vue'
import { computed, ref } from 'vue'
defineEmits(['deleteProduct', 'setEditing','seleteDeleteProduct'])
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
console.log(props.selectedProducts)


const filter = ref("")
function filteredProducts() {
  let a = props.products.filter( p => p.name.toLowerCase().includes(filter.value.toLowerCase()))
  console.log(a)
}

const seleteProductList =ref([])
</script>

<template>
  <div>
    <ListModel :items="products" listType="card">
      <template #heading> 
        <div class="flex justify-end w-full mt-2">
          <button 
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            @click="$emit('seleteDeleteProduct',seleteProductList)"
          >
            Delete All
          </button>
        </div>
      </template>
      
      <template #listItems="{ yourItem }">
        <input
          type="checkbox"
          :value="yourItem.id"
          @change="test"
          v-model="seleteProductList" 
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
