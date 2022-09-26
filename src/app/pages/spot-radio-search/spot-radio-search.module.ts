import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { SpotRadioSearchComponent } from './spot-radio-search.component';
import { SpotRadioMediaProfileComponent } from './spot-radio-media-profile/spot-radio-media-profile.component';

import { SpotRadioSearchRoutingModule } from './spot-radio-search-routing.module';
import { PickListModule } from '@modules/pick-list/pick-list.module';
import { NameInputModule } from '@modules/name-input/name-input.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { SearchModule } from '@modules/search/search.module';
import { SvgIconModule } from '@modules/svg-icon/svg-icon.module';
import { InputModule } from '@modules/input/input.module';
import { TableModule } from '@modules/table/table.module';
import { SpotRadioListComponent } from './spot-radio-list/spot-radio-list.component';


@NgModule({
  declarations: [
    SpotRadioSearchComponent,
    SpotRadioMediaProfileComponent,
    SpotRadioListComponent
  ],
  imports: [
    CommonModule,
    SpotRadioSearchRoutingModule,
    PickListModule,
    NameInputModule,
    CheckboxModule,
    SearchModule,
    SvgIconModule,
    MatDialogModule,
    InputModule,
    TableModule
  ]
})
export class SpotRadioSearchModule { }
