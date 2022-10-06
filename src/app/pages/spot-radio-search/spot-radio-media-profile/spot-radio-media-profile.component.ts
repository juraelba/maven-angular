import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { lensPath, lensProp, view } from 'ramda'

import { Maven } from '@models/maven.model';
import { MediaProfileFields } from '@enums/media-profile.enum';

import { MediaProfileListService } from '@services/media-profile-list/media-profile-list.service';
import { Subject, takeUntil } from 'rxjs';
import { DynamicListComponent } from '@modules/dynamic-list/dynamic-list.component';
import { Column, Row, Table } from '@models/table.model';
import { COLUMNS } from 'src/app/core/configs/list-table.columns.config';
import { Field, FieldArrayItem, FileColumn, Formatter, spotRadioProfileConfig } from 'src/app/core/configs/profile.config';
import { PERSONNEL_COLUMNS } from 'src/app/core/configs/personnel.table.config';
import { CALL_HISTORY_COLUMNS } from 'src/app/core/configs/call-history.table.columns.config';

@Component({
  selector: 'app-spot-radio-media-profile',
  templateUrl: './spot-radio-media-profile.component.html',
  styleUrls: ['./spot-radio-media-profile.component.scss']
})
export class SpotRadioMediaProfileComponent implements OnInit, OnDestroy {
  radioProfileConfig = spotRadioProfileConfig;
  mainInformation: Field[][] = [];
  mavenAttributes: Field[][] = [];
  diversityAttributes: Field[] = [];
  filesColumns: FileColumn[] = this.radioProfileConfig.filesColumnsConfig;
  maven: Maven;

  personnelData: Table;
  callHistoryData: Table;
  tableStyles: { [key: string]: string } = { width: '100%', 'min-height': '200px' }

  // list table data
  data: Table = { rows: [], columns: [] };
  columns: Column[] = COLUMNS;
  dialogTableStyles: { [key: string]: string } = { height: '500px' }

  private unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private mediaProfileListService: MediaProfileListService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.maven = data.mediaProfile as Maven;
      this.radioProfileConfig.mainInformationFields.forEach((_, index) => {
        this.mainInformation[index] = this.updateFieldsWithValue(this.radioProfileConfig.mainInformationFields[index], this.maven);
      });

      this.radioProfileConfig.mavenAttributesFields.forEach((_, index) => {
        this.mavenAttributes[index] = this.updateFieldsWithValue(this.radioProfileConfig.mavenAttributesFields[index], this.maven);
      });

      this.diversityAttributes = this.updateFieldsWithValue(this.radioProfileConfig.diversityAttributesFields, this.maven);

      if (this.maven.people) {
        const persons: Row[] = this.maven.people?.map(person => { return { id: person.mavenid, data: { ...person } } });
        this.personnelData = {
          rows: persons,
          columns: PERSONNEL_COLUMNS
        }
      }

      if (this.maven.callHistory) {
        const callHistory: Row[] = this.maven.callHistory?.map(history => { return { id: history.name, data: { ...history } } });
        this.callHistoryData = {
          rows: callHistory,
          columns: CALL_HISTORY_COLUMNS
        }
      }
    })

    this.activatedRoute.queryParamMap.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(paramMap => {
      const showList = paramMap.get('list');
      if (showList === 'true') {
        this.openListDialog();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  updateFieldsWithValue(fields: Field[], maven: Maven): Field[] {
    const formatters: Formatter = {
      [MediaProfileFields.categories]: this.formatArray
    };

    return fields.map((field) => {
      const propertyLens = Array.isArray(field.path)
        ? lensPath(field.path)
        : lensProp<Maven, MediaProfileFields>(field.path);

      const value = view(propertyLens, maven);

      const formattedValue = Boolean(formatters[field.id]) ? formatters[field.id]?.(value) : value;

      return {
        ...field,
        value: formattedValue
      };
    });
  }

  formatArray(value: FieldArrayItem[]): string[] {
    return value.map(({ name }) => name);
  }

  openDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.openListDialog();
  }

  openListDialog() {
    this.mediaProfileListService
      .fetchMediaProfiles('' + 10).
      pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(data => {
        const rows = data.map(data => {
          return {
            id: data.typeID,
            data: { mavenid: data.mavenid, name: data.name, market: data.market }
          }
        });
        this.data = {
          rows,
          columns: this.columns
        };

        this.dialog.open(DynamicListComponent, {
          width: '900px',
          panelClass: 'profile',
          data: {
            data: this.data,
            tableStyles: this.dialogTableStyles
          }
        });
      });
  }
}
