import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaProfileResolver } from '@resolvers/media-profile/media-profile.resolver';
import { OutOfHomeMediaProfileComponent } from './out-of-home-media-profile/out-of-home-media-profile.component';
import { OutOfHomeComponent } from './out-of-home.component';

const routes: Routes = [
  { path: '', component: OutOfHomeComponent },

  {
    path: ':id',
    component: OutOfHomeMediaProfileComponent,
    resolve: {
      mediaProfile: MediaProfileResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutOfHomeRoutingModule {}
