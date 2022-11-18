import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { DatepickerComponent } from './datepicker.component';

import { SvgIconModule } from '@modules/svg-icon/svg-icon.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { AppDateAdapter } from '../../configs/custom-date-adapter';

@NgModule({
  declarations: [DatepickerComponent],
  imports: [
    CommonModule,
    OverlayModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [DatepickerComponent],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: AppDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  //   },
  // ],
})
export class DatepickerModule {}
