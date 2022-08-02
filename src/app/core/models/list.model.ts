
import { ListKeys, ListUrls } from '../enums/lists.enum';
import { SelectOption } from './select.model';

interface ListItem {
  id: string;
  name: string;
};

export interface ListInfo {
  key: string;
  modifiedDate: string;
  route: string;
}

export type List = ListItem[];

export interface ListData {
  [key: string]: List
}

export type ListKey = keyof typeof ListKeys;

export type ListUrlsKey = keyof typeof ListUrls;

export interface ListChangesEvent {
  key: ListKey;
  data: any
}

type SectionKey = ListKeys.dmas | ListKeys.msas;

export interface MarketData {
  options: SelectOption[];
  market: SectionKey;
}

export type Ranges = [ string, number, number ];