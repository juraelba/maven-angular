import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { SelectOption } from '../../../models/select.model';
import { ListsService } from '../../../../core/services/lists/lists.service';

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
export class CategoryPickListComponent implements OnInit {
  @Output() change: EventEmitter<any> = new EventEmitter();

  @ViewChild('selectComponent') selectComponent: any;

  options: SelectOption[] = [];
  isCategories: boolean = false;
  isPrimaryCategory: boolean = false;
  borderLabel: string = '';
  value: string = 'Categories';
  selectedOptions: SelectOption[] = [];
  width: string;
  panelOpen: boolean = false;

  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData('categories')
      .subscribe((options: SelectOption[]) => {
        this.options = options;
      })
  }

  toggleCategory(event: MouseEvent): void {
    event.stopPropagation();
  
    this.isCategories = !this.isCategories;

    this.borderLabel = this.getBorderLabel();
    this.value = this.getValue(this.selectedOptions);
  }

  togglePrimaryCategory(event: MouseEvent): void {
    event.stopPropagation();
  
    this.isPrimaryCategory = !this.isPrimaryCategory;

    this.borderLabel = this.getBorderLabel();
    this.value = this.getValue(this.selectedOptions);
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

    this.value = this.getValue(options);
    this.selectedOptions = options;
    this.width = `${ width-80 }px`;
    
    const categoryData: CategoryData = {
      isPrimaryCategory: this.isPrimaryCategory,
      isCategories: this.isCategories,
      categories: options,
    }

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
