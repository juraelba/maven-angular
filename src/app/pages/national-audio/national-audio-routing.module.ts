import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NationalAudioComponent } from './national-audio.component';

const routes: Routes = [
  { path: '', component: NationalAudioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NationalAudioRoutingModule { }
