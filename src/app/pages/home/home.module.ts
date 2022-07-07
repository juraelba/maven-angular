import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layout/layout.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
