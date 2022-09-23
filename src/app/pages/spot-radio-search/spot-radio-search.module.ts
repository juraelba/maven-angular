import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotRadioSearchComponent } from './spot-radio-search.component';
import { SpotRadioMediaProfileComponent } from './spot-radio-media-profile/spot-radio-media-profile.component';

import { SpotRadioSearchRoutingModule } from './spot-radio-search-routing.module';
import { PickListModule } from '@modules/pick-list/pick-list.module';
import { NameInputModule } from '@modules/name-input/name-input.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { SearchModule } from '@modules/search/search.module';
import { SvgIconModule } from '@modules/svg-icon/svg-icon.module';


@NgModule({
  declarations: [
    SpotRadioSearchComponent,
    SpotRadioMediaProfileComponent
  ],
  imports: [
    CommonModule,
    SpotRadioSearchRoutingModule,
    PickListModule,
    NameInputModule,
    CheckboxModule,
    SearchModule,
    SvgIconModule
  ]
})
export class SpotRadioSearchModule { }
