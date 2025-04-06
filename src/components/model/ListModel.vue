<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  listType: {
    default: 'list',
    validator(value, props) {
      return ['card', 'list'].includes(value)
    }
  },
  gridCols: {
    type: String,
    default: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }
})
</script>

<template>
  <div class="p-4">
    <div class="text-xl tracking-wider font-semibold mb-4">
      <slot name="heading">###Enter your list heading###</slot>
    </div>
    <div v-show="items.length === 0" class="text-gray-500 text-center py-8"> 
      <h1>No Product Here</h1>
    </div>
    
    <div 
      v-if="listType === 'card'"
      :class="['grid gap-4', gridCols]"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
      >
        <slot name="listItems" :yourItem="item">Enter your list item</slot>
      </div>
    </div>
    
    <ul v-if="listType === 'list'" class="space-y-2">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="border-b py-2 max-w-2xl mx-auto "
      >
        <slot name="listItems" :yourItem="item">Enter your list item</slot>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>