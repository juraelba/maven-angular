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

@Component({
  selector: 'app-sub-types',
  templateUrl: './sub-types.component.html',
  styleUrls: ['./sub-types.component.scss']
})
export class SubTypesComponent implements OnInit {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  borderLabel: string;
  options: SelectOption[] = [];
  unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData(ListKeys.subtypes)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        this.options = options;
      });

    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action, data }: SelectedCriteriaEvent) => action === 'update' && data[ListKeys.subtypes]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.subtypes])
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);
            
        this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.subtypes);
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
    this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.subtypes);

    this.change.emit({ key: ListKeys.subtypes, data: [ ...options ] });
  }

  onClear(): void {
    this.options = this.listsService.updateOptionsWithSelected(this.options, []);
    this.borderLabel = '';

    this.change.emit({ key: ListKeys.subtypes, data: [] });
  }

}
