import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { compose, toPairs, reduce, uniq } from 'ramda';

import { Table, TableConfig, Styles, Column, Row, TextFilter, Filter } from '@models/table.model';
import { SortMethods } from '@models/sorting-options.models';

import { SortMethodsEnum } from '@enums/sorting-options.enum';
import { FilterOperatorEnum } from '@enums/filters.enum';

import { UtilsService } from '@services/utils/utils.service';

interface Group {
  [key: string]: any
}

interface TextFilterSelectEvent {
  column: Column,
  textFilter: TextFilter
}

interface ColumnAutoFilterValue {
  column: Column;
  filters: Filter[];
}

interface ColumnAutoFilterData {
  [key: string]: ColumnAutoFilterValue;
}

interface ApplyFilterEvent {
  id: string;
  filters: Filter[];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: Table = { rows: [], columns: [] };
  @Input() config: TableConfig = {};

  @ViewChild('table') table: ElementRef;
  @ViewChild('tableContainer') tableContainer: ElementRef;

  tableBodyStyles: any = {};
  sortedColumn: [ string, SortMethods ];
  columnFilterId: string = '';
  activeColumnAutoFilterId: string = '';
  columnAutoFilterData: ColumnAutoFilterData;
  groupedRowFilterData: Group;
  isColumnAutoFilterVisible: boolean = false;
  columnAutoFilterPosition: any = {
    offsetX: 0,
    offsetY: 0
  }

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.groupedRowFilterData = this.groupRowData();
  }

  getCellStyles(columndId: string): Styles {
    const columnConfig = this.config[columndId];

    return columnConfig ? columnConfig.cellStyles : {}
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tableBodyStyles = {
        width: `${ this.table.nativeElement.offsetWidth}px`
      }
    }, 0);
  }

  private getSortMethod(columnId: string): SortMethods {
    const [ id, sortMethod ] = this.sortedColumn || [];

    if(id === columnId) {
      return sortMethod === SortMethodsEnum.ascend ? SortMethodsEnum.descend : SortMethodsEnum.ascend;
    }

    return SortMethodsEnum.ascend;
  }

  onSortClick(event: MouseEvent, column: Column): void {
    event.stopPropagation();
  
    const propertyPath = [ 'data', column.id ];
    const sortMethod = this.getSortMethod(column.id);

    this.sortedColumn = [ column.id, sortMethod ];

    this.data.rows = this.utilsService.sortByAlphabeticalOrder<Row>(this.data.rows, sortMethod,  propertyPath);
  }

  onDrop(event: CdkDragDrop<Element, Element, Column>): void {
    moveItemInArray(this.data.columns, event.previousIndex, event.currentIndex);
  }

  updateColumnsWidth({ id }: Column, diff: number): Column[] {
    return this.data.columns.reduce<Column[]>((acc, column) => {
      const width = column.width + diff;
      const columnWidth = column.id === id && width > 150 ? width : column.width
    
      acc.push({
        ...column,
        width: columnWidth
      });

      return acc;
    }, []);
  }

  onResizeEnd(event: number, column: any): void {
    const columns = this.updateColumnsWidth(column, event);

    this.data.columns = columns;
  }

  getColumnCellStyles(column: Column): { [key: string]: string } {
    const width = `${ column.width }px`;
  
    return {
      width,
      minWidth: width,
      maxWidth: width
    }
  }

  groupRowData(): Group {
    return compose<Row[][], Group, any, Group>(
      reduce<[string, any], Group>((acc, [ id, value ]) => {
        acc[id] = uniq(value);

        return acc;
      }, {}),
      toPairs,
      reduce<Row, Group>((acc, { data }) => {
        Object.entries(data).forEach(([ id, value ]) => {
          if(acc[id] && value) {
            acc[id].push(value);
          } else {
            acc[id] = [];
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

    this.columnAutoFilterData = {
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
  }

  onFilterApply({ id, filters }: ApplyFilterEvent): void {
    this.columnAutoFilterData = this.updateAutoColumnFiltersById(id, filters);

    console.log(this.columnAutoFilterData);
  }

  onFilterCancel(id: string): void {
    this.isColumnAutoFilterVisible = false;
    this.columnFilterId = id;
  }
}
