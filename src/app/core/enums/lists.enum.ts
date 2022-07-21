export enum ListLabels {
  owners = 'Owners',
  mediatypes2 = 'Media Type',
  categories = 'Categories'
};

export enum ListKeys {
  OWNERS = 'owners',
  MEDIATYPES2 = 'mediatypes2',
  CATEGORIES = 'categories'
}

export enum ListUrls {
  categories = '/lists/categories/',
  mediatypes2 = '/lists/mediatypes2/',
  owners = '/lists/owners/'
}

export type ListKey = keyof typeof ListUrls;
