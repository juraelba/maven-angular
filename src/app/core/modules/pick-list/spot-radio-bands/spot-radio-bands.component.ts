import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ListsService } from '@services/lists/lists.service';
import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';

import { SelectOption } from '@models/select.model';
import { SelectedCriteriaEvent } from '@models/criteries.model';
import { ListChangesEvent } from '@models/list.model';

import { ListKeys } from '@enums/lists.enum';
import { SearchActionTypesEnum } from '@enums/search.enum';

@Component({
  selector: 'app-spot-radio-bands',
  templateUrl: './spot-radio-bands.component.html',
  styleUrls: ['./spot-radio-bands.component.scss']
})
export class SpotRadioBandsComponent implements OnInit {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  borderLabel: string;
  options: SelectOption[] = [];
  unsubscribeAll: Subject<null> = new Subject();

  preselectedOptions: string[] = [ 'AM', 'FM' ];

  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData(ListKeys.radiobands)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        this.options = this.listsService.updateOptionsWithSelected(options, this.preselectedOptions);
        const selected = this.listsService.getSelectedOptions(this.options);

        this.borderLabel = this.listsService.getBorderLabel(selected, ListKeys.radiobands);

        this.change.emit({ key: ListKeys.radiobands, data: selected });
      });

    this.listenSelectedCriteriaChanges();
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

  listenSelectedCriteriaChanges(): void {
    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ data }: SelectedCriteriaEvent) => data[ListKeys.radiobands]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.radiobands])
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);
            
        this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.radiobands);
        this.options = updatedOptions;
      });
  }

  onApplyChanges(options: SelectOption[]): void {
    const optionValues = this.listsService.getOptionValues(options);
    const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

    this.options = updatedOptions;
    this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.radiobands);

    this.change.emit({ key: ListKeys.radiobands, data: [ ...options ] });
  }

  onSelectClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onClear(): void {
    this.options = this.listsService.updateOptionsWithSelected(this.options, []);
    this.borderLabel = '';

    this.change.emit({ key: ListKeys.radiobands, data: [] });
  }
}
