import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { ColumnFilterComponent } from './column-filter.component';

import { SelectModule } from '../select/select.module';
import { SvgIconModule } from '../svg-icon/svg-icon.module';

@NgModule({
  declarations: [
    ColumnFilterComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    SvgIconModule,
    OverlayModule
  ],
  exports: [
    ColumnFilterComponent
  ]
})
export class ColumnFilterModule { }
