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
  }
})
</script>

<template>
  <div class="p-2">
    <div class="text-xl tracking-wider font-semibold">
      <slot name="heading">###Enter your list heading###</slot>
    </div>
    <div v-show="items.length === 0" class="text-gray-500"> 
      <h1>No Product Here</h1>
    </div>
    <ul>

      <li
        v-for="(item, index) in items"
        :key="index"
        :class="listType === 'card' ? 'shadow-md p-10' : ''"
      >
        <slot name="listItems" :yourItem="item" >Enter your list item</slot>
        <!-- {{ item }} -->
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
