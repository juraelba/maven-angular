import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';

import { SelectOption } from '../../../models/select.model';
import { List } from '../../../models/list.model';
import { ListsService } from '../../../../core/services/lists/lists.service';

interface categoryData {
  isCategories: boolean;
  isPrimaryCategory: boolean;
  categories: string[]
}
@Component({
  selector: 'app-category-pick-list',
  templateUrl: './category-pick-list.component.html',
  styleUrls: ['./category-pick-list.component.scss']
})
export class CategoryPickListComponent implements OnInit {
  @ViewChild('selectComponent') selectComponent: any;
  
  options: SelectOption[] = [];
  isCategories: boolean = false;
  isPrimaryCategory: boolean = false;
  borderLabel: string = '';
  value: string = 'Categories';
  categoryData: categoryData = {
    isCategories: false,
    isPrimaryCategory: false,
    categories: []
  };
  selectedOptions: SelectOption[] = [];
  width: string;

  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
    this.listsService.fetchCategories()
      .pipe(
        map((categories: List) => this.getOptions(categories))
      )
      .subscribe((options: SelectOption[]) => {
        this.options = options;
      })
  }

  getOptions(categories: List): SelectOption[] {
    return categories.map(({ id, name }) => ({ id, label: name, value: name }))
  }

  toggleCategory(): void {
    this.isCategories = !this.isCategories;

    this.borderLabel = this.getBorderLabel();
    this.value = this.getValue(this.selectedOptions);
  }

  togglePrimaryCategory(): void {
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

  onApplyChanges(options: SelectOption[]) {
    const width = this.selectComponent?.selectContainer.nativeElement.getBoundingClientRect().width;

    const values = options.map(({ value }) => value);

    this.value = this.getValue(options);
    this.selectedOptions = options;
    this.width = `${width}px`;
    this.categoryData = {
      ...this.categoryData,
      categories: values
    }
  }
}
