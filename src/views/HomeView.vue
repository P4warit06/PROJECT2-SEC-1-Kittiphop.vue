<script setup>
import { useRouter } from "vue-router"
import { ref, onMounted } from "vue"

const about = ref(null)
const explore = ref(null)
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
      <div
        class="absolute inset-0 z-0"
        :style="{
          backgroundImage: `url(/images/home-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      />

      <!-- Navigation Bar -->
      <header class="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div class="px-4 sm:px-6 py-4 sm:py-6">
          <div class="flex justify-between items-center">
            <!-- Mobile Menu Button -->
            <button 
              @click.stop="toggleMobileMenu" 
              class="text-white focus:outline-none lg:hidden hover:text-blue-200 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <!-- Desktop Navigation -->
            <div class="hidden lg:flex items-center space-x-6">
              <button
                @click="scrollToSection(explore)"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer"
              >
                EXPLORE
              </button>
            </div>

            <!-- Navigation Links - Desktop -->
            <div class="hidden lg:flex items-center space-x-6">
              <router-link
                v-if="currentUser && currentUser.role === 'admin'"
                to="/product-manager"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300"
              >
                PRODUCT
              </router-link>
              <router-link
                v-if="currentUser && currentUser.role === 'user'"
                to="/user-products"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300"
              >
                PRODUCT
              </router-link>
              <button
                @click="scrollToSection(about)"
                class="text-white text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer"
              >
                ABOUT
              </button>

              <template v-if="!currentUser">
                <router-link
                  to="/login"
                  class="text-white text-xl font-bold hover:text-blue-200 transition duration-300"
                  >LOGIN</router-link
                >
                <router-link
                  to="/sign-up"
                  class="text-white text-xl font-bold transition duration-300 px-3 py-1 rounded-sm bg-blue-400 hover:brightness-110"
                  >SIGN UP</router-link
                >
              </template>

              <template v-else>
                <div class="relative">
                  <button
                    @click.stop="toggleDropdown"
                    class="flex items-center text-white text-xl font-bold hover:text-blue-200 transition duration-300 cursor-pointer"
                  >
                    <span>{{ currentUser.username }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 ml-1"
                      :class="{ 'transform rotate-180': isDropdownOpen }"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    v-if="isDropdownOpen"
                    @click.stop
                    class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <button
                      @click="handleLogout"
                      class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-150"
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
            class="lg:hidden fixed inset-0 bg-gradient-to-b from-blue-600 to-sky-500 backdrop-blur-sm z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
          >
            <button 
              @click="isMobileMenuOpen = false" 
              class="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors duration-300 p-2 rounded-full bg-black/30"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div class="flex flex-col items-center space-y-0 w-full max-w-xs">
              <button
                @click="scrollToSection(explore)"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center"
              >
                EXPLORE
              </button>
              
              <router-link
                v-if="currentUser && currentUser.role === 'admin'"
                to="/product-manager"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center"
                @click="isMobileMenuOpen = false"
              >
                PRODUCT
              </router-link>
              
              <router-link
                v-if="currentUser && currentUser.role === 'user'"
                to="/user-products"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center"
                @click="isMobileMenuOpen = false"
              >
                PRODUCT
              </router-link>
              
              <button
                @click="scrollToSection(about)"
                class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center"
              >
                ABOUT
              </button>
              
              <template v-if="!currentUser">
                <router-link
                  to="/login"
                  class="text-white text-2xl font-bold hover:text-blue-200 transition-all duration-300 w-full py-4 border-b border-white/10 flex justify-center items-center"
                  @click="isMobileMenuOpen = false"
                >
                  LOGIN
                </router-link>
                
                <router-link
                  to="/sign-up"
                  class="text-white text-2xl font-bold transition-all duration-300 w-full py-4 mt-4 flex justify-center items-center bg-blue-500 hover:bg-blue-600 rounded-md"
                  @click="isMobileMenuOpen = false"
                >
                  SIGN UP
                </router-link>
              </template>
              
              <template v-else>
                <div class="w-full py-4 flex justify-center items-center">
                  <div class="px-4 py-2 bg-white/10 rounded-full mb-4">
                    <span class="text-white text-lg">{{ currentUser.username }}</span>
                  </div>
                </div>
                <button
                  @click="handleLogout"
                  class="text-white text-2xl font-bold hover:text-red-300 transition-all duration-300 w-full py-4 flex justify-center items-center bg-gray-600/80 hover:bg-red-500/30 rounded-md"
                >
                  LOGOUT
                </button>
              </template>
            </div>
          </div>
        </div>
      </header>

      <main
        class="flex flex-col items-center justify-center text-center px-4 py-20 relative z-10 min-h-screen"
      >
        <div class="max-w-4xl mx-auto">
          <h1
            class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            TRANSPORTATION SERVICE
          </h1>
          <h2 class="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            WHEREVER YOU WANT
          </h2>
        </div>
      </main>
    </div>

    <!-- About Section -->
    <div ref="about" class="relative min-h-screen">
      <div
        class="absolute inset-0"
        :style="{
          backgroundImage: `url(/images/about-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      />

      <main
        class="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative z-20 min-h-screen"
      >
        <div class="max-w-4xl mx-auto">
          <h1 class="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            OUR COMPANY
          </h1>
          <p class="text-white text-base sm:text-lg md:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </main>
    </div>

    <!-- Explore Section -->
    <div ref="explore" class="relative min-h-screen">
      <div
        class="absolute inset-0"
        :style="{ backgroundColor: 'green', backgroundSize: 'cover' }"
      />

      <main
        class="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative z-20 min-h-screen"
      >
        <div class="max-w-4xl mx-auto">
          <h1 class="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            EXPLORE
          </h1>
          <p class="text-white text-base sm:text-lg md:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
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