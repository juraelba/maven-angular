import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { compose, toPairs, reduce, isEmpty } from 'ramda';

import { SelectedCriteriaDialogComponent } from '../selected-criteria-dialog/selected-criteria-dialog.component';
import { Criteries, CategoriesCriteria, LanguageCriteria } from '@models/criteries.model';
import { ListKey } from '@models/list.model';

import { ListKeys } from '@enums/lists.enum';

type Validators = {
  [key: string]: (value: any) => boolean;
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

  isLanguageEmpty({ options }: LanguageCriteria): boolean {
    return isEmpty(options);
  }

  omitEmptyCriteries(criteries: Criteries): Criteries {
    const criteriaValidators: Validators = {
      [ListKeys.categories]: this.isCategoriesEmpty.bind(this),
      [ListKeys.languages2]: this.isLanguageEmpty,
    }
  
    return compose<[Criteries], Array<[string, any]>, Criteries>(
      reduce<[ string, any ], Criteries>((acc, [ key, value ]) => {
        const validator = criteriaValidators[key] || isEmpty
  
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
      data: this.omitEmptyCriteries(this.criteries),
      width: '640px'
    })
  }
}
