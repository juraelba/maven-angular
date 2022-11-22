import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';

import { Criteries } from '@models/criteries.model';
import { SearchKey, SearchFiledChangeEvent } from '@models/search.model';
import { ListUrlsKey } from '@models/list.model';

import { SearchEnum } from '@enums/search.enum';
import { SearchActionTypesEnum } from '@enums/search.enum';
import { ListKeys } from '@enums/lists.enum';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';
import { LINK_DEFAULT_STYLE } from 'src/app/core/data/constants';

@Component({
  selector: 'app-regional-cable',
  templateUrl: './regional-cable.component.html',
  styleUrls: ['./regional-cable.component.scss'],
})
export class RegionalCableComponent implements OnInit, OnDestroy {
  key: SearchKey = SearchEnum['regional-cable'];
  criteries: Criteries =
    this.selectedCriteriaService.criteries?.[this.key] ?? {};
  unsubscribeAll: Subject<null> = new Subject();

  owners10ListUrlKey: ListUrlsKey = ListKeys.owners10;
  mediatypes9ListUrlKey: ListUrlsKey = ListKeys.mediatypes9;

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
    this.selectedCriteriaService.update(this.criteries, this.key);
  }

  onCheckboxChange(id: string, value: boolean): void {
    this.criteries[id] = value;
    this.selectedCriteriaService.update(this.criteries, this.key);
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
}
