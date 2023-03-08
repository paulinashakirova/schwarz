<script setup lang="ts">
import { useCurrentUrl } from '@/composables/use-current-url'
import { computed, useContext, useRoute } from '@nuxtjs/composition-api'
const route = useRoute()
console.log('route', route.value)
console.log('context', useContext())

console.log('useCurrentUrl', useCurrentUrl())

// route.value.params.push()
interface Props {
  totalProducts: number
  productsPerPage: number
}

const props = defineProps<Props>()
const emit = defineEmits(['paginate'])

const pages = computed(() => {
  return Math.ceil(props.totalProducts / props.productsPerPage)
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
