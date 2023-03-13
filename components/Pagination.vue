<script setup lang="ts">
import { computed, useRoute } from '@nuxtjs/composition-api'
const route = useRoute()

interface Props {
  totalProducts: number
  productsPerPage: number
}

const props = defineProps<Props>()
const emit = defineEmits(['paginate'])

const pages = computed(() => {
  return Math.ceil(
    props.totalProducts / (!props.productsPerPage ? 6 : props.productsPerPage)
  )
})

const handleClick = (page: number) => {
  emit('paginate', page)
}
</script>

<template>
  <div>
    <div class="flex gap-4 mx-auto my-4 flex-wrap justify-center">
      <div v-for="page in pages" :key="page">
        <button
          @click="handleClick(page)"
          class="py-2 px-4 border rounded-md"
          :class="page === Number(route.query.page) ? 'bg-yellow-300' : ''"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>
