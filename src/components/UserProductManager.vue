<script setup>
import UserProductList from './UserProductList.vue'
import Navbar from "./Navbar.vue"
import { ref, onMounted, computed } from 'vue'
import { getItems, getItemById, editItem, addItem } from '../libs/fetchUtils.js'
import {useProducts} from '../stores/products.js'
import FilterProduct from './FilterProduct.vue'
const {initialProducts, getProducts } = useProducts()
const getUser = ref(JSON.parse(localStorage.getItem("currentUser")))
const myUser = ref({})
const myCarts = ref([])
const count = computed(() => {
  return myCarts.value?.reduce((total, cart) => total + (cart.quantity || 0), 0) || 0
})


onMounted(async () => {
  try {
    if (getUser.value) {
        myUser.value = await getItemById(`${import.meta.env.VITE_APP_URL}/users`, getUser.value.id)
        myCarts.value = [...myUser.value.carts]
    } else {
      console.warn("No user logged in")
    }
    
    const fetchedProducts = await getItems(`${import.meta.env.VITE_APP_URL}/products`)
    initialProducts(fetchedProducts)
    productForFilter.value = getProducts()
    filterCategories.value = getProducts()
      .map((p) => p.category)
      .filter(
        (p, index, arr) =>
          p !== undefined && p !== null && arr.indexOf(p) === index
      )
    filterStatus.value = getProducts()
      .map((p) => p.status)
      .filter(
        (p, index, arr) =>
          p !== undefined && p !== null && arr.indexOf(p) === index
      )
  } catch(error) {
    console.error("Error in UserProductManager setup:", error)
  }
})

const currentProduct = ref({})

const showNoti = ref(false)
const notiMsg = ref('')
const notiProduct = ref(null)

const addProductToCart = async (product) => {
    try {
        currentProduct.value = await getItemById(`${import.meta.env.VITE_APP_URL}/products`, product.id)
        if (currentProduct.value && currentProduct.value.stock > 0) {
            const findIndexProduct = myCarts.value.findIndex((cartItem) => cartItem.id === currentProduct.value.id)
            if (findIndexProduct !== -1) {
                const cartItem = myCarts.value[findIndexProduct]
                if (cartItem.quantity < currentProduct.value.stock) {
                    cartItem.quantity += 1
                    cartItem.price = cartItem.quantity * currentProduct.value.price
                    myCarts.value.splice(findIndexProduct, 1, cartItem)
                    myUser.value.carts.splice(findIndexProduct, 1, cartItem)
                    await editItem(`${import.meta.env.VITE_APP_URL}/users`, myUser.value.id, myUser.value)
                    
                    notiProduct.value = currentProduct.value
                    notiMsg.value = `Added one more ${currentProduct.value.name} to your cart`
                    showNoti.value = true
    
                    setTimeout(() => {
                        showNoti.value = false
                    }, 3000)
                } else {
                    console.log("Stock is not enough!")
                }
            } else {
                const newCartItem = { 
                  ...currentProduct.value, 
                  quantity: 1, 
                  price: currentProduct.value.price 
                }
                myCarts.value.push(newCartItem)
                myUser.value.carts.push(newCartItem)             
                await editItem(`${import.meta.env.VITE_APP_URL}/users`, myUser.value.id, myUser.value)
                
                notiProduct.value = currentProduct.value
                notiMsg.value = `${currentProduct.value.name} added to your cart`
                showNoti.value = true
                setTimeout(() => {
                    showNoti.value = false
                }, 3000)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const productForFilter = ref([])
const arrCat = ref([])
const arrSta = ref([])
const searchValue = ref("")
const searchBy = ref("")

function filterProduct(obj) {
  productForFilter.value = [...getProducts()]
  if (obj.type === "category") arrCat.value = obj.value
  if (obj.type === "status") arrSta.value = obj.value
  if (obj.type === "searchValue") searchValue.value = obj.value
  if (obj.type === "searchBy") searchBy.value = obj.value
  if (obj.type === "clearSearch" || obj.type === "clear") {
    arrCat.value = []
    arrSta.value = []
    return (productForFilter.value = [...getProducts()])
  }
  if (searchBy.value.length !== 0 && searchValue.value.length !== 0) {
    if (searchBy.value === "id") {
      return (productForFilter.value = getProducts().filter(
        (product) => product.id === searchValue.value
      ))
    } else {
      return (productForFilter.value = getProducts().filter((p) =>
        p[searchBy.value]
          .toLowerCase()
          .includes(searchValue.value.toLowerCase())
      ))
    }
  }
  if (arrCat.value.length === 0 && arrSta.value.length === 0) {
    return productForFilter.value
  } else {
    let catArr = getProducts().filter((product) =>
      arrCat.value.includes(product.category)
    )
    let staArr = getProducts().filter((product) =>
      arrSta.value.includes(product.status)
    )
    if (arrCat.value.length !== 0 && arrSta.value.length === 0)
      return (productForFilter.value = catArr)
    if (arrCat.value.length === 0 && arrSta.value.length !== 0)
      return (productForFilter.value = staArr)
    if (arrCat.value.length !== 0 && arrSta.value.length !== 0) {
      let intersect = catArr.filter((catProduct) =>
        staArr.some((staProduct) => staProduct.id === catProduct.id)
      )
      return (productForFilter.value = intersect)
    }
  }
}

const filterCategories = ref([])
const filterStatus = ref([])
</script>



<template>
  <div>
    <Navbar :count="count"/>
    <FilterProduct :categories="filterCategories" :status="filterStatus" @filter-product="filterProduct" />
    <UserProductList :products="productForFilter" @add-to-cart="addProductToCart"></UserProductList>
    
    <div v-if="showNoti" 
         class="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md animate-slideDown z-50 border-l-4 border-green-500 flex">
      <div class="flex-shrink-0 mr-4">
        <div class="bg-green-100 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <div class="flex-grow">
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-semibold text-gray-900">Added to Cart</h3>
          <button @click="showNoti = false" class="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <p class="text-gray-600">{{ notiMsg }}</p>
        <div class="mt-2">
          <router-link to="/user-carts" class="text-blue-500 hover:text-blue-700 font-medium flex items-center">
            View Cart
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-slideDown {
  animation: slideDown 0.3s ease-out forwards;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
