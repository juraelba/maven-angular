import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SelectOption } from '@models/select.model';
import { SelectedCriteriaEvent, DiverseTargestCriteria } from '@models/criteries.model';

import { ListChangesEvent } from '@models/list.model';
import { ListKeys, ListLabels } from '@enums/lists.enum';
import { SearchActionTypesEnum } from '@enums/search.enum';

import { ListsService } from '@services/lists/lists.service';
import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';

import { SelectComponent } from '@modules/select/select.component';

@Component({
  selector: 'app-diverse-target-pick-list',
  templateUrl: './diverse-target-pick-list.component.html',
  styleUrls: ['./diverse-target-pick-list.component.scss']
})
export class DiverseTargetPickListComponent implements OnInit, OnDestroy {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  @ViewChild('selectComponent') selectComponent: SelectComponent;

  options: SelectOption[] = [];
  isDiverseTarget: boolean = false;
  borderLabel: string = '';
  value: string = ListLabels.diversetargets;
  width: string;
  panelOpen: boolean = false;
  unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData(ListKeys.diversetargets)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        this.options = options;
      });

    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ data }: SelectedCriteriaEvent) => data[ListKeys.diversetargets]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.diversetargets].options)
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

        this.options = updatedOptions;
        this.value = this.listsService.getSelectInputValue(options, ListLabels.diversetargets);
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

  toggleDiverseTarget(event: MouseEvent): void {
    event.stopPropagation();

    const selected = this.listsService.getSelectedOptions(this.options);
  
    this.isDiverseTarget = !this.isDiverseTarget;
    this.borderLabel = this.listsService.getBorderLabel(selected, ListKeys.diversetargets);
    this.value = this.listsService.getSelectInputValue(selected, ListLabels.diversetargets);

    const data: DiverseTargestCriteria = {
      isDiverseTarget: this.isDiverseTarget,
      options: selected
    };

    this.change.emit({ key: ListKeys.diversetargets, data });
  }

  onApplyChanges(options: SelectOption[]): void {
    const width = this.selectComponent?.selectContainer.nativeElement.getBoundingClientRect().width;
    const values = this.listsService.getOptionValues(options);

    this.value = this.listsService.getSelectInputValue(options, ListLabels.diversetargets);
    this.width = `${ width-80 }px`;

    this.options = this.listsService.updateOptionsWithSelected(this.options, values);
    this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.diversetargets);

    const data: DiverseTargestCriteria = {
      isDiverseTarget: this.isDiverseTarget,
      options
    };

    this.change.emit({ key: ListKeys.diversetargets, data });
  }
  
  onClear(): void {
    this.options = this.listsService.updateOptionsWithSelected(this.options, []);
    this.isDiverseTarget = false;
    this.borderLabel = this.listsService.getBorderLabel([], ListKeys.diversetargets);
    this.value = ListLabels.diversetargets;

    const data: DiverseTargestCriteria = {
      isDiverseTarget: this.isDiverseTarget,
      options: []
    }

    this.change.emit({ key: ListKeys.diversetargets, data });
  }

  onSelectClick({ event }: any): void {
    const isTargetCheckbox = event.path.some((item: Element) => item?.classList?.contains('checkbox'));

    if(isTargetCheckbox) {
      return;
    }

    this.panelOpen = !this.panelOpen;
  }

  onMenuClose() {
    this.panelOpen = false;
  }
}
