<script setup>
import Navbar from "../common/PageNavbar.vue";
import MainContent from "../common/PageMainContent.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (route) => {
  router.push({ name: route });
};
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0" :style="{backgroundImage: `url(/images/home-bg.jpg)` , backgroundSize:'cover' , backgroundPosition:'center' }"/>
      
    
    <!-- Navigation Bar -->
    <div class="relative z-10">
      <Navbar/>
      
      <!-- Main Content -->
      <MainContent>
        <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          TRANSPORTATION SERVICE
        </h1>
        <h2 class="text-white text-5xl md:text-6xl lg:text-7xl font-bold">
          WHEREVER YOU WANT
        </h2>
      </MainContent>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

h1, h2, button, a {
  font-family: 'Montserrat', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


</style>