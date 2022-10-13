import { Styles, TableConfig, TextFilter } from '@models/table.model';
import { TextFiltersLabelsEnum, TextFiltersValuesEnum } from '@enums/filters.enum';

export const MAX_VALIDATION_TRIES = 3;
export const RECAPTCHA_KEY = '6LeuNgMTAAAAAMQ0zGESyK_KWbrf97s3vyVychg_';
export const LINK_STYLE: Styles = {
  color: '#3A63CC',
  cursor: 'pointer'
}

export const SEARCH_COLUMNS_CONFIG: TableConfig = {
  mavenid: {
    cellStyles: {},
    cellLinkPath: { path: 'mavenid', external: false },
    pinned: true,
  },
  name: {
    cellStyles: LINK_STYLE,
    cellLinkPath: { path: 'mavenid', external: false },
    pinned: true,
  },
  market: {
    cellStyles: LINK_STYLE,
    cellLinkPath: { path: 'marketID', external: false, parentPath: '/market' }
  },
  owner: {
    cellStyles: LINK_STYLE,
    cellLinkPath: { path: 'ownerID', external: false, parentPath: '/owner' }
  },
  parent: {
    cellStyles: LINK_STYLE,
    cellLinkPath: { path: 'parentID', external: false, parentPath: '/parent' }
  },
  website: {
    cellStyles: LINK_STYLE,
    cellLinkPath: { path: 'website', external: true }
  },
  partners: {
    cellStyles: LINK_STYLE,
    cellLinkPath: { path: 'partnerID', external: false, parentPath: '/partner' }
  },
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
