import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './product';
import { ICart } from './cart';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartsUrl = "https://fakestoreapi.com/carts";
  private productsUrl = "https://fakestoreapi.com/products";
  private cartItems: any[] = [];

  constructor(private http: HttpClient) { }

  addToCart(productId: number, quantity: number): Observable<ICart> {
    const cartItem: any = {
      userId: 9, // Cambiar al ID de usuario correcto
      date: new Date(), // Puedes utilizar new Date() para obtener la fecha actual
      products: [{ productId: productId, quantity: quantity }]
    };
  
    return this.http.post<ICart>(this.cartsUrl, cartItem)
      .pipe(
        catchError(this.handleError<ICart>('addToCart'))
      );
  }

  getCartItems(userId: number): Observable<ICart[]> {
    const url = `${this.cartsUrl}/user/${userId}`;
    return this.http.get<ICart[]>(url)
      .pipe(
        catchError(this.handleError<ICart[]>('getCartItems', []))
      );
  }

  getDetailedCartItems(cartItems: any[]): Observable<any[]> {
    console.log("cart Items" + cartItems);
    const productRequests = cartItems.map(cartItem => {
      return this.http.get<IProduct>(`https://fakestoreapi.com/products/${cartItem.productId}`);
    });
    return forkJoin(productRequests).pipe(
      catchError(this.handleError<any[]>('getDetailedCartItems', []))
    );
  }

  getCart(userId: number): Observable<ICart> {
    const url = `${this.cartsUrl}/user/${userId}`; // Construye la URL con el ID de usuario proporcionado
    return this.http.get<ICart>(url)
      .pipe(
        catchError(this.handleError<ICart>('getCart'))
      );
  }

  getProductsDetails(productIds: number[]): Observable<IProduct[]> {
    const requests = productIds.map(productId => this.http.get<IProduct>(`${this.productsUrl}/${productId}`));
    return forkJoin(requests).pipe(
      catchError(this.handleError<IProduct[]>('getProductsDetails', []))
    );
  }

  getCartForUser(userId: number, cartId: number): Observable<ICart> {
    const url = `${this.cartsUrl}/user/${userId}/${cartId}`;
    return this.http.get<ICart>(url)
      .pipe(
        catchError(this.handleError<ICart>('getCartForUser'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}