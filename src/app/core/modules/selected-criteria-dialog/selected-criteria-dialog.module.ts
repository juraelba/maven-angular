import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectedCriteriaDialogComponent } from './selected-criteria-dialog.component';
import { CheckboxModule } from '../checkbox/checkbox.module';

@NgModule({
  declarations: [
    SelectedCriteriaDialogComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule
  ],
  exports: [
    SelectedCriteriaDialogComponent
  ]
})
export class SelectedCriteriaDialogModule { }
