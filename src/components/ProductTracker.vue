<template>
    <div class="product-tracker">
        <h1>Real-Time Product Tracking</h1>

        <!-- Tracking ID Input -->
        <div class="tracking-input">
            <input v-model="trackingId" type="text" placeholder="Enter Tracking ID" class="search-input" />
            <button @click="startTracking" class="track-button">Track</button>
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

<script setup>
import { ref, onUnmounted } from 'vue';

// Tracking ID input
const trackingId = ref('');

// Product data
const product = ref(null);

// Loading state
const loading = ref(false);

// Error message
const error = ref('');

// Interval for real-time updates
let intervalId = null;

// Simulated product data
// const mockProducts = [
//     { trackingId: 'TRK123', name: 'Wireless Headphones', status: 'Ordered' },
//     { trackingId: 'TRK456', name: 'Smartwatch', status: 'Shipped' },
//     { trackingId: 'TRK789', name: 'Laptop Bag', status: 'Delivered' },
// ];

// Start tracking
const startTracking = () => {
    if (!trackingId.value) {
        error.value = 'Please enter a tracking ID.';
        return;
    }

    // Reset states
    product.value = null;
    error.value = '';
    loading.value = true;

    // Simulate API call to fetch product
    setTimeout(() => {
        const foundProduct = mockProducts.find(
            (p) => p.trackingId === trackingId.value
        );

        if (foundProduct) {
            product.value = foundProduct;
            startRealTimeUpdates(foundProduct);
        } else {
            error.value = 'Product not found.';
        }

        loading.value = false;
    }, 1000);
};

// Simulate real-time updates
const startRealTimeUpdates = (product) => {
    const statuses = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];
    let currentIndex = statuses.indexOf(product.status);

    intervalId = setInterval(() => {
        if (currentIndex < statuses.length - 1) {
            currentIndex++;
            product.value.status = statuses[currentIndex];
        } else {
            clearInterval(intervalId); // Stop updates when delivered
        }
    }, 3000); // Update every 3 seconds
};

// Get CSS class based on status
const getStatusClass = (status) => {
    switch (status) {
        case 'Ordered':
            return 'status-ordered';
        case 'Shipped':
            return 'status-shipped';
        case 'Out for Delivery':
            return 'status-out-for-delivery';
        case 'Delivered':
            return 'status-delivered';
        default:
            return '';
    }
};

// Cleanup interval on component unmount
onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>

<style scoped>
.product-tracker {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    color: blueviolet;
}

.tracking-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.search-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.track-button {
    padding: 10px 20px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.track-button:hover {
    background-color: #1976d2;
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