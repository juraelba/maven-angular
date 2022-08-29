import { SelectOption } from './select.model';
import { ListKeys } from '@enums/lists.enum';


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
  options: SelectOption[],
  isCategories: boolean,
  isPrimaryCategory: boolean
}

export interface LanguageCriteria {
  isLanguage: boolean;
  options: SelectOption[]
}

export interface DiverseTargestCriteria {
  isDiverseTarget: boolean;
  options: SelectOption[];
}

export interface MarketCriteria {
  options: SelectOption[];
  market: ListKeys.dmas | ListKeys.msas;
}

export interface MatchedToCriteria {
  matched: boolean;
  matchedTo: string;
}

export interface Criteries {
  [key: string]: any
}
