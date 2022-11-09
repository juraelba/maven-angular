import {
  SearchEnum,
  SearchColumnsIdEnum,
  SearchColumnsEnum,
  SearchFiedlsEnum,
} from '@enums/search.enum';
import { SearchQuery } from '@models/search.model';
import { TableColumnsConfig } from '@models/table.model';

const NETWORK_COLUMNS = [
  { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
  { id: SearchColumnsIdEnum.networks, label: SearchColumnsEnum.networks },
  { id: SearchColumnsIdEnum.subType, label: SearchColumnsEnum.subType },
  { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
  { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
  { id: SearchColumnsIdEnum.slogan, label: SearchColumnsEnum.slogan },
  { id: SearchColumnsIdEnum.categories, label: SearchColumnsEnum.categories },
  { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
  { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners },
];

const DEFAULT_COLUMNS = [
  { id: SearchColumnsIdEnum.name, label: SearchColumnsEnum.name },
  { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
  { id: SearchColumnsIdEnum.subType, label: SearchColumnsEnum.subType },
  { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
  { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
  { id: SearchColumnsIdEnum.slogan, label: SearchColumnsEnum.slogan },
  { id: SearchColumnsIdEnum.categories, label: SearchColumnsEnum.categories },
  { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
  { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners },
];

export const TABLE_COLUMNS: TableColumnsConfig = {
  [SearchEnum.media]: [
    { id: SearchColumnsIdEnum.name, label: SearchColumnsEnum.name },
    { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
    { id: SearchColumnsIdEnum.type, label: SearchColumnsEnum.type },
    { id: SearchColumnsIdEnum.subType, label: SearchColumnsEnum.subType },
    { id: SearchColumnsIdEnum.market, label: SearchColumnsEnum.market },

    { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
    { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
    { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
    { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners },
    { id: SearchColumnsIdEnum.sort, label: SearchColumnsEnum.sort },

    {
      id: SearchColumnsIdEnum.commercial,
      label: SearchColumnsEnum.commercial,
      predicator: (searchCriteria: SearchQuery) =>
        Boolean(searchCriteria.criteria[SearchFiedlsEnum.nonComms]),
    },
  ],
  [SearchEnum['spot-tv']]: [
    { id: SearchColumnsIdEnum.name, label: SearchColumnsEnum.name },
    { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
    { id: SearchColumnsIdEnum.market, label: SearchColumnsEnum.market },
    { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
    { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
    { id: SearchColumnsIdEnum.networks, label: SearchColumnsEnum.networks },
    {
      id: SearchColumnsIdEnum.digitalChannel,
      label: SearchColumnsEnum.digitalChannel,
    },
    {
      id: SearchColumnsIdEnum.displayChannel,
      label: SearchColumnsEnum.displayChannel,
    },
    { id: SearchColumnsIdEnum.slogan, label: SearchColumnsEnum.slogan },
    { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
    { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners },
    {
      id: SearchColumnsIdEnum.commercial,
      label: SearchColumnsEnum.commercial,
      predicator: (searchCriteria: SearchQuery) =>
        Boolean(searchCriteria.criteria[SearchFiedlsEnum.nonComms]),
    },
  ],
  [SearchEnum['network-tv']]: NETWORK_COLUMNS,
  [SearchEnum['spot-radio']]: [
    { id: SearchColumnsIdEnum.name, label: SearchColumnsEnum.name },
    { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
    { id: SearchColumnsIdEnum.dma, label: SearchColumnsEnum.dma },
    { id: SearchColumnsIdEnum.msa, label: SearchColumnsEnum.msa },
    { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
    { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
    { id: SearchColumnsIdEnum.format, label: SearchColumnsEnum.format },
    { id: SearchColumnsIdEnum.frequency, label: SearchColumnsEnum.frequency },
    { id: SearchColumnsIdEnum.slogan, label: SearchColumnsEnum.slogan },
    { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
    { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners },
    {
      id: SearchColumnsIdEnum.commercial,
      label: SearchColumnsEnum.commercial,
      predicator: (searchCriteria: SearchQuery) =>
        Boolean(searchCriteria.criteria[SearchFiedlsEnum.nonComms]),
    },
  ],
  [SearchEnum['network-cable']]: NETWORK_COLUMNS,
  [SearchEnum['network-radio']]: NETWORK_COLUMNS,
  [SearchEnum.digital]: DEFAULT_COLUMNS,
  [SearchEnum.magazine]: [
    { id: SearchColumnsIdEnum.name, label: SearchColumnsEnum.name },
    { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
    { id: SearchColumnsIdEnum.type, label: SearchColumnsEnum.type },
    { id: SearchColumnsIdEnum.subType, label: SearchColumnsEnum.subType },
    { id: SearchColumnsIdEnum.market, label: SearchColumnsEnum.market },
    { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
    { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
    { id: SearchColumnsIdEnum.slogan, label: SearchColumnsEnum.slogan },
    { id: SearchColumnsIdEnum.categories, label: SearchColumnsEnum.categories },
    { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
    { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners },
    { id: SearchColumnsIdEnum.fullPage, label: SearchColumnsEnum.fullPage },
    {
      id: SearchColumnsIdEnum.circulation,
      label: SearchColumnsEnum.circulation,
    },
  ],
  [SearchEnum.newspaper]: [
    { id: SearchColumnsIdEnum.name, label: SearchColumnsEnum.name },
    { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
    { id: SearchColumnsIdEnum.type, label: SearchColumnsEnum.type },
    { id: SearchColumnsIdEnum.subType, label: SearchColumnsEnum.subType },
    { id: SearchColumnsIdEnum.market, label: SearchColumnsEnum.market },
    { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
    { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
    { id: SearchColumnsIdEnum.slogan, label: SearchColumnsEnum.slogan },
    { id: SearchColumnsIdEnum.categories, label: SearchColumnsEnum.categories },
    { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
    { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners },
    {
      id: SearchColumnsIdEnum.dailyFullPageRate,
      label: SearchColumnsEnum.dailyFullPageRate,
    },
    {
      id: SearchColumnsIdEnum.dailyCirculation,
      label: SearchColumnsEnum.dailyCirculation,
    },
  ],
  [SearchEnum.outdoor]: [
    { id: SearchColumnsIdEnum.name, label: SearchColumnsEnum.name },
    { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
    { id: SearchColumnsIdEnum.subType, label: SearchColumnsEnum.subType },
    { id: SearchColumnsIdEnum.market, label: SearchColumnsEnum.market },
    { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
    { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
    { id: SearchColumnsIdEnum.slogan, label: SearchColumnsEnum.slogan },
    { id: SearchColumnsIdEnum.categories, label: SearchColumnsEnum.categories },
    { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
  ],
  [SearchEnum.diverse]: DEFAULT_COLUMNS,
  [SearchEnum.callHistory]: [
    { id: SearchColumnsIdEnum.changeOn, label: SearchColumnsEnum.changeOn },
    { id: SearchColumnsIdEnum.changeFrom, label: SearchColumnsEnum.changeFrom },
    { id: SearchColumnsIdEnum.changeTo, label: SearchColumnsEnum.changeTo },
    { id: SearchColumnsIdEnum.change, label: SearchColumnsEnum.change },
  ],

  [SearchEnum['network-radio']]: [
    { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
    { id: SearchColumnsIdEnum.networks, label: SearchColumnsEnum.networks },
    { id: SearchColumnsIdEnum.subType, label: SearchColumnsEnum.subType },
    { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
    { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
    { id: SearchColumnsIdEnum.categories, label: SearchColumnsEnum.categories },
    { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
    { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners },
  ],
};

export const COLUMNS_TO_OMIT = [
  'marketID',
  'ownerID',
  'parentID',
  'partnerID',
  'subTypeID',
  'typeID',
];
