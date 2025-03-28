<script setup>
import ProductList from './ProductList.vue'
import AddEditProduct from './AddEditProduct.vue'
import Header from "./Header.vue";
import FilterProduct from './FilterProduct.vue';
import { ref, onMounted , computed } from 'vue'
import { getItems, deleteItemById, addItem, editItem } from '../libs/fetchUtils.js'
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
//add product
const addProduct = async (product) => {
  //fetch() - POST
  try {
    const addedItem = await addItem(
      `${import.meta.env.VITE_APP_URL}/products`,
      product
    )
    //validate new product
    if (addItem) {
      myProducts.value.push(addedItem)
    }
  } catch (error) {
    console.loc(error)
  }

  isAdding.value = false
}
const isAdding = ref(false)
//edit product
const isEditing = ref(false)
const currentProduct = ref({name : '' , price: 0})

const setEditProduct = (editProduct) => {
  isEditing.value = true
  console.log(editProduct)
  currentProduct.value = {...editProduct} // copy the object to avoid reference
  console.log(currentProduct.value)

}
const updateProduct = async (product) => {
  //validate 
 

  //call backend
  try {
    const editedItem = await editItem(`${import.meta.env.VITE_APP_URL}/products`, product.id, product)
      //update frontend state
    const editIndex = myProducts.value.findIndex(
      (item) => item.id === editedItem.id
    )
    myProducts.value.splice(editIndex, 1, editedItem)
  }
  catch (error) {
    console.log(error)
  }
  isEditing.value = false
  currentProduct.value = {name: '', price: 0}

  
}

//delete product
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

const deleteMultipleProduct = async () => {
  if (selectedProducts.value.length === 0) {
    alert("Please select products")
    return
  }

  try {
    const deletePromises = selectedProducts.value.map(async (id) => {
      const status = await deleteItemById(`${import.meta.env.VITE_APP_URL}/products`, id)
      if (status !== 200) {
        throw new Error(`Error ID: ${id}`)
      }
    })

    await Promise.all(deletePromises)

    myProducts.value = myProducts.value.filter(product => !selectedProducts.value.includes(product.id))
    selectedProducts.value = [] 
    alert("deleted")
  } catch (error) {
    console.error(error)
    alert("erro")
  }
}

</script>

<template>
  <div class="p">
    <Header></Header>
    {{ myProducts.value }}
    <FilterProduct 
      :categories="filterCategories"
      :status="filterStatus"
      @filter-product="filterProduct"  
    />
    <button
      @click="isAdding = !isAdding"
      class="text-green-600 hover:text-green-400 underline cursor-pointer"
    >
      Add New Product
    </button>
    <!-- ปุ่มลบสินค้าหลายรายการ -->
    <button 
      @click="deleteMultipleProduct"
      class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
    >
      Delete All
    </button>
    <AddEditProduct v-if="isAdding | isEditing" 
    @add-new-product="addProduct" 
    :active-product="currentProduct" 
    @edit-product="updateProduct"/>
    <ProductList 
      v-show="!isAdding && !isEditing" 
      @deleteProduct="deleteProduct" 
      @setEditing="setEditProduct" 
      @update:selectedProducts="selectedProducts = $event"
      :products="productForFilter" 
      :selectedProducts="selectedProducts"
    />
    
  </div>
</template>

<style scoped></style>
