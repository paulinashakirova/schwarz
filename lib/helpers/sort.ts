import { Product } from '@/types/product'

export const sortBySale = (products: Product[], direction: boolean) => {
  const ascending = products.slice().sort((a: Product, b: Product) => {
    return a.discount.value > b.discount.value
      ? 1
      : a.discount.value < b.discount.value
      ? -1
      : 0
  })

  const descending = products.slice().sort((a: Product, b: Product) => {
    return a.discount.value > b.discount.value
      ? -1
      : a.discount.value < b.discount.value
      ? 1
      : 0
  })
  return direction ? ascending : descending
}
