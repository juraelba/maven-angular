import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  ViewChild,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateTime } from 'luxon';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { StyleTypesEnum } from '@enums/styles.enum';

export const FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
  },
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: FORMAT },
  ],
})
export class DatepickerComponent implements OnInit, OnChanges {
  @Input() opened: boolean = false;
  @Input() date: DateTime | null;
  @Input() label: string = '';
  @Input() styleType: StyleTypesEnum = StyleTypesEnum.primary;

  @Output() dateChange: EventEmitter<DateTime | null> = new EventEmitter();

  @ViewChild('picker') picker: MatDatepicker<any>;

  value = new FormControl();

  constructor() {}

  ngOnInit(): void {
    if (this.date) {
      this.value.setValue(this.date.toISO());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.date &&
      changes.date.currentValue !== changes.date.previousValue
    ) {
      this.value.setValue(changes.date.currentValue?.toISO() || null);
    }
  }

  openDatepicker(): void {
    this.opened = true;
  }

  onSelectedChange(event: MatDatepickerInputEvent<Date | null>): void {
    this.date = event.value
      ? DateTime.fromISO(event.value.toISOString())
      : null;

    this.dateChange.emit(this.date);
  }

  onDatepickerClose(): void {
    this.opened = false;
  }
}
