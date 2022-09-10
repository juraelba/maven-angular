
import { SearchEnum, SearchColumnsIdEnum, SearchColumnsEnum, SearchFiedlsEnum } from '@enums/search.enum';
import { SearchQuery } from '@models/search.model';
import { TableColumnsConfig } from '@models/table.model';

const NETWORK_COLUMNS = [
  {
    id: SearchColumnsIdEnum.mavenid,
    label: SearchColumnsEnum[SearchColumnsIdEnum.mavenid]
  },
  {
    id: SearchColumnsIdEnum.networks,
    label: SearchColumnsEnum[SearchColumnsIdEnum.networks]
  },
  {
    id: SearchColumnsIdEnum.subType,
    label: SearchColumnsEnum[SearchColumnsIdEnum.subType]
  },
  {
    id: SearchColumnsIdEnum.owner,
    label: SearchColumnsEnum[SearchColumnsIdEnum.owner]
  },
  {
    id: SearchColumnsIdEnum.parent,
    label: SearchColumnsEnum[SearchColumnsIdEnum.parent]
  },
  {
    id: SearchColumnsIdEnum.slogan,
    label: SearchColumnsEnum[SearchColumnsIdEnum.slogan]
  },
  {
    id: SearchColumnsIdEnum.categories,
    label: SearchColumnsEnum[SearchColumnsIdEnum.categories]
  },
  {
    id: SearchColumnsIdEnum.website,
    label: SearchColumnsEnum[SearchColumnsIdEnum.website]
  },
  {
    id: SearchColumnsIdEnum.partners,
    label: SearchColumnsEnum[SearchColumnsIdEnum.partners]
  }
];

export const TABLE_COLUMNS: TableColumnsConfig = {
  [SearchEnum.media]: [],
  [SearchEnum['spot-tv']]: [
    {
      id: SearchColumnsIdEnum.mavenid,
      label: SearchColumnsEnum[SearchColumnsIdEnum.mavenid]
    },
    {
      id: SearchColumnsIdEnum.name,
      label: SearchColumnsEnum[SearchColumnsIdEnum.name]
    },
    {
      id: SearchColumnsIdEnum.market,
      label: SearchColumnsEnum[SearchColumnsIdEnum.market]
    },
    {
      id: SearchColumnsIdEnum.owner,
      label: SearchColumnsEnum[SearchColumnsIdEnum.owner]
    },
    {
      id: SearchColumnsIdEnum.parent,
      label: SearchColumnsEnum[SearchColumnsIdEnum.parent]
    },
    {
      id: SearchColumnsIdEnum.networks,
      label: SearchColumnsEnum[SearchColumnsIdEnum.networks]
    },
    {
      id: SearchColumnsIdEnum.digitalChannel,
      label: SearchColumnsEnum[SearchColumnsIdEnum.digitalChannel]
    },
    {
      id: SearchColumnsIdEnum.displayChannel,
      label: SearchColumnsEnum[SearchColumnsIdEnum.displayChannel]
    },
    {
      id: SearchColumnsIdEnum.slogan,
      label: SearchColumnsEnum[SearchColumnsIdEnum.slogan]
    },
    {
      id: SearchColumnsIdEnum.website,
      label: SearchColumnsEnum[SearchColumnsIdEnum.website]
    },
    {
      id: SearchColumnsIdEnum.partners,
      label: SearchColumnsEnum[SearchColumnsIdEnum.partners]
    },
    {
      id: SearchColumnsIdEnum.commercial,
      label: SearchColumnsEnum[SearchColumnsIdEnum.commercial],
      predicator: (searchCriteria: SearchQuery) => Boolean(searchCriteria.criteria[SearchFiedlsEnum.nonComms])
    }
  ],
  [SearchEnum['network-tv']]: NETWORK_COLUMNS,
  [SearchEnum['spot-radio-search']]: [],
  [SearchEnum['network-cable']]: NETWORK_COLUMNS,
  [SearchEnum['network-radio']]: NETWORK_COLUMNS,
};

export const COLUMNS_TO_OMIT = [ 'marketID', 'ownerID', 'parentID', 'partnerID', 'subTypeID', 'typeID' ];
