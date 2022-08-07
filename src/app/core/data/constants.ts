import { SearchKey } from '@models/search.model';
import { Column, TableConfig } from '@models/table.model';

export const MAX_VALIDATION_TRIES = 3;
export const RECAPTCHA_KEY = '6LeuNgMTAAAAAMQ0zGESyK_KWbrf97s3vyVychg_';

const MEDIA_SEARCH_COLUMNS = [
  {
    id: 'name',
    label: 'Name',
    width: 200
  },
  {
    id: 'mavenid',
    label: 'MAVENID',
    width: 200
  },
  {
    id: 'subType',
    label: 'Sub-Type',
    width: 200
  },
  {
    id: 'market',
    label: 'Market',
    width: 200
  },
  {
    id: 'owner',
    label: 'Owner',
    width: 200
  },
  {
    id: 'parent',
    label: 'ParentOwner',
    width: 200
  },
  {
    id: 'slogan',
    label: 'Slogan',
    width: 200
  },
  {
    id: 'categories',
    label: 'Categories',
    width: 200
  },
  {
    id: 'website',
    label: 'Website',
    width: 200
  },
  {
    id: 'partners',
    label: 'Media Partner',
    width: 200
  },
  {
    id: 'fullPage',
    label: 'Full Page 4C',
    width: 200
  },
  {
    id: 'circulation',
    label: 'Circulation',
    width: 200
  },
];

const MEDIA_SEARCH_COLUMNS_CONFIG: TableConfig = {
  market: {
    cellStyles: {
      color: '#3A63CC'
    }
  },
  owner: {
    cellStyles: {
      color: '#3A63CC'
    }
  },
  parent: {
    cellStyles: {
      color: '#3A63CC'
    }
  }
}

export const SEARCH_COLUMNS: { [key in SearchKey]: Column[]} = {
  media: MEDIA_SEARCH_COLUMNS,
  'spot-tv': []
}

export const SEARCH_COLUMNS_CONFIG: any = {
  media: MEDIA_SEARCH_COLUMNS_CONFIG
}