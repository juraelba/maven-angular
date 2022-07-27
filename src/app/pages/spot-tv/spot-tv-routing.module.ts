import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpotTvComponent } from './spot-tv.component';

const routes: Routes = [
  { path: '', component: SpotTvComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotTvRoutingModule { }
