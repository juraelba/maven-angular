import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicListComponent } from './dynamic-list.component';
import { InputModule } from '@modules/input/input.module';
import { PickListModule } from '@modules/pick-list/pick-list.module';
import { SearchModule } from '@modules/search/search.module';
import { SvgIconModule } from '@modules/svg-icon/svg-icon.module';
import { TableModule } from '@modules/table/table.module';

@NgModule({
  declarations: [DynamicListComponent],
  imports: [
    CommonModule,
    PickListModule,
    InputModule,
    SvgIconModule,
    SearchModule,
    TableModule,
  ],
  exports: [DynamicListComponent],
  providers: [],
})
export class DynamicListModule { }
