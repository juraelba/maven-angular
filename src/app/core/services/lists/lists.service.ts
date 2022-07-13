import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { List } from '../../models/list.model';
import { SelectOption } from '../../models/select.model';
import { LocalStorageService } from '../local-storage/local-storage.service';

const listUrls: any = {
  'categories': '/lists/categories/',
  'mediaTypes': '/lists/mediatypes2/'
}

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  fetchListData(key: string): Observable<List> {
    const url = environment.api + listUrls[key];

    return this.http.get<List>(url).pipe(
      tap((categories) => this.localStorage.set(key, JSON.stringify(categories)))
    )
  }

  getCachedData(key: string): List | [] {
    const categories = this.localStorage.get(key);

    return categories ? JSON.parse(categories) : [];
  }

  getOptionsData(key: string): Observable<SelectOption[]> {
    const cachedData = this.getCachedData(key);

    const list$ = cachedData.length
      ? of(cachedData)
      : this.fetchListData(key)

    return list$.pipe(
      map((list: List) => this.transformListToOptions(list))
    )
  }

  transformListToOptions(list: List): SelectOption[] {
    return list.map(({ id, name }) => ({ id, label: name, value: name }))
  }
}
