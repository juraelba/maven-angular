import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { compose, reduce, toPairs, sort } from 'ramda';

import { SelectOption } from '../../../models/select.model';
import { ListChangesEvent } from '../../../models/list.model';

import { MarketSortingOption } from '../../../models/sorting-options.models';
import { ListKeys, ListLabels } from '../../../enums/lists.enum';
import { MarketSortingOptionsEnum } from '../../../enums/sorting-options.enum';
import { ListsService } from '../../../../core/services/lists/lists.service';

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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    forkJoin({
      [ListKeys.dmas]: this.listsService.getOptionsData(ListKeys.dmas),
      [ListKeys.msas]: this.listsService.getOptionsData(ListKeys.msas),
    })
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((marketOptions: MarketOptions) => {
        this.marketOptions = marketOptions
        this.options = marketOptions[ListKeys.dmas];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  setActiveSection(event: MouseEvent, { value }: Section): void {
    event.stopPropagation();
  
    this.sections = this.sections.map((section) => ({ ...section, selected: section.value === value }));
    
    this.options = this.marketOptions[value];
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
  }

  unselectAllMarketOptions() {
    return compose<[MarketOptions], [any, SelectOption[]][], MarketOptions>(
      reduce<[SectionKey, SelectOption[]], any>((acc, [ key, value ]) => {
        acc[key] = this.listsService.updateOptionsWithSelected(value, []);

        return acc;
      }, {}),
      toPairs
    )(this.marketOptions);
  }

  onClear(): void {
    const activeSectionKey = this.getActiveSectionKey();

    this.marketOptions = this.unselectAllMarketOptions();
    this.options = this.marketOptions[activeSectionKey]
    this.borderLabel = '';
    this.value = ListLabels.markets;
  }

  toggleOpenSortingMenu(event: MouseEvent): void {
    event.stopPropagation();

    this.sortingMenuOpen = !this.sortingMenuOpen;
  }

  sortByAlphabeticalOrder(options: SelectOption[], prop: string): SelectOption[] {
    return sort(
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

  sortByNumericalOrder(options: SelectOption[], prop: string): SelectOption[] {
    return sort(
      (a, b) => a[prop] - b[prop],
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
    return this.sortByNumericalOrder(options, 'households');
  }

  sortMarketOptions(marketOptions: MarketOptions, sort: MarketSortingOption): MarketOptions {
    const sortingStrategies = {
      [MarketSortingOptionsEnum.name]: this.sortByName.bind(this),
      [MarketSortingOptionsEnum.rank]: this.sortByRank.bind(this),
      [MarketSortingOptionsEnum.household]: this.sortByHousehold.bind(this),
    };

    const sortOptions = sortingStrategies[sort];
  
    return compose<[MarketOptions], [any, SelectOption[]][], MarketOptions>(
      reduce<[SectionKey, SelectOption[]], any>((acc, [ key, value ]) => {
        acc[key] = sortOptions(value)

        return acc;
      }, {}),
      toPairs
    )(marketOptions)
  }

  isSortingOptionName(): boolean {
    return this.sort === MarketSortingOptionsEnum.name;
  }

  onSortingOptionChange(sortingOption: MarketSortingOption): void {
    const sectionKey = this.getActiveSectionKey();

    this.sortingMenuOpen = false;
    this.sort = sortingOption;
    this.grouping = this.isSortingOptionName();
    this.isSort = this.isSortingOptionName();
    this.marketOptions = this.sortMarketOptions(this.marketOptions, this.sort);
    this.options = [ ...this.marketOptions[sectionKey] ]
  }

  onMenuClose(): void {
    this.sortingMenuOpen = false;
  }
}
