import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CallHistoryComponent } from './call-history.component';

const routes: Routes = [
  { path: '', component: CallHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallHistoryRoutingModule { }
