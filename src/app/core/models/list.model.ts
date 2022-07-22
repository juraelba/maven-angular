
import { ListUrls } from '../enums/lists.enum';

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

export type ListKey = keyof typeof ListUrls;

export interface ListChangesEvent {
  key: ListKey;
  data: any
}


