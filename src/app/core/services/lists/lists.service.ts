import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import * as R from 'ramda';

import { environment } from '../../../../environments/environment';

import { List, ListInfo, ListKey, ListUrlsKey, Ranges, MediaTypeListItem } from '@models/list.model';
import { SelectOption } from '@models/select.model';
import { MarketSortingOption, SortMethods } from '@models/sorting-options.models';

import { ListUrls, ListLabels, ListKeys } from '@enums/lists.enum';
import { MarketSortingOptionsEnum, SortMethodsEnum } from '@enums/sorting-options.enum';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { UtilsService } from '../utils/utils.service';

interface ListOptionsFork {
  [key: string]: Observable<List>
}

interface ListOptionsTransformer {
  [ListKeys.mediatypes]: (list: List<MediaTypeListItem[]>) => SelectOption[],
  default: (list: List) => SelectOption[],
}

type TransformListToOptionsExecutor = (list: List | List<MediaTypeListItem[]>) => SelectOption[];

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private utilsService: UtilsService
  ) { }

  fetchListData(key: ListUrlsKey): Observable<List> {
    const url = environment.api + ListUrls[key];

    return this.http.get<List>(url)
  }

  getListData(key: ListUrlsKey): Observable<List> {
    return this.localStorage.getListData()
      .pipe(
        map((list: any) => list[key] || [])
      );
  }

  getOptionsData(key: ListUrlsKey): Observable<SelectOption[]> {
    return this.getListData(key)
      .pipe(
        switchMap((list: List) => {
          const list$ = R.isEmpty(list)
            ? this.fetchListData(key)
            : of(list)

          return list$.pipe(
            map((list: List) => this.transformListToOptions(key, list))
          )
        })
      )
  }

  transformMediaTypesListToOptions(list: List<MediaTypeListItem[]>): SelectOption[] {
    return list.map(({ subType }) => ({
      id: subType,
      value: subType,
      label: subType
    }));
  }

  defaultListToOptionsTransformer(list: List): SelectOption[] {
    return list.map(({ id, name, ...rest }) => ({ id, label: name, value: name, ...rest }))
  }

  transformListToOptions(key: ListKey, list: List): SelectOption[] {
    const transformers: ListOptionsTransformer = {
      [ListKeys.mediatypes]: this.transformMediaTypesListToOptions,
      default: this.defaultListToOptionsTransformer
    };

    const executor =  transformers[key as keyof ListOptionsTransformer] || transformers.default;

    return (executor as TransformListToOptionsExecutor)(list);
  }

  fetchLists(): Observable<ListInfo[]> {
    const url = environment.api + '/lists';

    return this.http.get<ListInfo[]>(url);
  }

  updateOptionsWithSelected(options: SelectOption[], selectedValues: string[]): SelectOption[] {
    return options.map((option) => ({
      ...option,
      selected: selectedValues.includes(option.value)
    }));
  }

  getOptionValues(options: SelectOption[]): string[] {
    return options.map(({ value }) => value);
  }

  getOptionLabels(options: SelectOption[]): string[] {
    return options.map(({ label }) => label);
  }

  getSelectedOptions(options: SelectOption[]): SelectOption[] {
    return options.filter(({ selected }) => selected);
  }

  fetchListOptions(lists: ListInfo[]): Observable<{ [key: string]: List }> {
    const data = lists.reduce((acc: ListOptionsFork, { key, route }: ListInfo) => {
      const url = `${ environment.api }/${ route }`;

      acc[key] = this.http.get<List>(url);

      return acc;
    }, {});

    return forkJoin(data);
  }

  getListOptionsInfomationToFetch(lists: ListInfo[], prevLists: ListInfo[]): ListInfo[] {
    const prevListsMap = prevLists.reduce<{[key: string]: ListInfo}>((listsInfo, listInfo) => {
      listsInfo[listInfo.key] = listInfo;
  
      return listsInfo;
    }, {});
  
    return lists.reduce<ListInfo[]>((acc, { key, modifiedDate, route }) => {
      const matchedListInfo = prevListsMap[key] || { modifiedDate: '' };
      const isCurrentModifiedDateBigger = DateTime.fromISO(matchedListInfo.modifiedDate) < DateTime.fromISO(modifiedDate);
  
      if(isCurrentModifiedDateBigger) {
        acc.push({ key, route, modifiedDate });
      }

      return acc;
    }, [])
  }

  getBorderLabel(options: SelectOption[], key: ListKey): string {
    return options.length ? ListLabels[key] : '';
  }

  getSelectInputValue(options: SelectOption[], inputLabel?: string) {
    const optionsLabels = this.getOptionLabels(options);
    const label = !optionsLabels.length && inputLabel;

    return [ label, ...optionsLabels ]
      .filter((label) => label)
      .join(', ');
  }

  private getGroupRangeLetter(value: number, ranges: Ranges[]): string {
    return ranges.reduce<string>((acc, [ key, min, max ]) => {
      return value >= min && value <= max ? key : acc;
    }, '');
  }

  private addHouseholdSortingGroupletter(options: SelectOption[]): SelectOption[] {
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

  private addNameSortingGroupLetter(options: SelectOption[]) {
    return options.map((option) => {
      const groupLetter = option.label[0].toUpperCase();

      return {
        ...option,
        groupLetter
      }
    });
  }

  private defineRankRanges(options: SelectOption[]): Ranges[] {
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

  private addRankSortingGroupLetter(options: SelectOption[]): SelectOption[] {
    const rankRanges = this.defineRankRanges(options);
  
    return options.map((option) => {
      const groupLetter = this.getGroupRangeLetter(option.rank, rankRanges);

      return {
        ...option,
        groupLetter
      }
    });
  }

  addGroupingLetter(options: SelectOption[], sort: MarketSortingOption): SelectOption[] {
    const strategy = {
      [MarketSortingOptionsEnum.name]: this.addNameSortingGroupLetter.bind(this),
      [MarketSortingOptionsEnum.rank]: this.addRankSortingGroupLetter.bind(this),
      [MarketSortingOptionsEnum.household]: this.addHouseholdSortingGroupletter.bind(this),
    }

    return strategy[sort](options);
  }

  private sortByNumericalOrder(options: SelectOption[], prop: string, order: SortMethods = SortMethodsEnum.ascend): SelectOption[] {
    return R.sort(
      (a, b) => order === SortMethodsEnum.ascend ? a[prop] - b[prop] : b[prop] - a[prop],
      options
    );
  }

  private sortByName(options: SelectOption[]): SelectOption[] {
    return this.utilsService.sortByAlphabeticalOrder<SelectOption>(options, SortMethodsEnum.ascend, ['label']);
  }

  private sortByRank(options: SelectOption[]): SelectOption[] {
    return this.sortByNumericalOrder(options, 'rank');
  }

  private sortByHousehold(options: SelectOption[]): SelectOption[] {
    return this.sortByNumericalOrder(options, 'households', SortMethodsEnum.descend);
  }

  sortOptions(options: SelectOption[], sort: MarketSortingOption): SelectOption[] {
    const sortingStrategies = {
      [MarketSortingOptionsEnum.name]: this.sortByName.bind(this),
      [MarketSortingOptionsEnum.rank]: this.sortByRank.bind(this),
      [MarketSortingOptionsEnum.household]: this.sortByHousehold.bind(this),
    };

    return sortingStrategies[sort](options);
  }

  selectAll(options: SelectOption[]): SelectOption[] {
    return options.map((options) => ({ ...options, selected: true }));
  }
}
