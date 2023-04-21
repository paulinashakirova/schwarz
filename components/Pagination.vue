<script setup lang="ts">
import { computed, ref, useRoute } from '@nuxtjs/composition-api'
import ArrowSvg from './ArrowSvg.vue'

const route = useRoute() //move to index.vue

interface Props {
  productsPerPage: number
  pages: number
}

const props = defineProps<Props>()
const emit = defineEmits(['paginate'])

const currentPage = ref<number>(Number(route.value.query.page))

const pagesToDisplay = computed(() => {
  let start = <number[]>[]
  let middle = <number[]>[]
  let end = <number[]>[]

  if (props.pages <= 7) {
    return {
      start: Array.from({ length: props.pages }, (_, i) => i + 1),
      middle: [],
      end: [],
    }
  }

  if (currentPage.value === 1) {
    start = [1, 2]
    middle = [~~(props.pages / 2)]
    end = [props.pages - 1, props.pages]
  } else if (currentPage.value === 2) {
    start = [1, 2, 3]
    middle = [~~(props.pages / 2)]
    end = [props.pages - 1, props.pages]
  } else if (currentPage.value === 3) {
    start = [1, 2, 3, 4]
    middle = []
    end = [props.pages - 1, props.pages]
  } else if (currentPage.value === 4) {
    start = [1, 2, 3, 4, 5]
    middle = []
    end = [props.pages - 1, props.pages]
  } else if (currentPage.value === props.pages) {
    start = [1, 2]
    middle = [~~(props.pages / 2)]
    end = [props.pages - 1, props.pages]
  } else if (currentPage.value === props.pages - 1) {
    start = [1, 2]
    middle = [~~(props.pages / 2)]
    end = [props.pages - 2, props.pages - 1, props.pages]
  } else if (currentPage.value === props.pages - 2) {
    start = [1, 2]
    middle = []
    end = [props.pages - 3, props.pages - 2, props.pages - 1, props.pages]
  } else if (currentPage.value === props.pages - 3) {
    start = [1, 2]
    middle = []
    end = [
      props.pages - 4,
      props.pages - 3,
      props.pages - 2,
      props.pages - 1,
      props.pages,
    ]
  } else {
    start = [1, 2]
    if (currentPage.value <= props.pages - 4) {
      middle = [currentPage.value - 1, currentPage.value, currentPage.value + 1]
    }
    end = [props.pages - 1, props.pages]
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
    <div class="flex mx-auto my-4 justify-center">
      <div class="flex flex-wrap gap-3">
        <div v-for="page in pagesToDisplay.start" :key="page">
          <button
            @click="handleClick(page)"
            class="py-2 px-4 border rounded-md"
            :class="page === Number(route.query.page) ? 'bg-yellow-300' : ''"
          >
            {{ page }}
          </button>
        </div>
        <button
          v-if="currentPage >= 5"
          class="h-5 w-5 -rotate-90 cursor-pointer self-center"
          @click="handleClick(currentPage - 1)"
        >
          <ArrowSvg />
        </button>
        <template v-if="pagesToDisplay.middle.length && currentPage >= 4">
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
          <button
            v-if="currentPage >= pages - 1"
            class="h-5 w-5 -rotate-90 cursor-pointer self-center"
            @click="handleClick(currentPage - 1)"
          >
            <ArrowSvg />
          </button>
          <button
            v-if="currentPage <= pages - 4"
            class="h-5 w-5 rotate-90 cursor-pointer self-center"
            @click="handleClick(currentPage + 1)"
          >
            <ArrowSvg />
          </button>
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
