import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { List } from '../../models/list.model';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  fetchCategories(): Observable<List> {
    const url = environment.api + '/lists/categories/';

    return this.http.get<List>(url).pipe(
      tap((categories) => this.localStorage.set('categories', JSON.stringify(categories)))
    )
  }

  getCachedCategories(): List | [] {
    const categories = this.localStorage.get('categories');

    return categories ? JSON.parse(categories) : [];
  }

  getCategories(): Observable<List> {
    const cache = this.getCachedCategories();

    return cache.length
      ? of(cache)
      : this.fetchCategories()
  }
}
