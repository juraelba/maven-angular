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
  selector: 'app-language-pick-list',
  templateUrl: './language-pick-list.component.html',
  styleUrls: ['./language-pick-list.component.scss']
})
export class LanguagePickListComponent implements OnInit {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  @ViewChild('selectComponent') selectComponent: any;

  options: SelectOption[] = [];
  isLanguage: boolean = false;
  borderLabel: string = '';
  value: string = ListLabels.languages2;
  width: string;
  panelOpen: boolean = false;
  unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData(ListKeys.LANGUAGES2)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        this.options = options;
      });

    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action, data }: SelectedCriteriaEvent) => action === 'update' && data[ListKeys.LANGUAGES2]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.LANGUAGES2])
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

        this.options = updatedOptions;
        this.value = this.listsService.getSelectInputValue(options, ListLabels.languages2);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  toggleLanguage(event: MouseEvent): void {
    event.stopPropagation();

    const selected = this.listsService.getSelectedOptions(this.options);
  
    this.isLanguage = !this.isLanguage;
    this.borderLabel = this.listsService.getBorderLabel(selected, ListKeys.LANGUAGES2);
    this.value = this.listsService.getSelectInputValue(selected, ListLabels.languages2);
  }

  onApplyChanges(options: SelectOption[]): void {
    const width = this.selectComponent?.selectContainer.nativeElement.getBoundingClientRect().width;
    const values = this.listsService.getOptionValues(options);

    this.value = this.listsService.getSelectInputValue(options, ListLabels.languages2);
    this.width = `${ width-80 }px`;

    this.options = this.listsService.updateOptionsWithSelected(this.options, values);
    this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.LANGUAGES2);

    this.change.emit({ key: ListKeys.LANGUAGES2, data: options });
  }
  
  onClear(): void {
    this.options = this.listsService.updateOptionsWithSelected(this.options, []);
    this.isLanguage = false;
    this.borderLabel = this.listsService.getBorderLabel([], ListKeys.LANGUAGES2);
    this.value = ListLabels.languages2

    this.change.emit({ key: ListKeys.LANGUAGES2, data: [] });
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
