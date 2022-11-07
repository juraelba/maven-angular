import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaProfileResolver } from '@resolvers/media-profile/media-profile.resolver';
import { MagazineProfileComponent } from './magazine-profile/magazine-profile.component';

import { MagazineComponent } from './magazine.component';

const routes: Routes = [
  { path: '', component: MagazineComponent },
  {
    path: ':id',
    component: MagazineProfileComponent,
    resolve: {
      mediaProfile: MediaProfileResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagazineRoutingModule {}
