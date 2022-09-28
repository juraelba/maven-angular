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
import { SpotTvListComponent } from './spot-tv-list/spot-tv-list.component';
import { TableModule } from '@modules/table/table.module';

@NgModule({
  declarations: [
    SpotTvComponent,
    SpotTvMediaProfileComponent,
    SpotTvListComponent
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
  ]
})
export class SpotTvModule { }
