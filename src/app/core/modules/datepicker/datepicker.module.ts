import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { DatepickerComponent } from './datepicker.component';

import { SvgIconModule } from '@modules/svg-icon/svg-icon.module';
import { CustomDateAdapter } from '../../configs/custom-date-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  ],
  exports: [DatepickerComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
})
export class DatepickerModule {}
