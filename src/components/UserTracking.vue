<script setup>
import { useRoute } from "vue-router"
import { ref } from "vue"
import { getItemById, editItem } from "@/libs/fetchUtils"
const {
  params: { userId },
} = useRoute()

const selectUser = ref({})

async function getTrackingByUserId() {
  selectUser.value = await getItemById(
    `${import.meta.env.VITE_APP_URL}/tracking`,
    userId
  )
  console.log(selectUser.value)
}
getTrackingByUserId()

const statusValue = ["Pending", "Processing", "Shipping", "Shipped"]
const cancelled = ref(false)

const updateState = async (tracking) => {
  try {
    return editedTracking = await editItem(
      `${import.meta.env.VITE_APP_URL}/tracking`,tracking.id,tracking
    )
  } catch (error) {
    console.log(error)
  }
}

function cancel() {
  cancelled.value = true
  selectUser.value.status = "Cancelled"
  updateState(selectUser.value)
}

const finished = ref(false)
function nextProcess(status) {
    if(status === 'Shipped'){
        finished.value = true
        return
    }
    let indexStatus = statusValue.findIndex(s => s === status)
    console.log(indexStatus)
    selectUser.value.status = statusValue[++indexStatus]
    updateState(selectUser.value)
}
console.log()
</script>
<template>
  <div class="">
    <h1>Tracking</h1>
    <span>Id: </span> {{ selectUser.id }} <span>UserId: </span>
    {{ selectUser.userId }} <span>Status: </span> {{ selectUser.status }}
    <div class="process border flex gap-10">
      <div v-show="cancelled" :class="{ active: selectUser.status === 'Cancelled' }">
        CanCelled
      </div>
      <div
        v-for="status in statusValue"
        :key="status"
        :class="{ active: selectUser.status === status }"
      >
        {{ status }}
      </div>
    </div>
    <div v-show="selectUser.status === 'Pending'" class="">
      <button
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-3"
      >
        Confirm
      </button>
      <button
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        @click="cancel"
      >
        Cancel
      </button>
    </div>

    <div v-show="selectUser.status === 'Cancelled'" class="text-red-500">This Order is cancelled</div>
    <div>
      <button
        v-show="selectUser.status !== 'Cancelled' && selectUser.status !== 'Shipped'" 
        class="mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        @click="nextProcess(selectUser.status)">
        Next Process Button For Admin
      </button>
    </div>
    <div v-show="selectUser.status === 'Shipped'">
        <h3 class="italic">The Product is Shipped Successfully. Thank you!</h3>
    </div>
  </div>
</template>
<style scoped>
.process .active {
  border-color: blue;
  font-weight: bold;
  background-color: #d0e1ff;
}
</style>
