import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './click-outside/click-outside.directive';
import { AutoFocusDirective } from './auto-focus/auto-focus.directive';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    AutoFocusDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClickOutsideDirective,
    AutoFocusDirective
  ]
})
export class DirectivesModule { }
