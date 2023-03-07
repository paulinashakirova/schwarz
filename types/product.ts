export interface Product {
  id: string;
  category: string;
  description: string;
  discount: {
    status: boolean;
    value: number;
  };
  isActive: boolean;
  name: string;
  picture: string;
  price: number;
  stock: number;
}
