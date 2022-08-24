import { SearchEnum, SearchColumnsEnum, SearchActionTypesEnum } from '@enums/search.enum';

export interface MatchedToSearchField {
  matched: boolean;
  matchedTo: string;
}

export type SearchKey = keyof typeof SearchEnum;

export type SearchColumnsKey = keyof typeof SearchColumnsEnum;

export type SearchResultItem = {
  [key in SearchColumnsKey]: string | number | null;
}

export interface SearchFiledChangeEvent {
  key: string;
  data: any
}

export type SearchActionTypes = keyof typeof SearchActionTypesEnum;

export interface SearchAction {
  action: SearchActionTypes,
  payload?: any
}
