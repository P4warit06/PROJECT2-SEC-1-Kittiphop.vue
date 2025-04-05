<script setup>
import CartModel from "./model/CartModel.vue";
import { ref, onMounted, computed } from "vue";
import {
  getItems,
  editItem,
  deleteItemById,
  getItemById,
} from "@/libs/fetchUtils";
import CalculatePriceBar from "./CalculatePriceBar.vue";

const combindCart = ref([]);
const checkboxData = ref([])
onMounted(async () => {
  combindCart.value = await getItems(`${import.meta.env.VITE_APP_URL}/carts`);

  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser);
  } else {
    errorMessage.value = "Please login first";
  }
});

const addQuantity = async (item) => {
  try {
    const product = combindCart.value.find((product) => product.id === item.id);

    if (product && item.quantity < product.stock) {
      const unitPrice = item.price / item.quantity || item.price;
      console.log(unitPrice);
      item.quantity += 1;
      item.price = unitPrice * item.quantity;
      const editProduct = await editItem(
        `${import.meta.env.VITE_APP_URL}/carts`,
        item.id,
        item
      );
      const productIndex = combindCart.value.findIndex(
        (product) => product.id === item.id
      );
      combindCart.value.splice(productIndex, 1, editProduct);
    } else {
      console.log("Stock is not enough or product not found.");
    }
  } catch (error) {
    console.log(error);
  }
};

const decreaseQuantity = async (item) => {
  try {
    if (item) {
      const unitPrice = item.price / item.quantity;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        const status = await deleteItemById(
          `${import.meta.env.VITE_APP_URL}/carts`,
          item.id
        );
        if (status === 200) {
          const removeIndex = combindCart.value.findIndex(
            (product) => product.id === item.id
          );
          if (removeIndex !== -1) {
            combindCart.value.splice(removeIndex, 1);
          }
        }
      } else {
        item.price -= unitPrice;
        const editProduct = await editItem(
          `${import.meta.env.VITE_APP_URL}/carts`,
          item.id,
          item
        );
        const productIndex = combindCart.value.findIndex(
          (product) => product.id === item.id
        );
        combindCart.value.splice(productIndex, 1, editProduct);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const inputQuantity = async (item) => {
  try {
    const product = combindCart.value.find((product) => product.id === item.id);
    if (item && item.quantity < product.stock) {
      const editProduct = await editItem(
        `${import.meta.env.VITE_APP_URL}/carts`,
        item.id,
        item
      );
      const productIndex = combindCart.value.findIndex(
        (product) => product.id === item.id
      );
      combindCart.value.splice(productIndex, 1, editProduct);
      if (editProduct.quantity <= 0) {
        const status = await deleteItemById(
          `${import.meta.env.VITE_APP_URL}/carts`,
          editProduct.id
        );
        if (status === 200) {
          combindCart.value.splice(productIndex, 1);
        }
      }
    } else if (item && item.quantity > product.stock) {
      item.quantity = product.stock;
      item.price = item.quantity * product.price;
      const editProduct = await editItem(
        `${import.meta.env.VITE_APP_URL}/carts`,
        item.id,
        item
      );
      const productIndex = combindCart.value.findIndex(
        (product) => product.id === item.id
      );
      combindCart.value.splice(productIndex, 1, editProduct);
    }
  } catch (error) {
    console.log(error);
  }
};

const currentUser = ref(null);
const errorMessage = ref("");
const successMessage = ref("");

const handleBuy = async (product) => {
  try {
    errorMessage.value = '';
    successMessage.value = '';

    const user = currentUser.value;
    if (!user) {
      errorMessage.value = "User not found";
      return;
    }

    if (user.balance < product.price) {
      errorMessage.value = `Insufficient balance! Needed: $${product.price.toFixed(2)}`;
      return;
    }

    const productInDB = await getItemById(
      `${import.meta.env.VITE_APP_URL}/products`,
      product.id
    );

    if (product.quantity > productInDB.stock) {
      errorMessage.value = `"${product.name}" is out of stock!`;
      return;
    }

    user.balance -= product.price;
    const updatedUser = await editItem(
      `${import.meta.env.VITE_APP_URL}/users`,
      user.id,
      { ...user, balance: user.balance }
    );

    await editItem(
      `${import.meta.env.VITE_APP_URL}/products`,
      product.id,
      { ...productInDB, stock: productInDB.stock - product.quantity }
    );

    const status = await deleteItemById(
      `${import.meta.env.VITE_APP_URL}/carts`,
      product.id
    );
    
    if (status === 200) {
      const productIndex = combindCart.value.findIndex(
        (item) => item.id === product.id
      );
      if (productIndex !== -1) {
        combindCart.value.splice(productIndex, 1);
      }
    }

    currentUser.value = updatedUser;
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    successMessage.value = "Purchase successful!";
    setTimeout(() => (successMessage.value = ""), 3000);
  } catch (error) {
    console.error("Purchase failed:", error);
    errorMessage.value = "An error occurred during purchase";
  }
};

</script>

<template>
  <div>
    <div
      v-if="errorMessage"
      class="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
    >
      {{ errorMessage }}
      <button @click="errorMessage = ''" class="ml-2 text-xl">&times;</button>
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

        <div class="w-full flex justify-between items-center">
          <div class="flex items-center space-x-2 border p-3 rounded-lg mt-4">
            <input
              type="checkbox"
              id="selectAll"
              class="h-5 w-5 text-blue-500"
            />
            <label for="selectAll" class="text-lg text-black">Select All</label>
          </div>
          <div class="flex items-center space-x-2 border rounded-lg mt-4">
            <select class="p-3">
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
          <h1 class="text-3xl font-bold text-gray-800 mb-4">Order</h1>
          <div
            v-show="combindCart.length <= 0"
            class="w-full flex justify-center items-center"
          >
            <h1 class="text-4xl text-gray-500">No products available</h1>
          </div>
        </template>

        <template #listProduct="{ yourProduct }">
          <div
            class="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg mb-4"
          >
            <div class="flex flex-col space-y-1">
              <div>
                <input type="checkbox" :value="yourProduct" v-model="checkboxData">
              </div>

              <router-link class="flex flex-col" :to="{name: 'UserProductDetail', params: {productId: yourProduct.id}}">
              <span class="text-xl font-semibold text-gray-900">{{
                yourProduct.name
              }}</span>
              <span class="text-lg text-green-600"
                >Price:
                <span class="font-bold">{{
                  yourProduct.price.toFixed(2)
                }}</span></span
              >
              <span class="text-sm text-gray-600"
                >Stock:
                <span class="font-semibold">{{ yourProduct.stock }}</span></span
              >
              </router-link>
            </div>
            <div class="flex justify-center items-center space-x-2">
              <div>
                <button
                  @click="decreaseQuantity(yourProduct)"
                  class="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 cursor-pointer"
                >
                  -
                </button>
              </div>
              <div>
                <input
                  @input="inputQuantity(yourProduct)"
                  type="number"
                  v-model="yourProduct.quantity"
                  min="0"
                  :max="yourProduct.stock"
                  class="w-16 border border-gray-300 rounded-lg px-3 py-1 text-center text-xl font-semibold bg-white"
                />
              </div>
              <div>
                <button
                  @click="addQuantity(yourProduct)"
                  class="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </template>
      </CartModel>

      <CalculatePriceBar :products="checkboxData"></CalculatePriceBar>
    </div>
  </div>
</template>

<style scoped>
/* Your optional animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
