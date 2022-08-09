import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { UtilsService } from '@services/utils/utils.service';

import { TableComponent } from './table.component';

import { ResizerModule } from '../resizer/resizer.module';
import { ColumnFilterModule } from '../column-filter/column-filter.module';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    DragDropModule,
    ResizerModule,
    ColumnFilterModule
  ],
  providers: [
    UtilsService
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
