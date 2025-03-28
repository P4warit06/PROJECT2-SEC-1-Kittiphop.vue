<script setup>
import ListModel from "./model/ListModel.vue";
import { ref, computed } from "vue";
defineEmits(["deleteProduct", "setEditing", "update:selectedProducts"]);
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  selectedProducts: {
    type: Array,
    required: true,
  },
});

const productCompute = computed(() => props.products);
</script>
<template>
  <ListModel :items="productCompute" listType="card">
    <template #heading> Product List </template>
    <template #listItems="{ yourItem }">
      <!-- Checkbox selectProduct-->
      <!-- <div v-show="productCompute ==="></div> -->
        <input
          type="checkbox"
          :value="yourItem.id"
          v-model="props.selectedProducts"
          class="mr-2"
        />
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
            {{ yourItem.id }} </router-link
          >, <span class="italic">product name:</span>{{ yourItem.name }}
          <span class="italic">price:</span>{{ yourItem.price }}
          <span class="italic">category:</span>{{ yourItem.category }}
          <span class="italic">status:</span>{{ yourItem.status }}
        </p>
    </template>
  </ListModel>
</template>
<style scoped></style>
