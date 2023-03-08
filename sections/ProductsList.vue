<script setup lang="ts">
import Pagination from '@/components/Pagination.vue'
import ProductCard from '@/components/ProductCard.vue'
import { roundPrice } from '@/lib/helpers/utils'
import { useProductsListStore } from '@/stores/products'
import {
  computed,
  onBeforeMount,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'

const store = useProductsListStore()
const context = useContext()
const currentPage = ref<number>(1)
const query = new URLSearchParams({})
const router = useRouter()
const productsList = computed(() => {
  return store.productsList
})

const productsCurrentPage = computed(() => {
  return store.productsList.slice(currentPage.value - 1, currentPage.value + 5)
})

onBeforeMount(async () => {
  await store.fetchProductsList()
})

const paginate = (page: number) => {
  currentPage.value = page
  router.push({ query: { page: page.toString(), perPage: '6' } })
  console.log('routeR', router)

  // const url = `${baseUrl}${
  // context.env.includes('?') ? '&' : '?'
  // }${query.toString()}`
  // console.log('url', url)
  // return url
}
</script>

<template>
  <section>
    <Pagination
      @paginate="paginate"
      :total-products="productsList.length"
      :products-per-page="6"
    >
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
