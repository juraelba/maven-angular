import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ListsService } from '../../../services/lists/lists.service';
import { SelectOption } from '../../../models/select.model';
import { SelectedCriteriaEvent } from '../../../models/criteries.model';
import { ListChangesEvent } from '../../../models/list.model';
import { SelectedCriteriaService } from '../../../services/selected-criteria/selected-criteria.service';
import { ListLabels, ListKeys } from '../../../enums/lists.enum';

@Component({
  selector: 'app-owners-pick-list',
  templateUrl: './owners-pick-list.component.html',
  styleUrls: ['./owners-pick-list.component.scss']
})
export class OwnersPickListComponent implements OnInit {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  borderLabel: string;
  placeholder = ListLabels.owners;
  options: SelectOption[] = [];
  unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData(ListKeys.owners)
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
  }

  onApplyChanges(options: SelectOption[]): void {
    const optionValues = this.listsService.getOptionValues(options);
    const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

    this.options = updatedOptions;
    this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.owners);

    this.change.emit({ key: ListKeys.owners, data: [ ...options ] });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
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
