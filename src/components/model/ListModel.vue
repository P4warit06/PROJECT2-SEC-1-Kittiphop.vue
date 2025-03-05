<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  listType: {
    type: String,
    default: "list",
    validator(value, props) {
      return ["card", "list"].includes(value);
    },
  },
});
console.log(props.items);
</script>

<template>
  <div class="p-2">
    <div class="text-xl tracking-wider font-semibold">
      <slot name="heading">###Enter your list heading###</slot>
    </div>
    <ul v-if="listType === 'list'">
      <li v-for="(item, index) in items" :key="index">
        <slot name="listItems" :yourItem="item">Enter your list items</slot>
      </li>
    </ul>
    <div v-else-if="listType === 'card'">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="m-2 p-4 border rounded-lg shadow-sm"
      >
        <slot name="listItems" :yourItem="item">Enter your list items</slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
