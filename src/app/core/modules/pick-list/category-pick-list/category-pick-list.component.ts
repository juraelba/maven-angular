import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SelectOption } from '@models/select.model';
import { SelectedCriteriaEvent, CategoriesCriteria } from '@models/criteries.model';
import { ListChangesEvent } from '@models/list.model';

import { ListKeys, ListLabels } from '@enums/lists.enum';
import { SearchActionTypesEnum } from '@enums/search.enum';

import { ListsService } from '@services/lists/lists.service';
import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';

import { SelectComponent } from '@modules/select/select.component';
import { Router } from '@angular/router';
import { SearchMediaProfileTitleKey } from '@models/search.model';

@Component({
  selector: 'app-category-pick-list',
  templateUrl: './category-pick-list.component.html',
  styleUrls: ['./category-pick-list.component.scss']
})
export class CategoryPickListComponent implements OnInit, OnDestroy {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  @ViewChild('selectComponent') selectComponent: SelectComponent;

  options: SelectOption[] = [];
  isCategories: boolean = false;
  isPrimaryCategory: boolean = false;
  borderLabel: string = '';
  value: string = ListLabels.categories;
  width: string;
  panelOpen: boolean = false;
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
    this.listsService.getOptionsData(ListKeys.categories)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        this.options = options;
        const selected = this.selectedCriteriaService.criteries?.[this.searchScreenKey]?.[ListKeys.categories]
        if (selected) {
          this.change.emit({ key: ListKeys.categories, data: selected });
        }
      });

    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action, data }: SelectedCriteriaEvent) => data[ListKeys.categories]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.categories].options)
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

        this.options = updatedOptions;
        this.borderLabel = this.getBorderLabel();
        this.value = this.listsService.getSelectInputValue(options, ListLabels.categories);
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

  toggleCategory(event: MouseEvent): void {
    event.stopPropagation();

    const selected = this.listsService.getSelectedOptions(this.options);

    this.isCategories = !this.isCategories;
    this.borderLabel = this.getBorderLabel();
    this.value = this.listsService.getSelectInputValue(selected, ListLabels.categories);

    const categoryData: CategoriesCriteria = {
      isCategories: this.isCategories,
      isPrimaryCategory: this.isPrimaryCategory,
      options: selected
    };

    this.change.emit({ key: ListKeys.categories, data: categoryData });
  }

  togglePrimaryCategory(event: MouseEvent): void {
    event.stopPropagation();

    const selected = this.listsService.getSelectedOptions(this.options);

    this.isPrimaryCategory = !this.isPrimaryCategory;
    this.borderLabel = this.getBorderLabel();
    this.value = this.listsService.getSelectInputValue(selected, ListLabels.categories);

    const categoryData: CategoriesCriteria = {
      isCategories: this.isCategories,
      isPrimaryCategory: this.isPrimaryCategory,
      options: selected
    };

    this.change.emit({ key: ListKeys.categories, data: categoryData });
  }

  getBorderLabel(): string {
    const selectedOptions = this.listsService.getSelectedOptions(this.options);

    if (selectedOptions.length && !this.isPrimaryCategory && !this.isCategories) {
      return ListLabels.categories;
    }

    if (!selectedOptions.length && this.isCategories && !this.isPrimaryCategory) {
      return '';
    }


    return this.getCheckedCheckboxLabel();
  }

  onApplyChanges(options: SelectOption[]): void {
    const width = this.selectComponent?.selectContainer.nativeElement.getBoundingClientRect().width;
    const values = this.listsService.getOptionValues(options);

    this.value = this.listsService.getSelectInputValue(options, ListLabels.categories);
    this.width = `${width - 80}px`;

    const categoryData: CategoriesCriteria = {
      isPrimaryCategory: this.isPrimaryCategory,
      isCategories: this.isCategories,
      options,
    }

    this.options = this.listsService.updateOptionsWithSelected(this.options, values);
    this.borderLabel = this.getBorderLabel();

    this.change.emit({ key: ListKeys.categories, data: categoryData });
  }

  onClear(): void {
    this.options = this.listsService.updateOptionsWithSelected(this.options, []);
    this.isCategories = false;
    this.isPrimaryCategory = false;
    this.borderLabel = this.getBorderLabel();
    this.value = ListLabels.categories

    const categoryData: CategoriesCriteria = {
      isPrimaryCategory: this.isPrimaryCategory,
      isCategories: this.isCategories,
      options: [],
    }

    this.change.emit({ key: ListKeys.categories, data: categoryData });
  }

  onSelectClick({ event }: { event: any }): void {
    const isTargetCheckbox = event.path.some((item: Element) => item?.classList?.contains('checkbox'));

    if (isTargetCheckbox) {
      return;
    }

    this.panelOpen = !this.panelOpen;
  }

  getCheckedCheckboxLabel(): string {
    if (this.isPrimaryCategory) {
      return 'Primary categories only'
    }

    if (this.isCategories) {
      return ListLabels.categories;
    }

    return '';
  }

  onMenuClose() {
    this.panelOpen = false;
  }
}
