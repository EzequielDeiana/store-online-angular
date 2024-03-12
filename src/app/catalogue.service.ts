import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { Observable, of } from 'rxjs';
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

  getProducts(): Promise<IProduct[]>{
    return this.http.get<IProduct[]>(this.productsUrl)
    .pipe(catchError(this.handleError<IProduct[]>('getProducts', [])))
    .toPromise();
  }

  getProduct(id: number): Promise<IProduct>{
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url)
    .pipe(tap(_ => console.log(`fetched contact from id: ${id}`)))
    .toPromise();
  }

  

  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({ 'Contact-Type' : 'application/json' })
  }
}
