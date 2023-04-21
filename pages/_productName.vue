<script setup lang="ts">
import { useProductsListStore } from '@/stores/products'
import { onBeforeMount, ref, useRoute } from '@nuxtjs/composition-api'

const store = useProductsListStore()
const route = useRoute()
const product = ref({})

onBeforeMount(async () => {
  await store.fetchProductsList()
  product.value = await store.productsList.find(
    (e) => e.name === route.value.params.productName
  )
})
</script>

<template>
  <div>
    <div>{{ product.name }}</div>
    <div>{{ product.description }}</div>
    <div>{{ product.category }}</div>
  </div>
</template>
