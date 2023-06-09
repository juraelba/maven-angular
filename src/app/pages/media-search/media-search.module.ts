import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PickListModule } from '@modules/pick-list/pick-list.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { InputModule } from '@modules/input/input.module';
import { SelectModule } from '@modules/select/select.module';
import { MediaSearchRoutingModule } from './media-search-routing.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';
import { MatchedToModule } from '@modules/matched-to/matched-to.module';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

import { MediaSearchComponent } from './media-search.component';

@NgModule({
  declarations: [
    MediaSearchComponent
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
    SearchModule,
    NameInputModule,
    MatchedToModule
  ]
})
export class MediaSearchModule { }
