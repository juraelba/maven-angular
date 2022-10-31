import { Column } from '@models/table.model';

export const CIRCULATION_CONFIG: Column[] = [
  {
    id: 'daysPublished',
    label: 'Days Published',
    width: 200,
  },

  {
    id: 'dailyCirculation',
    label: 'Daily Average',
    width: 200,
    valueClassName: ['px-11'],
  },

  {
    id: 'circulationSource',
    label: 'Circulation Source',
    width: 200,
  },

  // {
  //   id: ' circulationDate',
  //   label: 'Circulation Date',
  //   width: 200,
  // },

  // {
  //   id: 'sundayCirculation',
  //   label: 'Sunday Circulation',
  //   width: 200,
  // },
];
