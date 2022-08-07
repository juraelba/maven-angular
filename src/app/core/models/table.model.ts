
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