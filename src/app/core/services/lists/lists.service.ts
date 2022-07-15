import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DateTime } from 'luxon';

import { environment } from '../../../../environments/environment';
import { List, ListInfo } from '../../models/list.model';
import { SelectOption } from '../../models/select.model';
import { LocalStorageService } from '../local-storage/local-storage.service';

const listUrls: any = {
  'categories': '/lists/categories/',
  'mediatypes': '/lists/mediatypes2/'
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
      tap((categories) => this.cacheListsOptions(key, categories))
    )
  }

  getCachedListModifuedDate(key: string): DateTime | null {
    const listsCachingInformation: any = JSON.parse(this.localStorage.get('listsCachingInformation') || '[]');
    const cachedInfo = listsCachingInformation.find((cachedInfo: any) => cachedInfo.key === key) || {};

    return cachedInfo.modifiedDate
      ? DateTime.fromISO(cachedInfo.modifiedDate)
      : null;
  }

  getCachedData(key: string): List | [] {
    const initialCachingTime = DateTime.fromISO(this.localStorage.get('listsCachingTime') || '');
    const modifiedDate = this.getCachedListModifuedDate(key);

    if(modifiedDate && initialCachingTime > modifiedDate ) {
      const cachedOptions = this.localStorage.get('cachedOptions') || '{}';
      const categories: List = JSON.parse(cachedOptions)[key] || [];

      return categories;
    }
  
    return [];
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

  storeCachingInformation() {
    const url = environment.api + '/lists';

    return this.http.get<ListInfo[]>(url)
      .subscribe((cachingInfo: ListInfo[]) => {
        this.localStorage.set('listsCachingInformation', JSON.stringify(cachingInfo));
      });
  }

  cacheListsOptions(key: string, options: List): void {
    const cachedOptions = this.localStorage.get('cachedOptions') || '{}';
    const parsed = JSON.parse(cachedOptions);

    const updatedCache = {
      ...parsed,
      [key]: options
    };
  
    this.localStorage.set('cachedOptions', JSON.stringify(updatedCache))
  }

  clearListsCache(): void {
    this.localStorage.removeItem('listsCachingInformation');
    this.localStorage.removeItem('cachedOptions');
    this.localStorage.removeItem('listsCachingTime');
  }

  updateOptionsWithSelected(options: SelectOption[], selectedValues: string[]): SelectOption[] {
    return options.map((option) => ({
      ...option,
      selected: selectedValues.includes(option.value)
    }));
  }

  getOptionValues(options: SelectOption[]): string[] {
    return options.map(({ value }) => value);
  }

  getSelectedOptions(options: SelectOption[]): SelectOption[] {
    return options.filter(({ selected }) => selected);
  }
}
