import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';

import { CheckboxModule } from '../checkbox/checkbox.module';
import { InputModule } from '../input/input.module';

import { SelectComponent } from './select.component';

import { ClickOutsideDirective } from '../../directives/click-outside/click-outside.directive';


@NgModule({
  declarations: [
    SelectComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    InputModule,
    MatTooltipModule,
    ScrollingModule,
    OverlayModule
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
