import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchMenuBarModule } from '../search-menu-bar/search-menu-bar.module';
import { SelectedCriteriaModule } from '../selected-criteria/selected-criteria.module';
import { TableModule } from '../table/table.module';
import { SpinnerModule } from '../../../ui-kit/spinner/spinner.module';

import { SearchComponent } from './search.component';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchMenuBarModule,
    SelectedCriteriaModule,
    TableModule,
    SpinnerModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
