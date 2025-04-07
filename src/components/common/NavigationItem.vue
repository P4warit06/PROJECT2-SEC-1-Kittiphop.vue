<script setup>
defineProps({
  to: {
    type: String,
    required: true
  },
  mobile: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <li :class="{'text-white font-bold': !mobile}">
    <router-link 
      :to="to" 
      :class="mobile ? 
        'text-black block hover:opacity-60 py-2 text-center' : 
        'hover:opacity-70'"
    >
      <slot></slot>
    </router-link>
  </li>
</template>
