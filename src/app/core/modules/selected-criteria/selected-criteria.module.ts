import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { SelectedCriteriaDialogModule } from '../selected-criteria-dialog/selected-criteria-dialog.module';

import { SelectedCriteriaComponent } from './selected-criteria.component';

@NgModule({
  declarations: [
    SelectedCriteriaComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    SelectedCriteriaDialogModule
  ],
  exports: [
    SelectedCriteriaComponent
  ]
})
export class SelectedCriteriaModule { }
