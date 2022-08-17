import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SearchFiledChangeEvent } from '@models/search.model';
import { SearchFiedlsEnum } from '@enums/search.enum';

@Component({
  selector: 'app-matched-to',
  templateUrl: './matched-to.component.html',
  styleUrls: ['./matched-to.component.scss']
})
export class MatchedToComponent implements OnInit {
  matched: boolean = false;
  matchedTo: string = '';

  @Output() dataChange: EventEmitter<SearchFiledChangeEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
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
}
