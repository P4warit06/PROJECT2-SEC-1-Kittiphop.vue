<script setup>
import { computed, ref } from "vue";
import { previewBinaryFile } from '../../libs/utilities.js'

const emit = defineEmits(['updateProduct', 'cancelUpdating'])

const categories = ref([
    { name: "Accessories", value: "Accessories" },
    { name: "Audio", value: "Audio" },
    { name: "Electronics", value: "Electronics" },
    { name: "Wearables", value: "Wearables" }
])

const status = ref([
    { name: "Active", value: "Active" },
    { name: "Low Stock", value: "Low Stock" },
    { name: "Out of Stock", value: "Out of Stock" }
])

const props = defineProps({
    product: Object
})

const editedProduct = ref({ ...props.product })

const imgFileName = ref("")
const chooseBinaryImg = (event) => {
    imgFileName.value = event.target.files[0].name
    if (imgFileName.value.endsWith(".jpg") || imgFileName.value.endsWith(".jpeg") || imgFileName.value.endsWith(".png")) {
        editedProduct.value.image = previewBinaryFile(event.target.files[0])
    }
}
</script>

<template>
    <div class="fixed inset-0 flex justify-center items-center backdrop-blur-sm overflow-auto">
        <div
            class="p-10 bg-white rounded-3xl shadow-2xl max-w-4xl mx-auto flex flex-col justify-center items-center max-h-screen overflow-y-auto">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-10 text-center w-full max-sm:text-xl">Update Product
            </h1>

            <div class="grid grid-cols-1 overflow-auto px-1 sm:grid-cols-2 gap-8 w-full">
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-2">Product Name:</label>
                    <input v-model="editedProduct.name" type="text" placeholder="Enter product name"
                        class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                </div>

                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-2">Stock:</label>
                    <input v-model="editedProduct.stock" type="number" min="0" placeholder="Stock"
                        class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                </div>

                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-2">Price:</label>
                    <input v-model="editedProduct.price" type="number" min="0" placeholder="Price"
                        class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                </div>

                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-2">Status:</label>
                    <select v-model="editedProduct.status"
                        class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                        <option disabled value="">Choose one</option>
                        <option v-for="(st, index) in status" :key="index" :value="st.value">{{ st.name }}</option>
                    </select>
                </div>

                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-2">Category:</label>
                    <select v-model="editedProduct.category"
                        class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                        <option disabled value="">Choose one</option>
                        <option v-for="(category, index) in categories" :key="index" :value="category.value">{{
                            category.name }}</option>
                    </select>
                </div>

                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-2">Upload Image:</label>
                    <input type="file" accept=".jpg, .png, .jpeg" @change="chooseBinaryImg"
                        class="w-full border border-gray-300 rounded-xl px-5 py-3 cursor-pointer focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                    <div v-if="editedProduct.image" class="mt-4 text-center">
                        <a :href="editedProduct.image" target="_blank" class="text-indigo-500 underline">View Image</a>
                        <img :src="editedProduct.image" alt="Product Image"
                            class="mt-4 w-24 h-24 object-cover rounded-lg mx-auto">
                    </div>
                </div>

                <div class="col-span-1 sm:col-span-2">
                    <label class="block text-lg font-medium text-gray-700 mb-2">Description:</label>
                    <textarea v-model="editedProduct.description" placeholder="Product description"
                        class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></textarea>
                </div>

                <div class="col-span-1 sm:col-span-2 flex gap-8 justify-center mt-4">
                    <button @click="$emit('updateProduct', editedProduct)"
                        class="w-full sm:w-2/3 bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 cursor-pointer">Update</button>
                    <button @click="$emit('cancelUpdating')"
                        class="w-full sm:w-2/3 bg-gray-400 text-white py-3 rounded-xl hover:bg-red-500 cursor-pointer">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
select>.placeholder {
    display: none;
}
</style>
