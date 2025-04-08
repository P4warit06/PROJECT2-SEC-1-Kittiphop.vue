<script setup>
import UserList from "./UserList.vue"
import {ref, onMounted} from 'vue'
import { getItems } from '../libs/fetchUtils.js'
import Navbar from './NavbarAdmin.vue'

const myUsers = ref([])
const isLoading = ref(true)

onMounted( async () => {
    try{
        const allUsers = await getItems(
           `${import.meta.env.VITE_APP_URL}/users`
        )
        myUsers.value = allUsers.filter(user => user.role !== 'admin')
        console.log(myUsers.value)
    }
    catch(error){
        console.log(error)
    }
    finally {
        isLoading.value = false
    }
})

</script>

<template>
    <Navbar/>
    <div class="container mx-auto px-4 py-6">
        <div class="bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">User Management</h1>
            
            <div v-if="isLoading" class="flex justify-center py-10">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            
            <div v-else>
                <div v-if="myUsers.length === 0" class="text-center py-10 bg-gray-50 rounded-lg">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                    <h3 class="mt-2 text-gray-500 font-medium">No users found</h3>
                </div>
                <UserList v-else :users="myUsers"></UserList>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
