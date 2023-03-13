<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import { roundPrice } from '@/lib/helpers/utils'
import { Product } from '@/types/product'

interface Props {
  productsCurrentPage: Product[]
}

const props = defineProps<Props>()
</script>

<template>
  <section>
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
        } of props.productsCurrentPage"
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
  </section>
</template>
