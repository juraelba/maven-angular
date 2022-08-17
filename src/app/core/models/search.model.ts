import { SearchEnum, SearchColumnsEnum } from '@enums/search.enum';
import { ListKey } from './list.model';

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
