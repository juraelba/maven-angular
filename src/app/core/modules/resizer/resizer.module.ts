import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizerComponent } from './resizer.component';

@NgModule({
  declarations: [
    ResizerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResizerComponent
  ]
})
export class ResizerModule { }
