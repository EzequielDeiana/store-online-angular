import { IProduct } from "./product";

export interface ICart {
    id: number;
    product: IProduct; // Incluir todos los detalles del producto
    quantity: number;
  }