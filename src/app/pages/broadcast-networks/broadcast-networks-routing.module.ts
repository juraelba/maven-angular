import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaProfileResolver } from '@resolvers/media-profile/media-profile.resolver';
import { BroadcastNetworkComponent } from './broadcast-network/broadcast-network.component';

import { BroadcastNetworksComponent } from './broadcast-networks.component';

const routes: Routes = [
  { path: '', component: BroadcastNetworksComponent },
  {
    path: ':id',
    component: BroadcastNetworkComponent,
    resolve: { mediaProfile: MediaProfileResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BroadcastNetworksRoutingModule {}
