import { SearchKey } from '@models/search.model';
import { Column, TableConfig, TextFilter } from '@models/table.model';
import { TextFiltersLabelsEnum, TextFiltersValuesEnum } from '@enums/filters.enum';

export const MAX_VALIDATION_TRIES = 3;
export const RECAPTCHA_KEY = '6LeuNgMTAAAAAMQ0zGESyK_KWbrf97s3vyVychg_';


const MEDIA_SEARCH_COLUMNS_CONFIG: TableConfig = {
  market: {
    cellStyles: {
      color: '#3A63CC'
    }
  },
  owner: {
    cellStyles: {
      color: '#3A63CC'
    }
  },
  parent: {
    cellStyles: {
      color: '#3A63CC'
    }
  }
}

export const SEARCH_COLUMNS_CONFIG: any = {
  media: MEDIA_SEARCH_COLUMNS_CONFIG
}

export const TEXT_FILTERS: TextFilter[] = [
  {
    label: TextFiltersLabelsEnum.contain,
    value: TextFiltersValuesEnum.contain,
    id: TextFiltersValuesEnum.contain,
    iconName: 'contain'
  },
  {
    label: TextFiltersLabelsEnum.notContain,
    value: TextFiltersValuesEnum.notContain,
    id: TextFiltersValuesEnum.notContain,
    iconName: 'notContain'
  },
  {
    label: TextFiltersLabelsEnum.startsWith,
    value: TextFiltersValuesEnum.startsWith,
    id: TextFiltersValuesEnum.startsWith,
    iconName: 'bigALetter'
  },
  {
    label: TextFiltersLabelsEnum.endsWith,
    value: TextFiltersValuesEnum.endsWith,
    id: TextFiltersValuesEnum.endsWith,
    iconName: 'smallALetter'
  },
  {
    label: TextFiltersLabelsEnum.equals,
    value: TextFiltersValuesEnum.equals,
    id: TextFiltersValuesEnum.equals,
    iconName: 'equalSign'
  },
  {
    label: TextFiltersLabelsEnum.notEqual,
    value: TextFiltersValuesEnum.notEqual,
    id: TextFiltersValuesEnum.notEqual,
    iconName: 'notEqualSign'
  },
  {
    label: TextFiltersLabelsEnum.empty,
    value: TextFiltersValuesEnum.empty,
    id: TextFiltersValuesEnum.empty,
    iconName: 'emptyPlaceholder'
  },
  {
    label: TextFiltersLabelsEnum.notEmpty,
    value: TextFiltersValuesEnum.notEmpty,
    id: TextFiltersValuesEnum.notEmpty,
    iconName: 'notEmptyPlaceholder'
  },
  {
    label: TextFiltersLabelsEnum.null,
    value: TextFiltersValuesEnum.null,
    id: TextFiltersValuesEnum.null,
    iconName: 'circle'
  },
  {
    label: TextFiltersLabelsEnum.notNull,
    value: TextFiltersValuesEnum.notNull,
    id: TextFiltersValuesEnum.notNull,
    iconName: 'crossedOutCircle'
  },
];

export const COLUMNS_TO_OMIT = [ 'marketID', 'ownerID', 'parentID', 'partnerID', 'subTypeID', 'typeID' ];
