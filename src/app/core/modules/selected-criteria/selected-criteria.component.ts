import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SelectedCriteriaDialogComponent } from '../selected-criteria-dialog/selected-criteria-dialog.component';
import { Criteries, CategoriesCriteria } from '@models/criteries.model';
import { compose, toPairs, reduce, isEmpty } from 'ramda';

interface Validators {
  [categories: string]: (value: CategoriesCriteria) => boolean;
  default: (value: any) => boolean
}

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

  isCategoriesEmpty({ categories }: CategoriesCriteria): boolean {
    return isEmpty(categories);
  }

  omitEmtyCriteries(criteries: Criteries): Criteries {
    const criteriaValidators: Validators = {
      categories: this.isCategoriesEmpty,
      default: isEmpty
    }
  
    return compose<[Criteries], Array<[string, any]>, Criteries>(
      reduce<[ string, any ], Criteries>((acc, [ key, value ]) => {
        const validator = criteriaValidators[key] || criteriaValidators.default;
  
        if(validator(value)) {
          return acc;
        }

        acc[key] = value;

        return acc;
      }, {}),
      toPairs
    )(criteries);
  }

  openDialog(): void {
    this.dialog.open(SelectedCriteriaDialogComponent, {
      data: this.omitEmtyCriteries(this.criteries),
      width: '640px'
    })
  }
}
