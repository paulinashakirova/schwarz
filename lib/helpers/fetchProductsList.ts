import products from "@/static/mock-data/product-list.json";
import { Product } from "@/types/product";

export const fetchAllProducts = async () => {
  const mockAsyncPromise = (mockProducts: Product[], delay: number) =>
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          mockProducts
            ? resolve(mockProducts)
            : reject(
                new Error(
                  "Sadly, we couldn't load the necessary data. Please try again, or contact us. Sorry for the inconvenience."
                )
              ),
        delay
      )
    );

  return mockAsyncPromise(products, 100);

  // catch is unnecesary here, since it is duplicating an error displayed in the console (should error occur)
};
