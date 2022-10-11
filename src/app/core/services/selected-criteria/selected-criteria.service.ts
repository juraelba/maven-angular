import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Criteries, SelectedCriteriaEvent } from '../../models/criteries.model';


@Injectable({
  providedIn: 'root'
})
export class SelectedCriteriaService {
  selectedCriteria$: Subject<SelectedCriteriaEvent> = new Subject();
  criteries: { [key: string]: Criteries };
  constructor() { }

  update(data: any, screen: string) {
    this.selectedCriteria$.next({ action: 'update', data });
    this.criteries?.[screen]
      ? this.criteries[screen] = data
      : this.criteries = { ...this.criteries, [screen]: data };
  }
}
