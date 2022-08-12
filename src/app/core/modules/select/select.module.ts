import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';

import { CheckboxModule } from '../checkbox/checkbox.module';
import { InputModule } from '../input/input.module';

import { SelectComponent } from './select.component';

import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    InputModule,
    MatTooltipModule,
    ScrollingModule,
    OverlayModule,
    DirectivesModule
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
