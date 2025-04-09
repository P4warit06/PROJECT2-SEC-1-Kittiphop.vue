<script setup>
import ListModel from "./model/ListModel.vue"
import { ref } from "vue"

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
})

const listType = ref("card")

function setInitialName(name) {
  if (!name || typeof name !== "string") return "??"
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2)
}
function getAvatarColor(id) {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-teal-500",
  ]
  return colors[id % colors.length]
}
</script>

<template>
  <div class="mb-6">
    <div class="flex justify-end mb-4">
      <div class="inline-flex rounded-md shadow-sm">
        <button
          @click="listType = 'card'"
          :class="[
            'px-4 py-2 text-sm font-medium border rounded-l-lg transition-colors',
            listType === 'card'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
          ]"
        >
          <i class="fas fa-th mr-1"></i> Cards
        </button>
        <button
          @click="listType = 'list'"
          :class="[
            'px-4 py-2 text-sm font-medium border rounded-r-lg transition-colors',
            listType === 'list'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
          ]"
        >
          <i class="fas fa-list mr-1"></i> List
        </button>
      </div>
    </div>

    <ListModel
      :items="props.users"
      :listType="listType"
      gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      <template #heading>Users ({{ props.users.length }})</template>
      <template #listItems="{ yourItem: user }">
        <router-link
          :to="{ name: 'UserTracking', params: { userId: user.id } }"
          class="block h-full w-full"
        >
          <div v-if="listType === 'card'" class="flex flex-col h-full">
            <div class="flex items-center justify-center mb-4">
              <div
                v-if="user.avatar"
                class="h-20 w-20 rounded-full overflow-hidden border-2 border-gray-200"
              >
                <img
                  :src="user.avatar"
                  :alt="user.username"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                :class="[
                  getAvatarColor(user.id),
                  'h-20 w-20 rounded-full flex items-center justify-center text-white font-bold text-xl',
                ]"
              >
                {{ setInitialName(user.username || user.name) }}
              </div>
            </div>

            <div class="text-center mb-4 flex-grow">
              <h3 class="text-lg font-bold text-gray-800 mb-1">
                {{ user.username || user.name }}
              </h3>
              <p class="text-sm text-gray-600">{{ user.email }}</p>
              <div class="mt-3">
                <span
                  v-if="user.role"
                  class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                >
                  {{ user.role }}
                </span>
              </div>
            </div>

            <div class="pt-3 border-t border-gray-100">
              <button
                class="w-full py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition-colors"
              >
                View Details
              </button>
            </div>
          </div>

          <div v-else class="flex items-center justify-between w-full">
            <div class="flex items-center">
              <div
                v-if="user.avatar"
                class="h-10 w-10 rounded-full overflow-hidden mr-4"
              >
                <img
                  :src="user.avatar"
                  :alt="user.username"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                :class="[
                  getAvatarColor(user.id),
                  'h-10 w-10 rounded-full flex items-center justify-center text-white font-medium mr-4',
                ]"
              >
                {{ setInitialName(user.username || user.name) }}
              </div>

              <div>
                <p class="font-medium text-gray-800">
                  {{ user.username || user.name }}
                </p>
                <p class="text-sm text-gray-600">{{ user.email }}</p>
              </div>
            </div>

            <div class="flex items-center">
              <span
                v-if="user.role"
                class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mr-2"
              >
                {{ user.role }}
              </span>
              <span class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-chevron-right"></i>
              </span>
            </div>
          </div>
        </router-link>
      </template>
    </ListModel>
  </div>
</template>

<style scoped>
.router-link-active {
  color: inherit;
  text-decoration: none;
}
</style>
