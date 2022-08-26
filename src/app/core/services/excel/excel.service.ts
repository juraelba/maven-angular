import { Injectable } from '@angular/core';
import { utils, writeFileXLSX, ColInfo } from "xlsx";
import { isNil } from 'ramda';

import { Column, Row } from '@models/table.model';

interface JSONSheetRow {
  [key: string]: string | number;
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

  private getWorkSheetColumnsWidths(header: string[], rows: JSONSheetRow[]): ColInfo[] {
    const columnsLengths = header.reduce<{ [key: string]: number }>((acc, columnLabel) => {
      const group = rows.map((row) => {
        const value = isNil(row[columnLabel]) ? '' :  row[columnLabel].toString();

        return value.length;
      });

      const maxLengthInsideGroup = Math.max(...group, columnLabel.length);

      acc[columnLabel] = maxLengthInsideGroup;
  
      return acc;
    }, {});

    return header.map((columnLabel) => ({ wch: columnsLengths[columnLabel] + 1 }));
  }

  exportSearchToExcel(rows: Row[], columns: Column[], fileName: string): void {
    const header = this.getColumnsLabels(columns);
    const jsonSheetRows = this.transformRowsToJSONSheet(rows, columns);

    const ws = utils.json_to_sheet(jsonSheetRows, { header });
    const columnsInfo = this.getWorkSheetColumnsWidths(header, jsonSheetRows);

    ws['!cols'] = columnsInfo;

    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws, "Data");

    writeFileXLSX(wb, fileName);
  }
}
