import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Column, TextFilter } from '@models/table.model';
import { SelectOption } from '@models/select.model';

import { TEXT_FILTERS } from '../../../data/constants';

@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss']
})
export class ColumnFilterComponent implements OnInit {
  @Input() column: Column;
  @Input() rowFilterData: any[];
  @Input() panelOpen: boolean = false;

  @Output() openFilter: EventEmitter<string> = new EventEmitter();
  @Output() closeFilter: EventEmitter<undefined> = new EventEmitter();
  @Output() textFilterSelect: EventEmitter<{ column: Column, textFilter: TextFilter }> = new EventEmitter();

  filterDataOptions: SelectOption[];
  isTextFilterOverlayVisible: boolean = false;
  isColumnAutoFilterVisible: boolean = false;

  textFilters: TextFilter[] = TEXT_FILTERS;

  constructor() { }

  ngOnInit(): void {
    this.filterDataOptions = this.getFilteredDataOptions(this.rowFilterData);
  }

  onApplyChanges($event: any) {

  }

  onClear() {

  }

  toggleColumnFilter(event: MouseEvent): void {
    event.stopPropagation();

    this.openFilter.emit(this.column.id)
  }

  getFilteredDataOptions(rowFilterData: any[] = []): SelectOption[] {
    return rowFilterData.map((data) => ({
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

  showColumnAutoFilter(event: MouseEvent, textFilter: TextFilter): void {
    event.stopPropagation();

    this.onMenuClose();
    this.textFilterSelect.emit({ column: this.column, textFilter });
  }
}
