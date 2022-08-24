import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { SearchFiedlsEnum, SearchActionTypesEnum } from '@enums/search.enum';

import { CriteriesChangesEvent } from '@models/criteries.model';
import { SearchService } from '@services/search/search.service';

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.scss']
})
export class NameInputComponent implements OnInit, OnDestroy {
  @Output() changeData: EventEmitter<CriteriesChangesEvent> = new EventEmitter();

  unsubscribeAll: Subject<null> = new Subject();
  value: string = '';

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchService.searchBarEvents$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action }) => SearchActionTypesEnum.NEW_SEARCH === action)
      )
      .subscribe(() => {
        this.value = '';

        this.changeData.emit({ key: SearchFiedlsEnum.name, data: '' });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  onInputChange(value: string): void {
    this.value = value;

    this.changeData.emit({ key: SearchFiedlsEnum.name, data: value });
  }
}
