import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SelectedCriteriaEvent } from '../../models/criteries.model';


@Injectable({
  providedIn: 'root'
})
export class SelectedCriteriaService {
  selectedCriteria$: Subject<SelectedCriteriaEvent> = new Subject();

  constructor() { }

  update(data: any) {
    this.selectedCriteria$.next({ action: 'update', data });
  }
}
