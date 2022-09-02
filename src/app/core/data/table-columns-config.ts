
import { SearchEnum, SearchColumnsIdEnum, SearchColumnsEnum, SearchFiedlsEnum } from '@enums/search.enum';
import { SearchQuery } from '@models/search.model';
import { TableColumnsConfig } from '@models/table.model';

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
  [SearchEnum['broadcast-networks']]: [],
};

export const COLUMNS_TO_OMIT = [ 'marketID', 'ownerID', 'parentID', 'partnerID', 'subTypeID', 'typeID' ];
