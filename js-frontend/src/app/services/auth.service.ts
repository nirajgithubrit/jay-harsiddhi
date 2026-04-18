import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _http = inject(HttpClient);

  constructor() { }

  register(userData: User) {
    return this._http.post(environment.apiUrl + '/auth/register', userData);
  }

  login(userData: User) {
    return this._http.post(environment.apiUrl + '/auth/login', userData);
  }

  get isLoggedIn() {
    let token = localStorage.getItem('accessToken');
    if (token) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;

    const user = JSON.parse(userStr);
    return user?.isAdmin || false;
  }

  isSalesPerson(): boolean {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;

    const user = JSON.parse(userStr);
    return user?.isSalesPerson || false;
  }

  userName(): string {
    const userStr = localStorage.getItem('user');
    if (!userStr) return '';

    const user = JSON.parse(userStr);
    return user?.name || '';
  }

  logout() {
    localStorage.clear()
  }
}
