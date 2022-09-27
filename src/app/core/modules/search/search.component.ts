import { Component, Input, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, takeUntil, filter, catchError } from 'rxjs/operators'; 

import { Criteries } from '@models/criteries.model';
import { SearchKey, CreateSearchResponse, SearchQuery } from '@models/search.model';
import { Table, TableConfig, Row, Column } from '@models/table.model';

import { SearchActionTypesEnum, SearchExcelFileNamesEnum, SearchEnum } from '@enums/search.enum';

import { SearchService } from '@services/search/search.service';
import { ExcelService } from '@services/excel/excel.service';

import { SEARCH_COLUMNS_CONFIG } from '../../data/constants';
import { TABLE_COLUMNS } from '../../data/table-columns-config';
import { CALL_HISTORY_MOCK } from '../../data/mock';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() criteries: Criteries;
  @Input() title: string;
  @Input() key: SearchKey;
  @Input() selectedCriteriaVisible: boolean = true;
  @Input() columnFilterVisible: boolean = true;
  @Input() exportAvailable: boolean = true;

  tableData: Table = { rows: [], columns: [] };
  totalRows: number = 0;
  config: TableConfig = {};
  tableRowsInView: Row[] = [];
  tableColumnsInView: Column[] = [];
  unsubscribeAll: Subject<null> = new Subject();
  isFetched: boolean = false;
  isFetching: boolean = false;
  tableStyles: { [key:string]: string } = {};

  constructor(
    private searchService: SearchService,
    private excelService: ExcelService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.config = SEARCH_COLUMNS_CONFIG;

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

  setMockData(): void {
    const mocks: any = {
      [SearchEnum.callHistory]: CALL_HISTORY_MOCK
    }

    of(mocks[this.key])
      .subscribe((values: any) => {
        const columns = TABLE_COLUMNS[this.key].map((column) => ({ ...column, width: 300 }));

        this.isFetching = false;
        this.isFetched = true;

        const rows = values.map(({ id, ...rest }: any) => ({ id: id, data: rest }))

        this.tableData = { rows, columns }
        this.tableStyles = this.getTableStyles();
  
        this.tableRowsInView = [ ...this.tableData.rows ];
        this.tableColumnsInView = [ ...this.tableData.columns ];
      })
  }

  onSearchButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    this.isFetching = true;

    if(this.key === SearchEnum.callHistory) {
      this.setMockData();

      return 
    }

    const searchQuery: SearchQuery =  this.searchService.transformCriteriasToSearchOptions(this.criteries);

    this.searchService.createSearch(searchQuery, this.key)
      .pipe(
        switchMap(({ id }: CreateSearchResponse) => this.searchService.executeSearch(id)),
      )
      .subscribe({
        next: (data) => {
          this.totalRows = data.length;
          this.tableData = this.searchService.transformSearchResultToTableData(data, searchQuery, this.key);
  
          this.tableRowsInView = [ ...this.tableData.rows ];
          this.tableColumnsInView = [ ...this.tableData.columns ];
          this.tableStyles = this.getTableStyles();
  
          this.isFetching = false;
          this.isFetched = true;
        },
        error: () => {
          this.totalRows = 0;
          this.tableData = { rows: [], columns: [] }
  
          this.tableRowsInView = [ ...this.tableData.rows ];
          this.tableColumnsInView = [ ...this.tableData.columns ];
  
          this.isFetching = false;
          this.isFetched = true;
        }
      })
  }

  exportToExcel(event: MouseEvent): void {
    event.stopPropagation();

    this.excelService.exportSearchToExcel(this.tableRowsInView, this.tableColumnsInView, SearchExcelFileNamesEnum[this.key]);
  }

  onRowsChange(rows: Row[]): void {
    this.tableRowsInView = rows;

    this.totalRows = rows.length;
  }

  onColumnsChange(columns: Column[]): void {
    this.tableColumnsInView = columns;
  }

  getTableStyles(): { height: string } {
    const searchHeader = this.document.querySelector('.search-header') as Element;
    const criteriesContiner = this.document.querySelector('.criteries-container') as Element;

    const { height: searchHeaderHeight } =  searchHeader.getBoundingClientRect();
    const { height: criteriesContinerHeight } =  criteriesContiner.getBoundingClientRect();

    const navBarHeight = 68;
    const marginAndPaddings = 200;

    const tableWidth = window.innerHeight - searchHeaderHeight - criteriesContinerHeight - navBarHeight - marginAndPaddings;

    return {
      height: tableWidth + 'px'
    };
  }
}
