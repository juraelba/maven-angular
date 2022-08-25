import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators'; 

import { Criteries } from '@models/criteries.model';
import { SearchKey } from '@models/search.model';
import { Table, TableConfig, Row, Column } from '@models/table.model';

import { SearchActionTypesEnum } from '@enums/search.enum';

import { SearchService } from '@services/search/search.service';
import { SpinnerService } from '@services/spinner.service';
import { ExcelService } from '@services/excel/excel.service';

import { SEARCH_COLUMNS_CONFIG } from '../../data/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() criteries: Criteries;
  @Input() title: string;
  @Input() key: SearchKey;

  tableData: Table = { rows: [], columns: [] };
  totalRows: number = 0;
  isFetched: boolean = false;
  config: TableConfig = {};
  tableRowsInView: Row[] = [];
  tableColumnsInView: Column[] = [];
  unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private searchService: SearchService,
    private spinnerService: SpinnerService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.config = SEARCH_COLUMNS_CONFIG[this.key];

    this.listenSearchBarMenuActions();
  }

  listenSearchBarMenuActions(): void {
    this.searchService.searchBarEvents$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action }) => SearchActionTypesEnum.NEW_SEARCH === action)
      )
      .subscribe(() => {
        this.totalRows = 0;
        this.isFetched = false;
        this.tableData = { rows: [], columns: [] };

        this.tableRowsInView = [ ...this.tableData.rows ];
        this.tableColumnsInView = [ ...this.tableData.columns ];
      });
  }

  onSearchButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    this.spinnerService.show();

    this.searchService.createSearch(this.criteries, this.key)
      .pipe(
        switchMap(({ id }: any) => this.searchService.executeSearch(id))
      )
      .subscribe((data) => {
        this.totalRows = data.length;
        this.isFetched = true;
        this.tableData = this.searchService.transformSearchResultToTableData(data, this.key);

        this.tableRowsInView = [ ...this.tableData.rows ];
        this.tableColumnsInView = [ ...this.tableData.columns ];

        this.spinnerService.hide();
      })
  }

  exportToExcel(event: MouseEvent): void {
    event.stopPropagation();

    this.excelService.exportSearchToExcel(this.tableRowsInView, this.tableColumnsInView);
  }

  onRowsChange(rows: Row[]): void {
    this.tableRowsInView = rows;

    this.totalRows = rows.length;
  }

  onColumnsChange(columns: Column[]): void {
    this.tableColumnsInView = columns;
  }
}
