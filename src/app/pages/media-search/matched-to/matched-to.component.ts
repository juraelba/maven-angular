import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';

import { SearchFiledChangeEvent } from '@models/search.model';
import { SelectedCriteriaEvent } from '@models/criteries.model';

import { SearchFiedlsEnum, SearchActionTypesEnum } from '@enums/search.enum';

import { SearchService } from '@services/search/search.service';
import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

@Component({
  selector: 'app-matched-to',
  templateUrl: './matched-to.component.html',
  styleUrls: ['./matched-to.component.scss']
})
export class MatchedToComponent implements OnInit {
  @Output() dataChange: EventEmitter<SearchFiledChangeEvent> = new EventEmitter();

  matched: boolean = false;
  matchedTo: string = '';
  unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private searchService: SearchService,
    private selectedCriteriaService: SelectedCriteriaService
  ) { }

  ngOnInit(): void {
    this.listenSearchBarMenuActions();
    this.listenSelectedCriteriaDialogEvent();
  }

  listenSelectedCriteriaDialogEvent(): void {
    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ data }: SelectedCriteriaEvent) => {
          console.log(data);
    
          return data[SearchFiedlsEnum.matchedTo]
        }),
        map(({ data }: SelectedCriteriaEvent) => data[SearchFiedlsEnum.matchedTo].matchedTo)
      )
      .subscribe((value: string) => {
        console.log(value);
        this.matchedTo = value;
      });
  }

  onCheckboxChange(value: boolean): void {
    this.matched = value;

    const event: SearchFiledChangeEvent = {
      key: SearchFiedlsEnum.matchedTo,
      data: {
        matched: this.matched,
        matchedTo: this.matchedTo
      }
    };

    this.dataChange.emit(event)
  }

  onInputChange(value: string): void {
    this.matchedTo = value;

    const event: SearchFiledChangeEvent = {
      key: SearchFiedlsEnum.matchedTo,
      data: {
        matched: this.matched,
        matchedTo: this.matchedTo
      }
    };

    this.dataChange.emit(event);
  }

  listenSearchBarMenuActions(): void {
    this.searchService.searchBarEvents$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action }) => SearchActionTypesEnum.NEW_SEARCH === action)
      )
      .subscribe(() => {
        this.matchedTo = '';
        this.matched = false;

        const event: SearchFiledChangeEvent = {
          key: SearchFiedlsEnum.matchedTo,
          data: {
            matched: this.matched,
            matchedTo: this.matchedTo
          }
        };
  
        this.dataChange.emit(event);
      });
  }
}
