<script setup lang="ts">
import Pagination from '@/components/Pagination.vue'
import ProductCard from '@/components/ProductCard.vue'
import { roundPrice } from '@/lib/helpers/utils'
import { useProductsListStore } from '@/stores/products'
import {
  computed,
  onBeforeMount,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'

const store = useProductsListStore()
const router = useRouter()

const currentPage = ref<number>(1)

const productsPerPage = computed(() => {
  return router.currentRoute.query.perPage
})

const productsList = computed(() => {
  return store.productsList
})

const productsCurrentPageFromQuery = computed(() => {
  return router.currentRoute.query.page
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
  await store.fetchProductsList()
  paginate(Number(productsCurrentPageFromQuery.value))
})
</script>

<template>
  <section>
    <Pagination @paginate="paginate" :total-products="productsList.length">
      <div class="flex flex-wrap gap-8 my-8 py-8">
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
          } of productsCurrentPage"
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
      </div>
    </Pagination>
  </section>
</template>

<!-- if on sale - pass sale prop... and display it somehow, but no logic inside 
if in our out of stock... also pass and find representation
and if isActive... 
if(stock <= 0 => disable)
HOW pass nested properties as props-->
