<template>
    <div class="w-full">
      <!-- Page Header -->
      <div class="mb-6 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 md:text-3xl">Products</h1>
          <p class="mt-1 text-gray-600">Manage your product inventory</p>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Product
        </button>
      </div>
  
      <!-- Filters and Search -->
      <div class="mb-6 flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="flex gap-2">
          <select class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Wearables">Wearables</option>
            <option value="Audio">Audio</option>
            <option value="Accessories">Accessories</option>
          </select>
          <select class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>
  
      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
              <span class="text-lg font-bold text-blue-600">${{ product.price }}</span>
            </div>
            <p class="text-sm text-gray-600 mb-2">{{ product.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">{{ product.category }}</span>
              <span :class="{
                'px-2 py-1 text-xs font-semibold rounded-full': true,
                'bg-green-100 text-green-800': product.status === 'Active',
                'bg-yellow-100 text-yellow-800': product.status === 'Low Stock',
                'bg-red-100 text-red-800': product.status === 'Out of Stock'
              }">
                {{ product.status }}
              </span>
            </div>
            <div class="mt-4 flex gap-2">
              <button class="flex-1 bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-200 transition-colors">
                Edit
              </button>
              <button class="flex-1 bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Mobile Action Button -->
      <button class="md:hidden fixed bottom-20 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const products = ref([
    {
      id: 1,
      name: 'Wireless Earbuds',
      price: 99.99,
      description: 'High-quality wireless earbuds with noise cancellation',
      category: 'Audio',
      status: 'Active',
      image: 'https://via.placeholder.com/400x300?text=Wireless+Earbuds'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      description: 'Advanced fitness tracking and smart notifications',
      category: 'Wearables',
      status: 'Low Stock',
      image: 'https://via.placeholder.com/400x300?text=Smart+Watch'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 79.99,
      description: 'Portable speaker with 360-degree sound',
      category: 'Audio',
      status: 'Active',
      image: 'https://via.placeholder.com/400x300?text=Bluetooth+Speaker'
    },
    {
      id: 4,
      name: 'Wireless Charger',
      price: 49.99,
      description: 'Fast charging pad for multiple devices',
      category: 'Accessories',
      status: 'Out of Stock',
      image: 'https://via.placeholder.com/400x300?text=Wireless+Charger'
    },
    {
      id: 5,
      name: 'Gaming Headset',
      price: 149.99,
      description: 'Professional gaming headset with surround sound',
      category: 'Electronics',
      status: 'Active',
      image: 'https://via.placeholder.com/400x300?text=Gaming+Headset'
    },
    {
      id: 6,
      name: 'Portable Power Bank',
      price: 59.99,
      description: 'High-capacity power bank for on-the-go charging',
      category: 'Accessories',
      status: 'Low Stock',
      image: 'https://via.placeholder.com/400x300?text=Power+Bank'
    }
  ])
  </script>