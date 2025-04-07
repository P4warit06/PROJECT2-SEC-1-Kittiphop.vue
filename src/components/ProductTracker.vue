<script setup>
import { ref, onUnmounted } from 'vue'

// Tracking ID input
const trackingId = ref('')

// Product data
const product = ref(null)

// Loading state
const loading = ref(false)

// Error message
const error = ref('')

// Interval for real-time updates
let intervalId = null

// Simulated product data
// const mockProducts = [
//     { trackingId: 'TRK123', name: 'Wireless Headphones', status: 'Ordered' },
//     { trackingId: 'TRK456', name: 'Smartwatch', status: 'Shipped' },
//     { trackingId: 'TRK789', name: 'Laptop Bag', status: 'Delivered' },
// ]

// Start tracking
const startTracking = () => {
    if (!trackingId.value) {
        error.value = 'Please enter a tracking ID.'
        return
    }

    // Reset states
    product.value = null
    error.value = ''
    loading.value = true

    // Simulate API call to fetch product
    setTimeout(() => {
        const foundProduct = mockProducts.find(
            (p) => p.trackingId === trackingId.value
        )

        if (foundProduct) {
            product.value = foundProduct
            startRealTimeUpdates(foundProduct)
        } else {
            error.value = 'Product not found.'
        }

        loading.value = false
    }, 1000)
}

// Simulate real-time updates
const startRealTimeUpdates = (product) => {
    const statuses = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered']
    let currentIndex = statuses.indexOf(product.status)

    intervalId = setInterval(() => {
        if (currentIndex < statuses.length - 1) {
            currentIndex++
            product.value.status = statuses[currentIndex]
        } else {
            clearInterval(intervalId) // Stop updates when delivered
        }
    }, 3000) // Update every 3 seconds
}

// Get CSS class based on status
const getStatusClass = (status) => {
    switch (status) {
        case 'Ordered':
            return 'status-ordered'
        case 'Shipped':
            return 'status-shipped'
        case 'Out for Delivery':
            return 'status-out-for-delivery'
        case 'Delivered':
            return 'status-delivered'
        default:
            return ''
    }
}

// Cleanup interval on component unmount
onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId)
    }
})
</script>


<template>
    <div class="flex flex-col items-center justify-center text-center py-8">
        <h1 class="text-4xl md:text-5xl lg:text-4xl font-bold text-[#0f2240] mb-2">Discover New Paths</h1>
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0f2240]">with truly integrated logistics</h2>
    </div>
    <div class="product-tracker">

        <div class="flex w-full max-w-4xl  overflow-hidden shadow-sm">
            <div class="flex items-center bg-gray-100 flex-grow px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input v-model="trackingId" type="text" placeholder="PSLU 8002936"
                    class="bg-transparent w-full outline-none text-gray-700 placeholder-gray-500 text-lg" />
            </div>
            <button @click="startTracking"
                class="bg-[#1c49ed] hover:bg-blue-700 text-white font-medium px-8 py-3 text-sm">
                Track
            </button>
        </div>

        <!-- Product Picture  -->
        <div class="mx-auto my-20 w-full max-w-[2000px]">
            <div class="relative w-full overflow-hidden">
                <img src="/product-images/product-list-banner.png" alt="Product Management Banner"
                    class="w-full h-full object-contain scale-110" />
            </div>
        </div>

        <!-- Product Status -->
        <div v-if="product" class="product-status">
            <h2>{{ product.name }}</h2>
            <p><strong>Tracking ID:</strong> {{ product.trackingId }}</p>
            <p><strong>Status:</strong> {{ product.status }}</p>
            <div class="status-indicator" :class="getStatusClass(product.status)">
                {{ product.status }}
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading">Loading...</div>

        <!-- Error Message -->
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>
<style scoped>
.product-tracker {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    color: blueviolet;
}



.search-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}





.product-status {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.status-indicator {
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    margin-top: 10px;
}

.status-ordered {
    background-color: #ff9800;
    /* Orange */
}

.status-shipped {
    background-color: #2196f3;
    /* Blue */
}

.status-out-for-delivery {
    background-color: #9c27b0;
    /* Purple */
}

.status-delivered {
    background-color: #4caf50;
    /* Green */
}

.loading {
    margin-top: 20px;
    font-size: 18px;
    color: #2196f3;
}

.error {
    margin-top: 20px;
    font-size: 18px;
    color: #f44336;
}
</style>