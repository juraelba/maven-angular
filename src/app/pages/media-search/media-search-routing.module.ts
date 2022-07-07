import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediaSearchComponent } from '../media-search/media-search.component';

const routes: Routes = [
  { path: '', component: MediaSearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaSearchRoutingModule { }
