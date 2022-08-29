import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { compose, toPairs, reduce, isEmpty, always, mapObjIndexed } from 'ramda';

import { SelectedCriteriaDialogComponent } from '../selected-criteria-dialog/selected-criteria-dialog.component';
import { Criteries, CategoriesCriteria, LanguageCriteria } from '@models/criteries.model';

import { SearchFiedlsEnum } from '@enums/search.enum';

type Validators = {
  [key: string]: (value: any) => boolean;
}

type ComplexCriteriaData = CategoriesCriteria | LanguageCriteria;

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

  isComplexCriteriaDataEmpty({ options }: ComplexCriteriaData): boolean {
    return isEmpty(options);
  }

  omitNotValidCriteries(criteries: Criteries): Criteries {
    const criteriaValidators: Validators = {
      [SearchFiedlsEnum.categories]: this.isComplexCriteriaDataEmpty,
      [SearchFiedlsEnum.languages2]: this.isComplexCriteriaDataEmpty,
      [SearchFiedlsEnum.diversetargets]: this.isComplexCriteriaDataEmpty,
      [SearchFiedlsEnum.markets]: this.isComplexCriteriaDataEmpty,
      [SearchFiedlsEnum.metric]: always(true),
      [SearchFiedlsEnum.matchedTo]: always(true),
      [SearchFiedlsEnum.slogan]: always(true),
      [SearchFiedlsEnum.name]: always(true)
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
      data: this.omitNotValidCriteries(this.criteries),
      width: '640px'
    })
  }
}
