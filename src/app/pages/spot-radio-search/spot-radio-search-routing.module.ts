import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpotRadioSearchComponent } from './spot-radio-search.component';

const routes: Routes = [
  { path: '', component: SpotRadioSearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotRadioSearchRoutingModule { }
