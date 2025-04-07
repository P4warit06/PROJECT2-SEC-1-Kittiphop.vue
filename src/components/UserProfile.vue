<script setup>
import { ref, reactive, onMounted } from "vue";
import { getItemById, editItem } from "../libs/fetchUtils.js";
import { useRoute, useRouter } from "vue-router";

const {
  params: { userId },
} = useRoute();
const router = useRouter();

const user = ref(null);
const isLoading = ref(true);
const isEditing = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const formUpdateProfile = reactive({
  location: "",
  contact: "",
});

async function loadUser() {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    const userData = await getItemById(
      `${import.meta.env.VITE_APP_URL}/users`,
      userId
    );
    user.value = userData;

    const currentUserJson = localStorage.getItem("currentUser");
    if (!currentUserJson) {
      router.push("/login");
      return;
    }

    const currentUser = JSON.parse(currentUserJson);
    if (currentUser.id !== userId) {
      router.push("/home");
      return;
    }
    formUpdateProfile.location = user.value.location || "";
    formUpdateProfile.contact = user.value.contact || "";
  } catch (error) {
    console.error("Error loading user data:", error);
    errorMessage.value = "Failed to load user profile";
  } finally {
    isLoading.value = false;
  }
}

function toggleEdit() {
  if (isEditing.value) {
    formUpdateProfile.location = user.value.location || "";
    formUpdateProfile.contact = user.value.contact || "";
    errorMessage.value = "";
  }
  isEditing.value = !isEditing.value;
}

function checkPhoneNumber(phone) {
  const phoneRegex = /^0[2689]\d{8}$/;
  return phoneRegex.test(phone);
}

async function saveUpdateProfile() {
  errorMessage.value = "";
  successMessage.value = "";

  if (
    formUpdateProfile.contact &&
    !checkPhoneNumber(formUpdateProfile.contact)
  ) {
    errorMessage.value =
      "Please enter a valid phone number (10 digits starting with 0)";
    return;
  }
  try {
    isLoading.value = true;
    const updatedUserData = {
      ...user.value,
      location: formUpdateProfile.location,
      contact: formUpdateProfile.contact,
    };
    const result = await editItem(
      `${import.meta.env.VITE_APP_URL}/users`,
      userId,
      updatedUserData
    );
    user.value = result;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.location = result.location;
    currentUser.contact = result.contact;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    successMessage.value = "Profile updated successfully!";
    isEditing.value = false;
    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } catch (error) {
    console.error("Error updating profile:", error);
    errorMessage.value = "Failed to update profile: " + error.message;
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadUser);
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden"
    >
      <div class="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-500 to-blue-700">
        <h3 class="text-lg leading-6 font-medium text-white">User Profile</h3>
        <p class="mt-1 max-w-2xl text-sm text-blue-100">
          Personal details and information
        </p>
      </div>

      <div v-if="isLoading" class="p-8 flex justify-center items-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
        ></div>
      </div>

      <div v-else-if="!user" class="p-8">
        <div class="bg-red-100 p-4 rounded-md text-red-700">
          {{ errorMessage || "User profile not found" }}
        </div>
      </div>
      <div v-else class="p-6">
        <div
          v-if="successMessage"
          class="mb-6 bg-green-100 p-4 rounded-md text-green-700 flex items-center"
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
          {{ successMessage }}
        </div>
        <div
          v-if="errorMessage"
          class="mb-6 bg-red-100 p-4 rounded-md text-red-700 flex items-center"
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
          {{ errorMessage }}
        </div>

        <div class="space-y-6">
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
              Email
            </label>
            <div class="px-4 py-3 bg-gray-50 rounded-md text-gray-800">
              {{ user.email }}
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              v-if="isEditing"
              v-model="formUpdateProfile.location"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div v-else class="px-4 py-3 bg-gray-50 rounded-md text-gray-800">
              {{ user.location || "No address provided" }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              v-if="isEditing"
              v-model="formUpdateProfile.contact"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 0812345678"
            />
            <div v-else class="px-4 py-3 bg-gray-50 rounded-md text-gray-800">
              {{ user.contact || "No phone number provided" }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Account Balance
            </label>
            <div
              class="px-4 py-3 bg-gray-50 rounded-md text-gray-800 flex items-center"
            >
              <span class="font-medium text-blue-600">
                ${{ user.balance || 0 }}
              </span>
              <router-link
                to="/top-up"
                class="ml-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
              >
                TOP UP
              </router-link>
            </div>
          </div>

          <div class="flex justify-end pt-4 border-t border-gray-200 mt-4">
            <button
              v-if="!isEditing"
              @click="toggleEdit"
              type="button"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit Profile
            </button>

            <div v-else class="flex space-x-4">
              <button
                @click="toggleEdit"
                type="button"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                @click="saveUpdateProfile"
                type="button"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
</template>
