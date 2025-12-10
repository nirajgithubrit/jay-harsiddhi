import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _http: HttpClient) { }

  tabIndex: number = 0;

  setTab(index: number) {
    this.tabIndex = index;
  }

  getTab() {
    return this.tabIndex;
  }

  // Brands

  addItem(routeName: string, item: any) {
    return this._http.post(environment.apiUrl + '/' + routeName, item)
  }

  getAllItem(routeName: string) {
    return this._http.get(environment.apiUrl + '/' + routeName)
  }

  getItemById(routeName: string, id: string) {
    return this._http.get(environment.apiUrl + '/' + routeName + '/' + id)
  }

  updateItem(routeName: string, id: string, item: any) {
    return this._http.put(environment.apiUrl + '/' + routeName + '/' + id, item)
  }

  deleteItem(routeName: string, id: string) {
    return this._http.delete(environment.apiUrl + '/' + routeName + '/' + id)
  }
}
