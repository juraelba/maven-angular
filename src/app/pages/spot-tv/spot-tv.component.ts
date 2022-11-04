import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Criteries } from '@models/criteries.model';
import { SearchKey, SearchFiledChangeEvent } from '@models/search.model';
import { ListUrlsKey } from '@models/list.model';

import {
  SearchEnum,
  SearchActionTypesEnum,
  SearchFiedlsEnum,
} from '@enums/search.enum';
import { ListKeys } from '@enums/lists.enum';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';

@Component({
  selector: 'app-spot-tv',
  templateUrl: './spot-tv.component.html',
  styleUrls: ['./spot-tv.component.scss'],
})
export class SpotTvComponent implements OnInit, OnDestroy {
  key: SearchKey = SearchEnum['spot-tv'];
  criteries: Criteries =
    this.selectedCriteriaService.criteries?.[this.key] ?? {};

  ownerListUrlKey: ListUrlsKey = ListKeys.owners11;

  unsubscribeAll: Subject<null> = new Subject();
  constructor(
    private selectedCriteriaService: SelectedCriteriaService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        map(({ data }) => data)
      )
      .subscribe((data: Criteries) => {
        this.criteries = {
          [SearchFiedlsEnum.nonComms]:
            this.criteries[SearchFiedlsEnum.nonComms],
          ...data,
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
        this.criteries = {};
      });
  }

  onChange({ key, data }: SearchFiledChangeEvent) {
    this.criteries[key] = data;
    this.selectedCriteriaService.update(this.criteries, this.key);
  }

  onCheckboxChange(key: string, value: boolean): void {
    this.criteries[key] = value;
    this.selectedCriteriaService.update(this.criteries, this.key);
  }
}
