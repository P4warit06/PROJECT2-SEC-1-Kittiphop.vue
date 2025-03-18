<script setup>
import {ref} from 'vue'
import Header from '../common/Header.vue';
import CartModel from '../model/CartModel.vue';

const props = defineProps({
    items: {
        type:Array,
        required:true
    },
})
const count = ref(0)
const countItem = () => {
    

}

</script>

<template>
    <CartModel :cart-items="items">
        <template #navabar>
            <Header/>
        </template>

        <template v-slot="{cartItem}">
            <span>Product name: <p>{{ cartItem.name }}</p></span>
            <span>Product name: <p>{{ cartItem.category }}</p></span>
            <span>Product name: <p>{{ cartItem.price }}</p></span>
        </template>
    </CartModel>
</template>