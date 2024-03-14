import { Injectable } from '@angular/core';
import { ICart } from './cart';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartsUrl = "https://fakestoreapi.com/carts";
  private cartItems: ICart[] = []

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getCarts(): Observable<any[]> {
    return this.http.get<any[]>(this.cartsUrl + '?limit=5')
      .pipe(
        catchError(this.handleError<any[]>('getCarts', []))
      );
  }

  addToCart(cartItem: ICart): Observable<ICart> {
    return this.http.post<ICart>(this.cartsUrl, cartItem)
      .pipe(
        catchError(this.handleError<ICart>('addToCart'))
      );
  }

  setCartItems(items: ICart[]): void {
    this.cartItems = items;
  }

  getCartItems(): Observable<ICart[]> {
    return this.http.get<any[]>(this.cartsUrl + '?limit=5').pipe(
      catchError(this.handleError('getCartItems', []))
    );
  }

  getDetailedCartItems(cartItems: ICart[]): Observable<ICart[]> {
    const productRequests = cartItems.map(cartItem => {
      return this.http.get<IProduct>(`https://fakestoreapi.com/products/${cartItem.product.id}`);
    });
    return forkJoin(productRequests).pipe(
      catchError(this.handleError('getDetailedCartItems', [])),
      map(products => {
        return cartItems.map((cartItem, index) => {
          return {
            id: cartItem.id,
            product: products[index],
            quantity: cartItem.quantity
          };
        });
      })
    );
  }

  private getProductInfo(productId: number): Observable<any> {
    const productUrl = `https://fakestoreapi.com/products/${productId}`;
    return this.http.get(productUrl);
  }

  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({ 'Contact-Type' : 'application/json' })
  }
}
