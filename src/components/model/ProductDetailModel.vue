<script setup>
import { defineProps } from 'vue'

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="w-full min-h-screen bg-gray-100 p-5 overflow-auto">
    <div class="flex items-center gap-4 mb-8">
      <slot name="navigation"></slot>
    </div>
    <div class="bg-white p-8 rounded-2xl shadow-xl max-w-6xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-1/2">
          <slot name="image">
            <img
              class="rounded-xl object-contain w-full lg:h-[500px] sm:h-[200px]"
              :src="product.image || 'https://via.placeholder.com/600'"
              alt="product image"
            />
          </slot>
        </div>
        
        <div class="lg:w-1/2 space-y-6">
          <div>
            <slot name="header" :product="product">
              <h1 class="text-2xl font-bold text-gray-900">{{ product.name }}</h1>
            </slot>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <slot name="price" :product="product">
              <div class="flex items-center gap-4">
                <span class="text-3xl font-bold text-gray-900">${{ product.price }}</span>
              </div>
            </slot>
          </div>

          <div class="mt-8 pt-8 border-t">
            <slot name="details" :product="product">
              <h3 class="text-lg font-semibold mb-4">Details</h3>
              <div class="text-gray-600 leading-relaxed">
                <p v-if="product.id"><span class="font-semibold">ID: </span>{{ product.id }}</p>
                <p v-if="product.description"><span class="font-semibold">Description: </span>{{ product.description }}</p>
                <p v-if="product.stock !== undefined"><span class="font-semibold">Stock: </span>{{ product.stock }}</p>
                <p v-if="product.status"><span class="font-semibold">Status: </span>{{ product.status }}</p>
              </div>
            </slot>
          </div>

          <div class="flex gap-4 pt-4">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
