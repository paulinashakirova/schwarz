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
//Should I move this to Pinia?
const isOnSale = computed(() => {
  return props.discount?.status ? `${props.stock} items left` : `Out of stock`
})

const props = defineProps<ProductCard>()
</script>

<template>
  <div
    class="relative shadow-sm p-4 flex flex-col w-80 mx-auto gap-y-4 h-full bg-gray-100 rounded-md justify-between"
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
      class="rounded-md"
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
        <!-- Find a way to show out of stock (computed property... pinia or here? 
      Keep computed in pinia or utils?
      ) -->
        <div>{{ isOnSale }}</div>
      </div>
    </div>
  </div>
</template>
