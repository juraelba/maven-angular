import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastNetworkComponent } from './broadcast-network/broadcast-network.component';

import { BroadcastNetworksComponent } from './broadcast-networks.component';

const routes: Routes = [
  { path: '', component: BroadcastNetworksComponent },
  { path: ':id', component: BroadcastNetworkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BroadcastNetworksRoutingModule { }
