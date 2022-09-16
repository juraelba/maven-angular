import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiverseComponent } from './diverse.component';

const routes: Routes = [
  { path: '', component: DiverseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiverseRoutingModule { }
