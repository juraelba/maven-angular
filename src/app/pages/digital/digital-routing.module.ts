import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaProfileResolver } from '@resolvers/media-profile/media-profile.resolver';
import { DigitalMediaProfileComponent } from './digital-media-profile/digital-media-profile.component';

import { DigitalComponent } from './digital.component';

const routes: Routes = [
  { path: '', component: DigitalComponent },
  {
    path: ':id',
    component: DigitalMediaProfileComponent,
    resolve: {
      mediaProfile: MediaProfileResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalRoutingModule {}
