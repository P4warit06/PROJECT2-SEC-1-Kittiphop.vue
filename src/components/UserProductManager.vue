<script setup>
import UserProductList from './UserProductList.vue'
import UserProductDetails from './UserProductDetails.vue'
import Navbar from "./Navbar.vue"
import { ref, onMounted, computed } from 'vue'
import { getItems, getItemById, editItem, addItem } from '../libs/fetchUtils.js' // เพิ่ม import editItem และ addItem
import { useRouter } from 'vue-router'
import {useProducts} from '../stores/products.js'
import FilterProduct from './FilterProduct.vue'
import { storeToRefs } from 'pinia';
const {initialProducts, getProducts } = useProducts()
const {products } = storeToRefs(useProducts())
const getUser = ref(JSON.parse(localStorage.getItem("currentUser")))
const myUser = ref({})
const myCarts = ref([])
const limitShowProduct = ref(10)
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
    console.log(count.value)
  } catch(error) {
    console.error("Error in UserProductManager setup:", error)
  }
})

const currentProduct = ref({})

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
  // console.log(obj.value)
  productForFilter.value = [...getProducts()]
  console.log(productForFilter.value)
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
    console.log(productForFilter.value)
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
  </div>
</template>

<style scoped></style>
