export interface Product {
  id: string
  category: string
  description: string
  name: string
  discount: { status: boolean; value: number }
  isActive: boolean
  picture: string
  price: number
  stock: number
}
