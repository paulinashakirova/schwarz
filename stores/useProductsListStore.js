import { defineStore } from "pinia";
import productsList from "@/static/mock-data/product-list.json";

export const useProductsListStore = defineStore("productsList", {
  state: () => ({
    productsList: [],
  }),
  actions: {
    async fetchProductsList() {
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
          );
        this.productsList = await mockAsyncPromise(productsList, 100);
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  },
});
