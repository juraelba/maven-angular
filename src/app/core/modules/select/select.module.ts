import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
