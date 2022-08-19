import { Injectable } from '@angular/core';
import { utils, writeFileXLSX } from "xlsx";

import { Column, Row } from '@models/table.model';

interface JSONSheetRow {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  private getColumnsLabels(columns: Column[]): string[] {
    return columns.map(({ label }) => label);
  }

  private transformRowsToJSONSheet(rows: Row[], columns: Column[]): JSONSheetRow[] {
    return rows.map(({ data }) => {
      const jsonSheetRowData = columns.reduce<JSONSheetRow>((acc, { id, label }) => {
        acc[label] = data[id];

        return acc;
      }, {});

      return jsonSheetRowData;
    });
  }

  exportSearchToExcel(rows: Row[], columns: Column[]): void {
    const header = this.getColumnsLabels(columns);
    const jsonSheetRows = this.transformRowsToJSONSheet(rows, columns);

    const ws = utils.json_to_sheet(jsonSheetRows, { header });
    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws, "Data");

    writeFileXLSX(wb, "search-export.xlsx");
  }
}
