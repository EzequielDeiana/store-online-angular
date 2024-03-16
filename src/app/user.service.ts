import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://fakestoreapi.com/users/4'; // URL de ejemplo para obtener el usuario

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(this.apiUrl);
  }

  constructor(private http: HttpClient) { }
}
