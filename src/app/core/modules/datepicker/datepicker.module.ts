import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DatepickerComponent } from './datepicker.component';

import { SvgIconModule } from '@modules/svg-icon/svg-icon.module';

@NgModule({
  declarations: [
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SvgIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DatepickerComponent,
  ]
})
export class DatepickerModule { }