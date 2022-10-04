import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MediaProfileFields } from '@enums/media-profile.enum';
import { SearchColumnsIdEnum, SearchColumnsEnum } from '@enums/search.enum';
import { Maven } from '@models/maven.model';
import { Column, Table } from '@models/table.model';
import { MediaProfileListService } from '@services/media-profile-list/media-profile-list.service';
import { lensPath, lensProp, view } from 'ramda';
import { Subject, takeUntil } from 'rxjs';
import { COLUMNS } from 'src/app/core/configs/list-tagle.columns.config';
import { Field, FieldArrayItem, FileColumn, Formatter, profileConfig } from 'src/app/core/configs/profile.config';
import { DynamicListComponent } from '../../../core/modules/dynamic-list/dynamic-list.component';

@Component({
  selector: 'app-spot-tv-media-profile',
  templateUrl: './spot-tv-media-profile.component.html',
  styleUrls: ['./spot-tv-media-profile.component.scss']
})
export class SpotTvMediaProfileComponent implements OnInit, OnDestroy {
  title = 'Spot TV';
  listButtonTitle = 'Spot TV List';
  profileConfig = profileConfig;
  mainInformation: Field[] = [];
  mavenAttributes: Field[] = [];
  diversityAttributes: Field[] = [];
  filesColumns: FileColumn[] = profileConfig.filesColumnsConfig;
  maven: Maven;



  // list table data
  data: Table = { rows: [], columns: [] };
  tableStyles: { [key: string]: string } = { height: '500px' }
  columns: Column[] = COLUMNS;
  private unsubscribeAll: Subject<null> = new Subject();
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private mediaProfileListService: MediaProfileListService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.maven = data.mediaProfile as Maven;

      this.mainInformation = this.updateFieldsWithValue(this.profileConfig.mainInformationFields, this.maven);
      this.mavenAttributes = this.updateFieldsWithValue(this.profileConfig.mavenAttributesFields, this.maven);
      this.diversityAttributes = this.updateFieldsWithValue(this.profileConfig.diversityAttributesFields, this.maven);
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

  formatArray(value: FieldArrayItem[]): string {
    return value.map(({ name }) => name).join('; ');
  }

  openDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.openListDialog();
  }

  openListDialog() {
    this.mediaProfileListService
      .fetchMediaProfiles('' + 11).
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
            tableStyles: this.tableStyles
          }
        });
      });
  }
}
