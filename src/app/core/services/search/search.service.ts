import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { compose, toPairs, reduce, always, isEmpty } from 'ramda';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { SearchKey, SearchResultItem } from '@models/search.model';
import { Table, Row, TextFilterKey, Filter, FilterOperatorKey, ColumnAutoFilterData, ColumnAutoFilterValue } from '@models/table.model';

import { ListKeys } from '@enums/lists.enum';
import { TextFiltersValuesEnum, FilterOperatorEnum } from '@enums/filters.enum';

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

  isValueContain(value: any, target: string): boolean {
    return value.includes(target);
  }

  isValueNotContain(value: string, target: string): boolean {
    return !value.includes(target);
  }

  isValueStartsWith(value: string, target: string): boolean {
    return value.startsWith(target);
  }

  isValueEndsWith(value: string, target: string): boolean {
    return value.endsWith(target);
  }

  isValueEquals(value: string, target: string): boolean {
    return value === target;
  }
  
  isValueNotEqual(value: any, target: string): boolean {
    return value !== target;
  }

  isValueEmpty(value: string): boolean {
    return isEmpty(value);
  }

  isValueNotEmpty(value: string): boolean {
    return !isEmpty(value);
  }

  isValueNull(value: any): boolean {
    return value === null;
  }

  isValueNotNull(value: any): boolean {
    return value !== null;
  }

  validate(textFilterType: TextFilterKey, filterValue: string, cellValue: any) {
    const validators = {
      [TextFiltersValuesEnum.contain]: this.isValueContain.bind(this),
      [TextFiltersValuesEnum.notContain]: this.isValueNotContain.bind(this),
      [TextFiltersValuesEnum.startsWith]: this.isValueStartsWith.bind(this),
      [TextFiltersValuesEnum.endsWith]: this.isValueEndsWith.bind(this),
      [TextFiltersValuesEnum.equals]: this.isValueEquals.bind(this),
      [TextFiltersValuesEnum.notEqual]: this.isValueNotEqual.bind(this),
      [TextFiltersValuesEnum.empty]: this.isValueEmpty.bind(this),
      [TextFiltersValuesEnum.notEmpty]: this.isValueNotEmpty.bind(this),
      [TextFiltersValuesEnum.null]: this.isValueNull.bind(this),
      [TextFiltersValuesEnum.notNull]: this.isValueNotNull.bind(this),
      '': always(true)
    }

    const validator = validators[textFilterType];

    return validator(cellValue, filterValue);
  }

  getFilterByOperator(filters: Filter[], operator: FilterOperatorKey): Filter[] {
    return filters.filter((filter) => filter.operator === operator);
  }

  validateCell(filterOperator: FilterOperatorKey, filters: Filter[], cellValue: any): boolean {
    const method = filterOperator === FilterOperatorEnum.AND ? 'every' : 'some';

    return filters.length 
      ? filters[method](({ textFilterType, value }) => this.validate(textFilterType, value, cellValue))
      : true;
  }

  filterDataBasedOnColumnAutoFilters(rows: Row[], filters: { [key: string]: Filter[] }): Row[] {
    return rows.filter((row) => {
      const pair = toPairs(row.data);

      const isValidRowData = pair.every(([key, cellValue]: any) => {
        const cellFilters = filters[key] || [];

        const cellANDFilters = this.getFilterByOperator(cellFilters, FilterOperatorEnum.AND);
        const cellORFilters = this.getFilterByOperator(cellFilters, FilterOperatorEnum.OR);

        const isANDValid = this.validateCell(FilterOperatorEnum.AND, cellANDFilters, cellValue);
        const isORValid = this.validateCell(FilterOperatorEnum.OR, cellORFilters, cellValue);

        if(cellANDFilters.length && !cellORFilters.length) {
          return isANDValid;
        }
    
        if(cellORFilters.length && !cellANDFilters.length) {
          return isORValid;
        }
    
        return isANDValid || isORValid;
      });

      return isValidRowData;
    });
  }

  mapFilters(filters: ColumnAutoFilterData): { [key: string]: Filter[] } {
    return compose<[ColumnAutoFilterData], [string, ColumnAutoFilterValue][], { [key: string]: Filter[] }>(
      reduce<[string, ColumnAutoFilterValue], { [key: string]: Filter[] }>((acc, [ key, value ]) => {
        acc[key] = value.filters;

        return acc;
      }, {}),
      toPairs
    )(filters);
  }
}
