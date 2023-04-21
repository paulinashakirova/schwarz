<script setup lang="ts">
import { computed, ref, useRoute } from '@nuxtjs/composition-api'
import ArrowSvg from './ArrowSvg.vue'

interface Props {
  productsPerPage: number
  pages: number
  currentPage: number
}

const props = defineProps<Props>()
const emit = defineEmits(['paginate'])

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

  if (props.currentPage === 1) {
    start = [1, 2]
    middle = []
    end = [props.pages - 1, props.pages]
  } else if (props.currentPage === 2) {
    start = [1, 2, 3]
    middle = []
    end = [props.pages - 1, props.pages]
  } else if (props.currentPage === 3) {
    start = [1, 2, 3, 4]
    middle = []
    end = [props.pages - 1, props.pages]
  } else if (props.currentPage === 4) {
    start = [1, 2, 3, 4, 5]
    middle = []
    end = [props.pages - 1, props.pages]
  } else if (props.currentPage === props.pages) {
    start = [1, 2]
    middle = []
    end = [props.pages - 1, props.pages]
  } else if (props.currentPage === props.pages - 1) {
    start = [1, 2]
    middle = []
    end = [props.pages - 2, props.pages - 1, props.pages]
  } else if (props.currentPage === props.pages - 2) {
    start = [1, 2]
    middle = []
    end = [props.pages - 3, props.pages - 2, props.pages - 1, props.pages]
  } else if (props.currentPage === props.pages - 3) {
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
    if (props.currentPage <= props.pages - 2) {
      middle = [props.currentPage - 1, props.currentPage, props.currentPage + 1]
    }
    end = [props.pages - 1, props.pages]
  }

  return { start, middle, end }
})

const handleClick = (page: number) => {
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
            :class="page === props.currentPage ? 'bg-yellow-300' : ''"
          >
            {{ page }}
          </button>
        </div>
        <button
          v-if="currentPage >= 5"
          class="h-5 w-5 -rotate-90 cursor-pointer self-center"
          @click="handleClick(props.currentPage - 1)"
        >
          <ArrowSvg />
        </button>
        <template v-if="pagesToDisplay.middle.length && currentPage >= 4">
          <div v-for="page in pagesToDisplay.middle" :key="page">
            <button
              @click="handleClick(page)"
              class="py-2 px-4 border rounded-md"
              :class="page === props.currentPage ? 'bg-yellow-300' : ''"
            >
              {{ page }}
            </button>
          </div>
        </template>
        <template v-if="pagesToDisplay.end.length">
          <button
            v-if="props.currentPage <= pages - 4"
            class="h-5 w-5 rotate-90 cursor-pointer self-center"
            @click="handleClick(props.currentPage + 1)"
          >
            <ArrowSvg />
          </button>
          <div v-for="page in pagesToDisplay.end" :key="page">
            <button
              @click="handleClick(page)"
              class="py-2 px-4 border rounded-md"
              :class="page === props.currentPage ? 'bg-yellow-300' : ''"
            >
              {{ page }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
