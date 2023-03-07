<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { fetchAllProducts } from "@/lib/helpers/fetchProductsList";
import { Product } from "@/types/product";
import { onBeforeMount, ref } from "@nuxtjs/composition-api";

const fetch = fetchAllProducts();

const products = ref<Product[]>([]);

onBeforeMount(async () => {
  products.value = (await fetch) as Product[];
});
</script>

<template>
  <div class="border-2 border-blue-300 flex flex-wrap justify-center gap-8">
    <div
      class="border-2 border-green-300 flex p-4"
      v-for="{
        id,
        category,
        description,
        discount,
        isActive,
        name,
        picture,
        price,
        stock,
      } in products"
      :key="id"
    >
      <ProductCard
        :name="name"
        :description="description"
        :category="category"
        :picture="picture"
        :price="price"
        :stock="stock"
        :discount="discount"
        :isActive="isActive"
      />
    </div>
  </div>
</template>

<!--
For him my json file is a flat structure, and when i want properties - i want to exctract all the same name im the whole object. It doesn't separate by actual objects. Why does it flatten??? -->
