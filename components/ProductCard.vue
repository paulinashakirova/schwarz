<script setup lang="ts">
interface Props {
  category: string;
  description: string;
  name: string;
  picture: string;
  price: number;
  stock: number;
  discount: {
    status: boolean;
    value: number;
  };
  isActive: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="border-2 border-red-400 w-80 flex flex-col gap-y-3 justify-between"
  >
    <div>Name: {{ props.name }}</div>
    <div>Description: {{ props.description }}</div>
    <div>Price: {{ props.price }}</div>
    <div>Stock: {{ props.stock }}</div>
    <div>Category: {{ props.category }}</div>
  </div>
</template>
