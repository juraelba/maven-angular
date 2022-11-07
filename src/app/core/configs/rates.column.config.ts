import { Column } from '@models/table.model';

export const RATE_COLUMNS: Column[] = [
  {
    id: 'rateCardYear',
    label: 'Rate Year',
    width: 200,
  },

  // {
  //   id: 'ss',
  //   label: 'Full Page BW',
  //   width: 200,
  // },

  {
    id: 'dailyColorPremium',
    label: 'Color Premium',
    width: 200,
  },

  {
    id: 'fullPageSize',
    label: 'Full Page Size',
    width: 200,
  },

  {
    id: 'dailyInchRate',
    label: 'Daily Inch Rate',
    width: 200,
  },

  {
    id: 'sundayColorPremium',
    label: 'Sunday Color Premium',
    width: 200,
  },

  {
    id: 'sundayInchRate',
    label: 'Sunday Inch Rate',
    width: 200,
  },

  {
    id: 'columnCount',
    label: 'Columns',
    width: 200,
  },
];

export const MAGAZINE_RATES_COLUMNS: Column[] = [
  {
    id: 'rateCardYear',
    label: 'Rate Year',
    width: 200,
  },

  {
    id: 'fullPage4CCost',
    label: 'Full Page 4C',
    width: 200,
  },

  {
    id: 'fullPageBWCost',
    label: 'Full Page BW',
    width: 200,
  },
];
