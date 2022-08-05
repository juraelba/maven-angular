import { SearchKey } from '@models/search.model';
import { Column, TableConfig } from '@models/table.model';

export const MAX_VALIDATION_TRIES = 3;
export const RECAPTCHA_KEY = '6LeuNgMTAAAAAMQ0zGESyK_KWbrf97s3vyVychg_';

const MEDIA_SEARCH_COLUMNS = [
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'mavenid',
    label: 'MAVENID'
  },
  {
    id: 'subType',
    label: 'Sub-Type'
  },
  {
    id: 'market',
    label: 'Market'
  },
  {
    id: 'owner',
    label: 'Owner'
  },
  {
    id: 'parent',
    label: 'ParentOwner'
  },
  {
    id: 'slogan',
    label: 'Slogan'
  },
  {
    id: 'categories',
    label: 'Categories'
  },
  {
    id: 'website',
    label: 'Website'
  },
  {
    id: 'partners',
    label: 'Media Partner'
  },
  {
    id: 'fullPage',
    label: 'Full Page 4C'
  },
  {
    id: 'circulation',
    label: 'Circulation'
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