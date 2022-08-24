import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputModule } from '../input/input.module';

import { NameInputComponent } from './name-input.component';

@NgModule({
  declarations: [
    NameInputComponent
  ],
  imports: [
    CommonModule,
    InputModule
  ],
  exports: [
    NameInputComponent
  ]
})
export class NameInputModule { }
