import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { compose, toPairs, reduce } from 'ramda';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { SearchKey, SearchResultItem } from '@models/search.model';
import { Table, Row } from '@models/table.model';
import { ListKeys } from '@enums/lists.enum';

import { SEARCH_COLUMNS } from '../../data/constants';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  createSearch(criterias: any, key: SearchKey): Observable<any> {
    const url = environment.api + '/search/' + key;

    const searchOptions = this.transformCriteriasToSearchOptions(criterias);

    return this.http.post(url, searchOptions)
  }

  executeSearch(id: number): Observable<any> {
    const url = `${ environment.api }/savedsearch/${ id }/run`;

    return this.http.get(url);
  }

  transformOptions(options: any): any {
    return options.map(({ id, value }: any) => ({ id, name: value }));
  }

  transformCategories(data: any): any {
    return this.transformOptions(data.options);
  }

  transformCriteriasToSearchOptions(criterias: any) {
    const trasformers: any = {
      [ListKeys.categories]: this.transformCategories.bind(this),
      default: this.transformOptions.bind(this)
    }

    return compose<any, any, any>(
      reduce<any, any>((acc, [ key, value ]: any) => {
        const transformer = trasformers[key] || trasformers.default;

        acc[key] = transformer(value);

        return acc;
      }, {}),
      toPairs
    )(criterias)
  }

  transformSearchResultToTableData(searchResult: SearchResultItem[], key: SearchKey): Table {
    const columns = SEARCH_COLUMNS[key] || [];

    const rows = searchResult.reduce<Row[]>((acc, cur) => {
      const row = {
        id: cur.mavenid,
        data: cur
      };

      acc.push(row);

      return acc;
    }, []);

    return {
      rows,
      columns
    }
  }
}
