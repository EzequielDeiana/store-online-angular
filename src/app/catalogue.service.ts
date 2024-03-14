import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { Observable, of ,throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  private productsUrl = 'https://fakestoreapi.com/products';

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl)
      .pipe(
        tap(products => console.log('fetched products', products)),
        catchError(error => {
          console.error('Error fetching products:', error);
          return throwError(error);
        })
      );
  }

  getProduct(id: number): Observable<IProduct> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url)
      .pipe(
        tap(_ => console.log(`fetched product from id: ${id}`)),
        catchError(error => {
          console.error('Error fetching product:', error);
          return throwError(error);
        })
      );
  }

  getProductsPromise(): Promise<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl)
      .pipe(
        tap(products => console.log('fetched products', products)),
        catchError(error => {
          console.error('Error fetching products:', error);
          return throwError(error);
        })
      )
      .toPromise();
  }
  

  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({ 'Contact-Type' : 'application/json' })
  }
}
