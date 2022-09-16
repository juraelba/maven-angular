import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchedToComponent } from './matched-to.component';

import { InputModule } from '../input/input.module';
import { CheckboxModule } from '../checkbox/checkbox.module';

@NgModule({
  declarations: [
    MatchedToComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    InputModule
  ],
  exports: [
    MatchedToComponent
  ]
})
export class MatchedToModule { }
