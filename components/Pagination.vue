<script setup lang="ts">
import { computed, useRoute, useRouter } from '@nuxtjs/composition-api'
const route = useRoute()
const router = useRouter()

interface Props {
  totalProducts: number
}

const props = defineProps<Props>()
const emit = defineEmits(['paginate'])

const pages = computed(() => {
  return Math.ceil(
    props.totalProducts / Number(router.currentRoute.query.perPage)
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
        <button @click="handleClick(page)" class="py-2 px-4 border rounded-md">
          {{ page }}
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>
