<script setup>
import { ref, reactive, onMounted } from "vue"
import { getItemById, editItem } from "../libs/fetchUtils.js"
import { useRoute, useRouter } from "vue-router"

const {
  params: { userId },
} = useRoute()
const router = useRouter()

const user = ref(null)
const isLoading = ref(true)
const isEditing = ref(false)

const successMsg = ref("")
const errorMsg = ref("")
const isTabChanging = ref('profile')
const showSidebar = ref(false) 

const isAdmin = ref(false)

function changeTab(tab) {
  isTabChanging.value = tab
  isEditing.value = false
    if (window.innerWidth < 768) showSidebar.value = false
  
}

const updateAddressContact = reactive({
  location: "",
  contact: "",
  fullname: ""
})

async function loadUser() {
  try {
    isLoading.value = true
    errorMsg.value = ""

    const userData = await getItemById(
      `${import.meta.env.VITE_APP_URL}/users`,
      userId
    )
    user.value = userData

    const currentUserJson = localStorage.getItem("currentUser")
    if (!currentUserJson) {
      router.push("/login")
      return
    }

    const currentUser = JSON.parse(currentUserJson)
    isAdmin.value = currentUser.role === 'admin'
    
    if (currentUser.id !== userId) {
      router.push("/home")
      return
    }
    updateAddressContact.location = user.value.location || ""
    updateAddressContact.contact = user.value.contact || ""
    updateAddressContact.fullname = user.value.fullname || ""
    
  } catch (error) {
    console.error("Error loading user data:", error)
    errorMsg.value = "Failed to load user profile"
  } finally {
    isLoading.value = false
  }
}

function toggleEdit() {
  if (isEditing.value) {
    updateAddressContact.location = user.value.location || ""
    updateAddressContact.contact = user.value.contact || ""
    updateAddressContact.fullname = user.value.fullname || ""
    errorMsg.value = ""
  }
  isEditing.value = !isEditing.value
}

function checkPhoneNumber(phone) {
  const phoneRegex = /^0[2689]\d{8}$/
  return phoneRegex.test(phone)
}

async function saveUpdateProfile() {
  errorMsg.value = ""
  successMsg.value = ""

  if (updateAddressContact.contact && !checkPhoneNumber(updateAddressContact.contact)) {
    errorMsg.value = "Please enter a valid phone number (10 digits starting with 0)"
    return
  }
  
  try {
    isLoading.value = true
    
    const profileUpdate = {
      ...user.value,
      location: updateAddressContact.location,
      contact: updateAddressContact.contact,
      fullname: updateAddressContact.fullname
    }
    
    const result = await editItem(
      `${import.meta.env.VITE_APP_URL}/users`,
      userId,
      profileUpdate
    )

    user.value = result
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    currentUser.location = result.location
    currentUser.contact = result.contact
    currentUser.fullname = result.fullname
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    successMsg.value = "Profile updated successfully!"
    isEditing.value = false
    setTimeout(() => {
      successMsg.value = ""
    }, 3000)
  } catch (error) {
    console.error("Error updating profile:", error)
    errorMsg.value = "Failed to update profile: " + error.message
  } finally {
    isLoading.value = false
  }
}

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}
onMounted(loadUser)
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <div class="md:hidden bg-blue-600 text-white p-4 shadow-md flex items-center">
      <button @click="toggleSidebar" class="text-white focus:outline-none mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 class="text-xl font-bold">User Profile</h1>
    </div>

    <div class="flex flex-1 h-full overflow-hidden">
      <div 
        class="fixed md:static inset-0 bg-black bg-opacity-50 z-40 md:bg-transparent md:z-auto transition-opacity duration-300"
        :class="{'opacity-100': showSidebar, 'opacity-0 pointer-events-none': !showSidebar, 'md:opacity-100 md:pointer-events-auto': true}"
      >
        <div 
          class="w-64 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col"
          :class="{'translate-x-0': showSidebar, '-translate-x-full': !showSidebar, 'md:translate-x-0': true}"
        >
          <!-- Sidebar Header -->
          <div class="px-4 py-5 bg-gradient-to-r from-blue-600 to-blue-800">
            <h3 class="text-lg font-medium text-white">My Account</h3>
          </div>
          
          <!-- Sidebar Navigation -->
          <div class="p-4 flex-grow">
            <nav class="space-y-2">
              
              
              <button 
                @click="changeTab('profile')"
                class="w-full text-left px-4 py-3 rounded-md transition-colors font-medium flex items-center cursor-pointer"
                :class="isTabChanging === 'profile' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
              <button 
                @click="changeTab('address')"
                class="w-full text-left px-4 py-3 rounded-md transition-colors font-medium flex items-center cursor-pointer"
                :class="isTabChanging === 'address' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Address
              </button>
            </nav>
            <router-link  to="/home"
                class="w-full text-left px-4 py-3 rounded-md transition-colors font-medium flex items-center text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 " viewBox="0 0 20 20" fill="none" stroke-width="2"
                stroke="currentColor">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
                
                Home
              </router-link>
          </div>
          
          <div class="md:hidden p-4 border-t border-gray-200">
            <button 
              @click="toggleSidebar" 
              class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close Menu
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex-1 h-full overflow-y-auto">
        <div class="h-full p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
          <div class="hidden md:block mb-4">
            <h1 class="text-2xl font-bold text-gray-800">{{ isTabChanging === 'profile' ? 'My Profile' : 'My Address' }}</h1>
            <p class="text-gray-600 mt-1">{{ isTabChanging === 'profile' ? 'Manage your personal information' : 'Manage your delivery address' }}</p>
          </div>

          <div class="bg-white shadow-md rounded-lg">
            <div v-if="isLoading" class="p-8 flex justify-center items-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>

            <div v-else-if="!user" class="p-8">
              <div class="bg-red-100 p-4 rounded-md text-red-700">
                {{ errorMsg || "User profile not found" }}
              </div>
            </div>

            <div v-else>
              <div v-if="successMsg || errorMsg" class="p-4 border-b border-gray-200">
                <div
                  v-if="successMsg"
                  class="bg-green-100 p-4 rounded-md text-green-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ successMsg }}
                </div>
                <div
                  v-if="errorMsg"
                  class="bg-red-100 p-4 rounded-md text-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ errorMsg }}
                </div>
              </div>

              <div v-if="isTabChanging === 'profile'" class="p-4 md:p-6">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <div class="px-4 py-3 bg-gray-50 rounded-md text-gray-800">
                      {{ user.username }}
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      v-if="isEditing"
                      v-model="updateAddressContact.fullname"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                    <div v-else class="px-4 py-3 bg-gray-50 rounded-md text-gray-800">
                      {{ user.fullname || "No name" }}
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div class="px-4 py-3 bg-gray-50 rounded-md text-gray-800">
                      {{ user.email }}
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      v-if="isEditing"
                      v-model="updateAddressContact.contact"
                      type="tel"
                      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 0812345678"
                    />
                    <div v-else class="px-4 py-3 bg-gray-50 rounded-md text-gray-800">
                      {{ user.contact || "No phone number " }}
                    </div>
                  </div>

                  <div v-if="!isAdmin">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Account Balance
                    </label>
                    <div class="px-4 py-3 bg-gray-50 rounded-md text-gray-800 flex justify-between items-center">
                      <span class="font-medium text-blue-600 text-lg">
                        ${{ user.balance || 0 }}
                      </span>
                      <router-link
                        to="/top-up"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      >
                        TOP UP
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else-if="isTabChanging === 'address'" class="p-4 md:p-6">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div v-if="isEditing">
                      <p class="text-xs text-gray-500 mb-2">
                        Please enter your full address in the format: House number, Street, Subdistrict, District, Province, Postal Code
                      </p>
                      <textarea
                        v-model="updateAddressContact.location"
                        rows="4"
                        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 123, Main Street, Huai Khwang, Bangkok, 10310"
                      ></textarea>
                    </div>
                    <div v-else class="px-4 py-3 bg-gray-50 rounded-md text-gray-800">
                      {{ user.location || "No address " }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-4 md:px-6 py-4 border-t border-gray-200 flex justify-end">
                <button
                  v-if="!isEditing"
                  @click="toggleEdit"
                  type="button"
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Edit {{ isTabChanging === 'profile' ? 'Profile' : 'Address' }}
                </button>

                <div v-else class="flex space-x-4">
                  <button
                    @click="toggleEdit"
                    type="button"
                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    @click="saveUpdateProfile"
                    type="button"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    :disabled="isLoading"
                  >
                    <span v-if="isLoading">Saving...</span>
                    <span v-else>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-screen {
  height: 100vh;
  height: -webkit-fill-available;
}

html, body {
  height: 100%;
  overflow: hidden;
}
@media (min-width: 768px) {
  .h-full {
    height: 100%;
  }
}
@media (min-width: 1920px) {
  .h-screen {
    max-height: 100vh;
  }
}
</style>