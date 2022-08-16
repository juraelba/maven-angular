import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {FormControl} from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { Filter, TextFilter, TextFilterKey } from '@models/table.model';

import { TEXT_FILTERS } from '../../../data/constants';

interface SelectFilterEvent {
  id: string;
  textFilterType: TextFilterKey;
}

interface ChangeFilterValueEvent {
  id: string;
  value: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() filter: Filter;

  @Output() removeFilter: EventEmitter<string> = new EventEmitter();
  @Output() selectFilter: EventEmitter<SelectFilterEvent> = new EventEmitter();
  @Output() changeFilterValue: EventEmitter<ChangeFilterValueEvent> = new EventEmitter();

  options: TextFilter[] = [];
  borderLabel: string;
  filterValueFormControl = new FormControl();

  filterValueChangeSuscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.borderLabel = this.getBorderLabel(this.filter);
    this.options = this.getFilterOptions(this.filter);

    this.filterValueFormControl.setValue(this.filter.value)

    this.filterValueChangeSuscription = this.filterValueFormControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.changeFilterValue.emit({ id: this.filter.id, value });
      });
  }

  ngOnDestroy(): void {
    this.filterValueChangeSuscription.unsubscribe();
  }

  getFilterOptions({ textFilterType }: Filter): TextFilter[] {
    return TEXT_FILTERS.map((textFilter) => ({ ...textFilter, selected: textFilter.value === textFilterType}))
  }

  getBorderLabel(filter: Filter): string {
    return filter.textFilterType ? 'Select Filter' : '' ;
  }

  onRemoveFilterClick(event: MouseEvent, id: string): void {
    event.stopPropagation();

    this.removeFilter.emit(id);
  }

  selectTextFilterOption(event: MouseEvent, textFilter: TextFilter): void {
    event.stopPropagation();

    this.selectFilter.emit({ id: this.filter.id, textFilterType: textFilter.value });
  }
}
