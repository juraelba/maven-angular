import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, Renderer2 } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDragStart, CdkDragEnd } from '@angular/cdk/drag-drop';
import { compose, toPairs, reduce, uniq, isNil } from 'ramda';

import { Table, TableConfig, Styles, Column, Row, TextFilter, Filter, ColumnAutoFilterData, ColumnAutoFilterValue } from '@models/table.model';
import { SortMethods } from '@models/sorting-options.models';
import { SelectOption } from '@models/select.model';

import { SortMethodsEnum } from '@enums/sorting-options.enum';
import { FilterOperatorEnum } from '@enums/filters.enum';

import { UtilsService } from '@services/utils/utils.service';
import { SearchService } from '@services/search/search.service';
import { ListsService } from '@services/lists/lists.service';

interface Group {
  [key: string]: SelectOption[] | null;
}

interface TextFilterSelectEvent {
  column: Column,
  textFilter: TextFilter
}

interface ApplyFilterEvent {
  id: string;
  filters: Filter[];
}

interface ColumnFilterChangeEvent {
  id: string;
  options: SelectOption[]
}

interface ColumnAutoFilterPosition {
  offsetX: number;
  offsetY: number;
}

interface SelectedGroupHashMap {
  [key: string]: { [key: string]: string; } | undefined;
}

const MIN_COLUMN_WIDTH = 100;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() config: TableConfig = {};
  @Input() data: Table = { rows: [], columns: [] };
  @Input() columnFilterVisible: boolean = true;
  @Input() tableStyles: { [key:string]: string } = {};

  @Output() rowsChange: EventEmitter<Row[]> = new EventEmitter();
  @Output() columnsChange: EventEmitter<Column[]> = new EventEmitter();

  @ViewChild('table') table: ElementRef;
  @ViewChild('tableContainer') tableContainer: ElementRef;

  rows: Row[] = [];
  columns: Column[] = [];

  tableBodyStyles: { [key: string]: string } = {};
  sortedColumn: [ string, SortMethods ] = [ '', SortMethodsEnum.none ];
  columnFilterId: string = '';
  activeColumnAutoFilterId: string = '';
  columnAutoFilterData: ColumnAutoFilterData;
  groupedRowFilterData: Group;
  isColumnAutoFilterVisible: boolean = false;
  columnAutoFilterPosition: ColumnAutoFilterPosition = {
    offsetX: 0,
    offsetY: 0
  }
  draggableElement: EventTarget | null;

  constructor(
    private utilsService: UtilsService,
    private searchService: SearchService,
    private listsService: ListsService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.rows = [ ...this.data.rows ];
    this.columns = [ ...this.data.columns ];

    this.groupedRowFilterData = this.groupRowData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.data && !changes.data.firstChange) {
      this.rows = [ ...changes.data.currentValue.rows ];
      this.columns = [ ...changes.data.currentValue.columns ];

      this.rowsChange.emit(this.rows);
      this.columnsChange.emit(this.columns);

      this.resetAllFilters();
      this.defineContainerLength()
    }
  }
  
  defineContainerLength(): void {
    const columnsWidths = this.columns.reduce<number>((acc, { width }) => acc + width, 0);

    const cdkVirtualScrollWrapper = this.tableContainer.nativeElement.querySelector('.cdk-virtual-scroll-content-wrapper');

    cdkVirtualScrollWrapper.style.width = columnsWidths + 'px';
  }

  ngAfterViewInit(): void {
    this.defineContainerLength();
  }

  getCellStyles(columndId: string): Styles {
    const columnConfig = this.config[columndId];

    return columnConfig ? columnConfig.cellStyles : {}
  }

  private getSortMethod(columnId: string): SortMethods {
    const [ id, sortMethod ] = this.sortedColumn || [];

    const sortMethodMapper = {
      [SortMethodsEnum.none]: SortMethodsEnum.ascend,
      [SortMethodsEnum.ascend]: SortMethodsEnum.descend,
      [SortMethodsEnum.descend]: SortMethodsEnum.none
    }

    if(id === columnId) {
      return sortMethodMapper[sortMethod];
    }

    return sortMethodMapper[SortMethodsEnum.none];
  }

  onSortClick(event: MouseEvent, column: Column): void {
    event.stopPropagation();

    const propertyPath = [ 'data', column.id ];
    const sortMethod = this.getSortMethod(column.id);

    this.sortedColumn = [ column.id, sortMethod ];

    if(sortMethod === SortMethodsEnum.none) {
      const mapedFilters = this.searchService.mapFilters(this.columnAutoFilterData);
      const selectedGroupedRowFilterData = this.getSelectedGroupedRowFilterData();
      const filteredByGroupRowFilters = this.filterBySelectedGroupRowFilterData(this.data.rows, selectedGroupedRowFilterData);

      this.rows = this.searchService.filterDataBasedOnColumnAutoFilters(filteredByGroupRowFilters, mapedFilters);
    } else {
      this.rows = this.utilsService.sortByAlphabeticalOrder<Row>(this.rows, sortMethod,  propertyPath);
    }

    this.rowsChange.emit(this.rows);
  }

  onDrop(event: CdkDragDrop<Element, Element, Column>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);

    this.columnsChange.emit(this.columns);
  }

  updateColumnsWidth({ id }: Column, diff: number): Column[] {
    return this.columns.reduce<Column[]>((acc, column) => {
      const widthWithDiff = column.width + diff;

      let columnWidth = 0;

      if(column.id === id) {
        if(widthWithDiff > MIN_COLUMN_WIDTH) {
          columnWidth = widthWithDiff
        } else {
          columnWidth = MIN_COLUMN_WIDTH;
        }
      } else {
        columnWidth = column.width;
      }
    
      acc.push({
        ...column,
        width: columnWidth
      });

      return acc;
    }, []);
  }

  onResizeEnd(diff: number, column: Column): void {
    const columns = this.updateColumnsWidth(column, diff);

    this.columns = columns;

    this.defineContainerLength()
  }

  getColumnCellStyles(column: Column): { [key: string]: string } {
    const width = `${ column.width }px`;

    return {
      width,
      minWidth: width,
      maxWidth: width
    }
  }

  getColumnTextStyles(column: Column): { [key: string]: string } {
    const width = `${ column.width - 40 }px`;

    return {
      width,
      minWidth: width,
      maxWidth: width
    }
  }

  getColumnFilterDataOptions(rowFilterData: string[] = []): SelectOption[] {
    const uniqValues = uniq(rowFilterData);

    return uniqValues.map((data) => ({
      id: data,
      value: data,
      label: data,
      selected: true
    }));
  }

  groupRowData(): Group {
    return compose<Row[][], Group, [string, string[]][], Group>(
      reduce<[string, string[]], Group>((acc, [ id, value ]) => {
        acc[id] = !isNil(value) ? this.getColumnFilterDataOptions(value) : null;

        return acc;
      }, {}),
      toPairs,
      reduce<Row, Group>((acc, { data }) => {
        Object.entries(data).forEach(([ id, value ]) => {
          const isValueNill = isNil(value);
          const groupValue = acc[id];
        
          if(groupValue && !isValueNill) {
            groupValue.push(value);
          } else if(!isValueNill) {
            acc[id] = [ value ];
          } else {
            acc[id] = null;
          }
        });
  
        return acc;
      }, {})
    )(this.data.rows);
  }

  onOpenFilter(id: string): void {
    this.columnFilterId = id !== this.columnFilterId ? id : '';
  }

  onCloseFilter(): void {
    this.columnFilterId = '';
  }

  onTextFilterSelect({ column, textFilter }: TextFilterSelectEvent): void {
    const { width, height } = this.tableContainer.nativeElement.getBoundingClientRect();

    this.columnAutoFilterPosition = {
      offsetX: width / 2 - 250,
      offsetY: height / 2 + 100
    };

    this.columnAutoFilterData = this.columnAutoFilterData && this.columnAutoFilterData[column.id]
      ? this.columnAutoFilterData
      : {
        ...this.columnAutoFilterData,
        [column.id]: {
          column,
          filters: [
            {
              id: new Date().getTime().toString(),
              textFilterType: textFilter.value,
              textFilterLabel: textFilter.label,
              value: '',
              operator: FilterOperatorEnum.AND
            }
          ]
        }
      };

    this.activeColumnAutoFilterId = column.id;
    this.isColumnAutoFilterVisible = true;
  }

  onClickOutside(): void {
    this.columnAutoFilterPosition = {
      offsetX: 0,
      offsetY: 0
    };

    this.isColumnAutoFilterVisible = false;
  }

  updateAutoColumnFiltersById(id: string, filters: Filter[]): ColumnAutoFilterData {
    return compose<[ColumnAutoFilterData], [string, ColumnAutoFilterValue][], ColumnAutoFilterData>(
      reduce<[string, ColumnAutoFilterValue], ColumnAutoFilterData>((acc, [ key, value ]) => {
        acc[key] = key === id
          ? { column: value.column, filters }
          : value;

        return acc;
      }, {}),
      toPairs
    )(this.columnAutoFilterData);
  }

  onFilterClear(id: string): void {
    this.columnAutoFilterData = this.updateAutoColumnFiltersById(id, []);

    const mapedFilters = this.searchService.mapFilters(this.columnAutoFilterData);

    this.rows = this.searchService.filterDataBasedOnColumnAutoFilters(this.data.rows, mapedFilters);
    this.isColumnAutoFilterVisible = false;

    this.rowsChange.emit(this.rows);
  }

  onFilterApply({ id, filters }: ApplyFilterEvent): void {
    this.columnAutoFilterData = this.updateAutoColumnFiltersById(id, filters);

    const mapedFilters = this.searchService.mapFilters(this.columnAutoFilterData);

    this.rows = this.searchService.filterDataBasedOnColumnAutoFilters(this.data.rows, mapedFilters);
    this.isColumnAutoFilterVisible = false;

    this.rowsChange.emit(this.rows);
  }

  onFilterCancel(id: string): void {
    this.isColumnAutoFilterVisible = false;
    this.columnFilterId = id;
  }

  updateGroupedRowFilterData(id: string, options: SelectOption[]): Group {
    const selectedOptions = options.reduce<{[key: string]: string}>((acc, { value }) => {
      acc[value] = value;

      return acc;
    }, {});

    const rowFilterDataOptions = this.groupedRowFilterData[id];

    const updatedColumnFilter = !isNil(rowFilterDataOptions)
      ? rowFilterDataOptions.map((option) => ({
        ...option,
        selected: selectedOptions[option.value] ? true : false
        }))
      : null;

    return {
      ...this.groupedRowFilterData,
      [id]: updatedColumnFilter
    }
  }

  getSelectedGroupedRowFilterData(): Group {
    return compose<[Group], [string, SelectOption[] | null][], Group>(
      reduce<[string, SelectOption[] | null], Group>((acc, [ key, value ]) => {
        acc[key] = !isNil(value) ? this.listsService.getSelectedOptions(value) : null;

        return acc;
      }, {}),
      toPairs
    )(this.groupedRowFilterData);
  }

  createHashMapFromSelectedGroup(selectedGroup: Group): SelectedGroupHashMap {
    const selectedPairs = toPairs(selectedGroup);

    return selectedPairs.reduce<SelectedGroupHashMap>((acc, [ key, pairValue ]) => {
      acc[key] = pairValue?.reduce<{ [key: string]: string }>((valueAcc, { label }: SelectOption) => {
        valueAcc[label] = label;

        return valueAcc;
      }, {})

      return acc;
    },{});
  }
  
  filterBySelectedGroupRowFilterData(rows: Row[], selected: Group): Row[] {
    const data = [];

    const selectedGroupHashMap = this.createHashMapFromSelectedGroup(selected);

    for(let i = 0; i < rows.length; i++) {
        const rowDataPairs = Object.entries(rows[i].data);

        const isRowValid = rowDataPairs.every(([ key, value ]) => {
          const selectedOptions = selectedGroupHashMap[key];

          if(isNil(selectedOptions) || isNil(value)){
            return true;
          } else {
            const found = selectedOptions[value];

            return Boolean(found);
          }
        });
  
        if(isRowValid) {
          data.push(rows[i]);
        };
    }

    return data;
  }

  onColumnFilterChange({ id, options }: ColumnFilterChangeEvent): void {
    if(isNil(this.groupedRowFilterData[id])) {
      return;
    }

    this.groupedRowFilterData = this.updateGroupedRowFilterData(id, options);

    const selectedGroupedRowFilterData = this.getSelectedGroupedRowFilterData();
    const mapedFilters = this.searchService.mapFilters(this.columnAutoFilterData);

    const filteredByGroupRowFilters = this.filterBySelectedGroupRowFilterData(this.data.rows, selectedGroupedRowFilterData);

    const filteredRows = this.searchService.filterDataBasedOnColumnAutoFilters(filteredByGroupRowFilters, mapedFilters);

    this.rows = filteredRows;

    this.rowsChange.emit(this.rows);
  }

  resetAllFilters(): void {
    this.groupedRowFilterData = this.groupRowData();
    this.columnAutoFilterData = {};
  }

  getSortIconClass({ id }: Column): string {
    const [ columnId, sortMethod ] = this.sortedColumn;

    const classMapper = {
      [SortMethodsEnum.ascend]: 'rotate-180',
      [SortMethodsEnum.descend]: 'rotate-0',
      [SortMethodsEnum.none]: 'hidden'
    }

    if(columnId === id) {
      return classMapper[sortMethod];
    }

    return 'hidden';
  }

  onDragStart({ event }: CdkDragStart): void {
    this.draggableElement = event.target;

    this.renderer.addClass(document.body, 'cursor-move');
  }

  onDragEnd(event: CdkDragEnd): void {
    this.renderer.removeClass(this.draggableElement, 'cursor-move'); 
    this.renderer.addClass(this.draggableElement, 'cursor-pointer');

    this.draggableElement = null;

    this.renderer.removeClass(document.body, 'cursor-move');
  }
}
