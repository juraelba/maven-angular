import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CableNetworkComponent } from './cable-network/cable-network.component';

import { CableNetworksComponent } from './cable-networks.component';

const routes: Routes = [
  { path: '', component: CableNetworksComponent },
  { path: ':id', component: CableNetworkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CableNetworksRoutingModule { }
