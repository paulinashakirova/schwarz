<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'

export interface ProductCard {
  name: string
  description: string
  discount?: {
    status: boolean
    value: number
  }
  picture: string
  price: number
  stock: number
}

const props = defineProps<ProductCard>()

const isOnSale = computed(() => {
  return props.stock > 0 ? `${props.stock} items left` : `Out of stock`
})
</script>

<template>
  <div
    class="relative shadow-sm p-4 flex flex-col w-80 mx-auto gap-y-4 h-full bg-gray-100 rounded-md justify-between"
    :class="props.stock === 0 ? 'brightness-50' : ''"
  >
    <div
      v-if="props.discount?.status"
      class="absolute top-1 right-1 gap-y-1 flex flex-col"
    >
      <div class="bg-yellow-300 rounded-md py-1 px-2">On Sale</div>
      <div class="bg-yellow-300 rounded-md py-1 px-2 text-center">
        {{ props.discount.value }} %
      </div>
    </div>

    <img
      class="rounded-md mx-auto"
      :src="props.picture"
      width="280"
      height="280"
      alt=""
    />
    <div class="flex flex-col h-full gap-y-4">
      <h3 class="font-semibold text-lg text-center capitalize">
        {{ props.name }}
      </h3>
      <p>{{ props.description }}</p>
      <div class="flex justify-between mt-auto">
        <div>Price: {{ props.price }} $</div>
        <div>{{ isOnSale }}</div>
      </div>
    </div>
  </div>
</template>
