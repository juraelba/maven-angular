import { SelectedCriteriaConfig } from '../models/criteries.model';
import { ListKeys } from '../enums/lists.enum';

export const selectedCriteriaConfig: SelectedCriteriaConfig = {
  [ListKeys.MEDIATYPES2]: {
    bg: '#E4F2FF',
    color: '#4087F3',
    canDelete: true
  },
  DMA: {
    bg: '#FFFBD8',
    color: '#80761E',
    canDelete: true
  },
  [ListKeys.OWNERS]: {
    bg: '#E8E9FB',
    color: '#4A5BD3',
    canDelete: true
  },
  'Diverse Target': {
    bg: '#DEF3EF',
    color: '#018C76',
    canDelete: true
  },
  [ListKeys.CATEGORIES]: {
    bg: '#F6E4FF',
    color: '#931ACC',
    canDelete: true
  },
  default: {
    bg: '#E4F2FF',
    color: '#4087F3',
    canDelete: true
  }
}