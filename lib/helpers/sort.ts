export const sortBySale = (products: any, direction: boolean) => {
  const ascending = products.slice().sort((a: any, b: any) => {
    return a.discount.value > b.discount.value
      ? 1
      : a.discount.value < b.discount.value
      ? -1
      : 0
  })

  const descending = products.slice().sort((a: any, b: any) => {
    return a.discount.value > b.discount.value
      ? -1
      : a.discount.value < b.discount.value
      ? 1
      : 0
  })
  return direction ? ascending : descending
}
