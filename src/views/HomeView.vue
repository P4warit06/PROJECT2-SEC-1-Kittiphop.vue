<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const about = ref(null);
const explore = ref(null);
const currentUser = ref(null);

// Check if user is logged in on component mount
onMounted(() => {
  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    currentUser.value = JSON.parse(userJson);
  }
});

// Logout function
const router = useRouter();
const handleLogout = () => {
  localStorage.removeItem('currentUser');
  currentUser.value = null;
  router.push('/login');
};
</script>

<template>
  <div>
    <!-- Home Section -->
    <div class="relative min-h-screen">
      <!-- Background Image for Home Section -->
      <div class="absolute inset-0 z-0" :style="{backgroundImage: `url(/images/home-bg.jpg)` , backgroundSize:'cover' , backgroundPosition:'center' }"/>
      
      <!-- Navigation Bar -->
      <header class="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div class="flex justify-between items-center p-6">
          <!-- Menu Button -->
          <button class="text-white focus:outline-none flex space-x-24">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <button @click="explore.scrollIntoView({ behavior: 'smooth' });" class="text-white text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer">EXPLORE</button>
          </button>
          
          <!-- Navigation Links -->
          <div class="flex items-center space-x-6">
            <div class="flex space-x-6 ml-auto">
              <!-- Only show PRODUCT link if user is logged in -->
              <router-link 
                v-if="currentUser" 
                to="/product-manager" 
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300 "
              >
                PRODUCT
              </router-link>
              
              <button @click="about.scrollIntoView({ behavior: 'smooth' });" class="text-white text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer">ABOUT</button>
              
              <!-- Show login/signup if not logged in, otherwise show username and logout -->
              <template v-if="!currentUser">
                <router-link to="/login" class="text-white text-xl font-bold hover:text-blue-200 transition duration-300">LOGIN</router-link>
                <router-link to="/sign-up" class="text-white text-xl font-bold transition duration-300 px-1 rounded-sm bg-blue-400 hover:brightness-120">SIGN UP</router-link>
              </template>
              
              <template v-else>
                <div class="flex items-center space-x-4">
                  <span class="text-white text-xl font-bold">{{ currentUser.username }}</span>
                  <button 
                    @click="handleLogout" 
                    class="text-white text-xl font-bold hover:text-red-300 transition duration-300"
                  >
                    LOGOUT
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content for Home Section -->
      <main class="flex flex-col items-center justify-center text-center px-4 py-20 relative z-10 min-h-screen">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            TRANSPORTATION SERVICE
          </h1>
          <h2 class="text-white text-5xl md:text-6xl lg:text-7xl font-bold">
            WHEREVER YOU WANT
          </h2>
        </div>
      </main>
    </div>

    <!-- About Section -->
    <div ref="about" class="relative min-h-screen">
      <!-- Background with gradient for About Section -->
      <div class="absolute inset-0" :style="{backgroundImage: `url(/images/about-bg.jpg)` , backgroundSize:'cover' }"/>
      
      <!-- Main Content for About Section -->
      <main class="flex flex-col items-center justify-center text-center px-4 py-20 relative z-20 min-h-screen">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-white text-4xl md:text-5xl font-bold mb-8">
            OUR COMPANY
          </h1>
          <p class="text-white text-lg md:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </main>
    </div>
    <div ref="explore" class="relative min-h-screen">
      <!-- Background with gradient for About Section -->
      <div class="absolute inset-0" :style="{backgroundColor:'green', backgroundSize:'cover' }"/>
      
      <!-- Main Content for About Section -->
      <main class="flex flex-col items-center justify-center text-center px-4 py-20 relative z-20 min-h-screen">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-white text-4xl md:text-5xl font-bold mb-8">
            EXPLORE
          </h1>
          <p class="text-white text-lg md:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

h1, h2, h3, button, a {
  font-family: 'Montserrat', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>

