<script setup>
import CartModel from './model/CartModel.vue';
import Header from './Header.vue';
import { ref, onMounted } from 'vue';
import { getItems } from '@/libs/fetchUtils';

const carts = ref([])
onMounted(async () => {
    carts.value = await getItems(`${import.meta.env.VITE_APP_URL}/carts`)
    carts.value.forEach((cart) => cart.stock = 1)
})

</script>

<template>
    <div>
        <div>
            <Header :products="carts" />
        </div>
        <CartModel :products="carts">
            <template #heading>
                <h1>Product</h1>
            </template>

            <template #listProduct="{ yourProduct }">
                <p>
                    <span>{{ yourProduct.name }}</span>
                    <span>{{ yourProduct.price }}</span>
                    Stock: <span>{{ yourProduct.stock }}</span>
                </p>
            </template>

        </CartModel>
    </div>

</template>