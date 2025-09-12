import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  tabIndex: number = 0;

  setTab(index: number) {
    this.tabIndex = index;
  }

  getTab() {
    return this.tabIndex;
  }
}
