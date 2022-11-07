import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CirculationComponent } from './circulation.component';
import { PipeModule } from 'src/app/ui-kit/pipe/pipe.module';

@NgModule({
  declarations: [CirculationComponent],
  imports: [CommonModule, PipeModule],
  exports: [CirculationComponent],
})
export class CirculationModule {}
