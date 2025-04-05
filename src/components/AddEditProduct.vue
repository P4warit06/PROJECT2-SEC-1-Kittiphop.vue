<script setup>
import { ref, watch } from "vue";

const emits = defineEmits(["addNewProduct", "editProduct", "cancelAdding"]);

const props = defineProps({
  activeProduct: {
    type: Object,
    required: true,
  },
});

const newProduct = ref({
  ...props.activeProduct,
  image: props.activeProduct.image || "",
});

const categories = ref([
  { name: "Accessories", value: "Accessories" },
  { name: "Audio", value: "Audio" },
  { name: "Electronics", value: "Electronics" },
  { name: "Wearables", value: "Wearables" },
]);

const status = ref([
  { name: "Active", value: "Active" },
  { name: "Low Stock", value: "Low Stock" },
  { name: "Out of Stock", value: "Out of Stock" },
]);

const saveProduct = () => {
  if (newProduct.value.id) {
    emits("editProduct", newProduct.value);
  } else {
    emits("addNewProduct", newProduct.value);
  }
};
</script>

<template>
  <div
    class="fixed inset-0 flex justify-center items-center backdrop-blur-sm overflow-auto"
  >
    <div
      class="p-10 bg-white rounded-3xl shadow-2xl max-w-4xl mx-auto flex flex-col justify-center items-center max-h-screen overflow-y-auto"
    >
      <h1
        class="text-4xl font-extrabold text-gray-900 mb-10 text-center w-full max-sm:text-xl"
      >
        {{ !newProduct.id ? "Add New Product" : "Edit Product" }}
      </h1>

      <div
        class="grid grid-cols-1 overflow-auto px-1 sm:grid-cols-2 gap-8 w-full"
      >
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Product Name:</label
          >
          <input
            v-model="newProduct.name"
            type="text"
            placeholder="Enter product name"
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Stock:</label
          >
          <input
            v-model="newProduct.stock"
            type="number"
            min="0"
            placeholder="Stock"
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Price:</label
          >
          <input
            v-model="newProduct.price"
            type="number"
            min="0"
            placeholder="Price"
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Status:</label
          >
          <select
            v-model="newProduct.status"
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option disabled value="">Choose one</option>
            <option
              v-for="(st, index) in status"
              :key="index"
              :value="st.value"
            >
              {{ st.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Category:</label
          >
          <select
            v-model="newProduct.category"
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option disabled value="">Choose one</option>
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.value"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="col-span-1 sm:col-span-2">
          <label class="block text-lg font-medium text-gray-700 mb-2"
            >Description:</label
          >
          <textarea
            v-model="newProduct.description"
            placeholder="Product description"
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          ></textarea>
        </div>

        <div class="col-span-1 sm:col-span-2 flex gap-8 justify-center mt-4">
          <button
            @click="saveProduct"
            class="w-full sm:w-2/3 bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 cursor-pointer"
          >
            {{ newProduct.id ? "Save Changes" : "Add Product" }}
          </button>
          <button
            @click="$emit('cancelAdding')"
            class="w-full sm:w-2/3 bg-gray-400 text-white py-3 rounded-xl hover:bg-red-500 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>