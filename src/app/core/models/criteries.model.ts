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
