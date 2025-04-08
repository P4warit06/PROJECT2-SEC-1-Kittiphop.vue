<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getItemById, editItem } from "@/libs/fetchUtils";
import NavbarAdmin from "./NavbarAdmin.vue";
import Navbar from "./Navbar.vue";
const {
  params: { userId },
} = useRoute();

const selectUser = ref({});
const loading = ref(true);
const error = ref(null);

async function getTrackingByUserId() {
  try {
    loading.value = true;
    error.value = null;
    selectUser.value = await getItemById(
      `${import.meta.env.VITE_APP_URL}/tracking`,
      userId
    );
  } catch (err) {
    error.value = "Failed to load tracking information";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getTrackingByUserId();
});

const statusValue = ["Processing", "Shipping", "Shipped"];

const updateState = async (tracking) => {
  try {
    loading.value = true;
    const editedTracking = await editItem(
      `${import.meta.env.VITE_APP_URL}/tracking`,
      tracking.id,
      tracking
    );
    return editedTracking;
  } catch (error) {
    console.error(error);
    error.value = "Failed to update tracking status";
  } finally {
    loading.value = false;
  }
};

const finished = ref(false);
function nextProcess(status) {
  if (status === "Shipped") {
    finished.value = true;
    return;
  }
  let indexStatus = statusValue.findIndex((s) => s === status);
  console.log(indexStatus);
  selectUser.value.status = statusValue[++indexStatus];
  updateState(selectUser.value);
}
const getUser = ref(JSON.parse(localStorage.getItem("currentUser")));
</script>

<template>
  <div v-show="getUser.role === 'admin'">
    <NavbarAdmin/>
  </div>
  <div v-show="getUser.role !== 'admin'">
    <Navbar/>
  </div>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-4xl mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800">
          Tracking Information
        </h1>
      </div>

      <div v-if="loading" class="flex justify-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
        ></div>
      </div>

      <div
        v-else-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center"
      >
        {{ error }}
      </div>

      <div v-else class="space-y-8">
        <!-- Status Progress -->
        <div class="bg-white shadow-lg rounded-lg p-6 w-full">
          <div class="flex justify-center">
            <div class="w-full max-w-2xl">
              <div class="flex justify-between items-center">
                <div
                  v-for="(status, index) in statusValue"
                  :key="status"
                  class="flex flex-col items-center"
                >
                  <div class="relative">
                    <div class="flex items-center justify-center">
                      <div
                        :class="{
                          'bg-blue-500 text-white': selectUser.status === status,
                          'bg-gray-200': selectUser.status !== status,
                        }"
                        class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        {{ index + 1 }}
                      </div>
                    </div>
                    <p class="mt-2 text-sm font-medium text-gray-600 text-center ">
                      {{ status }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Delivery Details -->
        <div class="bg-white shadow-lg rounded-lg p-6 w-full">
          <h2 class="text-xl font-semibold mb-6 text-center text-blue-300">Delivery Details</h2>
          <div class="space-y-4 max-w-md mx-auto">
            <div class="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="text-gray-700">{{ getUser.location }}</p>
            </div>
            <div class="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                />
              </svg>
              <p class="text-gray-700">
                Current Status:
                <span class="font-semibold">{{ selectUser.status }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Update Button -->
        <div class="text-center">
          <button
            v-if="selectUser.status !== 'Shipped' && getUser.role === 'admin'"
            class="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200 disabled:opacity-50 text-lg font-medium"
            @click="nextProcess(selectUser.status)"
            :disabled="loading"
          >
            Update Status
          </button>
        </div>

        <!-- Success Message -->
        <div
          v-if="selectUser.status === 'Shipped'"
          class="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center"
        >
          <p class="font-medium">
            🎉 The Product has been delivered successfully. Thank you!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>