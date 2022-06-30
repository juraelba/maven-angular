import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SideNavComponent } from './main-layout/side-nav/side-nav.component';
import { TopNavComponent } from './main-layout/top-nav/top-nav.component';
import { MatModule } from '../mat/mat.module'

@NgModule({
  declarations: [
    AuthLayoutComponent,
    MainLayoutComponent,
    SideNavComponent,
    TopNavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatModule
  ],
  exports: [
    AuthLayoutComponent,
    MainLayoutComponent,
  ]
})
export class LayoutModule { }

