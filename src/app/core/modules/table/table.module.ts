import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';

import { UtilsService } from '@services/utils/utils.service';

import { DirectivesModule } from '../../directives/directives.module';

import { TableComponent } from './table.component';

import { SvgIconModule } from '@modules/svg-icon/svg-icon.module';
import { SelectModule } from '@modules/select/select.module';
import { InputModule } from '@modules/input/input.module';

import { ColumnAutoFilterComponent } from './column-auto-filter/column-auto-filter.component';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { FilterComponent } from './filter/filter.component';
import { ResizerComponent } from './resizer/resizer.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TableComponent,
    ColumnAutoFilterComponent,
    ColumnFilterComponent,
    FilterComponent,
    ResizerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ScrollingModule,
    DragDropModule,
    OverlayModule,
    DirectivesModule,
    SvgIconModule,
    SelectModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UtilsService
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
