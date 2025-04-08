<script setup>
import { ref } from "vue"

const emits = defineEmits(["addNewProduct", "editProduct", "cancelAdding"])

const props = defineProps({
  activeProduct: {
    type: Object,
    required: true,
  },
})

const newProduct = ref({
  ...props.activeProduct,
})

const categories = ref([
  { name: "Accessories", value: "Accessories" },
  { name: "Audio", value: "Audio" },
  { name: "Electronics", value: "Electronics" },
  { name: "Wearables", value: "Wearables" },
])

const status = ref([
  { name: "Active", value: "Active" },
  { name: "Low Stock", value: "Low Stock" },
  { name: "Out of Stock", value: "Out of Stock" },
])

const saveProduct = () => {
  const categoryImages = {
    Electronics: "/product-images/default-category-images/electronics.png",
    Audio: "/product-images/default-category-images/audio.jpg",
    Accessories: "/product-images/default-category-images/accessories.png",
    Wearables: "/product-images/default-category-images/wearables.png",
  }
  const productToSave = {
    ...newProduct.value,
    image:
      newProduct.value.image || categoryImages[newProduct.value.category],
  }

  if (newProduct.value.id) {
    emits("editProduct", productToSave)
  } else {
    emits("addNewProduct", productToSave)
  }
}
</script>

<template>
  <div
    class="fixed inset-0 flex justify-center items-center backdrop-blur-sm overflow-auto z-50"
  >
    <div
      class="p-6 bg-white rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col justify-center items-center max-h-[90vh] overflow-y-auto w-[90%]"
    >
      <h1
        class="text-2xl font-bold text-gray-900 mb-6 text-center w-full max-sm:text-xl"
      >
        {{ !newProduct.id ? "Add New Product" : "Edit Product" }}
      </h1>

      <div
        class="grid grid-cols-1 overflow-auto px-1 sm:grid-cols-2 gap-5 w-full"
      >
        <div>
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Product Name:</label
          >
          <input
            v-model="newProduct.name"
            type="text"
            placeholder="Enter product name"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Stock:</label
          >
          <input
            v-model="newProduct.stock"
            type="number"
            min="0"
            placeholder="Stock"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Price:</label
          >
          <input
            v-model="newProduct.price"
            type="number"
            min="0"
            placeholder="Price"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Status:</label
          >
          <select
            v-model="newProduct.status"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Category:</label
          >
          <select
            v-model="newProduct.category"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Description:</label
          >
          <textarea
            v-model="newProduct.description"
            placeholder="Product description"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none h-20"
          ></textarea>
        </div>

        <div class="col-span-1 sm:col-span-2 flex gap-4 justify-center mt-4">
          <button
            @click="saveProduct"
            class="w-full sm:w-1/3 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 cursor-pointer text-sm"
          >
            {{ newProduct.id ? "Save Changes" : "Add Product" }}
          </button>
          <button
            @click="$emit('cancelAdding')"
            class="w-full sm:w-1/3 bg-gray-400 text-white py-2 rounded-lg hover:bg-red-500 cursor-pointer text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
