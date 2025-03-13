<script setup>
import { ref, watch } from "vue";
import { previewBinaryFile } from "../lib/utilities.js";

const emit = defineEmits(["updateProduct", "cancelEditing"]);
const props = defineProps({ product: Object });

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

const editedProduct = ref({ ...props.product });

watch(
    () => props.product,
    (newProduct) => {
        editedProduct.value = { ...newProduct };
    },
    { deep: true }
);

const imgFileName = ref("");

const chooseBinaryImg = (event) => {
    imgFileName.value = event.target.files[0].name;
    if (
        imgFileName.value.endsWith(".jpg") ||
        imgFileName.value.endsWith(".jpeg") ||
        imgFileName.value.endsWith(".png")
    ) {
        editedProduct.value.image = previewBinaryFile(event.target.files[0]);
    }
};
</script>

<template>
    <div class="p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 class="text-xl  mb-1 text-center">Update Product</h1>
        <div class="space-y-1.5">
            <div>
                <label class="block text-sm font-medium text-slate-700">Product Name:</label>
                <input v-model="editedProduct.name" type="text"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-700 text-emerald-400" />
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Stock:</label>
                <input v-model="editedProduct.stock" type="number" min="0"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-700 text-emerald-400" />
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Price:</label>
                <input v-model="editedProduct.price" type="number" min="0"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-700 text-emerald-400" />
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Status:</label>
                <select v-model="editedProduct.status"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-700 text-emerald-400">
                    <option class="placeholder" disabled value="">Choose one</option>
                    <option v-for="(st, index) in status" :key="index" :value="st.value">{{ st.name }}</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Category:</label>
                <select v-model="editedProduct.category"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-700 text-emerald-400">
                    <option class="placeholder" disabled value="">Choose one</option>
                    <option v-for="(category, index) in categories" :key="index" :value="category.value">{{
                        category.name }}</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Upload Image:</label>
                <input
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer focus:ring-2 focus:ring-sky-700 shadow-md"
                    type="file" accept=".jpg, .png, .jpeg" @change="chooseBinaryImg" />
                <div class="mt-3">
                    <a :href="editedProduct.image" target="_blank" class="text-blue-500 underline">{{
                        editedProduct.image }}</a>
                    <img v-show="editedProduct.image" :src="editedProduct.image" alt="img"
                        class="mt-2 rounded-lg border w-24 h-24 object-cover">
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Description:</label>
                <textarea v-model="editedProduct.description"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-700 text-emerald-400"></textarea>
            </div>

            <div class="w-full flex flex-col justify-center items-center">
                <div class="w-full flex justify-center items-center mb-4">
                    <button @click="$emit('updateProduct', editedProduct)"
                        class="w-full bg-blue-400 py-2 px-4 rounded-lg cursor-pointer hover:opacity-80 text-white">Update
                        Product</button>
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
