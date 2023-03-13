<script setup lang="ts">
import Pagination from '@/components/Pagination.vue'
import ProductsList from '@/sections/ProductsList.vue'
import {
  computed,
  onBeforeMount,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'

import { useProductsListStore } from '@/stores/products'

const store = useProductsListStore()
const router = useRouter()

const currentPage = ref<number>(1)

const productsPerPage = computed(() => {
  return Number(router.currentRoute.query.perPage)
})

const productsListLength = computed(() => {
  return store.productsList.length
})

const productsCurrentPageFromQuery = computed(() => {
  return Number(router.currentRoute.query.page)
})

const productsCurrentPage = computed(() => {
  return store.productsList.slice(
    currentPage.value - 1,
    currentPage.value + Number(productsPerPage.value) - 1
  )
})

const paginate = (page: number) => {
  currentPage.value = page
  router.push({ query: { page: page.toString(), perPage: '4' } })
}

onBeforeMount(async () => {
  paginate(productsCurrentPageFromQuery.value)
  await store.fetchProductsList()
})
</script>

<template>
  <div>
    <h1 class="text-3xl md:text-4xl font-bold text-center py-2 my-8">
      Here is the list of all products
    </h1>
    <ProductsList :products-current-page="productsCurrentPage" />
    <Pagination
      :total-products="productsListLength"
      :products-per-page="productsPerPage"
      @paginate="paginate"
    />
  </div>
</template>
