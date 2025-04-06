<script setup>
import {ref , onMounted} from 'vue'
import { useRoute, useRouter } from "vue-router";
const {
    params: { userId },
} = useRoute();
import { getItemById } from "../libs/fetchUtils.js";

const selectUser = ref({});
async function getUserById() {
    try {
        selectUser.value = await getItemById(
            `${import.meta.env.VITE_APP_URL}/users`,
            userId
        );
    } catch (error) {
        console.log(error);
    }
}
getUserById();

const router = useRouter();


</script>
 
<template>
<div>
    UserProfile
</div>
</template>
 
<style scoped>

</style>