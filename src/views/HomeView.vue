<script setup>
import { useRouter } from "vue-router"
import { ref, onMounted, computed } from "vue"
import ProductListHomePage from "@/components/ProductListHomePage.vue"

const router = useRouter()
const about = ref(null)
const explore = ref(null)
const landing = ref(null)
const currentUser = ref(null)
const isDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  const userJson = localStorage.getItem("currentUser")
  if (userJson) {
    currentUser.value = JSON.parse(userJson)
  }
  
  checkMobile()
  window.addEventListener('resize', checkMobile)
  window.addEventListener('scroll', handleScroll)
})

// Computed property for header background
const headerClass = computed(() => {
  return scrollPosition.value > 50 
    ? 'bg-black/70 backdrop-blur-md shadow-lg' 
    : 'bg-transparent'
})

const scrollPosition = ref(0)
const handleScroll = () => {
  scrollPosition.value = window.scrollY
}

const handleLogout = () => {
  localStorage.removeItem("currentUser")
  currentUser.value = null
  isDropdownOpen.value = false
  isMobileMenuOpen.value = false
  router.push("/home")
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const scrollToSection = (ref) => {
  ref.scrollIntoView({ behavior: 'smooth' })
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<template>
  <div @click="closeDropdown" class="overflow-x-hidden">
    <div class="relative min-h-screen">
      <div class="absolute inset-0 z-0" :style="{
          backgroundImage: `url(/images/bg-home.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }" />   

      <header 
        class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        :class="headerClass"
      >
        <div class="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div class="flex justify-between items-center">
            <button 
              @click.stop="toggleMobileMenu"
              class="text-white focus:outline-none lg:hidden hover:text-blue-200 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div class="hidden lg:flex items-center space-x-6 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2 text-white" viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <button 
                @click="scrollToSection(landing)"
                class="text-white text-lg xl:text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer"
              >
                HOME
              </button>
              <button 
                @click="scrollToSection(explore)"
                class="text-white text-lg xl:text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer"
              >
                EXPLORE
              </button>
            </div>

            <div class="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <router-link 
                v-if="currentUser && currentUser.role === 'admin'" 
                to="/user-manager"
                class="text-white text-lg xl:text-xl font-bold hover:text-blue-200 transition duration-300"
              >
                USERS
              </router-link>
              
              <router-link 
                v-if="currentUser && currentUser.role === 'admin'" 
                to="/product-manager"
                class="text-white text-lg xl:text-xl font-bold hover:text-blue-200 transition duration-300"
              >
                PRODUCT
              </router-link>
              
              <router-link 
                v-if="currentUser && currentUser.role === 'admin'" 
                to="/product-tracker"
                class="text-white text-lg xl:text-xl font-bold hover:text-blue-200 transition duration-300"
              >
                TRACKER
              </router-link>
              
              <router-link 
                v-if="!currentUser || currentUser.role === 'user'" 
                to="/user-products"
                class="text-white text-lg xl:text-xl font-bold hover:text-blue-200 transition duration-300"
              >
                PRODUCT
              </router-link>
              
              <button 
                @click="scrollToSection(about)"
                class="text-white text-lg xl:text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer"
              >
                ABOUT
              </button>

              <template v-if="!currentUser">
                <router-link 
                  to="/login"
                  class="text-white text-lg xl:text-xl font-bold hover:text-blue-200 transition duration-300"
                >
                  LOGIN
                </router-link>
                
                <router-link 
                  to="/sign-up"
                  class="text-white text-lg xl:text-xl font-bold transition duration-300 px-3 py-1 rounded-sm bg-blue-400 hover:brightness-110"
                >
                  SIGN UP
                </router-link>
              </template>

              <template v-else>
                <div class="relative">
                  <button 
                    @click.stop="toggleDropdown"
                    class="flex items-center text-white text-lg xl:text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer"
                  >
                    <span>{{ currentUser.username.toUpperCase() }}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 ml-1 transition-transform duration-300"
                      :class="{ 'transform rotate-180': isDropdownOpen }" 
                      fill="none" 
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

    
                  <div 
                    v-if="isDropdownOpen" 
                    @click.stop
                    class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fadeIn"
                  >
                    <router-link 
                      :to="{name : 'UserProfile', params: { userId: currentUser.id }}"
                      class="flex px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-150 justify-center"
                    >
                      <p class="cursor-pointer">Profile</p>
                    </router-link>
                    
                    <router-link 
                      v-if="currentUser && currentUser.role !== 'admin'" 
                      to="/top-up"
                      class="flex px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-150 justify-center"
                      @click="isMobileMenuOpen = false"
                    >
                      Top up
                    </router-link>
                    
                    <button 
                      @click="handleLogout"
                      class="flex w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-150 justify-center"
                    >
                      <p class="cursor-pointer">Logout</p>
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- Mobile Menu -->
          <div 
            v-if="isMobileMenuOpen"
            class="lg:hidden fixed inset-0 bg-gradient-to-b from-blue-600 to-sky-500 backdrop-blur-sm z-[100] flex flex-col items-center justify-center transition-all duration-300 ease-in-out animate-fadeIn"
          >
            <button 
              @click="isMobileMenuOpen = false"
              class="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors duration-300 p-2 rounded-full bg-black/30"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="flex flex-col items-center space-y-0 w-full max-w-xs">
              <button 
                @click="scrollToSection(landing)"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center animate-slideIn"
                style="--index: 0"
              >
                HOME
              </button>

              <button 
                @click="scrollToSection(explore)"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center animate-slideIn"
                style="--index: 1"
              >
                EXPLORE
              </button>

              <router-link 
                v-if="currentUser && currentUser.role === 'admin'" 
                to="/product-manager"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center animate-slideIn"
                @click="isMobileMenuOpen = false"
                style="--index: 2"
              >
                PRODUCT
              </router-link>

              <router-link 
                v-if="currentUser && currentUser.role === 'user'" 
                to="/user-products"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center animate-slideIn"
                @click="isMobileMenuOpen = false"
                style="--index: 2"
              >
                PRODUCT
              </router-link>

              <button 
                @click="scrollToSection(about)"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center animate-slideIn"
                style="--index: 3"
              >
                ABOUT
              </button>

              <template v-if="!currentUser">
                <router-link 
                  to="/login"
                  class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center animate-slideIn"
                  @click="isMobileMenuOpen = false"
                  style="--index: 4"
                >
                  LOGIN
                </router-link>

                <router-link 
                  to="/sign-up"
                  class="text-white text-2xl font-bold transition-all duration-300 w-full py-4 mt-4 flex justify-center items-center bg-blue-500 hover:bg-blue-600 rounded-md animate-slideIn"
                  @click="isMobileMenuOpen = false"
                  style="--index: 5"
                >
                  SIGN UP
                </router-link>
              </template>

              <template v-else>
                <div class="w-full py-4 flex justify-center items-center animate-slideIn" style="--index: 4">
                  <div class="px-4 py-2 bg-white/10 rounded-full mb-4">
                    <span class="text-white text-lg">{{ currentUser.username.toUpperCase()}}</span>
                  </div>
                </div>
                
                <router-link 
                  :to="{name : 'UserProfile', params: { userId: currentUser.id }}"
                  class="text-white text-2xl font-bold hover:text-blue-300 transition-all duration-300 w-full py-4 flex justify-center items-center bg-white/10 hover:bg-blue-500/30 rounded-md mb-4 animate-slideIn"
                  @click="isMobileMenuOpen = false"
                  style="--index: 5"
                >
                  MY PROFILE
                </router-link>
                
                <router-link 
                  v-if="currentUser && currentUser.role !== 'admin'"
                  to="/top-up"
                  class="text-white text-2xl font-bold hover:text-green-300 transition-all duration-300 w-full py-4 flex justify-center items-center bg-white/10 hover:bg-green-500/30 rounded-md mb-4 animate-slideIn"
                  @click="isMobileMenuOpen = false"
                  style="--index: 6"
                >
                  TOP UP
                </router-link>
                
                <button 
                  @click="handleLogout"
                  class="text-white text-2xl font-bold hover:text-red-300 transition-all duration-300 w-full py-4 flex justify-center items-center bg-gray-600/80 hover:bg-red-500/30 rounded-md animate-slideIn"
                  style="--index: 7"
                >
                  LOGOUT
                </button>
              </template>
            </div>
          </div>
        </div>
      </header>
      <main 
        ref="landing"
        class="flex flex-col items-center justify-start md:justify-center text-center px-4 py-10 relative z-10 min-h-screen"
      >
        <div class="mt-24 sm:mt-20 md:mt-0 max-w-4xl mx-auto">
          <h1 class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 font-[Poppins] animate-fadeIn">
            TRANSPORTATION SERVICE
          </h1>
          <h2 class="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold mt-2 animate-fadeIn animation-delay-200">
            AND SHOP FOR WHATEVER YOU WANT
          </h2>
        </div>
      </main>
    </div>

    <div ref="about" class="relative min-h-screen">
      <div class="absolute inset-0" :style="{
          backgroundImage: `url(/images/bg-home2.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }" />

      <main class="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative z-20 min-h-screen">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            OUR COMPANY
          </h1>
          <p class="text-white text-base sm:text-lg md:text-xl leading-relaxed mb-6">
            <span class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              Our platform is designed to
            </span>
            <span class="block mt-4">
              Empower users to effortlessly list their products for sale, creating a seamless and dynamic marketplace
              experience.
              By providing both an intuitive user interface and a comprehensive admin panel, we offer a fully-managed
              environment
              that ensures ease of use for sellers and efficient product oversight for admins.
            </span>
            <span class="block mt-4">
              Whether you're looking to sell your items in a container-like listing or manage and approve product
              submissions,
              our website guarantees a smooth and secure selling process from start to finish.
            </span>
          </p>
        </div>
      </main>
    </div>

    <div>
      <div class="relative min-h-screen flex justify-center items-center">
        <div class="absolute inset-0" :style="{
            backgroundImage: `url(/images/bg-home3.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }" />
        <div class="w-full z-10">
          <ProductListHomePage />
        </div>
      </div>
    </div>

    <div class="relative min-h-screen">
      <div class="absolute inset-0" :style="{
          backgroundImage: `url(/images/bg-home4.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }" />

      <main class="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative z-20 min-h-screen">
        <div class="container mx-auto px-4">
          <h2 class="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16">WHY CHOOSE US</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

            <div class="text-center transform transition-all duration-500 hover:scale-105">
              <div class="bg-gray-100 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:bg-gray-200 shadow-lg">
                <span class="text-4xl sm:text-5xl">🚚</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-semibold mb-2 text-white">Fast Delivery</h3>
              <p class="text-white text-base sm:text-xl max-w-xs mx-auto">Get your products delivered within 24 hours</p>
            </div>

            <div class="text-center transform transition-all duration-500 hover:scale-105">
              <div class="bg-gray-100 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:bg-gray-200 shadow-lg">
                <span class="text-4xl sm:text-5xl">⭐</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-semibold mb-2 text-white">Quality Products</h3>
              <p class="text-white text-base sm:text-xl max-w-xs mx-auto">We ensure the highest quality standards</p>
            </div>

            <div class="text-center transform transition-all duration-500 hover:scale-105">
              <div class="bg-gray-100 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:bg-gray-200 shadow-lg">
                <span class="text-4xl sm:text-5xl">💰</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-semibold mb-2 text-white">Best Prices</h3>
              <p class="text-white text-base sm:text-xl max-w-xs mx-auto">Competitive prices for all our products</p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div ref="explore" class="relative min-h-screen">
      <div class="absolute inset-0"
        :style="{ backgroundImage: 'url(/images/bg-home5.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }" />

      <main class="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative z-20 min-h-screen">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            EXPLORE
          </h1>
          
          <div class="bg-black/30 backdrop-blur-sm p-6 rounded-xl">
            <p class="text-white text-base sm:text-lg md:text-xl leading-relaxed my-6">
              <span class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-200 bg-clip-text text-transparent block mb-4">
                For our website
              </span>
              Our website is designed as a platform where users can easily list products for sale. It includes both a
              user interface and an admin panel to support comprehensive management. On the user side, you can choose
              the products you want to sell and provide the necessary details to list them
              ready for sale at any time.
            </p>
            
            <p class="text-white text-base sm:text-lg md:text-xl leading-relaxed my-6">
              <span class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-100 bg-clip-text text-transparent block mb-4">
                For Admin Side
              </span>
              The Admin panel is designed to efficiently manage product listings submitted by users. Admins can
              observe and review all listed items, with the ability to edit or delete product from user submissions, ensuring
              a smooth and secure selling process on our platform.
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap");

h1,
h2,
h3,
button,
a {
  font-family: "Montserrat", sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.05s);
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

@media (max-width: 640px) {
  h1 {
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
}

.overflow-x-hidden {
  overflow-x: hidden;
}

@media (max-width: 1023px) {
  .fixed.inset-0 {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>