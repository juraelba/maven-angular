import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toPairs } from 'ramda';

import { Criteries } from '../../models/criteries.model';
import { SelectOption } from '../../models/select.model';
import { selectedCriteriaConfig } from '../../data/selected-criteria-config';
import { ListLabels } from '../../enums/lists.enum';

import { SelectedCriteriaService } from '../../services/selected-criteria/selected-criteria.service';

@Component({
  selector: 'app-selected-criteria-dialog',
  templateUrl: './selected-criteria-dialog.component.html',
  styleUrls: ['./selected-criteria-dialog.component.scss']
})
export class SelectedCriteriaDialogComponent implements OnInit {
  criteries: any[][] = [];
  labels: any = ListLabels;
  config = selectedCriteriaConfig;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Criteries,
    private dialogRef: MatDialogRef<SelectedCriteriaDialogComponent>,
    private selectedCriteriaService: SelectedCriteriaService
  ) { }

  ngOnInit(): void {
    this.criteries = toPairs(this.data);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  filterOptions(options: SelectOption[], value: string): SelectOption[] {
    return options.filter((option) => value !== option.value);
  }

  onRemoveCriteriaClick(key: string, option: SelectOption) {
    const workingCriteria = this.data[key];

    let newData = {};

    if (key === 'categories') {
      const newCriteriOptions = this.filterOptions(workingCriteria.categories, option.value);

      newData = {
        ...this.data,
        [key]: {
          ...this.data[key],
          categories: newCriteriOptions
        }
      }
    } else {
      newData = {
        ...this.data,
        [key]: this.filterOptions(workingCriteria, option.value)
      };
    }

    this.data = newData;
    this.criteries = toPairs(newData);
  }

  finishEditing(): void {
    this.closeDialog();

    this.selectedCriteriaService.update(this.data);
  }
}
