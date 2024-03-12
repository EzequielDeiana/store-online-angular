import { Injectable } from '@angular/core';
import { ICartItem } from './cart';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartsUrl = "https://fakestoreapi.com/carts";

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getCarts(): Promise<ICartItem[]>{
    return this.http.get<ICartItem[]>(this.cartsUrl)
    .pipe(catchError(this.handleError<ICartItem[]>('getCarts', [])))
    .toPromise();
  }

  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({ 'Contact-Type' : 'application/json' })
  }
}
