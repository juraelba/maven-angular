import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toPairs } from 'ramda';

import { Criteries } from '@models/criteries.model';
import { SelectOption } from '@models/select.model';

import { selectedCriteriaConfig } from '../../data/selected-criteria-config';
import { ListKeys } from '@enums/lists.enum';
import { SearchFieldsLabelsEnum, SearchFiedlsEnum } from '@enums/search.enum';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

interface CriteriaValueStyles {
  background: string;
  color: string;
}

@Component({
  selector: 'app-selected-criteria-dialog',
  templateUrl: './selected-criteria-dialog.component.html',
  styleUrls: ['./selected-criteria-dialog.component.scss']
})
export class SelectedCriteriaDialogComponent implements OnInit {
  criteries: [string, any][] = [];
  labels: any = SearchFieldsLabelsEnum;
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

  updateCriteria(criteria: Criteries, option: SelectOption, key: string): Criteries {
    const options = this.filterOptions(criteria.options, option.value);

    return {
      ...this.data,
      [key]: {
        ...this.data[key],
        options
      }
    }
  }

  onRemoveCriteriaClick(key: string, option: SelectOption) {
    const workingCriteria = this.data[key];
    const complexCriteriaData = [ ListKeys.categories, ListKeys.markets, ListKeys.diversetargets, ListKeys.languages2 ] as string[];

    let newData = {};

    if (complexCriteriaData.includes(key)) {
      newData = this.updateCriteria(workingCriteria, option, key);
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

  getStyles(key: string): CriteriaValueStyles {
    return {
      'background': this.config[key]?.bg || this.config.default.bg,
      'color': this.config[key]?.color  || this.config.default.color
    }
  }

  onRemoveMatchedToCriteriaClick(event: MouseEvent): void {
    event.stopPropagation();

    this.data[SearchFiedlsEnum.matchedTo] = {
      ...this.data[SearchFiedlsEnum.matchedTo],
      matchedTo: ''
    };

    this.criteries = toPairs(this.data);
  }

  onRemoveSearchNameCriteriaClick(event: MouseEvent): void {
    event.stopPropagation();

    this.data[SearchFiedlsEnum.name] = '';

    this.criteries = toPairs(this.data);
  }
}
