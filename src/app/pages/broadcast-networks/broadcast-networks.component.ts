import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';

import { Criteries } from '@models/criteries.model';
import { SearchKey, SearchFiledChangeEvent, SearchMediaProfileTitleKey } from '@models/search.model';
import { ListUrlsKey } from '@models/list.model';

import { SearchEnum } from '@enums/search.enum';
import { SearchActionTypesEnum } from '@enums/search.enum';
import { ListKeys } from '@enums/lists.enum';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broadcast-networks',
  templateUrl: './broadcast-networks.component.html',
  styleUrls: ['./broadcast-networks.component.scss']
})
export class BroadcastNetworksComponent implements OnInit {
  criteries: Criteries = this.selectedCriteriaService.criteries ?? {};
  key: SearchKey = SearchEnum['network-tv'];
  unsubscribeAll: Subject<null> = new Subject();

  owners5ListUrlKey: ListUrlsKey = ListKeys.owners5;
  mediatypes5ListUrlKey: ListUrlsKey = ListKeys.mediatypes5;

  searchScreenKey: SearchMediaProfileTitleKey;
  constructor(
    private selectedCriteriaService: SelectedCriteriaService,
    private searchService: SearchService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchScreenKey = this.router.url.split('/')[1] as SearchMediaProfileTitleKey;
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
    this.selectedCriteriaService.update(this.criteries, this.searchScreenKey);
  }

  onCheckboxChange(id: string, value: boolean): void {
    this.criteries[id] = value;
    this.selectedCriteriaService.update(this.criteries, this.searchScreenKey);
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
}
