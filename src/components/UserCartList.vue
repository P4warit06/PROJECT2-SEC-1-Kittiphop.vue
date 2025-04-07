<script setup>
import CartModel from "./model/CartModel.vue"
import { ref, onMounted, computed } from "vue"
import {
  getItems,
  editItem,
  deleteItemById,
  getItemById,
} from "@/libs/fetchUtils"
import CalculatePriceBar from "./CalculatePriceBar.vue"

const combindCart = ref([])
const checkboxData = ref([])
const getUser = ref(JSON.parse(localStorage.getItem("currentUser")))
const myUser = ref({})
const showInsufficientBalanceModal = ref(false)
const showMissingInfoModal = ref(false)
const totalCost = ref(0)
const missingUserInfo = ref({
  fullname: '',
  location: '',
  contact: ''
})
const isUpdatingProfile = ref(false)
const userInfoUpdateError = ref('')

onMounted(async () => {
  myUser.value = await getItemById(`${import.meta.env.VITE_APP_URL}/users`, getUser.value.id)
  combindCart.value = [...myUser.value.carts]
  const storedUser = localStorage.getItem("currentUser")
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser)
  } else {
    errorMessage.value = "Please login first"
  }
})

const addQuantity = async (item) => {
  try {
    const product = combindCart.value.find((product) => product.id === item.id)

    if (product && item.quantity < product.stock) {
      const unitPrice = item.price / item.quantity || item.price
      console.log(unitPrice)
      item.quantity += 1
      item.price = unitPrice * item.quantity
      const productIndex = combindCart.value.findIndex(
        (product) => product.id === item.id
      )
      combindCart.value.splice(productIndex, 1, item)
      myUser.value.carts.splice(productIndex, 1, item)
      console.log(myUser.value.carts)
      await editItem(`${import.meta.env.VITE_APP_URL}/users`, myUser.value.id, myUser.value)
    } else {
      console.log("Stock is not enough or product not found.")
    }
  } catch (error) {
    console.log(error)
  }
}

const decreaseQuantity = async (item) => {
  try {
    const productIndex = combindCart.value.findIndex(
          (product) => product.id === item.id
    )
    if (item) {
      const unitPrice = item.price / item.quantity
      item.quantity -= 1
      if (item.quantity <= 0) {
        combindCart.value.splice(productIndex, 1)
        myUser.value.carts.splice(productIndex, 1)
        await editItem(`${import.meta.env.VITE_APP_URL}/users`, myUser.value.id, myUser.value)
      } else {
        item.price -= unitPrice
        combindCart.value.splice(productIndex, 1, item)
        myUser.value.carts.splice(productIndex, 1, item)
        await editItem(`${import.meta.env.VITE_APP_URL}/users`, myUser.value.id, myUser.value)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const currentUser = ref(null)
const errorMessage = ref("")
const successMessage = ref("")

function checkPhoneNumber(phone) {
  const phoneRegex = /^0[2689]\d{8}$/
  return phoneRegex.test(phone)
}

const handleBuy = async (product) => {
  try {
    errorMessage.value = ''
    successMessage.value = ''

    // Check if products are selected
    if (!checkboxData.value || checkboxData.value.length === 0) {
      errorMessage.value = "Please select at least one product to purchase"
      return
    }

    const user = currentUser.value
    if (!user) {
      errorMessage.value = "User not found"
      return
    }

    totalCost.value = product.price

    // Check if user has sufficient balance
    if (user.balance < product.price) {
      showInsufficientBalanceModal.value = true
      return
    }

    // Check if user has all required information - looking for fullName with capital N
    if (!user.fullName && !user.fullname) {
      missingUserInfo.value = {
        fullname: user.fullName || user.fullname || '',
        location: user.location || '',
        contact: user.contact || ''
      }
      showMissingInfoModal.value = true
      return
    }
    
    if (!user.location || !user.contact) {
      missingUserInfo.value = {
        fullname: user.fullName || user.fullname || '',
        location: user.location || '',
        contact: user.contact || ''
      }
      showMissingInfoModal.value = true
      return
    }

    // Get the latest product data to check stock
    const productInDB = await getItemById(
      `${import.meta.env.VITE_APP_URL}/products`,
      product.id
    )

    if (!productInDB) {
      errorMessage.value = `Product not found in database`
      return
    }

    if (product.quantity > productInDB.stock) {
      errorMessage.value = `"${product.name}" is out of stock!`
      return
    }

    // Process the purchase - deduct balance from user
    user.balance -= product.price
    const updatedUser = await editItem(
      `${import.meta.env.VITE_APP_URL}/users`,
      user.id,
      { ...user, balance: user.balance }
    )

    // Update product stock
    await editItem(
      `${import.meta.env.VITE_APP_URL}/products`,
      product.id,
      { ...productInDB, stock: productInDB.stock - product.quantity }
    )

    // Remove product from user's cart in the database
    const productIndex = myUser.value.carts.findIndex(item => item.id === product.id)
    if (productIndex !== -1) {
      myUser.value.carts.splice(productIndex, 1)
      
      await editItem(
        `${import.meta.env.VITE_APP_URL}/users`, 
        myUser.value.id, 
        myUser.value
      )
      
      // Update local state
      combindCart.value = combindCart.value.filter(item => item.id !== product.id)
      checkboxData.value = checkboxData.value.filter(item => item.id !== product.id)
    }

    currentUser.value = updatedUser
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    successMessage.value = "Purchase successful!"
    setTimeout(() => (successMessage.value = ""), 3000)
  } catch (error) {
    console.error("Purchase failed:", error)
    errorMessage.value = `An error occurred during purchase: ${error.message || "Unknown error"}`
  }
}

const selectAll = (event) => {
  console.log(event.target.checked)
  if (event.target.checked) {
    checkboxData.value = [...combindCart.value]
  } else {
    checkboxData.value = []
  } 
}

const isSelectAll = computed(() => {
  return checkboxData.value.length === combindCart.value.length
})

const closeInsufficientBalanceModal = () => {
  showInsufficientBalanceModal.value = false
}

const closeMissingInfoModal = () => {
  showMissingInfoModal.value = false
  userInfoUpdateError.value = ''
}

const saveUserInfo = async () => {
  try {
    userInfoUpdateError.value = ''
    isUpdatingProfile.value = true
    
    // Validate phone number
    if (missingUserInfo.value.contact && !checkPhoneNumber(missingUserInfo.value.contact)) {
      userInfoUpdateError.value = "Please enter a valid phone number (10 digits starting with 0)"
      isUpdatingProfile.value = false
      return
    }
    
    // Validate other fields
    if (!missingUserInfo.value.fullname.trim()) {
      userInfoUpdateError.value = "Full name is required"
      isUpdatingProfile.value = false
      return
    }
    
    if (!missingUserInfo.value.location.trim()) {
      userInfoUpdateError.value = "Address is required"
      isUpdatingProfile.value = false
      return
    }
    
    // Update user information - fix the field name to match database structure
    // Check if the user has fullName (capital N) or fullname (lowercase n)
    const updatedUser = {
      ...currentUser.value
    }
    
    // Handle both possible field names consistently
    if ('fullName' in currentUser.value) {
      updatedUser.fullName = missingUserInfo.value.fullname
    } else {
      updatedUser.fullname = missingUserInfo.value.fullname
    }
    
    updatedUser.location = missingUserInfo.value.location
    updatedUser.contact = missingUserInfo.value.contact
    
    const result = await editItem(
      `${import.meta.env.VITE_APP_URL}/users`,
      currentUser.value.id,
      updatedUser
    )
    
    // Update local state and storage
    currentUser.value = result
    myUser.value = result
    localStorage.setItem("currentUser", JSON.stringify(result))
    
    // Close modal and proceed with purchase
    showMissingInfoModal.value = false
    
    // Try the purchase again with the updated info
    const selectedProduct = checkboxData.value[0]
    if (selectedProduct) {
      handleBuy(selectedProduct)
    }
  } catch (error) {
    console.error("Failed to update user information:", error)
    userInfoUpdateError.value = "Failed to update information. Please try again."
  } finally {
    isUpdatingProfile.value = false
  }
}
</script>

<template>
  <div>
    <div
      v-if="errorMessage"
      class="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
    >
      {{ errorMessage }}
      <button @click="errorMessage = ''" class="ml-2 text-xl">&times</button>
    </div>

    <div
      v-if="successMessage"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    >
      {{ successMessage }}
    </div>

    <div v-if="currentUser" class="p-4 bg-blue-50 border-b border-blue-100">
      <div class="container mx-auto">
        <p class="text-lg font-medium text-blue-800">
          Your Balance:
          <span class="font-bold">${{ currentUser.balance.toFixed(2) }}</span>
        </p>
      </div>
    </div>

    <div class="p-6 bg-gray-100 min-h-screen">
      <div class="w-full flex flex-col justify-between items-center mb-6">

        <!-- <div class="w-full flex">
          <div class="w-5/6">
            <input
              type="text"
              placeholder="Search"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="w-1/6 ml-2">
            <button
              class="w-full bg-blue-500 text-white h-full rounded-lg cursor-pointer hover:opacity-85"
            >
              Search
            </button>
          </div>
        </div> -->

        <div class="w-full flex flex-col md:flex-row md:justify-between md:items-center">
          <div class="flex items-center space-x-2 border p-3 rounded-lg mt-4 w-full md:w-auto">
            <input
              @change="selectAll"
              :checked="isSelectAll"
              type="checkbox"
              id="selectAll"
              class="h-5 w-5 text-blue-500"
            />
            <label for="selectAll" class="text-lg text-black">Select All</label>
          </div>
          <div class="flex items-center space-x-2 border rounded-lg mt-4 w-full md:w-auto">
            <select class="p-3 w-full md:w-auto">
              <option disabled value="">Select category</option>
              <option value="">Select category</option>
              <option value="">Select category</option>
              <option value="">Select category</option>
            </select>
          </div>
        </div>
      </div>
      
      <CartModel :products="combindCart">
          <template #heading>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">Order</h1>
            <div
              v-show="combindCart.length <= 0"
              class="w-full flex justify-center items-center my-5"
            >
              <h1 class="text-xl md:text-4xl text-gray-500 text-center">No products available</h1>
            </div>
          </template>

          <template #listProduct="{ yourProduct }">
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white shadow-lg rounded-lg mb-4 space-y-4 md:space-y-0"
            >
              <div class="flex flex-col space-y-2 w-full md:w-2/3">
                <div>
                  <input type="checkbox" :value="yourProduct" v-model="checkboxData">
                </div>

                <router-link class="flex flex-col" :to="{name: 'UserProductDetail', params: {productId: yourProduct.id}}">
                  <span class="text-lg md:text-xl font-semibold text-gray-900">{{ yourProduct.name }}</span>
                  <span class="text-sm md:text-lg text-green-600">
                    Price:
                    <span class="font-bold">{{ yourProduct.price.toFixed(2) }}</span>
                  </span>
                  <span class="text-sm text-gray-600">
                    Stock:
                    <span class="font-semibold">{{ yourProduct.stock }}</span>
                  </span>
                </router-link>
              </div>

              <div class="sm:flex sm:justify-center sm:items-center sm:space-x-2 sm:w-full sm:w-auto">
                <button
                  @click="decreaseQuantity(yourProduct)"
                  class="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  -
                </button>

                <input
                  type="number"
                  v-model="yourProduct.quantity"
                  min="0"
                  :max="yourProduct.stock"
                  class="mx-1 w-16 border border-gray-300 rounded-lg px-3 py-1 text-center text-lg font-semibold"
                />

                <button
                  @click="addQuantity(yourProduct)"
                  class="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  +
                </button>
              </div>
            </div>
          </template>
        </CartModel>
      <CalculatePriceBar :products="checkboxData" @buy="handleBuy"></CalculatePriceBar>
    </div>
    
    <!-- Insufficient Balance Modal -->
    <div v-if="showInsufficientBalanceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div class="text-center">
          <div class="mx-auto mb-6 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Insufficient Balance</h3>
          <p class="text-gray-600 mb-6">
            Your balance is insufficient to complete this purchase.
            <br>
            <span class="font-medium">Required: ${{ totalCost.toFixed(2) }}</span>
            <br>
            <span class="font-medium">Your balance: ${{ currentUser?.balance.toFixed(2) }}</span>
          </p>
          
          <div class="flex justify-center space-x-4">
            <router-link to="/top-up" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Top Up Balance
            </router-link>
            <button 
              @click="closeInsufficientBalanceModal" 
              class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Missing User Information Modal -->
    <div v-if="showMissingInfoModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div class="text-center mb-6">
          <div class="mx-auto mb-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Missing Information</h3>
          <p class="text-gray-600 mb-4">
            Please complete your profile information to continue with your purchase.
          </p>
        </div>
        
        <div v-if="userInfoUpdateError" class="bg-red-100 p-4 rounded-md text-red-700 mb-4">
          {{ userInfoUpdateError }}
        </div>
        
        <form @submit.prevent="saveUserInfo" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              v-model="missingUserInfo.fullname"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              v-model="missingUserInfo.contact"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 0812345678"
              required
            />
            <p class="text-xs text-gray-500 mt-1">Format: 10 digits starting with 0</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              v-model="missingUserInfo.location"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="House number, Street, Subdistrict, District, Province, Postal Code"
              required
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-4 pt-4">
            <button 
              type="button"
              @click="closeMissingInfoModal" 
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              :disabled="isUpdatingProfile"
            >
              <span v-if="isUpdatingProfile">Saving...</span>
              <span v-else>Save and Continue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0
}
</style>