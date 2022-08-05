import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Table, TableConfig, Styles, Column, Row } from '@models/table.model';
import { SortMethods } from '@models/sorting-options.models';

import { SortMethodsEnum } from '@enums/sorting-options.enum';

import { UtilsService } from '@services/utils/utils.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: Table = { rows: [], columns: [] };
  @Input() config: TableConfig = {};

  @ViewChild('table') table: ElementRef;

  tableBodyStyles: any = {};
  sortedColumn: [ string, SortMethods ];

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {

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
}
