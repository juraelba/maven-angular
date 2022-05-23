import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlTestComponent } from './control-test/control-test.component';

const routes: Routes = [
  { path: '', redirectTo: 'control-test', pathMatch: 'full' },
  { path: 'control-test', component: ControlTestComponent },
  { path: '**', redirectTo: 'control-test' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
