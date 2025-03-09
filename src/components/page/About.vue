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
  <div class="relative min-h-screen overflow-hidden">
    <!-- Background with gradient -->
    <div class="absolute inset-0 " :style="{backgroundImage: `url(/images/about-bg.jpg)` , backgroundSize:'cover' }"/>
    
    <!-- Navigation Bar -->
    <div class="relative z-20">
      <Navbar/>
      
      <!-- Main Content -->
      <MainContent>
        <h1 class="text-white text-4xl md:text-5xl font-bold mb-8">
          OUR COMPANY
        </h1>
        <p class="text-white text-lg md:text-xl leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa
        </p>
      </MainContent>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

h1, h2, h3, button, a {
  font-family: 'Montserrat', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


</style>