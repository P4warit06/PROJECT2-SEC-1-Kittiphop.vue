<script setup>
import { topUpBalance } from '../libs/fetchUtils.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentBalance = ref(0)
const rechargeAmount = ref('')
const errorMessage = ref('')
const showSuccessModal = ref(false)
const isProcessing = ref(false)
const lastRechargeAmount = ref(0)
const selectedMethod = ref('')

const paymentMethods = [
  { name: 'PromptPay', icon: '📲' },
  { name: 'Credit Card', icon: '💳' },
  { name: 'Bank Transfer', icon: '🏦' }
]


onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (currentUser) {
    currentBalance.value = currentUser.balance || 0
  }
})

const handleRecharge = async () => {
  errorMessage.value = ''

  if (!selectedMethod.value) {
    errorMessage.value = 'Please select a payment method'
    return
  }

  const amount = parseFloat(rechargeAmount.value)
  if (isNaN(amount) || amount <= 0) {
    errorMessage.value = 'Please enter a valid amount'
    return
  }
  if (amount < 10) {
    errorMessage.value = 'Minimum top-up amount is ฿10'
    return
  }
  if (amount > 100000) {
    errorMessage.value = 'Maximum top-up limit is ฿100,000'
    return
  }

  isProcessing.value = true

  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (!currentUser?.id) throw new Error("User not logged in")

    const updatedUser = await topUpBalance(
      import.meta.env.VITE_APP_URL,
      currentUser.id,
      amount
    )

    currentBalance.value = updatedUser.balance || 0
    lastRechargeAmount.value = amount
    localStorage.setItem("currentUser", JSON.stringify({
      ...currentUser,
      balance: updatedUser.balance || 0
    }))
    
    showSuccessModal.value = true
  } catch (error) {
    errorMessage.value = error.message || "Failed to process top-up"
  } finally {
    isProcessing.value = false
  }
}

// const handleModalOk = () => {
//   showSuccessModal.value = false
//   router.push('/home')
// }
</script>

<template>

  <button 
      @click="router.push('/')" 
      class="absolute top-4 left-4 md:top-8 md:left-8 p-2 rounded-full border-1 border-gray bg-opacity-70 hover:opacity-50 transition-all duration-200 text-gray-400 cursor-pointer hover:text-gray-600 shadow-sm"
      aria-label="Back to home"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
    </button>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-6">
    <div class="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl space-y-6">
      <h1 class="text-3xl font-bold text-center text-gray-800">Top Up</h1>

      <div class="text-center text-gray-700">
        <p class="text-lg font-semibold">Current Balance: ฿{{ currentBalance.toLocaleString() }}</p>
      </div>

      <!-- Payment Method Selection -->
      <div>
        <h2 class="text-lg font-medium text-gray-700 mb-2">Select Payment Method</h2>
        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="method in paymentMethods"
            :key="method.name"
            class="p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200"
            :class="{ 'border-green-500 bg-green-50': selectedMethod === method.name }"
            @click="selectedMethod = method.name"
          >
            <p class="text-2xl">{{ method.icon }}</p>
            <p class="text-sm font-medium mt-2">{{ method.name }}</p>
          </button>
        </div>
      </div>

      <form @submit.prevent="handleRecharge" class="space-y-4">
        <div>
          <label for="amount" class="block text-gray-700 text-lg font-medium mb-2">Enter Amount</label>
          <input
            type="number"
            v-model="rechargeAmount"
            id="amount"
            min="10"
            max="100000"
            step="1"
            placeholder="Enter amount"
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 disabled:opacity-50"
          :disabled="isProcessing"
        >
          <span v-if="isProcessing">Processing...</span>
          <span v-else>Top Up</span>
        </button>
      </form>

      <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>
    </div>

    <!-- Success Modal -->
    <div 
      v-if="showSuccessModal" 
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center animate-fade-in">
        <div class="flex justify-center">
          <div class="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full">
            ✅
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 mt-4">Transaction Successful!</h2>
        <p class="text-gray-600 mt-2">
          You have topped up <span class="font-semibold text-gray-800">฿{{ lastRechargeAmount.toLocaleString() }}</span> via 
          <span class="font-semibold text-gray-800">{{ selectedMethod }}</span>
        </p>
        <p class="text-gray-600 mt-2">
          New Balance: <span class="font-semibold text-green-600">฿{{ currentBalance.toLocaleString() }}</span>
        </p>

        <router-link
          to="/home"
          class="mt-6 inline-block w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-200"
          @click.native="showSuccessModal = false"
        >
          OK
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
/* Fade-in animation for the modal */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>