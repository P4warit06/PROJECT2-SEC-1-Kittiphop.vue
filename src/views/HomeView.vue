<script setup>
import { useRouter } from "vue-router"
import { ref, onMounted } from "vue"

const about = ref(null)
const explore = ref(null)
const landing = ref(null)
const currentUser = ref(null)
const isDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)

onMounted(() => {
  const userJson = localStorage.getItem("currentUser") // String
  if (userJson) {
    currentUser.value = JSON.parse(userJson) //แปลง String กลับเป็น Object
  }
})

const router = useRouter()
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
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const scrollToSection = (ref) => {
  ref.scrollIntoView({ behavior: 'smooth' })
  isMobileMenuOpen.value = false
}

</script>

<template>
  <div @click="closeDropdown">
    <!-- Home Section -->
    <div class="relative min-h-screen">
      <div class="absolute inset-0 z-0" :style="{
          backgroundImage: `url(/images/home-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }" />

      <!-- Navigation Bar -->
      <header class="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div class="px-4 sm:px-6 py-4 sm:py-6">
          <div class="flex justify-between items-center">
            <!-- Mobile Menu Button -->
            <button @click.stop="toggleMobileMenu"
              class="text-white focus:outline-none lg:hidden hover:text-blue-200 transition-colors duration-300"
              aria-label="Toggle menu">
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
              <button @click="scrollToSection(landing)"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer">HOME</button>


              <button @click="scrollToSection(explore)"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer">
                EXPLORE
              </button>
            </div>

            <div class="hidden lg:flex items-center space-x-6">
              <router-link v-if="currentUser && currentUser.role === 'admin'" to="/user-manager"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300">
                USERS
              </router-link>
              
              <router-link v-if="currentUser && currentUser.role === 'admin'" to="/product-manager"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300">
                PRODUCT
              </router-link>
              <router-link v-if="currentUser && currentUser.role === 'admin'" to="/product-tracker"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300">
                TRACKER
              </router-link>
              <router-link v-if="!currentUser || currentUser.role === 'user'" to="/user-products"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300">
                PRODUCT
              </router-link>
              <button @click="scrollToSection(about)"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer">
                ABOUT
              </button>

              <template v-if="!currentUser">
                <router-link to="/login"
                  class="text-white text-xl font-bold hover:text-blue-200 transition duration-300">LOGIN</router-link>
                <router-link to="/sign-up"
                  class="text-white text-xl font-bold transition duration-300 px-3 py-1 rounded-sm bg-blue-400 hover:brightness-110">SIGN
                  UP</router-link>
              </template>

              <template v-else>
                <div class="relative">
                  <button @click.stop="toggleDropdown"
                    class="flex items-center text-white text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer">
                    <span>{{ currentUser.username.toUpperCase() }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1"
                      :class="{ 'transform rotate-180': isDropdownOpen }" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div v-if="isDropdownOpen" @click.stop
                    class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ">
                    <router-link :to="{name : 'UserProfile', params: { userId: currentUser.id }}"
                      class="flex px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-150 justify-center">
                      <p class="cursor-pointer">Profile</p>
                    </router-link>
                    <router-link v-if="currentUser && currentUser.role !== 'admin'" to="/top-up"
                      class="flex px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-150 justify-center "
                      @click="isMobileMenuOpen = false">
                      Top up
                    </router-link>
                    <button @click="handleLogout"
                      class="flex w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-150 justify-center">
                      <p class="cursor-pointer">Logout</p>
                    </button>
                   
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- Mobile Menu -->
          <div v-if="isMobileMenuOpen"
            class="lg:hidden fixed inset-0 bg-gradient-to-b from-blue-600 to-sky-500 backdrop-blur-sm z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
            <button @click="isMobileMenuOpen = false"
              class="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors duration-300 p-2 rounded-full bg-black/30"
              aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="flex flex-col items-center space-y-0 w-full max-w-xs">

              <button @click="scrollToSection(landing)"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center">
                HOME
              </button>

              <button @click="scrollToSection(explore)"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center">
                EXPLORE
              </button>

              <router-link v-if="currentUser && currentUser.role === 'admin'" to="/product-manager"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center"
                @click="isMobileMenuOpen = false">
                PRODUCT
              </router-link>

              <router-link v-if="currentUser && currentUser.role === 'user'" to="/user-products"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center"
                @click="isMobileMenuOpen = false">
                PRODUCT
              </router-link>

              <button @click="scrollToSection(about)"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center">
                ABOUT
              </button>

              <template v-if="!currentUser">
                <router-link to="/login"
                  class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center"
                  @click="isMobileMenuOpen = false">
                  LOGIN
                </router-link>

                <router-link to="/sign-up"
                  class="text-white text-2xl font-bold transition-all duration-300 w-full py-4 mt-4 flex justify-center items-center bg-blue-500 hover:bg-blue-600 rounded-md"
                  @click="isMobileMenuOpen = false">
                  SIGN UP
                </router-link>
              </template>

              <template v-else>
                <div class="w-full py-4 flex justify-center items-center">
                  <div class="px-4 py-2 bg-white/10 rounded-full mb-4">
                    <span class="text-white text-lg">{{ currentUser.username.toUpperCase()}}</span>
                  </div>
                </div>
                
                <router-link 
                  :to="{name : 'UserProfile', params: { userId: currentUser.id }}"
                  class="text-white text-2xl font-bold hover:text-blue-300 transition-all duration-300 w-full py-4 flex justify-center items-center bg-white/10 hover:bg-blue-500/30 rounded-md mb-4"
                  @click="isMobileMenuOpen = false"
                >
                  MY PROFILE
                </router-link>
                
                <router-link 
                  v-if="currentUser && currentUser.role !== 'admin'"
                  to="/top-up"
                  class="text-white text-2xl font-bold hover:text-green-300 transition-all duration-300 w-full py-4 flex justify-center items-center bg-white/10 hover:bg-green-500/30 rounded-md mb-4"
                  @click="isMobileMenuOpen = false"
                >
                  TOP UP
                </router-link>
                
                <button @click="handleLogout"
                  class="text-white text-2xl font-bold hover:text-red-300 transition-all duration-300 w-full py-4 flex justify-center items-center bg-gray-600/80 hover:bg-red-500/30 rounded-md">
                  LOGOUT
                </button>
              </template>
            </div>
          </div>
        </div>
      </header>

      <main ref="landing"
        class="flex flex-col items-center justify-center text-center px-4 py-20 relative z-10 min-h-screen">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-4">
            TRANSPORTATION SERVICE
          </h1>
          <h2 class="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            WHEREVER YOU WANT
          </h2>
        </div>
      </main>
    </div>

    <!-- About Section -->
    <div ref="about" class="relative min-h-screen">
      <div class="absolute inset-0" :style="{
          backgroundImage: `url(/images/about-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }" />

      <main class="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative z-20 min-h-screen">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            OUR COMPANY
          </h1>
          <p class="text-white text-base sm:text-lg md:text-xl leading-relaxed mb-6">
            <span class="text-3xl font-bold bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
              Our platform is designed to
            </span>
            Empower users to effortlessly list their products for sale, creating a seamless and dynamic marketplace
            experience.
            By providing both an intuitive user interface and a comprehensive admin panel, we offer a fully-managed
            environment
            that ensures ease of use for sellers and efficient product oversight for admins.
            Whether you're looking to sell your items in a container-like listing or manage and approve product
            submissions,
            our website guarantees a smooth and secure selling process from start to finish .
          </p>

        </div>
      </main>
    </div>
    <div>
      
    <!-- WHY CHOOSE US Section Page -->
    <div class="relative min-h-screen">
      <div class="absolute inset-0" :style="{
          backgroundImage: `url(/images/explore-bg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }" />

      <main class="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative z-20 min-h-screen">
        <div >
      <div class="container mx-auto px-4">
        <h2 class="text-white text-3xl sm:text-4xl md:text-5xl font-bold  sm:mb-30">WHY CHOOSE US</h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1: Fast Delivery -->
          <div class="text-center">
            <div class="bg-gray-100 rounded-full w-30 h-30 flex items-center justify-center mx-auto mb-4">
              <span class="text-6xl">🚚</span>
            </div>
            <h3 class="text-2xl font-semibold mb-2 text-white">Fast Delivery</h3>
            <p class="text-white text-xl">Get your products delivered within 24 hours</p>
          </div>

          <!-- Feature 2: Quality Products -->
          <div class="text-center">
            <div class="bg-gray-100 rounded-full w-30 h-30 flex items-center justify-center mx-auto mb-4">
              <span class="text-6xl">⭐</span>
            </div>
            <h3 class="text-2xl font-semibold mb-2 text-white">Quality Products</h3>
            <p class="text-white text-xl">We ensure the highest quality standards</p>
          </div>

          <!-- Feature 3: Best Prices -->
          <div class="text-center">
            <div class="bg-gray-100 rounded-full w-30 h-30 flex items-center justify-center mx-auto mb-4">
              <span class="text-6xl">💰</span>
            </div>
            <h3 class="text-2xl font-semibold mb-2 text-white">Best Prices</h3>
            <p class="text-white text-xl">Competitive prices for all our products</p>
          </div>
        </div>
      </div>
    </div>
      </main>
    </div>
  </div>

    <!-- Explore Section -->
    <div ref="explore" class="relative min-h-screen">
      <div class="absolute inset-0"
        :style="{ backgroundImage : 'url(/images/explore-bg.png)', backgroundColor: 'green', backgroundSize: 'cover' }" />

      <main class="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative z-20 min-h-screen">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            EXPLORE
          </h1>
          <p class="text-white text-base sm:text-lg md:text-xl leading-relaxed my-6">
            <span class="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-200 bg-clip-text text-transparent ">
              For our website
            </span>
            <br>
            Our website is designed as a platform where users can easily list products for sale. It includes both a
            user interface and an admin panel to support comprehensive management. On the user side, you can choose
            the
            products you want to sell and provide the necessary details to list them
            ready for sale at any time . .
          </p>
          <p class="text-white text-base sm:text-lg md:text-xl leading-relaxed my-6.5">
            <span class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-100 bg-clip-text text-transparent">
              For Admin Side
            </span>
            <br>
            The Admin panel is designed to efficiently manage product listings submitted by users. Admins can
            observe
            and review all listed items, with the ability to edit or delete product from user submissions, ensuring
            a
            smooth
            and secure selling process on our platform .
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

h1,
h2,
h3,
button,
a {
  font-family: "Montserrat", sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Mobile menu animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.lg\:hidden button,
.lg\:hidden a {
  animation: slideIn 0.3s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.05s);
}

.fixed {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>