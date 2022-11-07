import { Column } from '@models/table.model';

export const NEWSPAPER_CIRCULATION_CONFIG: Column[][] = [
  [
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
  ],

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

export const MAGAZINE_CIRCULATION_CONFIG: Column[][] = [
  [
    {
      id: 'paidCirculation',
      label: 'Paid',
      width: 200,
    },

    {
      id: 'nonPaidCirculation',
      label: 'Non Paid',
      width: 200,
    },

    {
      id: 'totalCirculation',
      label: 'Total',
      width: 200,
    },

    {
      id: 'circulationSource',
      label: 'Circulation Source',
      width: 200,
    },
  ],

  [
    {
      id: 'splitRuns',
      label: 'Split Runs',
      width: 200,
    },

    {
      id: 'geoRuns',
      label: 'Geo Runs',
      width: 200,
    },

    {
      id: 'issueCount',
      label: '# Issues',
      width: 200,
    },

    {
      id: 'trimSize',
      label: 'Trim Size',
      width: 200,
    },
  ],
];
