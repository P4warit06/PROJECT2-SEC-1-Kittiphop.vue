<script setup>
import { ref } from "vue"
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  status: {
    type: Array,
    required: true,
  },
})
const selectedCat = ref([])
const selectedSta = ref([])
defineEmits(["filterProduct"])

const catDisplay = ref(false)
const staDisplay = ref(false)
const test = ref({ checked: false })
function removeChecked() {
  selectedCat.value = []
  selectedSta.value = []
}
const searchBy = ref("")

const searchValue = ref("")

function clearSearch() {
  searchValue.value = ""
}
const errorSearchBy = ref(false)
const errorMessage = ref("")
function checkInput() {
  errorSearchBy.value = false
  if (searchBy.value === 'id' && !Number(searchValue.value) && searchValue.value !== '') {
    errorSearchBy.value = true
    errorMessage.value = "Please input number only"
  }
  if (searchBy.value === "") {
    errorSearchBy.value = true
    errorMessage.value = "Please Select Search By"
  }
}
</script>
<template>
  <div class="w-full flex flex-col md:flex-row gap-4 p-4 bg-white rounded-xl  text-blue-900">
    <!-- Search Section -->
    <div class="search w-full md:w-2/3">
      <div class="flex flex-col md:flex-row gap-3 ">
        <div class="relative inline-block">
          <select class="px-4 py-2 border rounded-lg text-white bg-gradient-to-r from-purple-500 to-blue-600 appearance-none focus:outline-none pr-10"
            v-model="searchBy" @change="$emit('filterProduct', { value: searchBy, type: 'searchBy' })">
            <option value="" disabled>Search By</option>
            <option value="id">Id</option>
            <option value="name">Name</option>
          </select>
          <div class="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
            ▼
          </div>
        </div>


        <div class="relative flex-1 shadow-2xl">
          <input type="text" placeholder="Search..." v-model="searchValue"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            @keyup.enter="
              () => {
                $emit('filterProduct', { value: searchValue, type: 'searchValue' })
                checkInput()
              }
            " />
          <button v-if="searchValue" @click="
            () => {
              clearSearch()
              $emit('filterProduct', { value: '', type: 'clearSearch' })
            }
          " class="absolute right-2 top-2 text-gray-400 hover:text-red-500">
            ✖
          </button>
        </div>

        <button @click="
          () => {
            $emit('filterProduct', { value: searchValue, type: 'searchValue' })
            checkInput()
          }
        " class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
          Search
        </button>
      </div>
      <div v-show="errorSearchBy" class="text-red-500 mt-2">
        {{ errorMessage }}
      </div>
    </div>

    <!-- Filter Section -->
    <div class="filter w-full md:w-1/3 bg-gray-50 border border-gray-200 p-4 rounded-lg drop-shadow-md">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-teal-600">Filter By</h2>
        <button @click="
          () => {
            $emit('filterProduct', { type: 'clear' })
            removeChecked()
          }
        " class="text-sm text-red-500 hover:underline">
          Clear
        </button>
      </div>

      <!-- Category Filter -->
      <div class="mb-3">
        <button @click="catDisplay = !catDisplay"
          class="w-full flex justify-between items-center py-2 px-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <span class="font-medium">Category</span>
          <span>{{ catDisplay ? '▲' : '▼' }}</span>
        </button>
        <div v-show="catDisplay" class="mt-2 space-y-1">
          <div v-for="(category, index) in categories" :key="index" class="flex items-center px-2">
            <input type="checkbox" :value="category" v-model="selectedCat" class="mr-2" @change="
              $emit('filterProduct', { value: selectedCat, type: 'category' })
              " />
            <label>{{ category }}</label>
          </div>
        </div>
      </div>

      <!-- Status Filter -->
      <div>
        <button @click="staDisplay = !staDisplay"
          class="w-full flex justify-between items-center py-2 px-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <span class="font-medium">Status</span>
          <span>{{ staDisplay ? '▲' : '▼' }}</span>
        </button>
        <div v-show="staDisplay" class="mt-2 space-y-1">
          <div v-for="(status, index) in status" :key="index" class="flex items-center px-2">
            <input type="checkbox" :value="status" v-model="selectedSta" class="mr-2" @change="
              $emit('filterProduct', { value: selectedSta, type: 'status' })
              " />
            <label>{{ status }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped></style>
