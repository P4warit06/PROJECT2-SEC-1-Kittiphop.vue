<script setup>
import ProductList from "./ProductList.vue"
import AddEditProduct from "./AddEditProduct.vue"
import HeaderManager from "./HeaderManager.vue"
import FilterProduct from "./FilterProduct.vue"
import ProductTracker from "./ProductTracker.vue"
import {
  getItems,
  deleteItemById,
  addItem,
  editItem,
} from "../libs/fetchUtils.js"
import { ref, onMounted } from "vue"
import { useProducts } from "../stores/products.js"
import { storeToRefs } from "pinia"

const {initialProducts, addProduct, editProduct, deleteProduct } =
  useProducts()
const { products } = storeToRefs(useProducts())

const selectedProducts = ref([])
const productForFilter = ref([])
const arrCat = ref([])
const arrSta = ref([])
const searchValue = ref("")
const searchBy = ref("")

function filterProduct(obj) {
  productForFilter.value = [...products.value]
  if (obj.type === "category") arrCat.value = obj.value
  if (obj.type === "status") arrSta.value = obj.value
  if (obj.type === "searchValue") searchValue.value = obj.value
  if (obj.type === "searchBy") searchBy.value = obj.value
  if (obj.type === "clearSearch" || obj.type === "clear") {
    arrCat.value = []
    arrSta.value = []
    return (productForFilter.value = [...products.value])
  }
  if (searchBy.value.length !== 0 && searchValue.value.length !== 0) {
    if (searchBy.value === "id") {
      return (productForFilter.value = products.value.filter(
        (product) => product.id === searchValue.value
      ))
    } else {
      return (productForFilter.value = products.value.filter((p) =>
        p[searchBy.value]
          .toLowerCase()
          .includes(searchValue.value.toLowerCase())
      ))
    }
  }
  if (arrCat.value.length === 0 && arrSta.value.length === 0) {
    return productForFilter.value
  } else {
    let catArr = products.value.filter((product) =>
      arrCat.value.includes(product.category)
    )
    let staArr = products.value.filter((product) =>
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

onMounted(async () => {
  try {
    const fetchedProducts = await getItems(
      `${import.meta.env.VITE_APP_URL}/products`
    )
    initialProducts(fetchedProducts)
    productForFilter.value = [...fetchedProducts]

    filterCategories.value = fetchedProducts
      .map((p) => p.category)
      .filter(
        (p, index, arr) =>
          p !== undefined && p !== null && arr.indexOf(p) === index
      )
    filterStatus.value = fetchedProducts
      .map((p) => p.status)
      .filter(
        (p, index, arr) =>
          p !== undefined && p !== null && arr.indexOf(p) === index
      )
  } catch (error) {
    console.error("Error loading products:", error)
  }
})

const addNewProduct = async (product) => {
  try {
    const addedItem = await addItem(
      `${import.meta.env.VITE_APP_URL}/products`,
      product
    )
    if (addedItem) {
      addProduct(addedItem)
      productForFilter.value = [...products.value]
    }
  } catch (error) {
    console.error(error)
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
  description: "",
})

const setEditProduct = (editProduct) => {
  isEditing.value = true
  currentProduct.value = { ...editProduct }
}

const updateProduct = async (product) => {
  try {
    const editedItem = await editItem(
      `${import.meta.env.VITE_APP_URL}/products`,
      product.id,
      product
    )
    const editIndex = products.value.findIndex(
      (item) => item.id === editedItem.id
    )
    editProduct(editedItem, editIndex)
    productForFilter.value = [...products.value]
  } catch (error) {
    console.error(error)
  }
  isEditing.value = false
  currentProduct.value = {
    name: "",
    category: "",
    price: 0,
    status: "",
    stock: 0,
    image: "",
    description: "",
  }
}

const deleteExistProduct = async (id) => {
  try {
    const status = await deleteItemById(
      `${import.meta.env.VITE_APP_URL}/products`,
      id
    )
    if (status === 200) {
      const removeIndex = products.value.findIndex((item) => item.id === id)
      if (removeIndex !== -1) {
        deleteProduct(removeIndex)
        productForFilter.value = [...products.value]
      }
    }
  } catch (error) {
    console.error("Error deleting item:", error)
  }
}

const deleteMultipleProduct = async (idList) => {
  try {
    for (let i = 0; i < idList.length; i++) {
      const status = await deleteItemById(
        `${import.meta.env.VITE_APP_URL}/products`,
        idList[i]
      )
      if (status === 200) {
        const removeIndex = products.value.findIndex(
          (item) => item.id === idList[i]
        )
        if (removeIndex !== -1) {
          deleteProduct(removeIndex)
        }
      }
    }
    productForFilter.value = [...products.value]
  } catch (error) {
    console.error("Error deleting items:", error)
  }
}

const cancelAdd = () => {
  isAdding.value = false
  isEditing.value = false
}
</script>

<template>
  <div class="p">
    <HeaderManager />
    <FilterProduct :categories="filterCategories" :status="filterStatus" @filter-product="filterProduct" />
    <!-- Image Display Section -->
    <div class="mx-auto my-2 w-full h-full max-w-[80%]">
      <div class="relative w-full  overflow-hidden rounded-lg shadow-md border">
        <img 
          src="/product-images/product-list-banner.png" 
          alt="Product Management Banner"
          class="w-full h-[40vh] object-cover"
        />

      </div>
    </div>

    <button @click="isAdding = !isAdding"
      class="mt-2 mx-3 px-5 py-2 bg-gradient-to-r from-green-600 to-green-300 text-white font-semibold rounded-2xl shadow-md hover:from-green-500 hover:to-green-300 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
      Add New Product
    </button>

    <AddEditProduct v-if="isAdding || isEditing" :active-product="currentProduct" @add-new-product="addNewProduct"
      @edit-product="updateProduct" @cancel-adding="cancelAdd" />

    <ProductList v-show="!isAdding && !isEditing" @deleteProduct="deleteExistProduct" @setEditing="setEditProduct"
      :products="productForFilter" :selectedProducts="selectedProducts" @selectDeleteProduct="deleteMultipleProduct" />
  </div>
</template>

<style scoped></style>
