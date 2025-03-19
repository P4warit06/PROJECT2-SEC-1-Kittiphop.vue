<script setup>
const props = defineProps({
    products: {
        type:Array,
        required: true
    }
})

</script>

<template>
    <div>
        <div>
            <slot name="heading"></slot>
        </div>

        <ul>
            <li v-for="(product, index) in products" :key="index">
                <slot name="listProduct" :yourProduct="product">Enter product list</slot>
            </li>
        </ul>
    </div>
</template>