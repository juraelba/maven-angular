import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators'; 

import { Criteries } from '@models/criteries.model';
import { SearchKey } from '@models/search.model';
import { Table, TableConfig } from '@models/table.model';

import { SearchService } from '@services/search/search.service';

import { SEARCH_COLUMNS_CONFIG } from '../../data/constants';
import { MOCK } from '../../data/mock';

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
  config: TableConfig = {}

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.config = SEARCH_COLUMNS_CONFIG[this.key];
  }

  onSearchButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    this.searchService.createSearch(this.criteries, this.key)
      .pipe(
        switchMap(({ id }: any) => this.searchService.executeSearch(id))
      )
      .subscribe((data) => {
        this.totalRows = data.length;
        this.isFetched = true;
        this.tableData = this.searchService.transformSearchResultToTableData(data, this.key);
      })
  }
}
