import { Injectable } from '@angular/core';
import { LocalStorage as IndexDBStorage } from '@ngx-pwa/local-storage';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ListsData, ListInfo } from '../../models/list.model';

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

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setUserEmail(email: string): void {
    this.set('email', email);
  }

  getUserEmail(): string {
    return this.get('email') || '';
  }

  getListsInformation(): ListInfo[] {
    const listsInformation = this.get('listsInformation') || '[]';

    return JSON.parse(listsInformation);
  }

  storeListsInformation(listsInformation: ListInfo[]): void {
    this.set('listsInformation', JSON.stringify(listsInformation));
  }

  storeIndexDBListOptions(listOptions: ListsData): Observable<boolean> {
    return this.indexDBStorage.setItem('cachedOptions', listOptions);
  }

  getCachedOptionsFromIndexDB(): Observable<ListsData> {
    return this.indexDBStorage.getItem('cachedOptions')
      .pipe(
        map((options) => (options || {}) as ListsData)
      );
  }

  getIndexDBEmail(): Observable<string> {
    return (this.indexDBStorage.getItem('email') || '') as Observable<string>;
  }

  setIndexDBEmail(email: string): Observable<boolean> {
    return this.indexDBStorage.setItem('email', email);
  }
}
