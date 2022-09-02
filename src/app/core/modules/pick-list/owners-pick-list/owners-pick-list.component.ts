import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SelectOption } from '@models/select.model';
import { SelectedCriteriaEvent } from '@models/criteries.model';
import { ListChangesEvent, ListUrlsKey } from '@models/list.model';

import { ListLabels, ListKeys } from '@enums/lists.enum';
import { SearchActionTypesEnum } from '@enums/search.enum';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';
import { ListsService } from '@services/lists/lists.service';

@Component({
  selector: 'app-owners-pick-list',
  templateUrl: './owners-pick-list.component.html',
  styleUrls: ['./owners-pick-list.component.scss']
})
export class OwnersPickListComponent implements OnInit {
  @Input() listUrlKey: ListUrlsKey = ListKeys.owners;

  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  borderLabel: string;
  placeholder = ListLabels.owners;
  options: SelectOption[] = [];
  unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData(this.listUrlKey)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        this.options = options;
      });

    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action, data }: SelectedCriteriaEvent) => action === 'update' && data[ListKeys.owners]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.owners])
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

        this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.owners);
        this.options = updatedOptions;
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
        this.onClear();
      });
  }

  onApplyChanges(options: SelectOption[]): void {
    const optionValues = this.listsService.getOptionValues(options);
    const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

    this.options = updatedOptions;
    this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.owners);

    this.change.emit({ key: ListKeys.owners, data: [ ...options ] });
  }

  onSelectClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onClear(): void {
    this.options = this.listsService.updateOptionsWithSelected(this.options, []);
    this.borderLabel = '';

    this.change.emit({ key: ListKeys.owners, data: [] });
  }
}
