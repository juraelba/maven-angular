import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotTvMediaProfileComponent } from './spot-tv-media-profile/spot-tv-media-profile.component';

import { SpotTvComponent } from './spot-tv.component';

const routes: Routes = [
  { path: '', component: SpotTvComponent },
  { path: ':id', component: SpotTvMediaProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotTvRoutingModule { }
