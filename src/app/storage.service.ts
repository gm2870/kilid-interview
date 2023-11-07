import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  setItems(name: string, items: string) {
    localStorage.setItem(name, items);
  }
  getItems(name: string) {
    const item = localStorage.getItem(name);
    if (!item) return [];
    return JSON.parse(item);
  }
}
