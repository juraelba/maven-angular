import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PickListModule } from '@modules/pick-list/pick-list.module';
import { CheckboxModule } from '@modules/checkbox/checkbox.module';
import { InputModule } from '@modules/input/input.module';
import { SelectModule } from '@modules/select/select.module';
import { BroadcastNetworksRoutingModule } from './broadcast-networks-routing.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

import { BroadcastNetworksComponent } from './broadcast-networks.component';
import { BroadcastNetworkComponent } from './broadcast-network/broadcast-network.component';
import { DynamicMediaProfileModule } from '@modules/dynamic-media-profile/dynamic-media-profile.module';

@NgModule({
  declarations: [
    BroadcastNetworksComponent,
    BroadcastNetworkComponent,
  ],
  providers: [
    SelectedCriteriaService
  ],
  imports: [
    CommonModule,
    BroadcastNetworksRoutingModule,
    MatCheckboxModule,
    PickListModule,
    CheckboxModule,
    InputModule,
    SelectModule,
    SearchModule,
    NameInputModule,
    DynamicMediaProfileModule
  ]
})
export class BroadcastNetworksModule { }
