import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspaperComponent } from './newspaper.component';

import { PickListModule } from '@modules/pick-list/pick-list.module';
import { InputModule } from '@modules/input/input.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';

import { NewspaperRoutingModule } from './newspaper-routing.module';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { DynamicMediaProfileModule } from '@modules/dynamic-media-profile/dynamic-media-profile.module';

@NgModule({
  declarations: [NewspaperComponent],
  providers: [SelectedCriteriaService],
  imports: [
    CommonModule,
    NewspaperRoutingModule,
    PickListModule,
    InputModule,
    SearchModule,
    NameInputModule,
    DynamicMediaProfileModule,
  ],
})
export class NewspaperModule {}
