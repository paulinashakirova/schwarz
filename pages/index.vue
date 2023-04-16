<script setup lang="ts">
import Pagination from '@/components/Pagination.vue'
import ProductsList from '@/sections/ProductsList.vue'
import {Product} from '@/types/product'
import {
  computed,
  onBeforeMount,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'

import { filterProductsOnSale } from '@/lib/helpers/filter'
import { sortBySale } from '@/lib/helpers/sort'
import { useProductsListStore } from '@/stores/products'

const store = useProductsListStore()
const router = useRouter()

const currentPage = ref<number>(1)
const lastSortDirectionAscending = ref<boolean>(true)
const showOnlyOnSaleItems = ref<boolean>(false)
const dataSource = ref<Product[]>(store.productsList)

const productsPerPage = computed(() => {
  return Number(router.currentRoute.query.perPage ?? 6)
})

const productsListLength = computed(() => {
  return dataSource.value.length
})

const productsCurrentPageFromQuery = computed(() => {
  return Number(router.currentRoute.query.page ?? 1)
})

const modifyProductList = (condition: string) => {
  if (condition === 'sale') {
    lastSortDirectionAscending.value = !lastSortDirectionAscending.value
    dataSource.value = sortBySale(
      dataSource.value,
      lastSortDirectionAscending.value
    )
  }
  if (condition === 'showOnlyOnSale') {
    showOnlyOnSaleItems.value = !showOnlyOnSaleItems.value
    showOnlyOnSaleItems.value
      ? (dataSource.value = filterProductsOnSale(dataSource.value))
      : (dataSource.value = store.productsList)
  }
  if (!condition) {
    dataSource.value = store.productsList
  }
}

const productsCurrentPage = computed(() => {
  return dataSource.value.slice(
    currentPage.value - 1,
    currentPage.value + Number(productsPerPage.value) - 1
  )
})

const paginate = (page: number, perPage:number) => {
  router.push({ query: { page: page.toString(), perPage: perPage.toString() } })
  currentPage.value = page
  productsCurrentPage
}

onBeforeMount(async () => {
  await store.fetchProductsList()
  dataSource.value = store.productsList
  paginate(productsCurrentPageFromQuery.value, productsPerPage.value)
})
</script>

<template>
  <div>
    <h1 class="text-3xl md:text-4xl font-bold text-center py-2 my-8">
      Here is the list of all products
    </h1>
    <div class="flex gap-x-4 justify-center">
      <div
        tabindex="1"
        class="flex justify-center gap-x-2 cursor-pointer group border py-2 px-3 rounded-sm"
        @click="() => modifyProductList('sale')"
        @keydown="() => modifyProductList('sale')"
      >
        <div>Sort By Sale</div>
        <svg
          width="9"
          height="12"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="self-center"
          :class="
            lastSortDirectionAscending === true ? 'rotate-90' : '-rotate-90'
          "
        >
          <path
            d="M1.56957 2L7.5 7.96501L1.5 14"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-gray-500"
          />
        </svg>
      </div>
      <a
        tabindex="2"
        class="border py-2 px-3 rounded-sm cursor-pointer"
        @click="() => modifyProductList('showOnlyOnSale')"
        @keydown="() => modifyProductList('showOnlyOnSale')"
        >{{
          showOnlyOnSaleItems ? 'Show all products' : 'Show only on Sale'
        }}</a
      >
    </div>
    <ProductsList :products-current-page="productsCurrentPage" />
    <Pagination
      :total-products="productsListLength"
      :products-per-page="productsPerPage"
      @paginate="paginate"
    />
  </div>
</template>
