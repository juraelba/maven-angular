import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Criteries } from '@models/criteries.model';
import { ListChangesEvent } from '@models/list.model';
import { SearchKey } from '@models/search.model';

import { SearchEnum } from '@enums/search.enum';

import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

@Component({
  selector: 'app-spot-tv',
  templateUrl: './spot-tv.component.html',
  styleUrls: ['./spot-tv.component.scss']
})
export class SpotTvComponent implements OnInit {
  criteries: Criteries = {};
  key: SearchKey = SearchEnum.media;

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
  
  onChange({ key, data }: ListChangesEvent) {
    this.criteries[key] = data;
  }

}