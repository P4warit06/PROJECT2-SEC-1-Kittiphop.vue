<script setup>
import CartModel from './model/CartModel.vue';
import Header from './Header.vue';

const products = defineProps({
    products: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div>
        <div>
            <Header/>
        </div>
        <CartModel :products="products">
            <template #heading>
                <h1>Product</h1>
            </template>

            <template #listProduct="{ yourProduct }">
                <p>
                    <span>{{ yourProduct.name }}</span>
                    <span>{{ yourProduct.price }}</span>
                </p>
            </template>

        </CartModel>
    </div>

</template>