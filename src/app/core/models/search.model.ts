import { SearchEnum, SearchColumnsEnum, SearchActionTypesEnum, SearchFiedlsEnum, SearchColumnsIdEnum } from '@enums/search.enum';
import { Criteries } from './criteries.model';

export type SearchKey =  SearchEnum;

export type SearchFiledsKey = keyof typeof SearchFiedlsEnum;

export type SearchColumnsKey = keyof typeof SearchColumnsEnum;

export type SearchColumnsIdKey = keyof typeof SearchColumnsIdEnum;

export type SearchResultItem = {
  [key: string]: unknown;
}

export interface SearchFiledChangeEvent {
  key: keyof Criteries;
  data: any
}

export type SearchActionTypes = keyof typeof SearchActionTypesEnum;

export interface SearchAction {
  action: SearchActionTypes,
  payload?: any
}

export interface CreateSearchResponse {
  colSettings: null;
  created: null;
  filter: null;
  id: number;
  modified: null;
  name: null;
  params: string;
  sort: null;
  type: {
    id: string;
    name: string;
  };
};

export type SearchResponse = { [key: string]: unknown }[];

export interface SearchOption {
  id: string;
  name: string;
}

export interface SearchQuery {
  criteria: {
    [key: string]: SearchOption[] | string | boolean;
  },
  columns: {
    [key: string]: boolean;
  }
}
