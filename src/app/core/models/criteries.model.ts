import { SelectOption } from './select.model';

export interface Criteries {
  [key: string]: any;
}

export interface SelectedCriteriaEventData {
  key: string;
  option: SelectOption;
}

export interface SelectedCriteriaEvent {
  action: string;
  data: any
}

export interface CriteriesChangesEvent {
  key: string;
  data: any
}

export interface SelectedCriteriaConfig {
  [key: string]: {
    bg: string;
    color: string;
    canDelete: boolean
  }
}

export interface CategoriesCriteria {
  categories: SelectOption[],
  isCategories: boolean,
  isPrimaryCategory: boolean
}