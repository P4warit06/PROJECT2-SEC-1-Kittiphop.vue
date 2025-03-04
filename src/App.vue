<script setup>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";
import { ref } from "vue";

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
      <main class="flex">
      <Sidebar>
        
      </Sidebar>
      <div class="flex-1 p-6 bg-gray-50">
          <RouterView />
      </div>
      </main>
    <Footer />
  </div>
</template>

<style scoped></style>
