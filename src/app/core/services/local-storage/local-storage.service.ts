import { Injectable } from '@angular/core';
import * as localforage from "localforage";
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { ListData, ListInfo } from '../../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

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

  setListData(listData: ListData): Observable<ListData> {
    return from(localforage.setItem('listData', listData))
  }

  getListData(): Observable<ListData> {
    return from(localforage.getItem<ListData>('listData'))
      .pipe(
        map((listData) => listData || {})
      );
  }

  getIndexDBEmail(): Observable<string> {
    return from(localforage.getItem<string>('email'))
      .pipe(
        map((value) => value || '')
      )
  }

  setIndexDBEmail(email: string): Observable<string> {
    return from(localforage.setItem<string>('email', email))
  }
}
