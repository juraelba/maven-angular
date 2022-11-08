import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NationalAudioProfileComponent } from '../national-audio-profile/national-audio-profile.component';

import { NationalAudioComponent } from './national-audio.component';

const routes: Routes = [
  { path: '', component: NationalAudioComponent },
  {
    path: ':id',
    component: NationalAudioProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NationalAudioRoutingModule {}
