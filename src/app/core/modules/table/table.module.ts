import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { UtilsService } from '@services/utils/utils.service';

import { TableComponent } from './table.component';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    DragDropModule
  ],
  providers: [
    UtilsService
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
