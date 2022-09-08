import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CableNetworksComponent } from './cable-networks.component';

const routes: Routes = [
  { path: '', component: CableNetworksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CableNetworksRoutingModule { }
