<script setup>
import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";
import ProductManager from "./components/product/ProductManager.vue";
import { useRouter } from 'vue-router';
import { ref } from "vue";
</script>
<template>

  <Header/>
  <ProductManager />
  <Footer/>
 

</template>
<style scoped></style>
