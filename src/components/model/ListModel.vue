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
  <div class="p-4 max-w-7xl mx-auto">
    <div class="mb-6 border-b border-gray-200 pb-3">
      <h2 class="text-2xl font-bold text-gray-800 tracking-wide">
        <slot name="heading">###Enter your list heading###</slot>
      </h2>
    </div>
    
    <div v-show="items.length === 0" class="py-12 px-4 text-center bg-gray-50 rounded-lg shadow-sm"> 
      <svg class="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 12H4m8-8v16"/>
      </svg>
      <h3 class="mt-3 text-lg font-medium text-gray-700">No Products Available</h3>
    </div>
    
    <div 
      v-if="listType === 'card' && items.length > 0"
      :class="['grid gap-6', gridCols]"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="group bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div class="p-4 h-full flex flex-col">
          <slot name="listItems" :yourItem="item">Enter your list item</slot>
        </div>
        <div class="bg-gradient-to-r from-blue-50 to-white h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </div>
    
    <div v-if="listType === 'list' && items.length > 0" class="space-y-3 bg-white rounded-lg shadow">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="py-4 px-6 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center"
      >
        <div class="w-full">
          <slot name="listItems" :yourItem="item">Enter your list item</slot>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.grid > div {
  transform: translateY(0);
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease;
}

.grid > div:hover {
  transform: translateY(-4px);
}

.space-y-3 > div:hover {
  cursor: pointer;
}
</style>
