import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Column } from '@models/table.model';
import { SelectOption } from '@models/select.model';

interface TextFilter {
  label: string;
  value: string;
  iconName: string;
}

@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss']
})
export class ColumnFilterComponent implements OnInit {
  @Input() column: Column;
  @Input() filterData: any[];
  @Input() panelOpen: boolean = false;

  @Output() openFilter: EventEmitter<string> = new EventEmitter();
  @Output() closeFilter: EventEmitter<undefined> = new EventEmitter();

  filterDataOptions: SelectOption[];
  isTextFilterOverlayVisible: boolean = false;

  textFilters: TextFilter[] = [
    {
      label: 'Contains',
      value: 'contain',
      iconName: 'contain'
    },
    {
      label: 'Does Not Contain',
      value: 'notContain',
      iconName: 'notContain'
    },
    {
      label: 'Starts With',
      value: 'startsWith',
      iconName: 'bigALetter'
    },
    {
      label: 'Ends With',
      value: 'endsWith',
      iconName: 'smallALetter'
    },
    {
      label: 'Equals',
      value: 'equals',
      iconName: 'equalSign'
    },
    {
      label: 'Does Not Equal',
      value: 'notEqual',
      iconName: 'notEqualSign'
    },
    {
      label: 'Empty',
      value: 'empty',
      iconName: 'emptyPlaceholder'
    },
    {
      label: 'Not Empty',
      value: 'notEmpty',
      iconName: 'notEmptyPlaceholder'
    },
    {
      label: 'Null',
      value: 'null',
      iconName: 'circle'
    },
    {
      label: 'Not Null',
      value: 'null',
      iconName: 'crossedOutCircle'
    },
  ]

  constructor() { }

  ngOnInit(): void {
    this.filterDataOptions = this.getFilteredDataOptions(this.filterData);
  }

  onApplyChanges($event: any) {

  }

  onClear() {

  }

  toggleColumnFilter(event: MouseEvent): void {
    event.stopPropagation();

    this.openFilter.emit(this.column.id)
  }

  getFilteredDataOptions(filterData: any[] = []): SelectOption[] {
    return filterData.map((data) => ({
      id: data,
      value: data,
      label: data,
      selected: true
    }));
  }

  toggleTextFilterOverlay(): void {
    this.isTextFilterOverlayVisible = !this.isTextFilterOverlayVisible;
  }

  onMenuClose(): void {
    this.closeFilter.emit();
    this.isTextFilterOverlayVisible = false;
  }
}
