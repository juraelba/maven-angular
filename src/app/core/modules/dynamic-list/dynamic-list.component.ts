import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchMediaProfileEnumTitles } from '@enums/search.enum';
import { StyleTypesEnum } from '@enums/styles.enum';
import { SearchMediaProfileTitleKey } from '@models/search.model';
import { Row, Table } from '@models/table.model';
import { UtilsService } from '@services/utils/utils.service';

@Component({
  selector: 'app-dynamic-list',
  templateUrl: './dynamic-list.component.html',
  styleUrls: ['./dynamic-list.component.scss'],
})
export class DynamicListComponent implements OnInit {
  styleTypes = StyleTypesEnum;
  tittle: SearchMediaProfileEnumTitles;

  tableData: Table = { rows: [], columns: [] };
  tableStyles: { [key: string]: string } = {
    height: '500px',
  };

  constructor(
    private router: Router,
    private utilsService: UtilsService,
    private dialogRef: MatDialogRef<DynamicListComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { data: Table; tableStyles: { [key: string]: string } }
  ) {}

  ngOnInit(): void {
    const searchScreenKey = this.router.url.split(
      '/'
    )[1] as SearchMediaProfileTitleKey;
    this.tittle = SearchMediaProfileEnumTitles[searchScreenKey];

    if (this.data.data) {
      this.tableData = this.data.data;
    }
    if (this.data.tableStyles) {
      this.tableStyles = this.data.tableStyles;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onRowClick(row: Row): void {
    const searchScreenKey = this.router.url.split(
      '/'
    )[1] as SearchMediaProfileTitleKey;
    this.router.navigate([searchScreenKey, row.data.mavenid]);
    this.utilsService.routeNestCount$.next(
      this.utilsService.routeNestCount$.value + 1
    );
    this.closeDialog();
  }
}
