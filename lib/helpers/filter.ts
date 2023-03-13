export const filterProductsOnSale = (data: any) => {
  console.log('filterProductsOnSale')

  return data.slice().filter((product: any) => product.discount.status === true)
}
