import { SearchEnum } from '@enums/search.enum';

export type SearchKey = keyof typeof SearchEnum;

export interface SearchResultItem {
  mavenid: string;
  [key: string]: string | number | null;
}
