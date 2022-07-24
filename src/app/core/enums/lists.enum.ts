export enum ListLabels {
  owners = 'Owners',
  mediatypes2 = 'Media Type',
  categories = 'Categories',
  diversetargets = 'Diverse Target',
  languages2 = 'Language'
};

export enum ListKeys {
  OWNERS = 'owners',
  MEDIATYPES2 = 'mediatypes2',
  CATEGORIES = 'categories',
  DIVERSETARGETS = 'diversetargets',
  LANGUAGES2 = 'languages2'
}

export enum ListUrls {
  categories = '/lists/categories/',
  mediatypes2 = '/lists/mediatypes2/',
  owners = '/lists/owners/',
  diversetargets = '/lists/diversetargets/',
  languages2 = '/lists/languages2/'
}

export type ListKey = keyof typeof ListUrls;
