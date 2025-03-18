<script setup>
const props = defineProps({
    cartItems: {
        type:Array,
        required:true
    }
})
</script>

<template>
    <div class="w-full h-screen">
        <div>
            <slot name="navabar"></slot>
        </div>

        <div>
            <ul>
                <li v-for="(item, index) in cartItems" :key="index">
                    <slot :cartItem="item"></slot>
                </li>
            </ul>
        </div>
    </div>

</template>