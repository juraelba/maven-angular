import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NationalAudioComponent } from './national-audio.component';

import { PickListModule } from '@modules/pick-list/pick-list.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { InputModule } from '@modules/input/input.module';
import { SelectModule } from '@modules/select/select.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

import { NationalAudioRoutingModule } from './national-audio-routing.module';

@NgModule({
  declarations: [
    NationalAudioComponent
  ],
  providers: [
    SelectedCriteriaService
  ],
  imports: [
    CommonModule,
    NationalAudioRoutingModule,
    PickListModule,
    CheckboxModule,
    InputModule,
    SelectModule,
    SearchModule,
    NameInputModule
  ]
})
export class NationalAudioModule { }
