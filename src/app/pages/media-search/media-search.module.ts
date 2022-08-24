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

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

import { MediaSearchComponent } from './media-search.component';
import { MatchedToComponent } from './matched-to/matched-to.component';

@NgModule({
  declarations: [
    MediaSearchComponent,
    MatchedToComponent
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
    NameInputModule
  ]
})
export class MediaSearchModule { }
