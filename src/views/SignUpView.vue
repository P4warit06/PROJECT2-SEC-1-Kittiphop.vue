<script setup>
import { ref, reactive } from "vue";
import { registerUser, checkExistEmail } from "../libs/fetchUtils.js";
import { useRouter } from "vue-router";

const router = useRouter();
const currentStep = ref(1);
const showSuccessRegister = ref(false);
const formData = reactive({
  email: "",
  password: "",
  username: "",
  location: "",
  contact: "",
});
const errorMessage = ref("");
const isLoading = ref(false);
const isRegisterSuccessful = ref(false);

async function nextStep(event) {
  if (event) event.preventDefault();
  errorMessage.value = ""
  if (!formData.email) {
    errorMessage.value = "Email is required";
    return
  }
  if (!checkEmail(formData.email)) {
    errorMessage.value = "Please enter a valid email";
    return
  }
  
  if (!formData.password) {
    errorMessage.value = "Password is required";
    return
  }
  if (!checkPassword(formData.password)) {
    errorMessage.value =
      "Password must be at least 8 characters with 1 number and 1 special character";
    return
  }
  
  try {
    isLoading.value = true;
    const emailExists = await checkExistEmail(
      import.meta.env.VITE_APP_URL,
      formData.email
    );
    if (emailExists) {
      errorMessage.value = "Email already exists";
      return;
    }

    if (!formData.username) {
      formData.username = formData.email.split("@")[0];
    }

    currentStep.value = 2;
  } catch (error) {
    console.error("Email check error:", error);
    errorMessage.value = "Error checking email: " + error.message;
  } finally {
    isLoading.value = false;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
    errorMessage.value = "";
  }
}

async function submitForm(event) {
  if (event) event.preventDefault();

  errorMessage.value = "";
  // Validate location (address)
  if (!formData.location) {
    errorMessage.value = "Please enter your address";
    return;
  }

  if (formData.location.length < 5) {
    errorMessage.value = "Address should be at least 5 characters long";
    return;
  }

  if (!formData.contact) {
    errorMessage.value = "Please enter your phone number";
    return;
  }
  if (!checkPhoneNumber(formData.contact)) {
    errorMessage.value = "Please enter a valid phone number (10 digits starting with 0)";
    return;
  }

  try {
    isLoading.value = true;

    // Send the data to backend using the registerUser function
    const result = await registerUser(import.meta.env.VITE_APP_URL, formData);
    isRegisterSuccessful.value = true;
    showSuccessRegister.value = true;
    setTimeout(() => {
      router.push("/login")
    }, 5000)

  } catch (error) {
    console.error("Registration error:", error)
    errorMessage.value = "Registration failed: " + error.message;
  } finally {
    isLoading.value = false;
  }
}

function checkPhoneNumber(phone) {
  const phoneRegex = /^0[689]\d{8}$/;
  return phoneRegex.test(phone);
}

function closeModal() {
  showSuccessRegister.value = false
  router.push("/login")
}

function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
function checkPassword(password) {
  const hasMinLength = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  return hasMinLength && hasNumber && hasSpecial
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center shadow-lg bg-gray-"
    :style="{
      backgroundImage: `url(/images/authen-bg.png)`,
      backgroundSize: 'cover',
    }"
  >
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <div class="flex justify-center mb-6">
        <h2 class="text-2xl font-bold text-center text-gray-700">SIGN UP</h2>
      </div>

      <!-- Progress Steps -->
      <div class="flex items-center justify-center mb-8">
        <div class="flex items-center">
          <div
            :class="[
              'rounded-full w-8 h-8 flex items-center justify-center text-white font-medium',
              currentStep > 1
                ? 'bg-green-500'
                : currentStep === 1
                ? 'bg-blue-500'
                : 'bg-gray-300',
            ]"
          >
            <span v-if="currentStep === 1">1</span>
            <span v-else class="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
          <div class="w-16 h-1 bg-gray-300 mx-1"></div>
        </div>

        <div class="flex items-center">
          <div
            :class="[
              'rounded-full w-8 h-8 flex items-center justify-center text-white font-medium',
              currentStep === 2 ? 'bg-blue-500' : 'bg-gray-300',
            ]"
          >
            <span>2</span>
          </div>
        </div>
      </div>
      <div
        v-if="isRegisterSuccessful"
        class="mb-4 p-2 bg-green-100 text-green-700 rounded"
      >
        Registration successful! Redirecting to login page...
      </div>

      <div
        v-else-if="errorMessage"
        class="mb-4 p-2 bg-red-100 text-red-700 rounded"
      >
        {{ errorMessage }}
      </div>

      <form
        v-if="currentStep === 1"
        @submit.prevent="nextStep"
        class="space-y-4"
      >
        <div>
          <label for="email" class="block text-gray-600 mb-1">Email</label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-gray-600 mb-1"
            >Password</label
          >
          <input
            v-model="formData.password"
            type="password"
            id="password"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <p class="text-gray-400 text-sm mt-1">
            Must be 8 or more characters and contain at least 1 number and 1
            special character.
          </p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition disabled:opacity-50"
        >
          <span v-if="isLoading">Processing...</span>
          <span v-else>NEXT</span>
        </button>

        <div class="flex items-center my-4">
          <div class="flex-1 h-px bg-gray-300"></div>
          <div class="px-3 text-gray-500 text-sm">OR</div>
          <div class="flex-1 h-px bg-gray-300"></div>
        </div>

        <div class="flex justify-center space-x-4">
          <button
            type="button"
            class="w-10 h-10 rounded-full border border-red-500 flex items-center justify-center text-red-500 hover:text-white hover:bg-red-500  transition cursor-pointer"
          >
            <span class=" font-bold ">G</span>
          </button>
          <button
            type="button"
            class="w-10 h-10 rounded-full border border-blue-500 flex items-center justify-center hover:text-white text-blue-500 hover:bg-blue-500 transition cursor-pointer"
          >
            <span class=" font-bold">f</span>
          </button>
          <button
            type="button"
            class="w-10 h-10 rounded-full border border-blue-600 flex items-center justify-center hover:bg-blue-600  text-blue-600  hover:text-white transition cursor-pointer"
          >
            <span class="font-bold">in</span>
          </button>
          
        </div>

        <div class="text-center mt-4">
          <span class="text-gray-600">Already a user? </span>
          <router-link
            to="/login"
            class="hover:underline font-bold text-gray-700 text-sm"
            >LOGIN</router-link
          >
        </div>
      </form>

      <form
        v-if="currentStep === 2"
        @submit.prevent="submitForm"
        class="space-y-4"
      >
      <div>
      <label for="location" class="block text-gray-600 mb-1"
        >Address</label
      >
      <input
        v-model="formData.location"
        type="text"
        id="location"
        placeholder="e.g. 126 Pracha Uthit Rd, Bangkok 10140"
        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
    <div>
      <label for="contact" class="block text-gray-600 mb-1">Phone Number</label>
      <input
        v-model="formData.contact"
        type="tel"
        id="contact"
        placeholder="e.g. 0812357969"
        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p class="text-gray-400 text-sm mt-1">
        Please enter a valid Thai phone number (10 digits starting with 0)
      </p>
    </div>

        <button
          type="submit"
          :disabled="isLoading || isRegisterSuccessful"
          class="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition disabled:opacity-50"
        >
          <span v-if="isLoading">Processing...</span>
          <span v-else-if="isRegisterSuccessful">Success!</span>
          <span v-else>SIGN UP</span>
        </button>

        <div class="text-center">
          <button
            type="button"
            @click="prevStep"
            class="text-blue-500"
            :disabled="isLoading || isRegisterSuccessful"
          >
            Back
          </button>
        </div>
      </form>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessRegister" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50" @click="closeModal"></div>
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 z-10 shadow-xl">
        <div class="text-center">
          <!-- Success Icon -->
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">Registration Successful!</h3>
          <p class="text-sm text-gray-500 mb-4">
            Your account has been created successfully. You will be redirected to the login page.
          </p>
          <button
            @click="closeModal"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
