// Product Model.
export interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  _id?: number;
}

export class ProductModel implements Product {
  description: string;
  price: number;
  productId: number;
  productName: string;
  quantity: number;
}
