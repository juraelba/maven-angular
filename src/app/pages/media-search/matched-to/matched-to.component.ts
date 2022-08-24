import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { SearchFiledChangeEvent } from '@models/search.model';

import { SearchFiedlsEnum, SearchActionTypesEnum } from '@enums/search.enum';

import { SearchService } from '@services/search/search.service';

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
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.listenSearchBarMenuActions();
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
