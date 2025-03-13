<script setup>
      import Product from "../components/product/ProductManager.vue";
      import Header from "../components/common/Header.vue";
      import Footer from "../components/common/Footer.vue";
      import AddProduct from "@/components/product/AddProduct.vue";
</script>
 
<template>
<div>
  <AddProduct></AddProduct>
  <Header/>
  <Product/>
  <Footer/>
</div>
</template>
 
<style scoped>

</style>