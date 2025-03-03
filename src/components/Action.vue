<script setup>
import { ref } from 'vue';
const persons = ref([
    {
        id:1,
        name:"Somchai"
    },
    {
        id:2,
        name:"Somhow"
    },
    {
        id:3,
        name:"Somyui"
    }
]);
const bid = ref(0)
const currentBid = ref(0)

const actionBid = () => {
    
}

const showCurrentBid = (count) => {
    return currentBid.value = count;    
}

const cancelBid = () => {
    return bid.value = 0
}
</script>

<template>
    <div class="flex flex-col justify-center items-center max-w-full max-h-80">
        <div class="h-10 w-full bg-green-300 flex justify-center items-center">
            Welcome to Action
        </div>

        <div class="flex flex-col justify-center items-center">
            <div>
                Item
            </div>
            <p>{{ currentBid }}</p>
            <span>Bid: <input v-model="bid" type="number" class="border border-black"></span>
            <p>{{ bid }}</p>
            <div class="p-2 m-2">
                <button @click="showCurrentBid(bid)" class="mx-2 px-4 py-2 bg-green-400 rounded-lg cursor-pointer">Confirm</button>
                <button @click="cancelBid" class="mx-2 px-4 py-2 bg-gray-200 rounded-lg cursor-pointer">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>