import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectedCriteriaDialogComponent } from './selected-criteria-dialog.component';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { SvgIconModule } from '../svg-icon/svg-icon.module';

@NgModule({
  declarations: [
    SelectedCriteriaDialogComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    SvgIconModule
  ],
  exports: [
    SelectedCriteriaDialogComponent
  ]
})
export class SelectedCriteriaDialogModule { }
