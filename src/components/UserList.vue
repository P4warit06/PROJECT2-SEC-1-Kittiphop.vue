<script setup>
import ListModel from "./model/ListModel.vue";
const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <ListModel :items="props.users" listType="card" >
    <template #heading>User List</template>
    <template #listItems="{ yourItem }" >
      <router-link :to="{name:'UserTracking' , params: {userId: yourItem.id}} ">
        <p v-if="yourItem.id >= 1">
          <span class="italic">Id: </span> {{ yourItem.id }}
          <span class="italic">Name:</span>{{ yourItem.username }}
          <span class="italic">Email:</span>{{ yourItem.email }}
        </p>
      </router-link>
    </template>
  </ListModel>
</template>
<style scoped></style>
