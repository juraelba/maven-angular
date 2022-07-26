import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { MarketSortingOption } from '../../../models/sorting-options.models';
import { MarketSortinOptionsLabelsEnum, MarketSortingOptionsEnum } from '../../../enums/sorting-options.enum';

interface SortingOption {
  value: MarketSortingOption;
  label: MarketSortinOptionsLabelsEnum;
  selected: boolean;
}

@Component({
  selector: 'app-sorting-menu',
  templateUrl: './sorting-menu.component.html',
  styleUrls: ['./sorting-menu.component.scss']
})
export class SortingMenuComponent implements OnInit {
  @Input() sort: string = 'rank';

  @Output() change: EventEmitter<MarketSortingOption> = new EventEmitter();

  sortingOptions: SortingOption[] = [
    {
      value: MarketSortingOptionsEnum.name,
      label: MarketSortinOptionsLabelsEnum.name,
      selected: true
    },
    {
      value: MarketSortingOptionsEnum.rank,
      label: MarketSortinOptionsLabelsEnum.rank,
      selected: false
    },
    {
      value: MarketSortingOptionsEnum.household,
      label: MarketSortinOptionsLabelsEnum.household,
      selected: false
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.sortingOptions = this.sortingOptions.map((option) => ({ ...option, selected: option.value === this.sort }));
  }

  selectSortOption(event: MouseEvent, option: SortingOption): void {
    event.stopPropagation();

    this.change.emit(option.value);
  }
}
