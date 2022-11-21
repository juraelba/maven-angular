import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegionalCableComponent } from './regional-cable.component';

const routes: Routes = [{ path: '', component: RegionalCableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegionalCableRoutingModule {}
