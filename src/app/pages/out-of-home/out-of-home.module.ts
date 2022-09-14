import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutOfHomeComponent } from './out-of-home.component';

import { PickListModule } from '@modules/pick-list/pick-list.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { InputModule } from '@modules/input/input.module';
import { SelectModule } from '@modules/select/select.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';
import { OutOfHomeRoutingModule } from './out-of-home-routing.module';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

@NgModule({
  declarations: [
    OutOfHomeComponent
  ],
  providers: [
    SelectedCriteriaService
  ],
  imports: [
    CommonModule,
    OutOfHomeRoutingModule,
    PickListModule,
    CheckboxModule,
    InputModule,
    SelectModule,
    SearchModule,
    NameInputModule
  ]
})
export class OutOfHomeModule { }
