<script setup>
import NavbarModel from "@/components/model/NavbarModel.vue"
import NavigationItem from "@/components/common/NavigationItem.vue"
</script>

<template>
  <NavbarModel>
    <template #title>Product Management</template>
    
    <template #navigation-items>
      <NavigationItem to="/user-manager">USER</NavigationItem>
      <NavigationItem to="/product-manager">PRODUCT</NavigationItem>
      <NavigationItem to="/product-tracker">PRODUCT TRACKER</NavigationItem>
      <NavigationItem to="/home">ABOUT</NavigationItem>
    </template>
    
    <template #mobile-navigation-items>
      <NavigationItem to="/user-manager" mobile>USER</NavigationItem>
      <NavigationItem to="/product-manager" mobile>PRODUCT</NavigationItem>
      <NavigationItem to="/product-tracker" mobile>TRACKER</NavigationItem>
      <NavigationItem to="/home" mobile>ABOUT</NavigationItem>
    </template>
  </NavbarModel>
</template>
