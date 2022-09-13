import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DigitalComponent } from './digital.component';

const routes: Routes = [
  { path: '', component: DigitalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalRoutingModule { }
