<script setup>
import { ref } from 'vue';
const count = ref(0);
const texts = ref(["Hello JS", "Hello TS", "Hello Java", "Hello C#"])
const top = () => {
    return count.value < texts.value.length - 1 ? count.value++ : count.value = 0;
}

const down = () => {
    return count.value <= 0 ? count.value += texts.value.length - 1 : count.value--;
}

</script>

<template>
    <div class="h-52 bg-amber-100 flex justify-center items-center">
        <div class="flex justify-center items-center">
            <button @click="top()" class="px-2 bg-green-400 rounded-lg cursor-pointer">+</button>
            <div class="p-5">
                <h1>{{ texts[count] }}</h1>
            </div>
            <button @click="down()" class="px-2 bg-red-400 rounded-lg cursor-pointer">-</button>
        </div>

    </div>
</template>