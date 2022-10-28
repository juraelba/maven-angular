import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaProfileResolver } from '@resolvers/media-profile/media-profile.resolver';
import { NewspaperMediaProfileComponent } from './newspaper-media-profile/newspaper-media-profile.component';

import { NewspaperComponent } from './newspaper.component';

const routes: Routes = [
  { path: '', component: NewspaperComponent },
  {
    path: ':id',
    component: NewspaperMediaProfileComponent,
    resolve: {
      mediaProfile: MediaProfileResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewspaperRoutingModule {}
