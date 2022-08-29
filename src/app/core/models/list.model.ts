
import { ListKeys, ListUrls } from '../enums/lists.enum';
import { SelectOption } from './select.model';

interface ListItem {
  id: string;
  name: string;
};

export interface MediaTypeListItem {
  subType: string;
  subTypeID: number;
  type: string;
  typeID: number;
}

export interface ListInfo {
  key: string;
  modifiedDate: string;
  route: string;
}

export type List<T = ListItem[]> = T;

export interface ListData {
  [key: string]: List
}

export type ListKey = keyof typeof ListKeys;

export type ListUrlsKey = keyof typeof ListUrls;

export interface ListChangesEvent {
  key: ListKey;
  data: any
}

export type Ranges = [ string, number, number ];