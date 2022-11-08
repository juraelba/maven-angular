import {
  Component,
  Input,
  OnInit,
  Inject,
  OnDestroy,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { Criteries } from '@models/criteries.model';
import {
  SearchKey,
  CreateSearchResponse,
  SearchQuery,
  SearchMediaProfileTitleKey,
} from '@models/search.model';
import { Table, TableConfig, Row, Column } from '@models/table.model';

import {
  SearchActionTypesEnum,
  SearchExcelFileNamesEnum,
  SearchEnum,
  SearchMediaProfileEnumTitles,
} from '@enums/search.enum';

import { SearchService } from '@services/search/search.service';
import { ExcelService } from '@services/excel/excel.service';

import { SEARCH_COLUMNS_CONFIG } from '../../data/constants';
import { TABLE_COLUMNS } from '../../data/table-columns-config';
import { CALL_HISTORY_MOCK } from '../../data/mock';
import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
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
  isFetched: boolean = false;
  isFetching: boolean = false;
  tableStyles: { [key: string]: string } = {};

  searchScreenKey: SearchMediaProfileTitleKey;
  private unsubscribeAll: Subject<null> = new Subject();
  constructor(
    private searchService: SearchService,
    private excelService: ExcelService,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router,
    private criteriesService: SelectedCriteriaService
  ) {}

  ngOnInit(): void {
    this.config = SEARCH_COLUMNS_CONFIG;

    this.searchScreenKey = this.router.url.split(
      '/'
    )[1] as SearchMediaProfileTitleKey;

    const previousSearchResult =
      this.searchService.searchResults?.[this.searchScreenKey];
    if (!!previousSearchResult) {
      this.tableStyles = this.getTableStyles();
      this.totalRows = previousSearchResult.rows.length;
      this.tableData = previousSearchResult;
      this.isFetched = true;
      this.tableRowsInView = [...this.tableData.rows];
      this.tableColumnsInView = [...this.tableData.columns];
    }

    this.listenSearchBarMenuActions();
  }

  ngAfterViewInit(): void {
    this.tableStyles = this.getTableStyles();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
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
        this.tableRowsInView = [...this.tableData.rows];
        this.tableColumnsInView = [...this.tableData.columns];
      });
  }

  setMockData(): void {
    const mocks: any = {
      [SearchEnum.callHistory]: CALL_HISTORY_MOCK,
    };

    of(mocks[this.key]).subscribe((values: any) => {
      const columns = TABLE_COLUMNS[this.key].map((column) => ({
        ...column,
        width: 300,
      }));

      this.isFetching = false;
      this.isFetched = true;

      const rows = values.map(({ id, ...rest }: any) => ({
        id: id,
        data: rest,
      }));

      this.tableData = { rows, columns };
      this.tableStyles = this.getTableStyles();

      this.tableRowsInView = [...this.tableData.rows];
      this.tableColumnsInView = [...this.tableData.columns];
    });
  }

  onSearchButtonClick(event: MouseEvent | KeyboardEvent): void {
    event.stopPropagation();
    this.isFetching = true;
    this.isFetched = false;
    this.totalRows = 0;
    this.tableData = { rows: [], columns: [] };

    this.tableRowsInView = [...this.tableData.rows];
    this.tableColumnsInView = [...this.tableData.columns];

    if (this.key === SearchEnum.callHistory) {
      this.setMockData();

      return;
    }

    const searchQuery: SearchQuery =
      this.searchService.transformCriteriasToSearchOptions(this.criteries);

    this.searchService
      .createSearch(searchQuery, this.key)
      .pipe(
        switchMap(({ id }: CreateSearchResponse) =>
          this.searchService.executeSearch(id)
        )
      )
      .subscribe({
        next: (data) => {
          this.totalRows = data.length;
          this.tableData = this.searchService.transformSearchResultToTableData(
            data,
            searchQuery,
            this.key
          );

          this.tableRowsInView = [...this.tableData.rows];
          this.tableColumnsInView = [...this.tableData.columns];
          this.tableStyles = this.getTableStyles();

          if (this.tableData.rows.length > 1) {
            this.isFetching = false;
            this.isFetched = true;
            this.setSearchResults();
          }

          if (this.tableData.rows.length === 0) {
            this.isFetching = false;
            this.isFetched = true;
          }

          if (this.tableData.rows.length === 1) {
            this.setSearchResults();
            const res = this.tableData.rows[0];
            const mediaPath = this.searchService.getKeyByValue(res.data.type);
            this.searchService.isTextSearch.next(true);
            this.searchService.currentMediaType.next(res.data.type);
            this.router.navigate([
              `${mediaPath || this.searchScreenKey}/${res.id}`,
            ]);

            this.isFetching = false;
            this.isFetched = true;

            this.criteriesService.clearCriteries();
          }
        },
        error: () => {
          this.totalRows = 0;
          this.tableData = { rows: [], columns: [] };

          this.tableRowsInView = [...this.tableData.rows];
          this.tableColumnsInView = [...this.tableData.columns];

          this.isFetching = false;
          this.isFetched = true;
        },
      });
  }

  exportToExcel(event: MouseEvent): void {
    event.stopPropagation();

    this.excelService.exportSearchToExcel(
      this.tableRowsInView,
      this.tableColumnsInView,
      SearchExcelFileNamesEnum[this.key]
    );
  }

  onRowsChange(rows: Row[]): void {
    this.tableRowsInView = rows;

    this.totalRows = rows.length;
    this.searchService.searchResults[this.searchScreenKey] = {
      rows,
      columns: this.tableData.columns,
    };
  }

  onColumnsChange(columns: Column[]): void {
    this.tableColumnsInView = columns;
    this.searchService.searchResults[this.searchScreenKey] = {
      rows: this.tableData.rows,
      columns,
    };
  }

  getTableStyles(): { height: string } {
    const searchHeader = this.document.querySelector(
      '.search-header'
    ) as Element;
    const criteriesContainer = this.document.querySelector(
      '.criteries-container'
    ) as Element;

    const { height: searchHeaderHeight } = searchHeader.getBoundingClientRect();
    const { height: criteriesContainerHeight } =
      criteriesContainer.getBoundingClientRect();

    const navBarHeight = 68;
    const marginAndPaddings = 200;

    const tableHeight =
      window.innerHeight -
      searchHeaderHeight -
      criteriesContainerHeight -
      navBarHeight -
      marginAndPaddings;

    return {
      height: tableHeight + 'px',
    };
  }

  onRowClick(row: Row): void {
    console.log('row has been clicked');
    let path = location.pathname.split('/')[1];

    if (path === 'media-search') {
      this.router.navigate([
        `${
          this.searchService.getKeyByValue(row.data.type) ||
          this.searchScreenKey
        }/${row.id}`,
      ]);
    } else {
      console.log('row has been clidked ');
      this.router.navigate([row.id], { relativeTo: this.route });
    }
  }

  setSearchResults(): void {
    this.searchService.searchResults[this.searchScreenKey] = {
      rows: this.tableData.rows,
      columns: this.tableData.columns,
    };

    this.searchService.resultsBeforeSorting[this.searchScreenKey] = {
      rows: this.tableData.rows,
      columns: this.tableData.columns,
    };
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.criteries.name?.trim().length > 0) {
        this.onSearchButtonClick(event);
      }
    }
  }
}
