import { MarketSortingOptionsEnum, SortMethodsEnum } from '../enums/sorting-options.enum';

export type MarketSortingOption = keyof typeof MarketSortingOptionsEnum;

export type SortMethods = keyof typeof SortMethodsEnum;
