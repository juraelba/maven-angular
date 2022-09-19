import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import { DateTime } from 'luxon';

import { Criteries } from '@models/criteries.model';
import { SearchKey, SearchFiledChangeEvent } from '@models/search.model';
import { ListUrlsKey } from '@models/list.model';

import { SearchEnum } from '@enums/search.enum';
import { SearchActionTypesEnum, SearchFiedlsEnum } from '@enums/search.enum';
import { ListKeys  } from '@enums/lists.enum';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';

@Component({
  selector: 'app-diverse',
  templateUrl: './diverse.component.html',
  styleUrls: ['./diverse.component.scss']
})
export class DiverseComponent implements OnInit {
  criteries: Criteries = {};
  key: SearchKey = SearchEnum['diverse'];
  unsubscribeAll: Subject<null> = new Subject();

  owners1ListUrlKey: ListUrlsKey = ListKeys.owners1;
  mediatypes1ListUrlKey: ListUrlsKey = ListKeys.mediatypes1;

  constructor(
    private selectedCriteriService: SelectedCriteriaService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.selectedCriteriService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        map(({ data }) => data)
      )
      .subscribe((data: Criteries) => {
        this.criteries = data;
      });

    this.listenSearchBarMenuActions();
  }

  ngOnDestroy(): void {
      this.unsubscribeAll.next(null);
      this.unsubscribeAll.complete();
  }
  
  onChange({ key, data }: SearchFiledChangeEvent): void {
    this.criteries[key] = data;
  }

  onCheckboxChange(id: string, value: boolean): void {
    this.criteries[id] = value;
  }

  listenSearchBarMenuActions(): void {
    this.searchService.searchBarEvents$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action }) => SearchActionTypesEnum.NEW_SEARCH === action)
      )
      .subscribe(() => {
        this.criteries = {}
      });
  }

  onDateChange(date: DateTime | null): void {
    this.criteries[SearchFiedlsEnum.exparationDate] = date;
  }
}
