import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickListModule } from '@modules/pick-list/pick-list.module';
import { InputModule } from '@modules/input/input.module';
import { SelectModule } from '@modules/select/select.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';
import { MatchedToModule } from '@modules/matched-to/matched-to.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { DatepickerModule } from '@modules/datepicker/datepicker.module';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

import { DiverseRoutingModule } from './diverse-routing.module';

import { DiverseComponent } from './diverse.component';

@NgModule({
  declarations: [
    DiverseComponent
  ],
  providers: [
    SelectedCriteriaService
  ],
  imports: [
    CommonModule,
    DiverseRoutingModule,
    PickListModule,
    InputModule,
    SelectModule,
    SearchModule,
    NameInputModule,
    MatchedToModule,
    CheckboxModule,
    DatepickerModule
  ]
})
export class DiverseModule { }
