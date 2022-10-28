import { Column } from '@models/table.model';

export const CIRCULATION_CONFIG: Column[] = [
  {
    id: ' circulationDate',
    label: 'Circulation Date',
    width: 200,
  },

  {
    id: 'circulationSource',
    label: 'Circulation Source',
    width: 200,
  },

  {
    id: 'dailyCirculation',
    label: 'Daily Circulation',
    width: 200,
  },

  {
    id: 'daysPublished',
    label: 'Days Published',
    width: 200,
  },

  {
    id: 'sundayCirculation',
    label: 'Sunday Circulation',
    width: 200,
  },
];
