import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ListsService } from '@services/lists/lists.service';
import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';

import { SelectOption } from '@models/select.model';
import { SelectedCriteriaEvent, MarketCriteria } from '@models/criteries.model';
import { ListChangesEvent } from '@models/list.model';
import { MarketSortingOption } from '@models/sorting-options.models';

import { ListKeys } from '@enums/lists.enum';
import { MarketSortingOptionsEnum } from '@enums/sorting-options.enum';
import { SearchActionTypesEnum } from '@enums/search.enum';
import { Router } from '@angular/router';
import { SearchMediaProfileTitleKey } from '@models/search.model';

@Component({
  selector: 'app-dma-markets',
  templateUrl: './dma-markets.component.html',
  styleUrls: ['./dma-markets.component.scss']
})
export class DmaMarketsComponent implements OnInit {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  borderLabel: string;
  options: SelectOption[] = [];
  unsubscribeAll: Subject<null> = new Subject();
  sortingMenuOpen: boolean = false;
  sort: MarketSortingOption = MarketSortingOptionsEnum.name;
  optionsToOmit: string[] = ['National (USA)', 'International']

  searchScreenKey: SearchMediaProfileTitleKey;
  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService,
    private searchService: SearchService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchScreenKey = this.router.url.split('/')[1] as SearchMediaProfileTitleKey;
    this.listsService.getOptionsData(ListKeys.dmas)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((options: SelectOption[]) => {
        const sortedOptions = this.listsService.sortOptions(options, this.sort);
        const workedOptions = this.listsService.filterOptions(sortedOptions, this.optionsToOmit);

        this.options = this.listsService.addGroupingLetter(workedOptions, this.sort);
        const selected = this.selectedCriteriaService.criteries?.[this.searchScreenKey]?.[ListKeys.dmas]
        if (selected) {
          this.change.emit({ key: ListKeys.dmas, data: selected });
        }
      });

    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ data }: SelectedCriteriaEvent) => data[ListKeys.markets]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.markets].options)
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

        this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.dmamarkets);
        this.options = updatedOptions;
      });

    this.listenSearchBarMenuActions();
  }

  listenSearchBarMenuActions(): void {
    this.searchService.searchBarEvents$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ action }) => SearchActionTypesEnum.NEW_SEARCH === action)
      )
      .subscribe(() => {
        this.onClear();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  onApplyChanges(options: SelectOption[]): void {
    const optionValues = this.listsService.getOptionValues(options);
    const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

    this.options = updatedOptions;
    this.borderLabel = this.listsService.getBorderLabel(options, ListKeys.dmamarkets);

    const marketData: MarketCriteria = {
      market: ListKeys.dmas,
      options,
    }

    this.change.emit({ key: ListKeys.markets, data: marketData });
  }

  onSelectClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onClear(): void {
    this.options = this.listsService.updateOptionsWithSelected(this.options, []);
    this.borderLabel = '';

    this.change.emit({ key: ListKeys.markets, data: [] });
  }

  toggleOpenSortingMenu(event: MouseEvent): void {
    event.stopPropagation();

    this.sortingMenuOpen = !this.sortingMenuOpen;
  }

  onSortingOptionChange(sortingOption: MarketSortingOption): void {
    const sortedOptions = this.listsService.sortOptions(this.options, sortingOption);

    this.sortingMenuOpen = false;
    this.sort = sortingOption;

    this.options = this.listsService.addGroupingLetter(sortedOptions, this.sort);
  }
}
