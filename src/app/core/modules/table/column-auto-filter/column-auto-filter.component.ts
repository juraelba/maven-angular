import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TextFiltersLabelsEnum, FilterOperatorEnum } from '@enums/filters.enum';

import {
  Column,
  FilterOperatorKey,
  Filter,
  TextFilterKey,
} from '@models/table.model';

interface SelectFilterEvent {
  id: string;
  textFilterType: TextFilterKey;
}

interface ChangeFilterValueEvent {
  id: string;
  value: string;
}

interface ApplyFilterEvent {
  id: string;
  filters: Filter[];
}

@Component({
  selector: 'app-column-auto-filter',
  templateUrl: './column-auto-filter.component.html',
  styleUrls: ['./column-auto-filter.component.scss'],
})
export class ColumnAutoFilterComponent implements OnInit {
  @Input() column: Column;
  @Input() filters: Filter[] = [];

  @Output() applyFilter: EventEmitter<ApplyFilterEvent> = new EventEmitter();
  @Output() cancelFilter: EventEmitter<string> = new EventEmitter();
  @Output() clearFilter: EventEmitter<string> = new EventEmitter();

  _filters: Filter[] = [];

  constructor() {}

  ngOnInit(): void {
    this._filters = [...this.filters];
  }

  onClearFilterButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    this._filters = [];
    this.clearFilter.emit(this.column.id);
  }

  onCancelButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    this._filters = [...this.filters];
    this.cancelFilter.emit(this.column.id);
  }

  onApplyButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    this.applyFilter.emit({ id: this.column.id, filters: this._filters });
  }

  addFilter(event: MouseEvent): void {
    event.stopPropagation();

    const filter: Filter = {
      id: new Date().getTime().toString(),
      textFilterType: '',
      textFilterLabel: '',
      value: '',
      operator: FilterOperatorEnum.AND,
    };

    this._filters.push(filter);
  }

  onFilterRemove(id: string): void {
    this._filters = this._filters.filter((filter) => filter.id !== id);
  }

  onFilterSelect({ id, textFilterType }: SelectFilterEvent): void {
    this._filters = this._filters.map((filter) => {
      if (filter.id === id) {
        return {
          ...filter,
          textFilterType,
          textFilterLabel: textFilterType
            ? TextFiltersLabelsEnum[textFilterType]
            : '',
        };
      }

      return filter;
    });
  }

  onFilterValueChange({ id, value }: ChangeFilterValueEvent): void {
    this._filters = this._filters.map((filter) => ({
      ...filter,
      value: filter.id === id ? value : filter.value,
    }));
  }

  changeOperator(
    event: MouseEvent,
    operator: FilterOperatorKey,
    id: string
  ): void {
    event.stopPropagation();

    this._filters = this._filters.map((filter) => ({
      ...filter,
      operator: filter.id === id ? operator : filter.operator,
    }));
  }

  getBorderLabel(filter: Filter): string {
    return filter.textFilterType ? 'Select Filter' : '';
  }

  trackByFilterId(index: number, filter: Filter): string {
    return filter.id;
  }
}
