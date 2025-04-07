import { ref, computed } from 'vue'

export function usePagination(items, pageSize = 10) {
  const limitShowItems = ref(pageSize)
  
  const paginatedItems = computed(() => {
    return items.value.slice(0, limitShowItems.value)
  })
  
  const hasMoreItems = computed(() => {
    return limitShowItems.value < items.value.length
  })
  
  const loadMoreItems = () => {
    limitShowItems.value += pageSize
  }

  return {
    paginatedItems,
    hasMoreItems,
    loadMoreItems
  }
}
