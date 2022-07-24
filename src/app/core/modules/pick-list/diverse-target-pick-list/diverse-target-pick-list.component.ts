import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SelectOption } from '../../../models/select.model';
import { SelectedCriteriaEvent } from '../../../models/criteries.model';
import { ListChangesEvent } from '../../../models/list.model';
import { ListKeys, ListLabels } from '../../../enums/lists.enum';
import { ListsService } from '../../../../core/services/lists/lists.service';
import { SelectedCriteriaService } from '../../../../core/services/selected-criteria/selected-criteria.service';

@Component({
  selector: 'app-diverse-target-pick-list',
  templateUrl: './diverse-target-pick-list.component.html',
  styleUrls: ['./diverse-target-pick-list.component.scss']
})
export class DiverseTargetPickListComponent implements OnInit, OnDestroy {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  @ViewChild('selectComponent') selectComponent: any;

  options: SelectOption[] = [];
  isDiverseTarget: boolean = false;
  borderLabel: string = '';
  value: string = ListLabels.diversetargets;
  width: string;
  panelOpen: boolean = false;
  unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData(ListKeys.DIVERSETARGETS)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        this.options = options;
      });

    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action, data }: SelectedCriteriaEvent) => action === 'update' && data[ListKeys.DIVERSETARGETS]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.DIVERSETARGETS])
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

        this.options = updatedOptions;
        this.value = this.listsService.getSelectInputValue(options, ListLabels.diversetargets);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  toggleDiverseTarget(event: MouseEvent): void {
    event.stopPropagation();

    const selected = this.listsService.getSelectedOptions(this.options);
  
    this.isDiverseTarget = !this.isDiverseTarget;
    this.borderLabel = this.listsService.getBorderLabel(selected, ListKeys.DIVERSETARGETS);
    this.value = this.listsService.getSelectInputValue(selected, ListLabels.diversetargets);
  }

  onApplyChanges(options: SelectOption[]): void {
    const width = this.selectComponent?.selectContainer.nativeElement.getBoundingClientRect().width;
    const values = this.listsService.getOptionValues(options);

    this.value = this.listsService.getSelectInputValue(options, ListLabels.diversetargets);
    this.width = `${ width-80 }px`;

    this.options = this.listsService.updateOptionsWithSelected(this.options, values);
    this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.DIVERSETARGETS);

    this.change.emit({ key: ListKeys.DIVERSETARGETS, data: options });
  }
  
  onClear(): void {
    this.options = this.listsService.updateOptionsWithSelected(this.options, []);
    this.isDiverseTarget = false;
    this.borderLabel = this.listsService.getBorderLabel([], ListKeys.DIVERSETARGETS);
    this.value = ListLabels.diversetargets

    this.change.emit({ key: ListKeys.DIVERSETARGETS, data: [] });
  }

  onSelectClick({ event }: any): void {
    const isTargetCheckbox = event.path.some((item: any) => item?.classList?.contains('checkbox'));

    if(isTargetCheckbox) {
      return;
    }

    this.panelOpen = !this.panelOpen;
  }

  onMenuClose() {
    this.panelOpen = false;
  }
}
