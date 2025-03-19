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
console.log(props.items)
console.log(props.listType)
</script>

<template>
  <div class="p-2">
    <div class="text-xl tracking-wider font-semibold">
      <slot name="heading">###Enter your list heading###</slot>
    </div>
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="listType === 'card' ? 'shadow-md p-10' : ''"
      >
        <slot name="listItems" :yourItem="item">Enter your list item</slot>
        <!-- {{ item }} -->
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
