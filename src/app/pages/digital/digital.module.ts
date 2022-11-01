import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalComponent } from './digital.component';

import { PickListModule } from '@modules/pick-list/pick-list.module';
import { InputModule } from '@modules/input/input.module';
import { SelectModule } from '@modules/select/select.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

import { DigitalRoutingModule } from './digital-routing.module';
import { DigitalMediaProfileComponent } from './digital-media-profile/digital-media-profile.component';
import { DynamicMediaProfileModule } from '@modules/dynamic-media-profile/dynamic-media-profile.module';

@NgModule({
  declarations: [DigitalComponent, DigitalMediaProfileComponent],
  providers: [SelectedCriteriaService],
  imports: [
    CommonModule,
    DigitalRoutingModule,
    PickListModule,
    InputModule,
    SelectModule,
    SearchModule,
    NameInputModule,
    DynamicMediaProfileModule,
  ],
})
export class DigitalModule {}
