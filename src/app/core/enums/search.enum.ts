import { ListKeys } from '@enums/lists.enum';

export enum SearchEnum {
  media = 'media',
  'spot-tv' = 'spot-tv'
}

export const SearchFiedlsEnum = {
  ...ListKeys,
  metric: 'metric',
  matchedTo: 'matchedTo',
  slogan: 'slogan',
  name: 'name'
};

export enum SearchColumnsEnum {
  name = 'Name',
  mavenid = 'MAVENID',
  subType = 'Sub-Type',
  market = 'Market',
  owner = 'Owner',
  partner = 'Partner Owner',
  slogan = 'Slogan',
  categories = 'Categories',
  website = 'Website',
  partners = 'Media Partner',
  fullPage = 'Full Page 4C',
  circulation = 'Circulation'
}

export enum SearchActionTypesEnum {
  NEW_SEARCH = 'NEW_SEARCH'
}
