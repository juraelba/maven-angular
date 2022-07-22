import { Injectable } from '@angular/core';
import { LocalStorage as IndexDBStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ListData, ListInfo } from '../../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private indexDBStorage: IndexDBStorage
  ) { }

  set(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  setUserEmail(email: string): void {
    this.set('email', email);
  }

  getUserEmail(): string {
    return this.get('email') || '';
  }

  getLists(): ListInfo[] {
    const lists = this.get('lists') || '[]';

    return JSON.parse(lists);
  }

  setLists(lists: ListInfo[]): void {
    this.set('lists', JSON.stringify(lists));
  }

  setListData(listOptions: ListData): Observable<boolean> {
    return this.indexDBStorage.setItem('listData', listOptions);
  }

  getListData(): Observable<ListData> {
    return this.indexDBStorage.getItem('listData')
      .pipe(
        map((options) => (options || {}) as ListData)
      );
  }

  getIndexDBEmail(): Observable<string> {
    return (this.indexDBStorage.getItem('email') || '') as Observable<string>;
  }

  setIndexDBEmail(email: string): Observable<boolean> {
    return this.indexDBStorage.setItem('email', email);
  }
}
