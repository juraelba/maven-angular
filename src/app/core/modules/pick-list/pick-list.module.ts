import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CategoryPickListComponent } from './category-pick-list/category-pick-list.component';
import { SelectModule } from '../select/select.module';
import { CheckboxModule } from '../checkbox/checkbox.module';

import { ListsService } from '../../services/lists/lists.service';

@NgModule({
  declarations: [
    CategoryPickListComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    CheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  providers: [
    ListsService
  ],
  exports: [
    CategoryPickListComponent
  ]
})
export class PickListModule { }
