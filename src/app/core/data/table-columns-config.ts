
import { SearchEnum, SearchColumnsIdEnum, SearchColumnsEnum, SearchFiedlsEnum } from '@enums/search.enum';
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
  { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners }
];

const DEFAULT_COLUMNS = [
  { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
  { id: SearchColumnsIdEnum.name, label: SearchColumnsEnum.name },
  { id: SearchColumnsIdEnum.subType, label: SearchColumnsEnum.subType },
  { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
  { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
  { id: SearchColumnsIdEnum.slogan, label: SearchColumnsEnum.slogan },
  { id: SearchColumnsIdEnum.categories, label: SearchColumnsEnum.categories },
  { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
  { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners }
];

export const TABLE_COLUMNS: TableColumnsConfig = {
  [SearchEnum.media]: [],
  [SearchEnum['spot-tv']]: [
    { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
    { id: SearchColumnsIdEnum.name, label: SearchColumnsEnum.name },
    { id: SearchColumnsIdEnum.market, label: SearchColumnsEnum.market },
    { id: SearchColumnsIdEnum.owner, label: SearchColumnsEnum.owner },
    { id: SearchColumnsIdEnum.parent, label: SearchColumnsEnum.parent },
    { id: SearchColumnsIdEnum.networks, label: SearchColumnsEnum.networks },
    { id: SearchColumnsIdEnum.digitalChannel, label: SearchColumnsEnum.digitalChannel },
    { id: SearchColumnsIdEnum.displayChannel, label: SearchColumnsEnum.displayChannel },
    { id: SearchColumnsIdEnum.slogan, label: SearchColumnsEnum.slogan },
    { id: SearchColumnsIdEnum.website, label: SearchColumnsEnum.website },
    { id: SearchColumnsIdEnum.partners, label: SearchColumnsEnum.partners },
    {
      id: SearchColumnsIdEnum.commercial,
      label: SearchColumnsEnum.commercial,
      predicator: (searchCriteria: SearchQuery) => Boolean(searchCriteria.criteria[SearchFiedlsEnum.nonComms])
    }
  ],
  [SearchEnum['network-tv']]: NETWORK_COLUMNS,
  [SearchEnum['spot-radio']]: [
    { id: SearchColumnsIdEnum.mavenid, label: SearchColumnsEnum.mavenid },
    { id: SearchColumnsIdEnum.name, label: SearchColumnsEnum.name },
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
      predicator: (searchCriteria: SearchQuery) => Boolean(searchCriteria.criteria[SearchFiedlsEnum.nonComms])
    }
  ],
  [SearchEnum['network-cable']]: NETWORK_COLUMNS,
  [SearchEnum['network-radio']]: NETWORK_COLUMNS,
  [SearchEnum.digital]: DEFAULT_COLUMNS,
  [SearchEnum['magazine']]: [
    ...DEFAULT_COLUMNS,
    { id: SearchColumnsIdEnum.market, label: SearchColumnsEnum.market },
    { id: SearchColumnsIdEnum.fullPage, label: SearchColumnsEnum.fullPage },
    { id: SearchColumnsIdEnum.circulation, label: SearchColumnsEnum.circulation },
  ],
};

export const COLUMNS_TO_OMIT = [ 'marketID', 'ownerID', 'parentID', 'partnerID', 'subTypeID', 'typeID' ];