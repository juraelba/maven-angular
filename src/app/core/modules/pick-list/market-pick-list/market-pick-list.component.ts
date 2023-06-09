import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { takeUntil, filter, map } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import * as R from 'ramda';

import { SelectOption } from '@models/select.model';
import { ListChangesEvent } from '@models/list.model';
import { MarketSortingOption } from '@models/sorting-options.models';
import { SelectedCriteriaEvent, MarketCriteria } from '@models/criteries.model';

import { ListKeys, ListLabels } from '@enums/lists.enum';
import { MarketSortingOptionsEnum } from '@enums/sorting-options.enum';
import { SearchActionTypesEnum } from '@enums/search.enum';

import { ListsService } from '@services/lists/lists.service';
import { SelectedCriteriaService } from '@services/selected-criteria/selected-criteria.service';
import { SearchService } from '@services/search/search.service';

import { SelectComponent } from '@modules/select/select.component';
import { Router } from '@angular/router';
import { SearchMediaProfileTitleKey } from '@models/search.model';

type SectionKey = ListKeys.dmas | ListKeys.msas;
type SectionLabel = ListLabels.dmas | ListLabels.msas;

type MarketOptions = {
  [key in SectionKey]: SelectOption[];
};

interface Section {
  value: SectionKey;
  label: SectionLabel;
  selected: boolean;
}

@Component({
  selector: 'app-market-pick-list',
  templateUrl: './market-pick-list.component.html',
  styleUrls: ['./market-pick-list.component.scss'],
})
export class MarketPickListComponent implements OnInit {
  @Input() dmaOptionsToOmit: string[] = [];
  @Input() msaOptionsToOmit: string[] = [];

  @Output() change: EventEmitter<ListChangesEvent> = new EventEmitter();

  @ViewChild('selectComponent') selectComponent: SelectComponent;

  options: SelectOption[] = [];
  marketOptions: MarketOptions = {
    [ListKeys.dmas]: [],
    [ListKeys.msas]: [],
  };
  sections: Section[] = [
    {
      value: ListKeys.dmas,
      label: ListLabels.dmas,
      selected: true,
    },
    {
      value: ListKeys.msas,
      label: ListLabels.msas,
      selected: false,
    },
  ];

  sortingMenuOpen: boolean = false;
  borderLabel: string = '';
  value: string = ListLabels.markets;
  width: string = '170px';
  unsubscribeAll: Subject<null> = new Subject();
  sort: MarketSortingOption = MarketSortingOptionsEnum.name;

  searchScreenKey: SearchMediaProfileTitleKey;
  constructor(
    private listsService: ListsService,
    private selectedCriteriaService: SelectedCriteriaService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchScreenKey = this.router.url.split(
      '/'
    )[1] as SearchMediaProfileTitleKey;
    this.fetchMarketListOptions();
    this.listenSelectedCriteriaService();
    this.listenSearchBarMenuActions();
  }

  fetchMarketListOptions(): void {
    forkJoin({
      [ListKeys.dmas]: this.listsService.getOptionsData(ListKeys.dmas),
      [ListKeys.msas]: this.listsService.getOptionsData(ListKeys.msas),
    })
      .pipe(
        takeUntil(this.unsubscribeAll),
        map((marketOptions: MarketOptions): MarketOptions => {
          return {
            [ListKeys.dmas]: this.dmaOptionsToOmit.length
              ? this.listsService.filterOptions(
                  marketOptions[ListKeys.dmas],
                  this.dmaOptionsToOmit
                )
              : marketOptions[ListKeys.dmas],
            [ListKeys.msas]: this.msaOptionsToOmit.length
              ? this.listsService.filterOptions(
                  marketOptions[ListKeys.msas],
                  this.msaOptionsToOmit
                )
              : marketOptions[ListKeys.msas],
          };
        })
      )
      .subscribe((marketOptions: MarketOptions) => {
        const sortedOptions = this.listsService.sortOptions(
          marketOptions[ListKeys.dmas],
          this.sort
        );

        this.marketOptions = marketOptions;
        this.options = this.listsService.addGroupingLetter(
          sortedOptions,
          this.sort
        );

        const selected_dmas =
          this.selectedCriteriaService.criteries?.[this.searchScreenKey]?.[
            ListKeys.dmas
          ];
        const selected_msas =
          this.selectedCriteriaService.criteries?.[this.searchScreenKey]?.[
            ListKeys.msas
          ];
        if (selected_dmas) {
          this.change.emit({ key: ListKeys.dmas, data: selected_dmas });
        }
        if (selected_msas) {
          this.change.emit({ key: ListKeys.dmas, data: selected_msas });
        }
      });
  }

  listenSelectedCriteriaService(): void {
    this.selectedCriteriaService.selectedCriteria$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(({ data }: SelectedCriteriaEvent) => data[ListKeys.markets]),
        map(({ data }: SelectedCriteriaEvent) => data[ListKeys.markets].options)
      )
      .subscribe((options: SelectOption[]) => {
        const optionValues = this.listsService.getOptionValues(options);
        const updatedOptions = this.listsService.updateOptionsWithSelected(
          this.options,
          optionValues
        );

        this.options = updatedOptions;
        this.borderLabel = this.getBorderLabel(options);
        this.value = this.listsService.getSelectInputValue(
          options,
          ListLabels.markets
        );
        const width =
          this.selectComponent?.selectContainer.nativeElement.getBoundingClientRect()
            .width;
        this.width = `${width - 80}px`;
      });
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

  setActiveSection(event: MouseEvent, { value }: Section): void {
    event.stopPropagation();

    const sortedOptions = this.listsService.sortOptions(
      this.marketOptions[value],
      this.sort
    );

    this.sections = this.sections.map((section) => ({
      ...section,
      selected: section.value === value,
    }));
    this.options = this.listsService.addGroupingLetter(
      sortedOptions,
      this.sort
    );
  }

  getActiveSectionKey(): SectionKey {
    const { value } = this.sections.find(({ selected }) => selected) as Section;

    return value;
  }

  getBorderLabel(options: SelectOption[]): string {
    const sectionKey = this.getActiveSectionKey();
    const borderLabel = this.listsService.getBorderLabel(options, sectionKey);

    return borderLabel ? `${borderLabel} Markets` : '';
  }

  onApplyChanges(options: SelectOption[]): void {
    const width =
      this.selectComponent?.selectContainer.nativeElement.getBoundingClientRect()
        .width;

    this.width = `${width - 80}px`;
    this.value = this.listsService.getSelectInputValue(
      options,
      ListLabels.markets
    );
    this.borderLabel = this.getBorderLabel(options);

    const marketData: MarketCriteria = {
      market: this.getActiveSectionKey(),
      options,
    };

    this.change.emit({ key: ListKeys.markets, data: marketData });
  }

  unselectAllMarketOptions(): MarketOptions {
    return R.compose<[MarketOptions], [any, SelectOption[]][], MarketOptions>(
      R.reduce<[SectionKey, SelectOption[]], any>((acc, [key, value]) => {
        acc[key] = this.listsService.updateOptionsWithSelected(value, []);

        return acc;
      }, {}),
      R.toPairs
    )(this.marketOptions);
  }

  onClear(): void {
    const activeSectionKey = this.getActiveSectionKey();

    this.marketOptions = this.unselectAllMarketOptions();
    this.options = this.listsService.addGroupingLetter(
      this.marketOptions[activeSectionKey],
      this.sort
    );
    this.borderLabel = '';
    this.value = ListLabels.markets;

    const marketData: MarketCriteria = {
      market: this.getActiveSectionKey(),
      options: [],
    };

    this.change.emit({ key: ListKeys.markets, data: marketData });
  }

  toggleOpenSortingMenu(event: MouseEvent): void {
    event.stopPropagation();

    this.sortingMenuOpen = !this.sortingMenuOpen;
  }

  onSortingOptionChange(sortingOption: MarketSortingOption): void {
    const sortedOptions = this.listsService.sortOptions(
      this.options,
      sortingOption
    );

    this.sortingMenuOpen = false;
    this.sort = sortingOption;

    this.options = this.listsService.addGroupingLetter(
      sortedOptions,
      this.sort
    );
  }

  onMenuClose(): void {
    this.sortingMenuOpen = false;
  }
}
