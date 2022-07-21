import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { isEmpty } from 'ramda';

import { environment } from '../../../../environments/environment';
import { List, ListInfo, ListKey } from '../../models/list.model';
import { ListUrls, ListLabels } from '../../enums/lists.enum';
import { SelectOption } from '../../models/select.model';
import { LocalStorageService } from '../local-storage/local-storage.service';

interface ListOptionsFork {
  [key: string]: Observable<List>
}

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  fetchListData(key: ListKey): Observable<List> {
    const url = environment.api + ListUrls[key];

    return this.http.get<List>(url)
  }

  getCachedData(key: ListKey): Observable<List> {
    return this.localStorage.getCachedOptionsFromIndexDB()
      .pipe(
        map((list: any) => list[key] || [])
      );
  }

  getOptionsData(key: ListKey): Observable<SelectOption[]> {
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

  fetchListsInformation(): Observable<ListInfo[]> {
    const url = environment.api + '/lists';

    return this.http.get<ListInfo[]>(url);
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

  getListOptionsInfomationToFetch(listsInformation: ListInfo[], prevListsInformation: ListInfo[]): ListInfo[] {
    const prevListsInformationMap = prevListsInformation.reduce<{[key: string]: ListInfo}>((listsInfo, listInfo) => {
      listsInfo[listInfo.key] = listInfo;
  
      return listsInfo;
    }, {});
  
    return listsInformation.reduce<ListInfo[]>((acc, { key, modifiedDate, route }) => {
      const matchedListInfo = prevListsInformationMap[key] || { modifiedDate: '' };
      const isCurrentModifiedDateBigger = DateTime.fromISO(matchedListInfo.modifiedDate) < DateTime.fromISO(modifiedDate);
  
      if(isCurrentModifiedDateBigger) {
        acc.push({ key, route, modifiedDate });
      }

      return acc;
    }, [])
  }

  getBorderLabel(options: SelectOption[], key: ListKey): string {
    return options.length ? ListLabels[key] : '';
  }
}
