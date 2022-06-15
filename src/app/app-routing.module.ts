import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
// import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  // {
  //   path: '', component: MainLayoutComponent,
  //   canActivate: [AuthGuard],
  //   resolve: { auth: AuthResolver },
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  //     },
  //   ]
  // },
  {
    path: '', component: AuthLayoutComponent,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
