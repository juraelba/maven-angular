
import { TextFiltersValuesEnum, TextFiltersLabelsEnum, FilterOperatorEnum } from '../enums/filters.enum';

interface RowData {
  [key: string]: any;
}

export interface Row {
  id: string;
  data: RowData;
}

export interface Column {
  id: string;
  label: string;
  width: number;
}

export interface Table {
  rows: Row[];
  columns: Column[];
}

export interface Styles {
  [key: string]: string
}

interface ConfigDescription {
  cellStyles: Styles
}

export interface TableConfig {
  [key: string]: ConfigDescription
}

export type FilterOperatorKey = keyof typeof FilterOperatorEnum;

export interface Filter {
  id: string;
  textFilterType: TextFilterKey | '';
  textFilterLabel: TextFiltersLabelsEnum | '';
  value: string;
  operator: FilterOperatorKey;
}

export type TextFilterKey = keyof typeof TextFiltersValuesEnum | '';

export interface TextFilter {
  id: TextFilterKey;
  label: TextFiltersLabelsEnum;
  value: TextFilterKey;
  iconName: string;
}

export interface ColumnAutoFilterValue {
  column: Column;
  filters: Filter[];
}

export interface ColumnAutoFilterData {
  [key: string]: ColumnAutoFilterValue;
}