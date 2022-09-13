import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagazineComponent } from './magazine.component';

import { PickListModule } from '@modules/pick-list/pick-list.module';
import { InputModule } from '@modules/input/input.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';

import { MagazineRoutingModule } from './magazine-routing.module';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

@NgModule({
  declarations: [
    MagazineComponent
  ],
  providers: [
    SelectedCriteriaService
  ],
  imports: [
    CommonModule,
    MagazineRoutingModule,
    PickListModule,
    InputModule,
    SearchModule,
    NameInputModule
  ]
})
export class MagazineModule { }
