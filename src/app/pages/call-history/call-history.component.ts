import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { DateTime } from 'luxon';

import { Criteries } from '@models/criteries.model';
import { SearchKey, SearchFiledChangeEvent } from '@models/search.model';
import { SelectOption } from '@models/select.model';

import { SearchEnum } from '@enums/search.enum';
import {
  SearchActionTypesEnum,
  SearchFiedlsEnum,
  SearchEnumTitles,
} from '@enums/search.enum';
import { StyleTypesEnum } from '@enums/styles.enum';

import { SearchService } from '@services/search/search.service';
import { CallHistoryService } from '@services/call-history.service';
import { ActivatedRoute } from '@angular/router';

enum HeaderLabels {
  radio = 'Radio',
  tv = 'TV',
}

enum HeaderValues {
  radio = 'radio',
  tv = 'tv',
}

interface Tab {
  value: HeaderValues;
  label: HeaderLabels;
  selected: boolean;
}

const defaultCriteries = {
  [SearchFiedlsEnum.startDate]: null,
  [SearchFiedlsEnum.endDate]: null,
  [SearchFiedlsEnum.callLetterHistory]: 'date',
  [SearchFiedlsEnum.callLetter]: '',
};

@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.component.html',
  styleUrls: ['./call-history.component.scss'],
})
export class CallHistoryComponent implements OnInit {
  criteries: Criteries = { ...defaultCriteries };
  selectedFilter = 'Date';
  callLetter: string = '';
  key: SearchKey = SearchEnum.callHistory;
  title: SearchEnumTitles = SearchEnumTitles.callHistory;
  unsubscribeAll: Subject<null> = new Subject();

  tabs: Tab[] = [
    {
      value: HeaderValues.radio,
      label: HeaderLabels.radio,
      selected: true,
    },
    {
      value: HeaderValues.tv,
      label: HeaderLabels.tv,
      selected: false,
    },
  ];

  options: SelectOption[] = [
    {
      id: 'date',
      value: 'date',
      label: 'Date',
      selected: true,
    },
    {
      id: 'callLetter',
      value: 'callLetter',
      label: 'Call Letter',
      selected: false,
    },
  ];

  styleTypes = StyleTypesEnum;

  constructor(
    private searchService: SearchService,
    private callHistoryService: CallHistoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {});
    this.listenSearchBarMenuActions();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  onChange({ key, data }: SearchFiledChangeEvent): void {
    this.criteries[key] = data;
  }

  listenSearchBarMenuActions(): void {
    this.searchService.searchBarEvents$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action }) => SearchActionTypesEnum.NEW_SEARCH === action)
      )
      .subscribe(() => {
        this.criteries = { ...defaultCriteries };
        this.options = this.options.map((option) => ({
          ...option,
          selected: option.value === 'date',
        }));
      });
  }

  onDateChange(date: DateTime | null, key: string): void {
    this.criteries[key] = date;
  }

  setActiveTab(event: MouseEvent, selectedTab: Tab): void {
    event.stopPropagation();

    const activeTab = this.tabs.find(({ selected }) => selected);

    if (activeTab && activeTab.value !== selectedTab.value) {
      this.searchService.newSearch();
    }

    this.tabs = this.tabs.map((tab) => ({
      ...tab,
      selected: selectedTab.value === tab.value,
    }));

    if (selectedTab.value === HeaderValues.radio) {
      this.callHistoryService.activeMeidaType.next(10);
    }

    if (selectedTab.value === HeaderValues.tv) {
      this.callHistoryService.activeMeidaType.next(11);
    }
  }

  onOptionSelect({ value }: SelectOption): void {
    this.selectedFilter = value;
    this.options = this.options.map((option) => ({
      ...option,
      selected: option.value === value,
    }));

    this.criteries[SearchFiedlsEnum.callLetterHistory] = value;
  }

  onInputChange(value: string): void {
    this.callLetter = value;
    this.criteries[SearchFiedlsEnum.callLetter] = value;
  }

  mapLabel(label: string): string {
    if (label === 'callLetter') {
      return (
        'Finding call history for ' +
        (this.criteries.callLetter || 'Call Letter')
      );
    }

    return 'Finding call history by Date';
  }
}
