import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SelectedCriteriaDialogComponent } from '../selected-criteria-dialog/selected-criteria-dialog.component';
import { Criteries } from '../../models/criteries.model';

@Component({
  selector: 'app-selected-criteria',
  templateUrl: './selected-criteria.component.html',
  styleUrls: ['./selected-criteria.component.scss']
})
export class SelectedCriteriaComponent implements OnInit {
  @Input() criteries: Criteries = {};

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(SelectedCriteriaDialogComponent, {
      data: this.criteries
    })
  }
}
