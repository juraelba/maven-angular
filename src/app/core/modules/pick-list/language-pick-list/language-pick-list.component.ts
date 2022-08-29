import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SelectOption } from '@models/select.model';
import { SelectedCriteriaEvent, LanguageCriteria } from '@models/criteries.model';
import { ListChangesEvent } from '@models/list.model';

import { ListKeys, ListLabels } from '@enums/lists.enum';
import { SearchActionTypesEnum } from '@enums/search.enum'

import { ListsService } from '@services/lists/lists.service';
import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';

import { SelectComponent } from '@modules/select/select.component';

@Component({
  selector: 'app-language-pick-list',
  templateUrl: './language-pick-list.component.html',
  styleUrls: ['./language-pick-list.component.scss']
})
export class LanguagePickListComponent implements OnInit {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  @ViewChild('selectComponent') selectComponent: SelectComponent;

  options: SelectOption[] = [];
  isLanguage: boolean = false;
  borderLabel: string = '';
  value: string = ListLabels.languages2;
  width: string;
  panelOpen: boolean = false;
  unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData(ListKeys.languages2)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        this.options = options;
      });

    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ data }: SelectedCriteriaEvent) => data[ListKeys.languages2]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.languages2].options)
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

        this.options = updatedOptions;
        this.value = this.listsService.getSelectInputValue(options, ListLabels.languages2);
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

  toggleLanguage(event: MouseEvent): void {
    event.stopPropagation();

    const selected = this.listsService.getSelectedOptions(this.options);
  
    this.isLanguage = !this.isLanguage;
    this.borderLabel = this.listsService.getBorderLabel(selected, ListKeys.languages2);
    this.value = this.listsService.getSelectInputValue(selected, ListLabels.languages2);

    const data: LanguageCriteria = {
      isLanguage: this.isLanguage,
      options: selected
    };

    this.change.emit({ key: ListKeys.languages2, data });
  }

  onApplyChanges(options: SelectOption[]): void {
    const width = this.selectComponent?.selectContainer.nativeElement.getBoundingClientRect().width;
    const values = this.listsService.getOptionValues(options);

    this.value = this.listsService.getSelectInputValue(options, ListLabels.languages2);
    this.width = `${ width-80 }px`;

    this.options = this.listsService.updateOptionsWithSelected(this.options, values);
    this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.languages2);

    const languageData: LanguageCriteria = {
      isLanguage: this.isLanguage,
      options
    };

    this.change.emit({ key: ListKeys.languages2, data: languageData });
  }
  
  onClear(): void {
    this.options = this.listsService.updateOptionsWithSelected(this.options, []);
    this.isLanguage = false;
    this.borderLabel = this.listsService.getBorderLabel([], ListKeys.languages2);
    this.value = ListLabels.languages2;

    const languageData: LanguageCriteria = {
      isLanguage: this.isLanguage,
      options: []
    };

    this.change.emit({ key: ListKeys.languages2, data: languageData });
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
