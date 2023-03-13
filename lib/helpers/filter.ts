import { Product } from '@/types/product'

export const filterProductsOnSale = (data: Product[]) => {
  return data
    .slice()
    .filter((product: Product) => product.discount.status === true)
}
