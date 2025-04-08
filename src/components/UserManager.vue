<script setup>
import UserList from "./UserList.vue"
import {ref , onMounted} from 'vue'
import { getItems } from '../libs/fetchUtils.js'
import NavbarAdmin from "./NavbarAdmin.vue"


const myUsers = ref([])
onMounted( async () => {
    try{
        const allUsers = myUsers.value = await getItems(
           `${import.meta.env.VITE_APP_URL}/users`
        )
        myUsers.value = allUsers.filter(user => user.role !== 'admin')
    console.log(myUsers.value)
    }
    catch(error){
        console.log(error)
    }
})

</script>
<template>
    <NavbarAdmin/>
  <UserList :users="myUsers"></UserList>
</template>
<style scoped></style>
