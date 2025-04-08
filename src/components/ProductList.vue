<script setup>
import ListModel from "./model/ListModel.vue"
import { ref, computed } from "vue"

const emit = defineEmits([
  "deleteProduct",
  "setEditing",
  "selectDeleteProduct",
])
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  selectedProducts: {
    type: Array,
    required: true,
  },
})

const currentListType = ref("card")
const toggleListType = () => {
  currentListType.value = currentListType.value === "card" ? "list" : "card"
}

const selectProductList = ref([])

const limitShowProduct = ref(10)
const listProducts = computed(() => {
  return props.products.slice(0, limitShowProduct.value)
})
const hasMoreProducts = computed(() => {
  return limitShowProduct.value < props.products.length
})
const loadMoreProducts = () => {
  limitShowProduct.value += 10
}

// Select all functionality
const selectAll = ref(false)
const toggleSelectAll = () => {
  selectAll.value = !selectAll.value
  if (selectAll.value) {
    selectProductList.value = listProducts.value.map((item) => item.id)
  } else {
    selectProductList.value = []
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <!-- Top Controls Section -->
    <div class="flex flex-col md:flex-row justify-end items-center mb-6">
      <div class="flex items-center space-x-4 w-full md:w-auto">
        <button
          @click="toggleListType"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center transition-colors"
        >
          <span class="mr-2">{{
            currentListType === "card" ? "List View" : "Card View"
          }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 3h18v18H3z"></path>
            <path d="M9 3v18"></path>
            <path d="M15 3v18"></path>
          </svg>
        </button>
      </div>
    </div>

    <ListModel
      :items="listProducts"
      :listType="currentListType"
      :gridCols="
        currentListType === 'card'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : ''
      "
    >
      <template #heading>
        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2"
        >
          <div class="flex items-center">
            <h2 class="text-xl font-bold">Product Management</h2>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
<<<<<<< HEAD
            <div class="flex items-center">
              <input
                type="checkbox"
                id="select-all"
=======
            <div v-show="isEditMode" class="flex items-center">
              <input 
                type="checkbox" 
                id="select-all" 
>>>>>>> origin
                :checked="selectAll"
                @change="toggleSelectAll"
                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label
                for="select-all"
                class="ml-2 text-sm font-medium text-gray-700"
                >Select All</label
              >
            </div>

            <button
              v-if="selectProductList.length > 0"
              class="w-[40vh] h-[4vh] sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center transition-colors cursor-pointer"
              @click="$emit('selectDeleteProduct', selectProductList)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
<<<<<<< HEAD
              <span class="text-lg"
                >Delete Selected ({{ selectProductList.length }})</span
              >
=======
              <span class="text-sm">Delete Selected ({{ selectProductList.length }})</span>
>>>>>>> origin
            </button>
          </div>
        </div>
      </template>

      <template #listItems="{ yourItem }">
        <div
          :class="{
            'flex items-start flex-col sm:flex-row sm:items-center justify-between w-full':
              currentListType === 'list',
            'flex flex-col h-full': currentListType === 'card',
          }"
        >
          <!-- Card & List Mode Content with Better Layout -->
          <div
            :class="{ 'flex items-center w-full': currentListType === 'list' }"
          >
            <!-- Checkbox for both views -->
            <div
              :class="{
                'mr-3': currentListType === 'list',
                'mb-3 self-start': currentListType === 'card',
              }"
            >
              <input
                v-show="isEditMode"
                type="checkbox"
                :value="yourItem.id"
                v-model="selectProductList"
                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>

            <div
              :class="{
                'w-20 h-20 mr-4 flex-shrink-0': currentListType === 'list',
                'w-full h-40 mb-4': currentListType === 'card',
              }"
            >
              <img
                v-if="yourItem.image"
                :src="yourItem.image"
                :alt="yourItem.name"
                :class="{
                  'w-full h-full object-cover rounded-lg border border-gray-200':
                    currentListType === 'list',
                  'w-full h-full object-contain rounded-lg':
                    currentListType === 'card',
                }"
              />
              <div
                v-else
                :class="{
                  'w-full h-full bg-gray-100 flex items-center justify-center rounded-lg text-gray-400': true,
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <div :class="{ 'flex-1': currentListType === 'list' }">
              <h3 class="font-bold text-lg text-gray-800">
                {{ yourItem.name }}
              </h3>

              <div
                :class="{
                  'grid grid-cols-1 md:grid-cols-2 gap-1 mt-2':
                    currentListType === 'list',
                  'space-y-2': currentListType === 'card',
                }"
              >
                <div class="flex items-center">
                  <span class="text-gray-500 text-sm mr-1">ID:</span>
                  <router-link
                    :to="{
                      name: 'ProductDetail',
                      params: { productId: yourItem.id },
                    }"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {{ yourItem.id }}
                  </router-link>
                </div>

                <div class="flex items-center">
                  <span class="text-gray-500 text-sm mr-1">Price:</span>
                  <span class="font-medium">${{ yourItem.price }}</span>
                </div>

                <div class="flex items-center">
                  <span class="text-gray-500 text-sm mr-1">Category:</span>
                  <span
                    class="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded"
                    >{{ yourItem.category }}</span
                  >
                </div>

                <div class="flex items-center">
                  <span class="text-gray-500 text-sm mr-1">Status:</span>
                  <span
                    :class="{
                      'bg-green-50 text-green-700':
                        yourItem.status === 'available',
                      'bg-yellow-50 text-yellow-700':
                        yourItem.status === 'limited',
                      'bg-red-50 text-red-700':
                        yourItem.status === 'unavailable',
                    }"
                    class="text-xs px-2 py-0.5 rounded"
                  >
                    {{ yourItem.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div
            :class="{
              'flex justify-end items-center space-x-2 mt-4 sm:mt-0':
                currentListType === 'list',
              'mt-auto flex space-x-2': currentListType === 'card',
            }"
          >
            <button
              v-show="isEditMode"
              @click="$emit('setEditing', yourItem)"
              class="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-indigo-200 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
              Edit
            </button>
            <button
              v-show="isEditMode"
              @click="$emit('deleteProduct', yourItem.id)"
              class="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z "
                  clip-rule="evenodd"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </template>
    </ListModel>

    <div v-show="hasMoreProducts" class="flex justify-center mt-6">
      <button
        @click="loadMoreProducts"
        class="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
            clip-rule="evenodd"
          />
        </svg>
        Load More
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0
}
</style>
