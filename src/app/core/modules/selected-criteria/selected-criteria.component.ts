import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { compose, toPairs, reduce, isEmpty, always } from 'ramda';

import { SelectedCriteriaDialogComponent } from '../selected-criteria-dialog/selected-criteria-dialog.component';
import { Criteries, CategoriesCriteria, LanguageCriteria, MatchedToCriteria } from '@models/criteries.model';

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

  isMatchedToEmpty({ matchedTo }: MatchedToCriteria): boolean {
    return isEmpty(matchedTo);
  }

  isSearchNameEmpty(name: string): boolean {
    return isEmpty(name);
  }

  omitNotValidCriteries(criteries: Criteries): Criteries {
    const criteriaValidators: Validators = {
      [SearchFiedlsEnum.categories]: this.isComplexCriteriaDataEmpty,
      [SearchFiedlsEnum.languages2]: this.isComplexCriteriaDataEmpty,
      [SearchFiedlsEnum.diversetargets]: this.isComplexCriteriaDataEmpty,
      [SearchFiedlsEnum.markets]: this.isComplexCriteriaDataEmpty,
      [SearchFiedlsEnum.matchedTo]: this.isMatchedToEmpty,
      [SearchFiedlsEnum.name]: this.isSearchNameEmpty,
      [SearchFiedlsEnum.slogan]: always(true),
      [SearchFiedlsEnum.metric]: always(true),
      [SearchFiedlsEnum.nonComms]: always(true),
      [SearchFiedlsEnum.addDirector]: always(true),
      [SearchFiedlsEnum.mavenId]: always(true)
    };

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
