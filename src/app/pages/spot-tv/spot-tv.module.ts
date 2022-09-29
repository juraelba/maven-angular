import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotTvRoutingModule } from './spot-tv-routing.module';
import { PickListModule } from '@modules/pick-list/pick-list.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { InputModule } from '@modules/input/input.module';
import { SelectModule } from '@modules/select/select.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';

import { SpotTvComponent } from './spot-tv.component';
import { SpotTvMediaProfileComponent } from './spot-tv-media-profile/spot-tv-media-profile.component';
import { SvgIconModule } from '@modules/svg-icon/svg-icon.module';
import { TableModule } from '@modules/table/table.module';
import { DynamicMediaProfileModule } from '@modules/dynamic-media-profile/dynamic-media-profile.module';

@NgModule({
  declarations: [
    SpotTvComponent,
    SpotTvMediaProfileComponent,
  ],
  imports: [
    CommonModule,
    SpotTvRoutingModule,
    PickListModule,
    CheckboxModule,
    InputModule,
    SelectModule,
    SvgIconModule,
    SearchModule,
    NameInputModule,
    TableModule,
    DynamicMediaProfileModule
  ]
})
export class SpotTvModule { }
