import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorPipe } from './color.pipe';
import { LocaleDatePipe } from './locale-date.pipe';

@NgModule({
  declarations: [ColorPipe, LocaleDatePipe],
  imports: [CommonModule],
  exports: [ColorPipe, LocaleDatePipe],
})
export class PipeModule {}
