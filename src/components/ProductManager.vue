<script setup>
import ProductList from './ProductList.vue'
import AddEditProduct from './AddEditProduct.vue'
import HeaderManager from './HeaderManager.vue'
import FilterProduct from './FilterProduct.vue';
import { ref, onMounted } from 'vue'
import { getItems, deleteItemById, addItem, editItem } from '../libs/fetchUtils.js'

const myProducts = ref([])
const selectedProducts = ref([])
const productCategories = ref([])
const filterCategories = ref([])
onMounted(async () => {
  myProducts.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`)
  productCategories.value = myProducts.value.map((product) => product.category).filter((category) => category !== null && category !== undefined)
  filterCategories.value = productCategories.value.filter((category, index) => productCategories.value.indexOf(category) === index)
})

onMounted(async () => {
  try {
    myProducts.value = await getItems(
      `${import.meta.env.VITE_APP_URL}/products`
    )
    console.log(myProducts.value)
  } catch (error) {
    console.log(error)
  }
})

const addProduct = async (product) => {
  try {
    const addedItem = await addItem(
      `${import.meta.env.VITE_APP_URL}/products`,
      product
    )
    if (addItem) {
      myProducts.value.push(addedItem)
    }
  } catch (error) {
    console.loc(error)
  }

  isAdding.value = false
}

const cancelAdding = () => {
  isAdding.value = false
}
const isAdding = ref(false)
const isEditing = ref(false)
const currentProduct = ref({
      name: "",
      category: "",
      price: 0,
      status: "",
      stock: 0,
      image: "",
      description: ""
})

const setEditProduct = (editProduct) => {
  isEditing.value = true
  currentProduct.value = editProduct
  console.log(currentProduct.value);
  currentProduct.value = {...editProduct}
}

const updateProduct = async (product) => {
  try {
    const editedItem = await editItem(`${import.meta.env.VITE_APP_URL}/products`, product.id, product)
    const editIndex = myProducts.value.findIndex(
      (item) => item.id === editedItem.id
    )
    myProducts.value.splice(editIndex, 1, editedItem)
  }
  catch (error) {
    console.log(error)
  }
  isEditing.value = false
  currentProduct.value = {
      name: "",
      category: "",
      price: 0,
      status: "",
      stock: 0,
      image: "",
      description: ""
  }
}

const deleteProduct = async (id) => {
  try {
    const status = await deleteItemById(`${import.meta.env.VITE_APP_URL}/products`, id)
    if (status === 200) {
      const removeIndex = myProducts.value.findIndex((item) => item.id === id)
      if (removeIndex !== -1) { 
        myProducts.value.splice(removeIndex, 1)
      }
    }
  } catch (error) {
    console.error('Error deleting item:', error)
  }
}

const deleteMultipleProduct = async (idList) => {
   try{
    for (let i = 0; i < idList.length; i++) {
      const status = await deleteItemById(`${import.meta.env.VITE_APP_URL}/products`, idList[i])
      if (status === 200) {
      const removeIndex = myProducts.value.findIndex((item) => item.id === idList[i])
      if (removeIndex !== -1) { 
        myProducts.value.splice(removeIndex, 1)
      }
    }
    }
   }catch(error){
    console.error('Error deleting item:', error)
   }
}

const cancelAdd = () => {
  isAdding.value = false
  isEditing.value = false
}


</script>

<template>
  <div>
    <HeaderManager />
    <FilterProduct :categories="filterCategories"/>
    <button
      @click="isAdding = !isAdding"
      class="text-green-600 hover:text-green-400 underline cursor-pointer"
      >
      Add New Product
    </button>
    
    <AddEditProduct v-if="isAdding | isEditing"
    :active-product="currentProduct"
    @add-new-product="addProduct" 
    @edit-product="updateProduct"
    @cancel-adding="cancelAdd"/>

    <ProductList 
      v-show="!isAdding && !isEditing" 
      @deleteProduct="deleteProduct" 
      @setEditing="setEditProduct" 
      :products="myProducts" 
      :selectedProducts="selectedProducts"
      @seleteDeleteProduct="deleteMultipleProduct"
    />
  </div>
</template>

<style scoped></style>
