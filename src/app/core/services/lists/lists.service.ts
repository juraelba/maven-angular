import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { compose, toPairs, reduce, isEmpty } from 'ramda';

import { environment } from '../../../../environments/environment';
import { List, ListInfo } from '../../models/list.model';
import { SelectOption } from '../../models/select.model';
import { LocalStorageService } from '../local-storage/local-storage.service';

interface ListOptionsFork {
  [key: string]: Observable<List>
}

const listUrls: any = {
  'categories': '/lists/categories/',
  'mediatypes2': '/lists/mediatypes2/'
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

    return this.http.get<List>(url)
  }

  getCachedData(key: string): Observable<List> {
    return this.localStorage.getCachedOptionsFromIndexDB()
      .pipe(
        map((list: any) => list[key] || [])
      );
  }

  getOptionsData(key: string): Observable<SelectOption[]> {
    return this.getCachedData(key)
      .pipe(
        switchMap((cachedOptions: List) => {
          const list$ = isEmpty(cachedOptions)
            ? this.fetchListData(key)
            : of(cachedOptions)

          return list$.pipe(
            map((list: List) => this.transformListToOptions(list))
          )
        })
      )
  }

  transformListToOptions(list: List): SelectOption[] {
    return list.map(({ id, name }) => ({ id, label: name, value: name }))
  }

  fetchListsCachingInformation(): Observable<ListInfo[]> {
    const url = environment.api + '/lists';

    return this.http.get<ListInfo[]>(url);
  }

  clearListsCache(): void {
    this.localStorage.removeItem('listsCachingInformation');
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

  fetchListOptions(listsInformation: ListInfo[]): Observable<{ [key: string]: List }> {
    const data = listsInformation.reduce((acc: ListOptionsFork, { key, route }: ListInfo) => {
      const url = `${ environment.api }/${ route }`;

      acc[key] = this.http.get<List>(url);

      return acc;
    }, {});

    return forkJoin(data);
  }

  getListOptionsInfomationToFetch(listsInformation: ListInfo[], cachingTime: DateTime): ListInfo[] {
    return listsInformation.reduce<ListInfo[]>((acc, { key, modifiedDate, route }: ListInfo) => {
      const isoModifiedDate = DateTime.fromISO(modifiedDate);

      if(isoModifiedDate && cachingTime && cachingTime > isoModifiedDate ) {
        return acc;
      }

      acc.push({ key, route, modifiedDate });

      return acc;
    }, [])
  }
}
