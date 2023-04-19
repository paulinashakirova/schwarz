<script setup lang="ts">
import { computed, ref, useRoute } from '@nuxtjs/composition-api'

const route = useRoute()

interface Props {
  totalProducts: number
  productsPerPage: number
}

const props = defineProps<Props>()
const emit = defineEmits(['paginate'])

const currentPage = ref<number>(Number(route.value.query.page))

const pages = computed(() => {
  return Math.ceil(
    props.totalProducts / (!props.productsPerPage ? 6 : props.productsPerPage)
  )
})

const pagesToDisplay = computed(() => {
  let start = <number[]>[]
  let middle = <number[]>[]
  let end = <number[]>[]

  if (pages.value <= 7) {
    return {
      start: Array.from({ length: pages.value }, (_, i) => i + 1),
      middle: [],
      end: [],
    }
  }

  if (currentPage.value === 1) {
    start = [1, 2]
    middle = [~~(pages.value / 2)]
    end = [pages.value - 1, pages.value]
  } else if (currentPage.value === 2) {
    start = [1, 2, 3]
    middle = [~~(pages.value / 2)]
    end = [pages.value - 1, pages.value]
  } else if (currentPage.value === 3) {
    start = [1, 2, 3, 4]
    middle = []
    end = [pages.value - 1, pages.value]
  } else if (currentPage.value === 4) {
    start = [1, 2, 3, 4, 5]
    middle = []
    end = [pages.value - 1, pages.value]
  } else if (currentPage.value === pages.value) {
    start = [1, 2]
    middle = [~~(pages.value / 2)]
    end = [pages.value - 1, pages.value]
  } else if (currentPage.value === pages.value - 1) {
    start = [1, 2]
    middle = [~~(pages.value / 2)]
    end = [pages.value - 2, pages.value - 1, pages.value]
  } else if (currentPage.value === pages.value - 2) {
    start = [1, 2]
    middle = []
    end = [pages.value - 3, pages.value - 2, pages.value - 1, pages.value]
  } else if (currentPage.value === pages.value - 3) {
    start = [1, 2]
    middle = []
    end = [
      pages.value - 4,
      pages.value - 3,
      pages.value - 2,
      pages.value - 1,
      pages.value,
    ]
  } else {
    start = [1, 2]
    middle = [currentPage.value - 1, currentPage.value, currentPage.value + 1]
    end = [pages.value - 1, pages.value]
  }

  return { start, middle, end }
})

const handleClick = (page: number) => {
  currentPage.value = page
  emit('paginate', page)
}
</script>

<template>
  <div>
    <div class="flex mx-auto my-4 justify-center border-2 border-blue-400">
      <div class="flex flex-wrap gap-3 border-2 border-red-400">
        <div v-for="page in pagesToDisplay.start" :key="page">
          <button
            @click="handleClick(page)"
            class="py-2 px-4 border rounded-md"
            :class="page === Number(route.query.page) ? 'bg-yellow-300' : ''"
          >
            {{ page }}
          </button>
        </div>
        <template v-if="pagesToDisplay.middle.length">
          <div>...</div>
          <div v-for="page in pagesToDisplay.middle" :key="page">
            <button
              @click="handleClick(page)"
              class="py-2 px-4 border rounded-md"
              :class="page === Number(route.query.page) ? 'bg-yellow-300' : ''"
            >
              {{ page }}
            </button>
          </div>
        </template>
        <template v-if="pagesToDisplay.end.length">
          <div>...</div>
          <div v-for="page in pagesToDisplay.end" :key="page">
            <button
              @click="handleClick(page)"
              class="py-2 px-4 border rounded-md"
              :class="page === Number(route.query.page) ? 'bg-yellow-300' : ''"
            >
              {{ page }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
