<script setup>
import { ref, reactive, computed, watch } from "vue"

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

const showAddOrEditConfirm = ref(false)
const productForSave = ref(null)

const errors = reactive({
  name: '',
  price: '',
  stock: '',
  category: '',
  status: '',
  description: ''
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

const checkProductProperty = (field, value) => {
  switch (field) {
    case 'name':
      if (!value || value.trim() === '') {
        return 'Product name is required'
      } else if (value.length < 3) {
        return 'Product name must be at least 3 characters'
      }
      break
    case 'price':
      if (!value && value !== 0) {
        return 'Price is required'
      } else if (isNaN(value)) {
        return 'Price must be a number'
      } else if (Number(value) <= 0) {
        return 'Price must be a positive number'
      }
      break
    case 'stock':
      if (value === undefined || value === null) {
        return 'Stock is required'
      } else if (isNaN(value)) {
        return 'Stock must be a number'
      } else if (Number(value) < 0) {
        return 'Stock must be a non-negative number'
      }
      break
    case 'category':
      if (!value) {
        return 'Category is required'
      }
      break
    case 'status':
      if (!value) {
        return 'Status is required'
      }
      break
    case 'description':
      if (!value || value.trim() === '') {
        return 'Description is required'
      } else if (value.length < 10) {
        return 'Description must be at least 10 characters'
      }
      break
  }
  return ''
}

const checkProductValidate = ['name', 'price', 'stock', 'category', 'status', 'description']

checkProductValidate.forEach(field => {
  watch(
    () => newProduct.value[field],
    (newValue) => {
      errors[field] = checkProductProperty(field, newValue)
    },
    { immediate: true }
  )
})


const isFormValid = computed(() => {
  for (const field of checkProductValidate) {
    if (errors[field] !== '') {
      return false
    }
    const fieldValue = newProduct.value[field]
    if (field === 'stock') {
      if (fieldValue === undefined || fieldValue === null) {
        return false
      }
    } else {
      if (!fieldValue && fieldValue !== 0) {
        return false
      }
    }
  }
  return true
})

const checkForm = () => {
  errors.name = checkProductProperty('name', newProduct.value.name)
  errors.price = checkProductProperty('price', newProduct.value.price)
  errors.stock = checkProductProperty('stock', newProduct.value.stock)
  errors.category = checkProductProperty('category', newProduct.value.category)
  errors.status = checkProductProperty('status', newProduct.value.status)
  errors.description = checkProductProperty('description', newProduct.value.description)

  return (
    errors.name === '' &&
    errors.price === '' &&
    errors.stock === '' &&
    errors.category === '' &&
    errors.status === '' &&
    errors.description === ''
  )
}

const saveProduct = () => {
  if (!checkForm()) {
    return;
  }
  
  const categoryImages = {
    Electronics: "/product-images/default-category-images/electronics.png",
    Audio: "/product-images/default-category-images/audio.jpg",
    Accessories: "/product-images/default-category-images/accessories.png",
    Wearables: "/product-images/default-category-images/wearables.png",
  }

  // Create the product to save
  productForSave.value = {
    ...newProduct.value,
    image: newProduct.value.image || categoryImages[newProduct.value.category],
    price: Number(newProduct.value.price),
    stock: Number(newProduct.value.stock)
  }

  // Show confirmation dialog for both new products and edits
  showAddOrEditConfirm.value = true
}

const confirmSave = () => {
  if (!productForSave.value) return
  
  if (productForSave.value.id) {
    emits("editProduct", productForSave.value)
  } else {
    emits("addNewProduct", productForSave.value)
  }
  
  showAddOrEditConfirm.value = false
  productForSave.value = null
}

const cancelSave = () => {
  showAddOrEditConfirm.value = false
  productForSave.value = null
}
</script>

<template>
  <div
    class="fixed inset-0 flex justify-center items-center backdrop-blur-sm overflow-auto z-50"
  >
    <div
      class="p-6 bg-white rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col justify-center items-center max-h-[90vh] overflow-y-auto w-[90%]"
    >
      <div v-if="showAddOrEditConfirm" class="fixed inset-0 bg-black/80 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-[60]">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Changes</h3>
          <p class="text-gray-600 mb-6">
            {{ newProduct.id ? "Are you sure you want to update this product?" : "Are you sure you want to add this product?" }}
          </p>
          <div class="flex justify-end space-x-3">
            <button @click="cancelSave" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button @click="confirmSave" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {{ newProduct.id ? "Save Changes" : "Add Product" }}
            </button>
          </div>
        </div>
      </div>

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
            >Product Name:<span class="text-red-500">*</span></label
          >
          <input
            v-model="newProduct.name"
            type="text"
            placeholder="Enter product name"
            :class="{'border-red-500': errors.name, 'border-gray-300': !errors.name}"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Stock:<span class="text-red-500">*</span></label
          >
          <input
            v-model="newProduct.stock"
            type="number"
            min="0"
            placeholder="Stock"
            :class="{'border-red-500': errors.stock, 'border-gray-300': !errors.stock}"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <p v-if="errors.stock" class="text-red-500 text-sm mt-1">{{ errors.stock }}</p>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Price:<span class="text-red-500">*</span></label
          >
          <input
            v-model="newProduct.price"
            type="number"
            min="0"
            placeholder="Price"
            :class="{'border-red-500': errors.price, 'border-gray-300': !errors.price}"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price }}</p>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Status:<span class="text-red-500">*</span></label
          >
          <select
            v-model="newProduct.status"
            :class="{'border-red-500': errors.status, 'border-gray-300': !errors.status}"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
          <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Category:<span class="text-red-500">*</span></label
          >
          <select
            v-model="newProduct.category"
            :class="{'border-red-500': errors.category, 'border-gray-300': !errors.category}"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
          <p v-if="errors.category" class="text-red-500 text-sm mt-1">{{ errors.category }}</p>
        </div>

        <div class="col-span-1 sm:col-span-2">
          <label class="block text-base font-medium text-gray-700 mb-1"
            >Description:<span class="text-red-500">*</span></label
          >
          <textarea
            v-model="newProduct.description"
            placeholder="Product description"
            :class="{'border-red-500': errors.description, 'border-gray-300': !errors.description}"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none h-20"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
        </div>

        <div class="col-span-1 sm:col-span-2 flex gap-4 justify-center mt-4">
          <button
            @click="saveProduct"
            :disabled="!isFormValid"
            :class="{
              'bg-indigo-500 hover:bg-indigo-600': isFormValid, 
              'bg-indigo-300 cursor-not-allowed': !isFormValid
            }"
            class="w-full sm:w-1/3 text-white py-2 rounded-lg text-sm"
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
