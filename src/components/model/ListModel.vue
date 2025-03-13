<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  listType: {
    type: String,
    default: "list",
    validator(value) {
      return ["card", "list"].includes(value);
    },
  },
});
</script>

<template>
  <div class="p-4">
    <div class="text-2xl font-bold mb-6 text-center">
      <slot name="heading">###Enter your list heading###</slot>
    </div>
    <ul v-if="listType === 'list'" class="space-y-4">
      <li v-for="(item, index) in items" :key="index" class="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <slot name="listItems" :item="item">Enter your list items</slot>
      </li>
    </ul>
    <div v-else-if="listType === 'card'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <slot name="listItems" :item="item">Enter your list items</slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<style scoped></style>