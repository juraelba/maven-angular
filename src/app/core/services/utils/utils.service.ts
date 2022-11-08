import { Injectable } from '@angular/core';
import * as R from 'ramda';

import { SortMethodsEnum } from '@enums/sorting-options.enum';
import { SortMethods } from '@models/sorting-options.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  routeNestCount$: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor() {}

  sortByAlphabeticalOrder<Option>(
    options: Option[],
    sort: SortMethods,
    propPath?: string[]
  ): Option[] {
    const propLens = R.lensPath(propPath || []);

    return R.sort<Option>((a, b) => {
      const first = propPath ? R.view(propLens, a) : a;
      const second = propPath ? R.view(propLens, b) : b;

      const shouldMoveBack =
        sort === SortMethodsEnum.ascend ? first < second : first > second;
      const shouldMoveForward =
        sort === SortMethodsEnum.ascend ? first > second : first < second;

      if (shouldMoveBack) {
        return -1;
      }

      if (shouldMoveForward) {
        return 1;
      }

      return 0;
    }, options);
  }
}
