<script setup>
import CartModel from "./model/CartModel.vue"
import { ref, onMounted, computed, reactive } from "vue"
import { getItemById } from "@/libs/fetchUtils"
import CalculatePriceBar from "./CalculatePriceBar.vue"

const combindCart = ref([])
const checkboxData = ref([])
const getUser = ref(JSON.parse(localStorage.getItem("currentUser")))
const myUser = ref({})
const showProfileForm = ref(false)
const profileFormLoading = ref(false)
const profileFormError = ref("")

const profileForm = reactive({
  fullname: "",
  location: "",
  contact: "",
})

onMounted(async () => {
  myUser.value = await getItemById(
    `${import.meta.env.VITE_APP_URL}/users`,
    getUser.value.id
  )
  combindCart.value = [...myUser.value.carts]
  const storedUser = localStorage.getItem("currentUser")
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser)
    // Initialize profile form with current values
    profileForm.fullname = myUser.value.fullname || ""
    profileForm.location = myUser.value.location || ""
    profileForm.contact = myUser.value.contact || ""
  } else {
    buyErrorMsg.value = "Please login first"
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
      await editItem(
        `${import.meta.env.VITE_APP_URL}/users`,
        myUser.value.id,
        myUser.value
      )
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
        await editItem(
          `${import.meta.env.VITE_APP_URL}/users`,
          myUser.value.id,
          myUser.value
        )
      } else {
        item.price -= unitPrice
        combindCart.value.splice(productIndex, 1, item)
        myUser.value.carts.splice(productIndex, 1, item)
        await editItem(
          `${import.meta.env.VITE_APP_URL}/users`,
          myUser.value.id,
          myUser.value
        )
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const currentUser = ref(null)
const buyErrorMsg = ref("")
const buySuccessMsg = ref("")

function checkPhoneNumber(phone) {
  const phoneRegex = /^0[2689]\d{8}$/
  return phoneRegex.test(phone)
}

const saveProfile = async () => {
  try {
    profileFormError.value = ""
    profileFormLoading.value = true

    // Validate contact number
    if (profileForm.contact && !checkPhoneNumber(profileForm.contact)) {
      profileFormError.value =
        "Please enter a valid phone number (10 digits starting with 0)"
      profileFormLoading.value = false
      return
    }

    // Validate other required fields
    if (!profileForm.fullname.trim()) {
      profileFormError.value = "Full name is required"
      profileFormLoading.value = false
      return
    }

    if (!profileForm.location.trim()) {
      profileFormError.value = "Address is required"
      profileFormLoading.value = false
      return
    }

    // Update user profile
    const updatedUser = await editItem(
      `${import.meta.env.VITE_APP_URL}/users`,
      myUser.value.id,
      {
        ...myUser.value,
        fullname: profileForm.fullname,
        location: profileForm.location,
        contact: profileForm.contact,
      }
    )

    // Update local references
    myUser.value = updatedUser
    currentUser.value = updatedUser

    // Update localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    // Close modal and continue with purchase
    showProfileForm.value = false

    // Proceed with purchase
    processPurchase()
  } catch (error) {
    profileFormError.value = "Failed to update profile: " + error.message
  } finally {
    profileFormLoading.value = false
  }
}

const isProfileComplete = () => {
  const hasName = myUser.value.fullname ? myUser.value.fullname.trim() !== "" : false;
  const hasLocation = myUser.value.location ? myUser.value.location.trim() !== "" : false;
  const hasContact = myUser.value.contact ? myUser.value.contact.trim() !== "" : false;
  return hasName && hasLocation && hasContact;
}

const handleBuy = async () => {
  try {
    buyErrorMsg.value = ""
    buySuccessMsg.value = ""

    if (checkboxData.value.length === 0) {
      buyErrorMsg.value = "Please select at least one item to purchase"
      return
    }

    const user = currentUser.value
    if (!user) {
      buyErrorMsg.value = "User not found"
      return
    }

    const totalPrice = checkboxData.value.reduce(
      (sum, product) => sum + product.price,
      0
    )

    if (user.balance < totalPrice) {
      buyErrorMsg.value = `Insufficient balance! Needed: $${totalPrice.toFixed(
        2
      )}`
      return
    }

    // Check if profile is complete
    if (!isProfileComplete()) {
      profileForm.fullname = myUser.value.fullname || ""
      profileForm.location = myUser.value.location || ""
      profileForm.contact = myUser.value.contact || ""
      showProfileForm.value = true
      return
    }


    await processPurchase()
  } catch (error) {
    console.error("Purchase validation failed:", error)
    buyErrorMsg.value = "An error occurred during purchase validation"
  }
}

const processPurchase = async () => {
  try {
    // Re-validate selection and balance in case things changed
    if (checkboxData.value.length === 0) {
      buyErrorMsg.value = "Please select at least one item to purchase"
      return
    }

    const totalPrice = checkboxData.value.reduce(
      (sum, product) => sum + product.price,
      0
    )

    if (currentUser.value.balance < totalPrice) {
      buyErrorMsg.value = `Insufficient balance! Needed: $${totalPrice.toFixed(
        2
      )}`
      return
    }
    for (const product of checkboxData.value) {
      const productInDB = await getItemById(
        `${import.meta.env.VITE_APP_URL}/products`,
        product.id
      )
      if (product.quantity > productInDB.stock) {
        buyErrorMsg.value = `"${product.name}" is out of stock!`
        return
      }
    }

    currentUser.value.balance -= totalPrice
    for (const product of checkboxData.value) {
      const productInDB = await getItemById(
        `${import.meta.env.VITE_APP_URL}/products`,
        product.id
      )
      await editItem(`${import.meta.env.VITE_APP_URL}/products`, product.id, {
        ...productInDB,
        stock: productInDB.stock - product.quantity,
      })
      const productIndex = combindCart.value.findIndex(
        (item) => item.id === product.id
      )
      if (productIndex !== -1) {
        combindCart.value.splice(productIndex, 1)
        myUser.value.carts.splice(productIndex, 1)
      }
    }

    const updatedUser = await editItem(
      `${import.meta.env.VITE_APP_URL}/users`,
      currentUser.value.id,
      {
        ...currentUser.value,
        balance: currentUser.value.balance,
        carts: myUser.value.carts,
      }
    )

    currentUser.value = updatedUser
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    checkboxData.value = []

    buySuccessMsg.value = "Purchase successful!"
    setTimeout(() => (buySuccessMsg.value = ""), 3000)
  } catch (error) {
    console.error("Purchase failed:", error)
    buyErrorMsg.value = "An error occurred during purchase"
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
  return (
    checkboxData.value.length === combindCart.value.length &&
    combindCart.value.length > 0
  )
})
</script>

<template>
  <div>
    <div
      v-if="buyErrorMsg"
      class="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
    >
      {{ buyErrorMsg }}
      <button @click="buyErrorMsg = ''" class="ml-2 text-xl">&times</button>
    </div>

    <div
      v-if="buySuccessMsg"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    >
      {{ buySuccessMsg }}
    </div>
    <div
      v-if="showProfileForm"
      class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-lg">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800">
            Complete Your Profile
          </h2>
          <p class="text-gray-600 mt-1 text-sm md:text-base">
            Please provide your details to complete your purchase.
          </p>
        </div>

        <div class="p-6">
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div>
              <label
                class="block text-sm md:text-base font-medium text-gray-700 mb-1"
              >
                Full Name*
              </label>
              <input
                v-model="profileForm.fullname"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label
                class="block text-sm md:text-base font-medium text-gray-700 mb-1"
              >
                Address*
              </label>
              <p class="text-xs md:text-sm text-gray-500 mb-2">
                Please enter your full address in the format: House number,
                Street, Subdistrict, District, Province, Postal Code
              </p>
              <textarea
                v-model="profileForm.location"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 123, Main Street, Huai Khwang, Bangkok, 10310"
                required
              ></textarea>
            </div>

            <div>
              <label
                class="block text-sm md:text-base font-medium text-gray-700 mb-1"
              >
                Phone Number*
              </label>
              <input
                v-model="profileForm.contact"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 0812345678"
                required
              />
            </div>

            <div
              v-if="profileFormError"
              class="bg-red-100 p-3 rounded-md text-red-700 text-sm md:text-base"
            >
              {{ profileFormError }}
            </div>
          </form>
        </div>

        <div
          class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 rounded-b-lg"
        >
          <button
            @click="showProfileForm = false"
            type="button"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:brightness-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            @click="saveProfile"
            type="button"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :disabled="profileFormLoading"
          >
            <span v-if="profileFormLoading">Saving...</span>
            <span v-else>Save and Continue</span>
          </button>
        </div>
      </div>
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
        <div
          class="w-full flex flex-col md:flex-row md:justify-between md:items-center"
        >
          <div
            class="flex items-center space-x-2 border p-3 rounded-lg mt-4 w-full md:w-auto"
          >
            <input
              @change="selectAll"
              :checked="isSelectAll"
              type="checkbox"
              id="selectAll"
              class="h-5 w-5 text-blue-500"
            />
            <label for="selectAll" class="text-lg text-black">Select All</label>
          </div>
          <div
            class="flex items-center space-x-2 border rounded-lg mt-4 w-full md:w-auto"
          >
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
          <h1
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center md:text-left"
          >
            Order
          </h1>
          <div
            v-show="combindCart.length <= 0"
            class="w-full flex justify-center items-center my-5"
          >
            <h1 class="text-xl md:text-4xl text-gray-500 text-center">
              No products available
            </h1>
          </div>
        </template>

        <template #listProduct="{ yourProduct }">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white shadow-lg rounded-lg mb-4 space-y-4 md:space-y-0"
          >
            <div class="flex flex-col space-y-2 w-full md:w-2/3">
              <div>
                <input
                  type="checkbox"
                  :value="yourProduct"
                  v-model="checkboxData"
                />
              </div>

              <router-link
                class="flex flex-col"
                :to="{
                  name: 'UserProductDetail',
                  params: { productId: yourProduct.id },
                }"
              >
                <span class="text-lg md:text-xl font-semibold text-gray-900">{{
                  yourProduct.name
                }}</span>
                <span class="text-sm md:text-lg text-green-600">
                  Price:
                  <span class="font-bold">{{
                    yourProduct.price.toFixed(2)
                  }}</span>
                </span>
                <span class="text-sm text-gray-600">
                  Stock:
                  <span class="font-semibold">{{ yourProduct.stock }}</span>
                </span>
              </router-link>
            </div>

            <div
              class="sm:flex sm:justify-end sm:items-center sm:space-x-2 sm:w-full sm:w-auto"
            >
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
      <CalculatePriceBar
        :products="checkboxData"
        @buy="handleBuy"
      ></CalculatePriceBar>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
