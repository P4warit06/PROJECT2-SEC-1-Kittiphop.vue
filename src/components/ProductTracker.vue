<script setup>
import { ref, onUnmounted } from 'vue'
import NavbarAdmin from './NavbarAdmin.vue'
const trackingId = ref('')
const trackingInfo = ref(null)
const loading = ref(false)
const error = ref('')
let intervalId = null
const showImage = ref(true)
// Start tracking
const startTracking = () => {
    if (!trackingId.value) {
        error.value = 'Please enter a tracking ID.'
        return
    }
    showImage.value = false
    trackingInfo.value = null
    error.value = ''
    loading.value = true
    fetch('/data/db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            const foundTracking = data.tracking.find(
                (t) => t.id === trackingId.value
            )
            if (foundTracking) {
                trackingInfo.value = foundTracking
                if (foundTracking.status !== 'Cancelled') {
                    startRealTimeUpdates(foundTracking)
                }
            } else {
                error.value = `Tracking ID ${trackingId.value} not found. Valid IDs are 1-8.`
            }
        })
        .catch(err => {
            error.value = 'Failed to fetch tracking information. Please try again later.'
            console.error('Error fetching tracking info:', err)
        })
        .finally(() => {
            loading.value = false
        })
}

const startRealTimeUpdates = (tracking) => {
    const statusFlow = {
        'Processing': 'Processing',
        'Shipping': 'Shipping',
        'Shipped': 'Shipped',
        'Delivered': 'Delivered'
    }
}
const getStatusClass = (status) => {
    switch (status) {
        case 'Processing':
            return 'status-processing'
        case 'Shipping':
            return 'status-shipping'
        case 'Shipped':
            return 'status-shipped'
        case 'Delivered':
            return 'status-delivered'
        case 'Cancelled':
            return 'status-cancelled'
        default:
            return ''
    }
}

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId)
    }
})
</script>
<template>
    <navbar-admin />
    <div class="flex flex-col items-center justify-center text-center py-8 px-4">
        <h1 class="text-3xl md:text-5xl font-bold text-[#0f2240] mb-2">Discover New Paths</h1>
        <h2 class="text-xl md:text-3xl font-bold text-[#0f2240]">with truly integrated logistics</h2>
    </div>

    <div class="product-tracker px-4 md:px-0">
        <div class="flex flex-col md:flex-row w-full max-w-4xl mx-auto shadow-sm overflow-hidden">
            <div class="flex items-center bg-gray-100 flex-grow px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input v-model="trackingId" type="text" placeholder="PSLU 8002936"
                    class="bg-transparent w-full outline-none text-gray-700 placeholder-gray-500 text-base"
                    @keyup.enter="startTracking" />
            </div>
            <button @click="startTracking"
                class="bg-[#1c49ed] hover:bg-blue-700 text-white font-medium px-6 py-3 text-sm md:text-base w-full md:w-auto">
                Track
            </button>
        </div>

        <div v-if="trackingInfo" class="tracking-info mt-8 p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 class="text-xl font-bold mb-4">Tracking Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <p class="text-gray-600">Tracking ID:</p>
                    <p class="font-semibold">{{ trackingInfo.id }}</p>
                </div>
                <div>
                    <p class="text-gray-600">User ID:</p>
                    <p class="font-semibold">{{ trackingInfo.userId }}</p>
                </div>
            </div>
            <div class="mt-4 flex items-center space-x-2">
                <p class="text-gray-600">Status:</p>
                <div class="status-indicator" :class="getStatusClass(trackingInfo.status)">
                    {{ trackingInfo.status }}
                </div>
            </div>
        </div>

        <div v-if="loading" class="loading mt-8 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p class="mt-2">Loading tracking information...</p>
        </div>

        <div v-if="error" class="error mt-8 p-4 bg-red-100 text-red-700 rounded-lg max-w-3xl mx-auto">
            {{ error }}
        </div>
    </div>

    <transition name="fade">
        <div class="flex justify-center mx-auto my-10 px-4" v-if="showImage">
            <div class="relative shadow-md w-full max-w-screen-xl">
                <img src="/product-images/product-list-banner.png" alt="Product Management Banner"
                    class="w-full h-auto max-h-[600px] rounded-lg object-cover" />
            </div>
        </div>
    </transition>
</template>

<style scoped>
.product-tracker {
    padding-top: 10px;
    padding-bottom: 10px;
}

.tracking-info {
    background-color: #f9f9f9;
    border: 1px solid #e5e7eb;
}

.status-indicator {
    padding: 8px 8px;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    display: inline-block;
    min-width: 120px;
    text-align: center;
}

.status-shipping {
    background-color: #ff9800;
}

.status-shipped {
    background-color: #4caf50;
}

.status-processing {
    background-color: #9c27b0;
}

.status-cancelled {
    background-color: #FF0033;
}

.loading {
    color: #2196f3;
}

.error {
    color: #f44336;
}

.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-leave-to {
    opacity: 0;
}
</style>
