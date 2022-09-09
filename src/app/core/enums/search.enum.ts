import { ListKeys, ListLabels } from '@enums/lists.enum';

export enum SearchEnum {
  media = 'media',
  'spot-tv' = 'spot-tv',
  'network-tv' = 'network-tv',
  'spot-radio-search' = 'spot-radio-search',
  'network-cable' = 'network-cable'
}

export const SearchFiedlsEnum = {
  ...ListKeys,
  metric: 'metric',
  matchedTo: 'matchedTo',
  slogan: 'slogan',
  name: 'name',
  nonComms: 'nonComms'
};

export const SearchFieldsLabelsEnum = {
  ...ListLabels,
  matchedTo: 'Matched in my database',
  name: 'Search by name or ID'
}

export enum SearchColumnsEnum {
  name = 'Station',
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
  circulation = 'Circulation',
  networks = 'Networks',
  commercial = 'Commercial',
  digitalChannel = 'Digital Channel',
  displayChannel = 'Display Channel',
  parent = 'Parent'
}

export enum SearchColumnsIdEnum {
  name = 'name',
  mavenid = 'mavenid',
  subType = 'subType',
  market = 'market',
  owner = 'owner',
  partner = 'partner',
  slogan = 'slogan',
  categories = 'categories',
  website = 'website',
  partners = 'partners',
  fullPage = 'fullPage',
  circulation = 'circulation',
  networks = 'networks',
  commercial = 'commercial',
  digitalChannel = 'digitalChannel',
  displayChannel = 'displayChannel',
  parent = 'parent'
}

export enum SearchActionTypesEnum {
  NEW_SEARCH = 'NEW_SEARCH'
}

export enum SearchExcelFileNamesEnum {
  media = 'Media-Search.xlsx',
  'spot-tv' = 'Spot-TV-Search.xlsx',
  'network-tv' = 'Broadcast-Networks.xlsx',
  'spot-radio-search' = 'Spot-Radio-Search.xlsx',
  'network-cable' = 'Cable-Networks-Search.xlsx',
}
