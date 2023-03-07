import products from '@/static/mock-data/product-list.json'
import { ref } from '@nuxtjs/composition-api'
import { defineStore } from 'pinia'

export const useProductsListStore = defineStore('productsList', () => {
  const productsList = ref([])

  async function fetchProductsList() {
    try {
      const mockAsyncPromise = (mockList, delay) =>
        new Promise((resolve, reject) =>
          setTimeout(
            () =>
              mockList
                ? resolve(mockList)
                : reject(
                    new Error(
                      "Sadly, we couldn't load the necessary data. Please try again, or contact us. Sorry for the inconvenience."
                    )
                  ),
            delay
          )
        )
      productsList.value = await mockAsyncPromise(products, 100)
    } catch (error) {
      console.error(error)
      return error
    }
  }
  return { productsList, fetchProductsList }
})
