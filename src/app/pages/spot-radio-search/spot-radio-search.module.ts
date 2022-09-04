import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotRadioSearchComponent } from './spot-radio-search.component';

import { SpotRadioSearchRoutingModule } from './spot-radio-search-routing.module';
import { PickListModule } from '@modules/pick-list/pick-list.module';
import { NameInputModule } from '@modules/name-input/name-input.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { SearchModule } from '@modules/search/search.module';

@NgModule({
  declarations: [
    SpotRadioSearchComponent
  ],
  imports: [
    CommonModule,
    SpotRadioSearchRoutingModule,
    PickListModule,
    NameInputModule,
    CheckboxModule,
    SearchModule
  ]
})
export class SpotRadioSearchModule { }
