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

  // filterDataBasedOnColumnAutoFilters(rows: Row[], filters: any): any {
  //   const filterPairs = toPairs(filters);

  //   const a: any = [
  //       "mavenid",
  //       [
  //           {
  //               "id": "1660314674820",
  //               "textFilterType": "startsWith",
  //               "textFilterLabel": "Starts With",
  //               "value": "С",
  //               "operator": "AND"
  //           },
  //           {
  //               "id": "1660314680359",
  //               "textFilterType": "endsWith",
  //               "textFilterLabel": "Ends With",
  //               "value": "156",
  //               "operator": "AND"
  //           }
  //       ]
  //   ];

  //   const ANDFilters = filters.map(([ key, value ]: any) => {
  //     const filteredValue = value.filter(({ operator }: any) => operator === 'AND');

  //     return [ key, filteredValue ];
  //   });

  //   const ORFilters = filters.map(([ key, value ]: any) => {
  //     const filteredValue = value.filter(({ operator }: any) => operator === 'OR');

  //     return [ key, filteredValue ];
  //   });

  //   const filtered = rows.filter((row) => {
  //     const isValid = filterPairs.every(([ key, value ]) => {
  //       const cellValue = row.data[key];

  //       const isANDValid = value.every(({ textFilterType, value }) => {
  //         if(validate) {

  //         }
  //       });

  //       const isORValid = value.some(({ textFilterType, value }) => {
  //         if(validate) {

  //         }
  //       });

  //       return isANDValid && isORValid;
  //     });

  //     return isValid;
  //   });

  //   console.log(filtered);

  //   return filtered;
  // } 
}
