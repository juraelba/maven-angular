import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotTvRoutingModule } from './spot-tv-routing.module';
import { PickListModule } from '@modules/pick-list/pick-list.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { InputModule } from '@modules/input/input.module';
import { SelectModule } from '@modules/select/select.module';
import { SearchModule } from '@modules/search/search.module';

import { SpotTvComponent } from './spot-tv.component';

@NgModule({
  declarations: [
    SpotTvComponent
  ],
  imports: [
    CommonModule,
    SpotTvRoutingModule,
    PickListModule,
    CheckboxModule,
    InputModule,
    SelectModule,
    SearchModule
  ]
})
export class SpotTvModule { }
