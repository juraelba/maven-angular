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
