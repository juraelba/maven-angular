import { Column } from '@models/table.model';

export const STATION_COLUMNS: Column[] = [
  {
    id: 'mavenid',
    label: 'ID',
    width: 200,
  },
  {
    id: 'name',
    label: 'Name',
    width: 200,
    color: 'text-dark-blue',
  },
  {
    id: 'market',
    label: 'Market',
    width: 200,
  },
  {
    id: 'digitalChannel',
    label: 'Digital Channel',
    width: 200,
  },
  {
    id: 'displayChannel',
    label: 'Display Channel',
    width: 200,
  },
  // {
  //   id: 'marketID',
  //   label: 'Market ID',
  //   width: 200,
  // },
  // {
  //   id: 'rank',
  //   label: 'Rank',
  //   width: 200,
  // },
];
