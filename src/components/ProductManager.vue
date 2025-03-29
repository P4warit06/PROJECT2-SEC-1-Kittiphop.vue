<script setup>
import ProductList from './ProductList.vue'
import AddEditProduct from './AddEditProduct.vue'
import HeaderManager from './HeaderManager.vue'
import FilterProduct from './FilterProduct.vue';
import Productracker from './ProductTracker.vue';
import { getItems, deleteItemById, addItem, editItem } from '../libs/fetchUtils.js'
import {ref , computed , onMounted} from 'vue' 
const myProducts = ref([])
const selectedProducts = ref([])

const productForFilter = ref([])
const arrCat = ref([])
const arrSta = ref([])
const searchValue = ref("")
const searchBy = ref("")

function filterProduct(obj){
  productForFilter.value = myProducts.value
  if(obj.type === 'category') arrCat.value = obj.value
  if(obj.type === 'status') arrSta.value = obj.value 
  if(obj.type === 'searchValue') searchValue.value = obj.value
  if(obj.type === 'searchBy') searchBy.value = obj.value
  if(obj.type === 'clearSearch'){
    arrCat.value = []
    arrSta.value = []
    return productForFilter.value 
  }
  if(obj.type === 'clear'){
    arrCat.value = []
    arrSta.value = []
    return productForFilter.value 
  }
  if(searchBy.value.length !== 0 && searchValue.value.length !== 0){
    if(searchBy.value === 'id'){
      return productForFilter.value = myProducts.value.filter(product => product.id === searchValue.value);
    }
    else{
      return productForFilter.value = myProducts.value.filter(
      p => p[searchBy.value].toLowerCase().includes(searchValue.value.toLowerCase())
    )
    }
    
  }
  if(arrCat.value.length === 0 && arrSta.value.length === 0 ) {
    return productForFilter.value 
  }
  else{
    let catArr = myProducts.value.filter(
      product => arrCat.value.includes(product.category)
    )
    let staArr = myProducts.value.filter(
      product => arrSta.value.includes(product.status)
    )
    if(arrCat.value.length !== 0 && arrSta.value.length === 0) return productForFilter.value = catArr
    if(arrCat.value.length === 0 && arrSta.value.length !== 0) return productForFilter.value = staArr
    if(arrCat.value.length !== 0 && arrSta.value.length !== 0) {
      let intersect = catArr.filter( 
        catProduct => staArr.some(staProduct => staProduct.id === catProduct.id)
      )
     return productForFilter.value = intersect
    }

  }
}

const filterCategories = ref([])
const filterStatus = ref([])
onMounted(async () => {
  try {
    myProducts.value = await getItems(
      `${import.meta.env.VITE_APP_URL}/products`
    )
    productForFilter.value = await getItems(
      `${import.meta.env.VITE_APP_URL}/products`
    )
    filterCategories.value = myProducts.value
    .map( p => p.category )
    .filter(
      (p,index , arr) => p !== undefined && 
      p !== null &&
      arr.indexOf(p) === index
    )
    filterStatus.value = myProducts.value
    .map(
      p => p.status
    )
    .filter(
      (p,index , arr) => p !== undefined && 
      p !== null &&
      arr.indexOf(p) === index
    )
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
  <div class="p">
    <HeaderManager/>
    {{ myProducts.value }}
    <FilterProduct 
      :categories="filterCategories"
      :status="filterStatus"
      @filter-product="filterProduct"  
    />
    <Productracker></Productracker>
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
      @update:selectedProducts="selectedProducts = $event"
      :products="productForFilter" 
      :selectedProducts="selectedProducts"
      @seleteDeleteProduct="deleteMultipleProduct"
    />
  </div>
</template>

<style scoped></style>
