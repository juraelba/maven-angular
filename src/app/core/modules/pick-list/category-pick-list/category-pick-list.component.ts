import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SelectOption } from '../../../models/select.model';
import { SelectedCriteriaEvent } from '../../../models/criteries.model';
import { ListsService } from '../../../../core/services/lists/lists.service';
import { SelectedCriteriaService } from '../../../../core/services/selected-criteria/selected-criteria.service';

interface CategoryData {
  isCategories: boolean;
  isPrimaryCategory: boolean;
  categories: SelectOption[]
}
@Component({
  selector: 'app-category-pick-list',
  templateUrl: './category-pick-list.component.html',
  styleUrls: ['./category-pick-list.component.scss']
})
export class CategoryPickListComponent implements OnInit, OnDestroy {
  @Output() change: EventEmitter<any> = new EventEmitter();

  @ViewChild('selectComponent') selectComponent: any;

  options: SelectOption[] = [];
  isCategories: boolean = false;
  isPrimaryCategory: boolean = false;
  borderLabel: string = '';
  value: string = 'Categories';
  width: string;
  panelOpen: boolean = false;
  unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData('categories')
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        this.options = options;
      });

    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action, data }: SelectedCriteriaEvent) => action === 'update' && data.categories ),
        map(({ data }: SelectedCriteriaEvent) => data.categories.categories)
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

        this.options = updatedOptions;
        this.value = this.getValue(options);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  toggleCategory(event: MouseEvent): void {
    event.stopPropagation();

    const selected = this.listsService.getSelectedOptions(this.options);
  
    this.isCategories = !this.isCategories;
    this.borderLabel = this.getBorderLabel();
    this.value = this.getValue(selected);
  }

  togglePrimaryCategory(event: MouseEvent): void {
    event.stopPropagation();
  
    const selected = this.listsService.getSelectedOptions(this.options);

    this.isPrimaryCategory = !this.isPrimaryCategory;
    this.borderLabel = this.getBorderLabel();
    this.value = this.getValue(selected);
  }

  getBorderLabel(): string {
    return this.isPrimaryCategory && this.isCategories ? 'Categories' : '';
  }

  getValue(options: SelectOption[]): string {
    const optionsLabels = options.map(({ label }) => label);
    const label = this.isPrimaryCategory ? 'Only primary category field' : 'Categories';

    return [ label, ...optionsLabels ].join(', ');
  }

  onApplyChanges(options: SelectOption[]): void {
    const width = this.selectComponent?.selectContainer.nativeElement.getBoundingClientRect().width;
    const values = this.listsService.getOptionValues(options);

    this.value = this.getValue(options);
    this.width = `${ width-80 }px`;
    
    const categoryData: CategoryData = {
      isPrimaryCategory: this.isPrimaryCategory,
      isCategories: this.isCategories,
      categories: options,
    }

    this.options = this.listsService.updateOptionsWithSelected(this.options, values);
    this.change.emit({ key: 'categories', data: categoryData });
  }
  
  onCancelChanges(): void {
    this.panelOpen = false;
  }

  onSelectClick(event: any): void {
    const isTargetCheckbox = event.path.some((item: any) => item?.classList?.contains('checkbox'));

    if(isTargetCheckbox) {
      return;
    }

    this.panelOpen = !this.panelOpen;
  }
}
