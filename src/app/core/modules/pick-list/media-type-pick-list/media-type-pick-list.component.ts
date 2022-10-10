import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SelectOption } from '@models/select.model';
import { SelectedCriteriaEvent } from '@models/criteries.model';
import { ListChangesEvent } from '@models/list.model';

import { ListKeys } from '@enums/lists.enum';
import { SearchActionTypesEnum } from '@enums/search.enum'

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { ListsService } from '@services/lists/lists.service';
import { SearchService } from '@services/search/search.service';
import { Router } from '@angular/router';
import { SearchMediaProfileTitleKey } from '@models/search.model';

@Component({
  selector: 'app-media-type-pick-list',
  templateUrl: './media-type-pick-list.component.html',
  styleUrls: ['./media-type-pick-list.component.scss']
})
export class MediaTypePickListComponent implements OnInit {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  borderLabel: string;
  options: SelectOption[] = [];
  unsubscribeAll: Subject<null> = new Subject();

  searchScreenKey: SearchMediaProfileTitleKey;
  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService,
    private searchService: SearchService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchScreenKey = this.router.url.split('/')[1] as SearchMediaProfileTitleKey;
    this.listsService.getOptionsData(ListKeys.mediatypes2)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        this.options = options;
        const selected = this.selectedCriteriaService.criteries?.[this.searchScreenKey]?.[ListKeys.mediatypes2]
        if (selected) {
          this.change.emit({ key: ListKeys.mediatypes2, data: selected });
        }
      });

    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action, data }: SelectedCriteriaEvent) => action === 'update' && data[ListKeys.mediatypes2]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.mediatypes2])
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

        this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.mediatypes2);
        this.options = updatedOptions;
      });

    this.searchService.searchBarEvents$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action }) => SearchActionTypesEnum.NEW_SEARCH === action)
      )
      .subscribe(() => {
        this.onClear();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  onApplyChanges(options: SelectOption[]): void {
    const optionValues = this.listsService.getOptionValues(options);
    const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

    this.options = updatedOptions;
    this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.mediatypes2);

    this.change.emit({ key: ListKeys.mediatypes2, data: [...options] });
  }

  onClear(): void {
    this.options = this.listsService.updateOptionsWithSelected(this.options, []);
    this.borderLabel = '';

    this.change.emit({ key: ListKeys.mediatypes2, data: [] });
  }
}
