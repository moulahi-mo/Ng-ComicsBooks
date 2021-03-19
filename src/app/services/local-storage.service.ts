import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setItem(item: string, body: any) {
    localStorage.setItem(item, JSON.stringify(body));
  }

  public getItem(item: string) {
    if (localStorage.getItem(item)) {
      return JSON.parse(localStorage.getItem(item));
    } else {
      return [];
    }
  }

  public removeItem(item: string) {
    localStorage.removeItem(item);
  }

  public clearItems() {
    localStorage.clear();
  }
}
