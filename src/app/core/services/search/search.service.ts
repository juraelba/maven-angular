import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { compose, toPairs, reduce, always, isEmpty, omit, is } from 'ramda';
import { Observable, Subject } from 'rxjs';

import { environment } from '@environments/environment';

import {
  SearchKey,
  SearchColumnsKey,
  SearchAction,
  CreateSearchResponse,
  SearchResponse,
  SearchQuery,
  SearchOption
} from '@models/search.model';
import { Table, Row, TextFilterKey, Filter, FilterOperatorKey, ColumnAutoFilterData, ColumnAutoFilterValue, Column } from '@models/table.model';
import { SelectOption } from '@models/select.model';
import { MarketCriteria, MatchedToCriteria, Criteries } from '@models/criteries.model';

import { ListKeys } from '@enums/lists.enum';
import { TextFiltersValuesEnum, FilterOperatorEnum } from '@enums/filters.enum';
import { SearchFiedlsEnum, SearchColumnsEnum, SearchActionTypesEnum } from '@enums/search.enum';

import { COLUMNS_TO_OMIT } from '../../data/constants';

interface SelectedCheckboxes {
  [key: string]: boolean
}

interface SearchColumns {
  [key: string]: boolean
}

interface TransformedSearchData {
  searchOptions: SearchOption[] | string;
  columns?: { [key: string]: boolean };
  criteriaKey?: string;
}

type ComplexDataStructure = { options: SelectOption[] } & { [key: string]: boolean };

interface Transformers {
  [key: string]: (value: any) => TransformedSearchData
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subject$ = new Subject<SearchAction>();

  searchBarEvents$ = this.subject$.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  newSearch(): void {
    this.subject$.next({ action: SearchActionTypesEnum.NEW_SEARCH });
  }

  createSearch(criterias: Criteries, key: SearchKey): Observable<CreateSearchResponse> {
    const url = environment.api + '/search/' + key;

    console.log(criterias, 'criterias');

    const { columns, criteria } = this.transformCriteriasToSearchOptions(criterias);

    const body = {
      id: 0,
      columns,
      criteria
    }

    return this.http.post<CreateSearchResponse>(url, body)
  }

  executeSearch(id: number): Observable<SearchResponse> {
    const url = `${ environment.api }/savedsearch/${ id }/run`;

    return this.http.get<SearchResponse>(url);
  }

  getColumnByKey(key: string): string {
    const mapper: { [key: string]: string } = {
      isLanguage: 'language',
      isCategories: 'categories',
      isDiverseTarget: 'diverseTarget',
      isPrimaryCategory: 'primaryCategory',
      slogan: 'slogan',
      metric: 'metric'
    }

    return mapper[key] || '';
  }

  transformToColumns(selectedCheckboxes: SelectedCheckboxes): SearchColumns {
    return compose<[SelectedCheckboxes], [ string, boolean ][], SearchColumns>(
      reduce<[ string, boolean ], SearchColumns>((acc, [ key, value ]) => {
        const columnKey = this.getColumnByKey(key);

        acc[columnKey] = value;

        return acc;
      }, {}),
      toPairs
    )(selectedCheckboxes);
  }

  transformOptions(options: SelectOption[]): { searchOptions: SearchOption[] } {
    const searchOptions = options.map(({ id, value }) => ({ id, name: value }));

    return { searchOptions };
  }

  transformComplexData({ options, ...rest }: ComplexDataStructure): TransformedSearchData {
    const { searchOptions } = this.transformOptions(options);
    const columns = this.transformToColumns(rest);

    return { searchOptions, columns };
  }

  transformDiverseTargets(criteriaData: ComplexDataStructure): TransformedSearchData { 
    const { searchOptions, columns } = this.transformComplexData(criteriaData);

    return { searchOptions, columns, criteriaKey: 'diverseTargets' };
  }

  transformDefaultData(options: SelectOption[]): TransformedSearchData {
    const { searchOptions } = this.transformOptions(options);

    return { searchOptions, columns: {} };
  }

  transformMarketsData({ options, market }: MarketCriteria): TransformedSearchData {
    const { searchOptions } = this.transformOptions(options);

    return { searchOptions, columns: {}, criteriaKey: market };
  }

  transformMatchedToData({ matchedTo, matched }: MatchedToCriteria): TransformedSearchData {
    return { searchOptions: matchedTo, columns: { matched } };
  }

  booleanCriteriaToData(key: string, value: boolean): TransformedSearchData {
    return { searchOptions: '', columns: { [key]: value } };
  }

  transformSearchNameToData(value: string): TransformedSearchData {
    return { searchOptions: value, columns: {} };
  }

  transformLanguagesData(criteriaData: ComplexDataStructure): TransformedSearchData {
    const { searchOptions, columns } = this.transformComplexData(criteriaData);

    return { searchOptions, columns, criteriaKey: ListKeys.languages };
  }

  transformMediatypesData(criteriaData: SelectOption[]): TransformedSearchData {
    const { searchOptions } = this.transformOptions(criteriaData);

    return { searchOptions, columns: {}, criteriaKey: ListKeys.types };
  }

  transformCriteriasToSearchOptions(criterias: Criteries): SearchQuery {
    const trasformers: Transformers = {
      [ListKeys.categories]: this.transformComplexData.bind(this),
      [ListKeys.languages2]: this.transformLanguagesData.bind(this),
      [ListKeys.diversetargets]: this.transformDiverseTargets.bind(this),
      [ListKeys.markets]: this.transformMarketsData.bind(this),
      [SearchFiedlsEnum.matchedTo]: this.transformMatchedToData,
      [SearchFiedlsEnum.metric]: this.booleanCriteriaToData.bind(this, SearchFiedlsEnum.metric),
      [SearchFiedlsEnum.slogan]: this.booleanCriteriaToData.bind(this, SearchFiedlsEnum.slogan),
      [SearchFiedlsEnum.name]: this.transformSearchNameToData,
      [ListKeys.mediatypes2]: this.transformMediatypesData.bind(this),
      default: this.transformOptions
    }

    return compose<[Criteries], [string, Criteries][], SearchQuery>(
      reduce<[string, Criteries], SearchQuery>((acc, [ key, value ]) => {
        const transformer = trasformers[key] || trasformers.default;

        const { columns, searchOptions, criteriaKey } = transformer(value);

        if(searchOptions) {
          acc.criteria[criteriaKey || key] = searchOptions;
        }
        

        acc.columns = {
          ...acc.columns,
          ...columns
        };

        return acc;
      }, { columns: {}, criteria: {} }),
      toPairs
    )(criterias)
  }

  getColumnsFromSearchResult(searchResult: SearchResponse): Column[] {
    const omitedColumns = omit(COLUMNS_TO_OMIT, searchResult[0]);
    const columnIds = Object.keys(omitedColumns) as SearchColumnsKey[];

    return columnIds.map((columnId) => ({
        id: columnId,
        label: SearchColumnsEnum[columnId] || columnId,
        width: 200
      }));
  }

  transformSearchResultToTableData(searchResult: SearchResponse, key: SearchKey): Table {
    const columns = this.getColumnsFromSearchResult(searchResult);

    const rows = searchResult.reduce<Row[]>((acc, cur) => {
      const row = {
        id: cur.mavenid as string,
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

  isValueContain(value: unknown, target: string): boolean {
    return is(String, value) ? value.includes(target) : false;
  }

  isValueNotContain(value: unknown, target: string): boolean {
    return is(String, value) ? !value.includes(target) : false;
  }

  isValueStartsWith(value: unknown, target: string): boolean {
    return is(String, value) ? value.startsWith(target) : false;
  }

  isValueEndsWith(value: unknown, target: string): boolean {
    return is(String, value) ? value.endsWith(target) : false;
  }

  isValueEquals(value: unknown, target: string): boolean {
    return value === target;
  }
  
  isValueNotEqual(value: unknown, target: string): boolean {
    return value !== target;
  }

  isValueEmpty(value: unknown): boolean {
    return isEmpty(value);
  }

  isValueNotEmpty(value: unknown): boolean {
    return !isEmpty(value);
  }

  isValueNull(value: unknown): boolean {
    return value === null;
  }

  isValueNotNull(value: unknown): boolean {
    return value !== null;
  }

  validate(textFilterType: TextFilterKey, filterValue: string, cellValue: unknown) {
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

  validateCell(filterOperator: FilterOperatorKey, filters: Filter[], cellValue: unknown): boolean {
    const method = filterOperator === FilterOperatorEnum.AND ? 'every' : 'some';

    return filters.length 
      ? filters[method](({ textFilterType, value }) => this.validate(textFilterType, value, cellValue))
      : true;
  }

  filterDataBasedOnColumnAutoFilters(rows: Row[], filters: { [key: string]: Filter[] }): Row[] {
    return rows.filter((row) => {
      const pair = toPairs(row.data);

      const isValidRowData = pair.every(([key, cellValue]) => {
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
