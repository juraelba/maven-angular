import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { DateTime } from 'luxon'; 
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
  }
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
  ]
})
export class DatepickerComponent implements OnInit {
  @Input() opened: boolean = false;
  @Input() date: DateTime | null;
  @Input() label: string = '';

  @Output() dateChange: EventEmitter<DateTime | null> = new EventEmitter();

  @ViewChild('picker') picker: MatDatepicker<any>;

  constructor() { }

  ngOnInit(): void {
  }

  openDatepicker(): void {
    this.opened = true;
  }

  onSelectedChange(event: MatDatepickerInputEvent<DateTime>): void {
    this.date = event.value

    this.dateChange.emit(this.date);
  }

  onDatepickerClose(): void {
    this.opened = false;
  }
}
