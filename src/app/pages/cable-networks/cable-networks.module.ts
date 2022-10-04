import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CableNetworksComponent } from './cable-networks.component';

import { PickListModule } from '@modules/pick-list/pick-list.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { InputModule } from '@modules/input/input.module';
import { SelectModule } from '@modules/select/select.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';
import { CableNetworksRoutingModule } from './cable-networks-routing.module';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { CableNetworkComponent } from './cable-network/cable-network.component';


@NgModule({
  declarations: [
    CableNetworksComponent,
    CableNetworkComponent
  ],
  providers: [
    SelectedCriteriaService
  ],
  imports: [
    CommonModule,
    CableNetworksRoutingModule,
    PickListModule,
    CheckboxModule,
    InputModule,
    SelectModule,
    SearchModule,
    NameInputModule
  ]
})
export class CableNetworksModule { }
