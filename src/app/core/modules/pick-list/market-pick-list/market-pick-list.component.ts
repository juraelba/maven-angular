import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { takeUntil, filter, map } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import * as R from 'ramda';

import { SelectOption } from '@models/select.model';
import { ListChangesEvent } from '@models/list.model';
import { MarketSortingOption, SortMethods } from '@models/sorting-options.models';
import { SelectedCriteriaEvent } from '@models/criteries.model';

import { ListKeys, ListLabels } from '@enums/lists.enum';
import { MarketSortingOptionsEnum, SortMethodsEnum } from '@enums/sorting-options.enum';

import { ListsService } from '@services/lists/lists.service';
import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';

type SectionKey = ListKeys.dmas | ListKeys.msas;
type SectionLabel = ListLabels.dmas | ListLabels.msas;

type MarketOptions = {
  [key in SectionKey]: SelectOption[]
}

interface Section {
  value: SectionKey;
  label: SectionLabel;
  selected: boolean;
}

interface MarketData {
  options: SelectOption[];
  market: SectionKey;
}

type Ranges = [ string, number, number ];

@Component({
  selector: 'app-market-pick-list',
  templateUrl: './market-pick-list.component.html',
  styleUrls: ['./market-pick-list.component.scss']
})
export class MarketPickListComponent implements OnInit {
  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  @ViewChild('selectComponent') selectComponent: any;

  options: SelectOption[] = [];
  marketOptions: MarketOptions = {
    [ListKeys.dmas]: [],
    [ListKeys.msas]: [],
  }
  sections: Section[] = [
    {
      value: ListKeys.dmas,
      label: ListLabels.dmas,
      selected: true
    },
    {
      value: ListKeys.msas,
      label: ListLabels.msas,
      selected: false
    },
  ];

  sortingMenuOpen: boolean = false;
  grouping: boolean = true;
  borderLabel: string = '';
  value: string = ListLabels.markets;
  width: string;
  unsubscribeAll: Subject<null> = new Subject();
  sort: MarketSortingOption = MarketSortingOptionsEnum.name;
  isSort: boolean = true;

  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService
  ) { }

  ngOnInit(): void {
      this.fetchMarketListOptions();
      this.listenSelectedCriteriaService();
  }

  fetchMarketListOptions(): void {
    forkJoin({
      [ListKeys.dmas]: this.listsService.getOptionsData(ListKeys.dmas),
      [ListKeys.msas]: this.listsService.getOptionsData(ListKeys.msas),
    })
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((marketOptions: MarketOptions) => {
        this.marketOptions = marketOptions
        this.options = this.addGroupingLetter(marketOptions[ListKeys.dmas]);
      });
  }

  listenSelectedCriteriaService(): void {
    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ data }: SelectedCriteriaEvent) => data[ListKeys.markets] ),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.markets].options)
      )
      .subscribe((options: any) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(this.options, optionValues);

        this.options = updatedOptions;
        this.value = this.listsService.getSelectInputValue(options, ListLabels.categories);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  setActiveSection(event: MouseEvent, { value }: Section): void {
    event.stopPropagation();
  
    this.sections = this.sections.map((section) => ({ ...section, selected: section.value === value }));
    
    this.options = this.addGroupingLetter(this.marketOptions[value]);
  }

  getActiveSectionKey(): SectionKey {
    const { value } = this.sections.find(({ selected }) => selected) as Section;

    return value;
  }

  getBorderLabel(options: SelectOption[]): string {
    const sectionKey = this.getActiveSectionKey();
    const borderLabel = this.listsService.getBorderLabel(options, sectionKey);

    return borderLabel ? `${ borderLabel } Markets` : '';
  }

  onApplyChanges(options: SelectOption[]): void {
    const width = this.selectComponent?.selectContainer.nativeElement.getBoundingClientRect().width;

    this.width = `${ width-80 }px`;
    this.value = this.listsService.getSelectInputValue(options);
    this.borderLabel = this.getBorderLabel(options);

    const marketData: MarketData = {
      market: this.getActiveSectionKey(),
      options,
    }

    this.change.emit({ key: ListKeys.markets, data: marketData });
  }

  unselectAllMarketOptions() {
    return R.compose<[MarketOptions], [any, SelectOption[]][], MarketOptions>(
      R.reduce<[SectionKey, SelectOption[]], any>((acc, [ key, value ]) => {
        acc[key] = this.listsService.updateOptionsWithSelected(value, []);

        return acc;
      }, {}),
      R.toPairs
    )(this.marketOptions);
  }

  onClear(): void {
    const activeSectionKey = this.getActiveSectionKey();

    this.marketOptions = this.unselectAllMarketOptions();
    this.options = this.addGroupingLetter(this.marketOptions[activeSectionKey])
    this.borderLabel = '';
    this.value = ListLabels.markets;

    const marketData: MarketData = {
      market: this.getActiveSectionKey(),
      options: [],
    }

    this.change.emit({ key: ListKeys.markets, data: marketData });
  }

  toggleOpenSortingMenu(event: MouseEvent): void {
    event.stopPropagation();

    this.sortingMenuOpen = !this.sortingMenuOpen;
  }

  sortByAlphabeticalOrder(options: SelectOption[], prop: string): SelectOption[] {
    return R.sort(
      (a, b) => {
        if(a[prop] < b[prop]) {
          return -1;
        }
  
        if(a[prop] > b[prop]) {
          return 1;
        }
  
        return 0;
      },
      options
    );
  }

  sortByNumericalOrder(options: SelectOption[], prop: string, order: SortMethods = SortMethodsEnum.ascend): SelectOption[] {
    return R.sort(
      (a, b) => order === SortMethodsEnum.ascend ? a[prop] - b[prop] : b[prop] - a[prop],
      options
    );
  }

  sortByName(options: SelectOption[]): SelectOption[] {
    return this.sortByAlphabeticalOrder(options, 'name');
  }

  sortByRank(options: SelectOption[]): SelectOption[] {
    return this.sortByNumericalOrder(options, 'rank');
  }

  sortByHousehold(options: SelectOption[]): SelectOption[] {
    return this.sortByNumericalOrder(options, 'households', SortMethodsEnum.descend);
  }

  sortMarketOptions(marketOptions: MarketOptions, sort: MarketSortingOption): MarketOptions {
    const sortingStrategies = {
      [MarketSortingOptionsEnum.name]: this.sortByName.bind(this),
      [MarketSortingOptionsEnum.rank]: this.sortByRank.bind(this),
      [MarketSortingOptionsEnum.household]: this.sortByHousehold.bind(this),
    };

    const sortOptions = sortingStrategies[sort];
  
    return R.compose<[MarketOptions], [any, SelectOption[]][], MarketOptions>(
      R.reduce<[SectionKey, SelectOption[]], any>((acc, [ key, value ]) => {
        acc[key] = sortOptions(value)

        return acc;
      }, {}),
      R.toPairs
    )(marketOptions)
  }

  isSortingOptionName(): boolean {
    return this.sort === MarketSortingOptionsEnum.name;
  }

  onSortingOptionChange(sortingOption: MarketSortingOption): void {
    const sectionKey = this.getActiveSectionKey();

    this.sortingMenuOpen = false;
    this.sort = sortingOption;
    this.isSort = this.isSortingOptionName();
    this.marketOptions = this.sortMarketOptions(this.marketOptions, this.sort);
    this.options = this.addGroupingLetter(this.marketOptions[sectionKey]);
  }

  getGroupRangeLetter(value: number, ranges: Ranges[]): string {
    return ranges.reduce<string>((acc, [ key, min, max ]) => {
      return value >= min && value <= max ? key : acc;
    }, '');
  }

  addHouseholdSortingGroupletter(options: SelectOption[]): SelectOption[] {
    const ranges: Ranges[] = [
      [ '2.5M+', 2_500_000, Infinity ],
      [ '1M - 2.5M', 1_000_000, 2_500_000 ],
      [ '500K - 1M ', 500_000, 1_000_000 ],
      [ '100K - 500K', 100_000, 500_000 ],
      [ '<100K', -Infinity, 100_000 ]
    ];

    return options.map((option) => {
      const groupLetter = this.getGroupRangeLetter(option.households, ranges);

      return {
        ...option,
        groupLetter
      }
    })
  }

  addNameSortingGroupLetter(options: SelectOption[]) {
    return options.map((option) => {
      const groupLetter = option.label[0].toUpperCase();

      return {
        ...option,
        groupLetter
      }
    });
  }

  defineRankRanges(options: SelectOption[]): Ranges[] {
    const rankRanges: Ranges[] = [
      ['1-10', 1, 10],
      ['11-50', 11, 50],
    ];

    const allRanks: number[] = options.map(({ rank }) => rank);
    const maxRank = Math.max(...allRanks);
    
    let minRank = 0;
    const step = 50;

    const calculateRanksRanges = (): void => {
      if(minRank >= maxRank) {
        return;
      }

      minRank = minRank + step;
      const minRange = 1 + minRank;
      const maxRange = minRank + step;

      const key = `${ minRange }-${ maxRange }`;

      rankRanges.push([key, minRange, maxRange]);

      calculateRanksRanges();
    }

    calculateRanksRanges();

    return rankRanges;
  }

  addRankSortingGroupLetter(options: SelectOption[]): SelectOption[] {
    const rankRanges = this.defineRankRanges(options);
  
    return options.map((option) => {
      const groupLetter = this.getGroupRangeLetter(option.rank, rankRanges);

      return {
        ...option,
        groupLetter
      }
    });
  }

  addGroupingLetter(options: SelectOption[]): SelectOption[] {
    const strategy = {
      [MarketSortingOptionsEnum.name]: this.addNameSortingGroupLetter.bind(this),
      [MarketSortingOptionsEnum.rank]: this.addRankSortingGroupLetter.bind(this),
      [MarketSortingOptionsEnum.household]: this.addHouseholdSortingGroupletter.bind(this),
    }

    return strategy[this.sort](options);
  }

  onMenuClose(): void {
    this.sortingMenuOpen = false;
  }
}
