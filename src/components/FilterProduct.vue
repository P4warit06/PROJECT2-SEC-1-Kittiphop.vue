<script setup>
import { ref } from "vue";
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  status: {
    type: Array,
    required: true,
  },
});
const selectedCat = ref([]);
const selectedSta = ref([]);
defineEmits(["filterProduct"]);

const catDisplay = ref(false);
const staDisplay = ref(false);
const test = ref({ checked: false });
function removeChecked() {
  selectedCat.value = [];
  selectedSta.value = [];
}
const searchBy = ref("");

const searchValue = ref("");

function clearSearch() {
  searchValue.value = "";
}
const errorSearchBy = ref(false);
const errorMessage = ref("");
function checkInput() {
  errorSearchBy.value = false;
  if(searchBy.value === 'id' && !Number(searchValue.value) && searchValue.value !== '') {
    errorSearchBy.value = true;
    errorMessage.value = "Please input number only";
  } 
  if (searchBy.value === "") {
    errorSearchBy.value = true;
    errorMessage.value = "Please Select Search By";
  }
}
</script>
<template>
  <div class="w-full flex justify-between">
    <div class="search">
      <div class="w-full flex">
        <select
          class="text-red-600"
          v-model="searchBy"
          @change="
            $emit('filterProduct', { value: searchBy, type: 'searchBy' })
          "
        >
          <option value="" disabled class="">Search By</option>
          <option value="id">Id</option>
          <option value="name">Name</option>
          <!-- <option value="price">Price</option>
          <option value="stock">Stock</option> -->
        </select>

        <div class="relative 5/6">
          <input
            type="text"
            placeholder="Search..."
            v-model="searchValue"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @keyup.enter="
              () => {
                $emit('filterProduct', {
                  value: searchValue,
                  type: 'searchValue',
                });
                checkInput();
              }
            "
          />
          <button
            v-if="searchValue"
            @click="
              () => {
                clearSearch();
                $emit('filterProduct', { value: '', type: 'clearSearch' });
              }
            "
            class="absolute right-0 top-2 text-gray-500"
          >
            ✖
          </button>
        </div>

        <button
          @click="
            () => {
              $emit('filterProduct', {
                value: searchValue,
                type: 'searchValue',
              });
              checkInput();
            }
          "
          class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Search
        </button>
      </div>
      <div v-show="errorSearchBy" class="text-red-600">
        {{ errorMessage }}
      </div>
    </div>
    <div class="filter border">
      <div class="flex justify-between">
        <h1>Filter By</h1>
        <button
          @click="
            () => {
              $emit('filterProduct', { type: 'clear' });
              removeChecked();
            }
          "
        >
          Clear
        </button>
      </div>
      <div class="category">
        <button
          @click="catDisplay = !catDisplay"
          class="w-full flex justify-between items-center p-2 bg-gray-100 rounded-lg border"
        >
          Category
        </button>
        <div
          v-show="catDisplay"
          v-for="(category, index) in categories"
          :key="index"
          class="px-2"
        >
          <label>
            <input
              type="checkbox"
              :value="category"
              v-model="selectedCat"
              class="mr-2"
              @change="
                $emit('filterProduct', { value: selectedCat, type: 'category' })
              "
            />
            {{ category }}
          </label>
        </div>
      </div>
      <div class="status">
        <button
          @click="staDisplay = !staDisplay"
          class="w-full flex justify-between items-center p-2 bg-gray-100 rounded-lg border"
        >
          Status
        </button>
        <div
          v-show="staDisplay"
          v-for="(status, index) in status"
          :key="index"
          class="px-2"
        >
          <label>
            <input
              type="checkbox"
              :value="status"
              v-model="selectedSta"
              class="mr-2"
              @change="
                $emit('filterProduct', { value: selectedSta, type: 'status' })
              "
            />
            {{ status }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
