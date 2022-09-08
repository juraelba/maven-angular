import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Criteries } from '@models/criteries.model';
import { SearchKey, SearchFiledChangeEvent } from '@models/search.model';
import { ListUrlsKey } from '@models/list.model';

import { SearchEnum, SearchActionTypesEnum, SearchFiedlsEnum } from '@enums/search.enum';
import { ListKeys } from '@enums/lists.enum';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';

@Component({
  selector: 'app-spot-tv',
  templateUrl: './spot-tv.component.html',
  styleUrls: ['./spot-tv.component.scss']
})
export class SpotTvComponent implements OnInit, OnDestroy {
  criteries: Criteries = {};
  key: SearchKey = SearchEnum['spot-tv'];
  unsubscribeAll: Subject<null> = new Subject();

  ownerListUrlKey: ListUrlsKey = ListKeys.owners11;

  constructor(
    private selectedCriteriService: SelectedCriteriaService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.selectedCriteriService.selectedCriteria$
      .pipe(
        map(({ data }) => data)
      )
      .subscribe((data: Criteries) => {
        this.criteries = {
          ...data,
          [SearchFiedlsEnum.nonComms]: this.criteries[SearchFiedlsEnum.nonComms],
        };
      });

    
    this.listenSearchBarMenuActions();
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
        this.criteries = {}
      });
  }
  
  onChange({ key, data }: SearchFiledChangeEvent) {
    this.criteries[key] = data;
  }

  onCheckboxChange(key: string, value: boolean): void {
    this.criteries[key] = value;
  }
}
