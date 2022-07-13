import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CheckboxModule } from '../checkbox/checkbox.module';

import { SelectComponent } from './select.component';
import { InputModule } from '../input/input.module';

@NgModule({
  declarations: [
    SelectComponent
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
