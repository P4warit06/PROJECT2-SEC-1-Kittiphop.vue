<script setup>
import { ref, reactive } from "vue";

// Reactive state for the form
const currentStep = ref(1);
const formData = reactive({
  email: "",
  password: "",
  education: "",
  jobTitle: "",
  organization: "",
  experience: "",
});

// Sample data for dropdowns
const educationOptions = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
];
const jobTitles = [
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Marketing Specialist",
  "Data Scientist",
];
const organizations = [
  "Google",
  "Microsoft",
  "Apple",
  "Amazon",
  "Facebook",
  "Other",
];
const experienceYears = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

// Form navigation functions
function nextStep() {
  if (currentStep.value < 2) {
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

// Form submission
function submitForm() {
  // Here you would typically send the data to your backend
  console.log("Form submitted with data:", formData);
  alert("Sign up successful!");
  // Reset form or redirect user
}

// Password validation (could be expanded)
function isPasswordValid(password) {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasMinLength && hasNumber && hasSpecial;
}
</script>


<template>
  <div class="min-h-screen flex items-center justify-center shadow-lg bg-gray-" :style="{backgroundImage: `url(/images/authen-bg.png)` , backgroundSize:'cover' }">
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

      <!-- Step 1: Email & Password -->
      <div v-if="currentStep === 1" class="space-y-4">
        <div>
          <label for="email" class="block text-gray-600 mb-1">Email</label>
          <input
            v-model="formData.email"
            type="email"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-gray-600 mb-1">Password</label>
          <input
            v-model="formData.password"
            type="password"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <p class="text-gray-400 text-sm mt-1">
            Must be 8 or more characters and contain at least 1 number and 1
            special character.
          </p>
        </div>

        <button
          @click="nextStep"
          class="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition"
        >
          NEXT
        </button>

        <div class="flex items-center my-4">
          <div class="flex-1 h-px bg-gray-300"></div>
          <div class="px-3 text-gray-500 text-sm">OR</div>
          <div class="flex-1 h-px bg-gray-300"></div>
        </div>

        <div class="flex justify-center space-x-4">
          <button
            class="w-10 h-10 rounded-full border border-red-500 flex items-center justify-center"
          >
            <span class="text-red-500 font-bold">G</span>
          </button>
          <button
            class="w-10 h-10 rounded-full border border-blue-500 flex items-center justify-center"
          >
            <span class="text-blue-500 font-bold">f</span>
          </button>
          <button
            class="w-10 h-10 rounded-full border border-blue-600 flex items-center justify-center"
          >
            <span class="text-blue-600 font-bold">in</span>
          </button>
        </div>

        <div class="text-center mt-4">
          <span class="text-gray-600">Already a user? </span>
          <router-link to="/login" class="hover:underline font-bold text-gray-700 text-sm">LOGIN</router-link>
        </div>
      </div>

      <!-- Step 2: Education & Job Details (previously Step 3) -->
      <div v-if="currentStep === 2" class="space-y-4">
        <div>
          <label for="location" class="block text-gray-600 mb-1">Location</label>
          <input
            v-model="formData.location"
            type="text"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="contact" class="block text-gray-600 mb-1">Contact</label>
          <input
            v-model="formData.contact"
            type="text"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          @click="submitForm"
          class="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition"
        >
          SIGN UP
        </button>

        <div class="text-center">
          <button @click="prevStep" class="text-blue-500">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

