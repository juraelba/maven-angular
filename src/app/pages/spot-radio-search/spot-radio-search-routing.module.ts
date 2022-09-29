import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpotRadioSearchComponent } from './spot-radio-search.component';
import { SpotRadioMediaProfileComponent } from './spot-radio-media-profile/spot-radio-media-profile.component';

import { MediaProfileResolver } from '@resolvers/media-profile/media-profile.resolver';

const routes: Routes = [
  { path: '', component: SpotRadioSearchComponent },
  {
    path: ':id',
    component: SpotRadioMediaProfileComponent,
    resolve: {
      mediaProfile: MediaProfileResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotRadioSearchRoutingModule { }
