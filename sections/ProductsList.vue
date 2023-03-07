<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import { roundPrice } from '@/lib/helpers/utils'
import { useProductsListStore } from '@/stores/products'
import { computed, onBeforeMount } from '@nuxtjs/composition-api'

const store = useProductsListStore()

const productsList = computed(() => {
  return store.productsList
})

onBeforeMount(async () => {
  await store.fetchProductsList()
})
</script>

<template>
  <section class="flex flex-wrap gap-8 my-8 py-8">
    <div
      class="mx-auto"
      v-for="{
        id,
        category, //what exactly do they mean?
        description,
        name,
        discount: { status, value },
        isActive,
        picture,
        price,
        stock,
      } of productsList"
      :key="id"
    >
      <ProductCard
        :name="name"
        :description="description"
        :category="category"
        :picture="picture"
        :price="roundPrice(price)"
        :stock="stock"
        :discount="{ status, value }"
      />
    </div>
  </section>
</template>

<!-- if on sale - pass sale prop... and display it somehow, but no logic inside 
if in our out of stock... also pass and find representation
and if isActive... 
if(stock <= 0 => disable)
HOW pass nested properties as props-->
