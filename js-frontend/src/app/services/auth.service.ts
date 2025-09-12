import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _http = inject(HttpClient);

  constructor() {}

  register(userData: User) {
    return this._http.post(environment.apiUrl + '/auth/register', userData);
  }

  login(userData: User) {
    return this._http.post(environment.apiUrl + '/auth/login', userData);
  }

  get isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    return user.isAdmin || false;
  }
}
