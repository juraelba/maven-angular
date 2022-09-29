import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaProfileResolver } from 'src/app/core/resolvers/media-profile/media-profile.resolver';
import { SpotTvMediaProfileComponent } from './spot-tv-media-profile/spot-tv-media-profile.component';

import { SpotTvComponent } from './spot-tv.component';

const routes: Routes = [
  { path: '', component: SpotTvComponent },
  {
    path: ':id',
    component: SpotTvMediaProfileComponent,
    resolve: {
      mediaProfile: MediaProfileResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotTvRoutingModule { }
