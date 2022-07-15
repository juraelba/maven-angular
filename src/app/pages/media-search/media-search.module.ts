import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PickListModule } from '../../core/modules/pick-list/pick-list.module';
import { CheckboxModule } from '../../core/modules/checkbox/checkbox.module';
import { InputModule } from '../../core/modules/input/input.module';
import { SelectModule } from '../../core/modules/select/select.module';
import { SelectedCriteriaModule } from '../../core/modules/selected-criteria/selected-criteria.module';

import { SelectedCriteriaService } from '../../core/services/selected-criteria/selected-criteria.service';

import { MediaSearchRoutingModule } from './media-search-routing.module';
import { MediaSearchComponent } from './media-search.component';

@NgModule({
  declarations: [
    MediaSearchComponent,
  ],
  providers: [
    SelectedCriteriaService
  ],
  imports: [
    CommonModule,
    MediaSearchRoutingModule,
    MatCheckboxModule,
    PickListModule,
    CheckboxModule,
    InputModule,
    SelectModule,
    SelectedCriteriaModule
  ]
})
export class MediaSearchModule { }
