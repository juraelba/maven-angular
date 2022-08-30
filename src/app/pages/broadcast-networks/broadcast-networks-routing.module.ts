import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BroadcastNetworksComponent } from './broadcast-networks.component';

const routes: Routes = [
  { path: '', component: BroadcastNetworksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BroadcastNetworksRoutingModule { }
