import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { MatModule } from 'src/app/mat/mat.module';
@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SpinnerModule { }
