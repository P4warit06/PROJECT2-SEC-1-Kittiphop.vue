<script setup>
import ListModel from "./model/ListModel.vue";
import { ref, computed } from "vue";

defineEmits(["deleteProduct", "setEditing", "selectDeleteProduct"]);
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  selectedProducts: {
    type: Array,
    required: true,
  },
})

const selectProductList = ref([]);
const limitShowProduct = ref(10); // จำนวนสินค้าที่แสดงเริ่มต้น

// คำนวณสินค้าที่จะแสดง (10 ชิ้นแรก แล้วเพิ่มเมื่อคลิก Load More)
const displayedProducts = computed(() => {
  return props.products.slice(0, limitShowProduct.value);
})

// ตรวจสอบว่ายังมีสินค้าเหลือให้โหลดเพิ่มหรือไม่
const hasMoreProducts = computed(() => {
  return limitShowProduct.value < props.products.length;
})

// ฟังก์ชันโหลดสินค้าเพิ่ม
const loadMoreProducts = () => {
  limitShowProduct.value += 10; // เพิ่มทีละ 10 ชิ้น
}
</script>

<template>
  <ListModel :items="displayedProducts" listType="card">
    <template #heading>
      Product List
      <div class="flex justify-end w-full mt-2">
        <button
          v-if="selectProductList.length > 0"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          @click="$emit('selectDeleteProduct', selectProductList)"
        >
          Delete Selected ({{ selectProductList.length }})
        </button>
      </div>
    </template>

    <template #listItems="{ yourItem }">
      <input
        type="checkbox"
        :value="yourItem.id"
        v-model="selectProductList"
        class="mr-2"
      />

      <div class="w-20 h-20 flex-shrink-0">
        <img
          v-if="yourItem.image"
          :src="yourItem.image"
          :alt="yourItem.name"
          class="w-full h-full object-cover rounded-lg border border-gray-200"
        />
        <div
          v-else
          class="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg text-gray-400"
        >
          No Image
        </div>
      </div>
      <button
        @click="$emit('setEditing', yourItem)"
        class="text-purple-600 hover:text-purple-400 cursor-pointer"
      >
        Edit |
      </button>
      <button
        @click="$emit('deleteProduct', yourItem.id)"
        class="text-red-600 hover:text-red-400 cursor-pointer"
      >
        Delete
      </button>
      <p>
        <span class="italic">id: </span>
        <router-link
          :to="{ name: 'ProductDetail', params: { productId: yourItem.id } }"
          active-class="text-600-blue"
          class="underline"
        >
          {{ yourItem.id }}
        </router-link>
        , <span class="italic">product name:</span>{{ yourItem.name }}
        <span class="italic">price:</span>{{ yourItem.price }}
        <span class="italic">category:</span>{{ yourItem.category }}
        <span class="italic">status:</span>{{ yourItem.status }}
      </p>
    </template>
  </ListModel>
  <div v-show="hasMoreProducts" class="flex justify-center mt-4">
    <button
      @click="loadMoreProducts"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Load More
    </button>
  </div>
</template>

<style scoped></style>