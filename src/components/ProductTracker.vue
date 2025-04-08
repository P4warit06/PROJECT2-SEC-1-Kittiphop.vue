<script setup>
import { ref, onUnmounted } from 'vue'
import NavbarAdmin from './NavbarAdmin.vue'

const trackingId = ref('')
const trackingInfo = ref(null)
const loading = ref(false)
const error = ref('')
let intervalId = null
const showImage =ref(true)

// Start tracking
const startTracking = () => {
    showImage.value =false
    if (!trackingId.value) {
        error.value = 'Please enter a tracking ID.'
        return
    }

    // Reset states
    trackingInfo.value = null
    error.value = ''
    loading.value = true

    // Fetch tracking info from db.json
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
                // Don't start real-time updates for cancelled orders
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

// Simulate real-time updates
const startRealTimeUpdates = (tracking) => {
    const statusFlow = {
        'Processing': 'Shipping',
        'Shipping': 'Shipped',
        'Shipped': 'Delivered',
        'Delivered': 'Delivered' // Final state
    }

    intervalId = setInterval(() => {
        if (statusFlow[trackingInfo.value.status]) {
            trackingInfo.value.status = statusFlow[trackingInfo.value.status]

            // Stop updates when delivered
            if (trackingInfo.value.status === 'Delivered') {
                clearInterval(intervalId)
            }
        }
    }, 3000)
}

// Get CSS class based on status
const getStatusClass = (status) => {
    switch (status) {
        case 'Processing':
            return 'status-ordered'
        case 'Shipping':
            return 'status-shipped'
        case 'Shipped':
            return 'status-out-for-delivery'
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
    <NavbarAdmin />
    <div class="flex flex-col items-center justify-center text-center py-8">
        <h1 class="text-4xl md:text-5xl lg:text-4xl font-bold text-[#0f2240] mb-2">Discover New Paths</h1>
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0f2240]">with truly integrated logistics</h2>
    </div>
    <div class="product-tracker">
        <div class="flex w-full max-w-4xl overflow-hidden shadow-sm">
            <div class="flex items-center bg-gray-100 flex-grow px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input v-model="trackingId" type="text" placeholder="PSLU 8002936"
                    class="bg-transparent w-full outline-none text-gray-700 placeholder-gray-500 text-lg"
                    @keyup.enter="startTracking" />
            </div>
            <button @click="startTracking"
                class="bg-[#1c49ed] hover:bg-blue-700 text-white font-medium px-8 py-3 text-sm">
                Track
            </button>
        </div>

        <!-- Tracking Information -->
        <div v-if="trackingInfo" class="tracking-info mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-xl font-bold mb-4">Tracking Information</h2>
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p class="text-gray-600">Tracking ID:</p>
                    <p class="font-semibold">{{ trackingInfo.id }}</p>
                </div>
                <div>
                    <p class="text-gray-600">User ID:</p>
                    <p class="font-semibold">{{ trackingInfo.userId }}</p>
                </div>
            </div>
            <div class="mt-4">
                <p class="text-gray-600 mb-2">Status:</p>
                <div class="status-indicator" :class="getStatusClass(trackingInfo.status)">
                    {{ trackingInfo.status }}
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading mt-8 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p class="mt-2">Loading tracking information...</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="error mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {{ error }}
        </div>
    </div>
    <!-- Picture Zone -->
    <transition name="fade">
    <div class="flex ml-[280px] my-[40px] w-full max-w-full" v-if="showImage">
        <div class="relative float-left shadow-md">
            <img src="/product-images/product-list-banner.png" alt="Product Management Banner"
                style="max-height: 600px; max-width: 950px;" />
        </div>
    </div>
    </transition>
</template>

<style scoped>
.product-tracker {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.tracking-info {
    background-color: #f9f9f9;
    border: 1px solid #e5e7eb;
}

.status-indicator {
    padding: 8px 16px;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    display: inline-block;
    min-width: 120px;
    text-align: center;
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

.status-cancelled {
    background-color: #f44336;
    /* Red */
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