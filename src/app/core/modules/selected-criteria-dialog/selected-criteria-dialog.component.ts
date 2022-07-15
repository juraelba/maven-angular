import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toPairs } from 'ramda';

import { Criteries } from '../../models/criteries.model';
import { SelectOption } from '../../models/select.model';

import { SelectedCriteriaService } from '../../services/selected-criteria/selected-criteria.service';

interface Config {
  [key: string]: {
    bg: string;
    color: string;
    canDelete: boolean
  }
}

const labels = {
  mediatypes: 'Media Type',
  categories: 'Categories'
};

@Component({
  selector: 'app-selected-criteria-dialog',
  templateUrl: './selected-criteria-dialog.component.html',
  styleUrls: ['./selected-criteria-dialog.component.scss']
})
export class SelectedCriteriaDialogComponent implements OnInit {
  criteries: any[][] = [];
  labels: any = labels;

  config: Config = {
    'mediatypes': {
      bg: '#E4F2FF',
      color: '#4087F3',
      canDelete: true
    },
    'DMA': {
      bg: '#FFFBD8',
      color: '#80761E',
      canDelete: true
    },
    'Owners': {
      bg: '#E8E9FB',
      color: '#4A5BD3',
      canDelete: true
    },
    'Diverse Target': {
      bg: '#DEF3EF',
      color: '#018C76',
      canDelete: true
    },
    'categories': {
      bg: '#F6E4FF',
      color: '#931ACC',
      canDelete: true
    }
  }

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
