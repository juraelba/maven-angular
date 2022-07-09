import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    InputModule
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
