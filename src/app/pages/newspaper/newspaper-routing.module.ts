import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewspaperComponent } from './newspaper.component';

const routes: Routes = [
  { path: '', component: NewspaperComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewspaperRoutingModule { }
