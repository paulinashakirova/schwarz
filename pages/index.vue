<script setup lang="ts">
import { useProductsListStore } from "@/stores/useProductsListStore";
import { onMounted } from "@nuxtjs/composition-api";

const productsStore = useProductsListStore();

onMounted(async () => {
  console.log(productsStore.productsList);
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <div></div>
  </div>
</template>
