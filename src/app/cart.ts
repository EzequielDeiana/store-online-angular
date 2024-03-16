// cart.ts
export interface ICart {
    id: number;
    userId: number;
    date: Date;
    products: {
      productId: number;
      quantity: number;
    }[];
    __v: number;
  }