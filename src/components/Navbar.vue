<script setup>
import { computed } from "vue"
import NavbarModel from "./model/NavbarModel.vue"
import NavigationItem from "./common/NavigationItem.vue"
import CartIcon from "./common/CartIcon.vue"

const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
})

const count = computed(() => props.count)
</script>

<template>
  <NavbarModel>
    <template #title>Product Management</template>
    
    <template #navigation-items>
      <NavigationItem to="/user-products">PRODUCT</NavigationItem>
      <NavigationItem to="/home">ABOUT</NavigationItem>
      <li>
        <router-link to="/user-carts">
          <CartIcon :count="count" />
        </router-link>
      </li>
    </template>
    
    <template #mobile-navigation-items>
      <NavigationItem to="/user-products" mobile>PRODUCT</NavigationItem>
      <NavigationItem to="/home" mobile>ABOUT</NavigationItem>
      <NavigationItem to="/user-carts" mobile>CART</NavigationItem>
    </template>
  </NavbarModel>
</template>
