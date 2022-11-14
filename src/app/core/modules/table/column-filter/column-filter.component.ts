import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';

import { Column, TextFilter, ColumnAutoFilterData } from '@models/table.model';
import { SelectOption } from '@models/select.model';

import { TEXT_FILTERS } from '../../../data/constants';

@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss'],
})
export class ColumnFilterComponent implements OnInit {
  @Input() column: Column;
  @Input() rowFilterData: SelectOption[] = [];
  @Input() panelOpen: boolean = false;
  @Input() columnAutoFilterData: ColumnAutoFilterData;

  @Output() openFilter: EventEmitter<string> = new EventEmitter();
  @Output() closeFilter: EventEmitter<undefined> = new EventEmitter();
  @Output() textFilterSelect: EventEmitter<{
    column: Column;
    textFilter: TextFilter;
  }> = new EventEmitter();
  @Output() columnFilterChange: EventEmitter<{
    id: string;
    options: SelectOption[];
  }> = new EventEmitter();
  @Output() clearColumnFilter: EventEmitter<string> = new EventEmitter();
  @Output() pinColumn: EventEmitter<Column> = new EventEmitter();
  @Output() hideColumn: EventEmitter<Column> = new EventEmitter();

  filterDataOptions: SelectOption[];
  isTextFilterOverlayVisible: boolean = false;
  isColumnAutoFilterVisible: boolean = false;
  connectedPositions: ConnectedPosition[] = [
    {
      overlayX: 'start',
      overlayY: 'top',
      originX: 'end',
      originY: 'bottom',
    },
    {
      overlayX: 'end',
      overlayY: 'top',
      originX: 'start',
      originY: 'bottom',
    },
  ];

  textFilters: TextFilter[] = TEXT_FILTERS;

  constructor() {}

  ngOnInit(): void {
    this.filterDataOptions = [...(this.rowFilterData || [])];
  }

  onApplyChanges(options: SelectOption[]) {
    this.columnFilterChange.emit({ id: this.column.id, options });
  }

  onClear() {
    this.columnFilterChange.emit({ id: this.column.id, options: [] });
  }

  toggleColumnFilter(event: MouseEvent): void {
    event.stopPropagation();

    this.openFilter.emit(this.column.id);
  }

  toggleTextFilterOverlay(): void {
    this.isTextFilterOverlayVisible = !this.isTextFilterOverlayVisible;
  }

  onMenuClose(): void {
    this.closeFilter.emit();
    // this.isTextFilterOverlayVisible = false;
  }

  showColumnAutoFilter(event: MouseEvent, textFilter: TextFilter): void {
    event.stopPropagation();

    this.onMenuClose();
    this.textFilterSelect.emit({ column: this.column, textFilter });
  }

  getSvgPathFillColor(): string {
    const columnAutofilter = this.columnAutoFilterData?.[this.column.id] || {};

    return columnAutofilter.filters && columnAutofilter.filters.length
      ? '#3a63cc'
      : '#B3B3B8';
  }

  onClearColumnFilters(event: MouseEvent): void {
    event.stopPropagation();
    this.clearColumnFilter.emit(this.column.id);
  }

  onPinColumn(event: MouseEvent, column: Column): void {
    event.stopPropagation();
    this.pinColumn.next(column);
    this.onMenuClose();
  }

  onHideColumn(event: MouseEvent, column: Column): void {
    event.stopPropagation();
    this.hideColumn.next(column);
    this.onMenuClose();
  }
}
