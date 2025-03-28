<script setup>
import { ref } from "vue"
import { login } from "../libs/fetchUtils.js"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const errorMessage = ref("")
const isLoading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ""
  isLoading.value = true

  try {
    const user = await login(
      import.meta.env.VITE_APP_URL,
      email.value,
      password.value
    )

    localStorage.setItem("currentUser", JSON.stringify(user))
    console.log("Logged in user:", user)
    router.push("/home")
  } catch (error) {
    console.error("Login error:", error)
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen"
    :style="{
      backgroundImage: `url(/images/authen-bg.png)`,
      backgroundSize: 'cover',
    }"
  >
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-700">LOGIN</h2>

      <form @submit.prevent="handleLogin" class="mt-4">
        <div class="mb-4">
          <label class="block text-sm font-semibold text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-2 mt-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-semibold text-gray-600"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 mt-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />
        </div>

        <p v-if="errorMessage" class="text-sm text-red-500">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="w-full px-4 py-2 my-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Logging in...</span>
          <span v-else>Login</span>
        </button>
        <div class="text-center text-gray-600 mt-2">
          <p>
            Need an account?
            <router-link to="/sign-up" class="hover:underline font-bold text-sm"
              >SIGN UP</router-link
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
 