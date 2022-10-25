import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaProfileResolver } from '@resolvers/media-profile/media-profile.resolver';
import { OutOfHomeComponent } from './out-of-home.component';

const routes: Routes = [{ path: '', component: OutOfHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutOfHomeRoutingModule {}
