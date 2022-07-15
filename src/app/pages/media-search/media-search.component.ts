import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Criteries } from '../../core/models/criteries.model';
import { SelectedCriteriaService } from '../../core/services/selected-criteria/selected-criteria.service';

interface CriteriesChanges {
  key: string;
  data: any
}

@Component({
  selector: 'app-media-search',
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.scss']
})
export class MediaSearchComponent implements OnInit {
  criteries: Criteries = {};

  constructor(
    private selectedCriteriService: SelectedCriteriaService
  ) { }

  ngOnInit(): void {
    this.selectedCriteriService.selectedCriteria$
      .pipe(
        map(({ data }) => data)
      )
      .subscribe((data: Criteries) => {
        this.criteries = data;
      })
  }
  
  onChange({ key, data }: CriteriesChanges) {
    this.criteries[key] = data;
  }
}
