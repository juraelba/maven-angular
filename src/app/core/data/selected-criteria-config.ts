import { SelectedCriteriaConfig } from '../models/criteries.model';
import { ListKeys } from '../enums/lists.enum';

export const selectedCriteriaConfig: SelectedCriteriaConfig = {
  [ListKeys.mediatypes2]: {
    bg: '#E4F2FF',
    color: '#4087F3',
    canDelete: true
  },
  [ListKeys.languages2]: {
    bg: '#FFFBD8',
    color: '#80761E',
    canDelete: true
  },
  [ListKeys.owners]: {
    bg: '#E8E9FB',
    color: '#4A5BD3',
    canDelete: true
  },
  [ListKeys.diversetargets]: {
    bg: '#DEF3EF',
    color: '#018C76',
    canDelete: true
  },
  [ListKeys.categories]: {
    bg: '#F6E4FF',
    color: '#931ACC',
    canDelete: true
  },
  [ListKeys.markets]: {
    bg: '#FFFBD8',
    color: '#80761E',
    canDelete: true
  },
  default: {
    bg: '#E4F2FF',
    color: '#4087F3',
    canDelete: true
  }
}