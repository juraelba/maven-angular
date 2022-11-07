import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaProfileFields } from '@enums/media-profile.enum';
import { Maven } from '@models/maven.model';
import { SearchMediaProfileTitleKey } from '@models/search.model';
import { Column, Row, Table } from '@models/table.model';
import { DynamicListComponent } from '@modules/dynamic-list/dynamic-list.component';
import { MediaProfileListService } from '@services/media-profile-list/media-profile-list.service';
import { lensPath, lensProp, view } from 'ramda';
import { Subject, takeUntil } from 'rxjs';
import { CALL_HISTORY_COLUMNS } from 'src/app/core/configs/call-history.table.columns.config';
import { MAGAZINE_CIRCULATION_CONFIG } from 'src/app/core/configs/circulation.config';
import { COLUMNS } from 'src/app/core/configs/list-table.columns.config';
import { PERSONNEL_COLUMNS } from 'src/app/core/configs/personnel.table.config';
import {
  Field,
  FieldArrayItem,
  FileColumn,
  Formatter,
  spotTvProfileConfig,
} from 'src/app/core/configs/profile.config';
import {
  MAGAZINE_RATES_COLUMNS,
  RATE_COLUMNS,
} from 'src/app/core/configs/rates.column.config';

@Component({
  selector: 'app-magazine-profile',
  templateUrl: './magazine-profile.component.html',
  styleUrls: ['./magazine-profile.component.scss'],
})
export class MagazineProfileComponent implements OnInit {
  searchScreenKey: SearchMediaProfileTitleKey;
  profileConfig = spotTvProfileConfig;
  mainInformation: Field[][] = [];
  mavenAttributes: Field[][] = [];
  diversityAttributes: Field[] = [];
  filesColumns: FileColumn[] = spotTvProfileConfig.filesColumnsConfig;
  ratesColumns = MAGAZINE_RATES_COLUMNS;
  maven: Maven;
  magazineCirculationConfig: Column[][] = MAGAZINE_CIRCULATION_CONFIG;
  personnelData: Table;
  callHistoryData: Table;
  circulationData: Table;
  ratesData: any;
  magazineCirculation: any;
  tableStyles: { [key: string]: string } = {
    'min-height': '200px',
    overflow: 'auto',
  };

  // list table data
  data: Table = { rows: [], columns: [] };
  columns: Column[] = COLUMNS;
  dialogTableStyles: { [key: string]: string } = { height: '500px' };

  private unsubscribeAll: Subject<null> = new Subject();
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mediaProfileListService: MediaProfileListService
  ) {}

  ngOnInit(): void {
    this.searchScreenKey = this.router.url.split(
      '/'
    )[1] as SearchMediaProfileTitleKey;

    this.activatedRoute.data.subscribe((data) => {
      this.maven = data.mediaProfile as Maven;
      this.ratesData = {
        rateCardYear: data.mediaProfile?.rateCardYear,
        rateEffectiveDate: data.mediaProfile?.rateEffectiveDate,
        fullPage4CCost: data.mediaProfile?.fullPage4CCost,
        fullPageBWCost: data.mediaProfile?.fullPageBWCost,
      };

      this.maven.rates = this.ratesData;

      this.profileConfig.mainInformationFields.forEach((_, index) => {
        this.mainInformation[index] = this.updateFieldsWithValue(
          this.profileConfig.mainInformationFields[index],
          this.maven
        );
      });

      this.profileConfig.mavenAttributesFields.forEach((_, index) => {
        this.mavenAttributes[index] = this.updateFieldsWithValue(
          this.profileConfig.mavenAttributesFields[index],
          this.maven
        );
      });

      this.diversityAttributes = this.updateFieldsWithValue(
        this.profileConfig.diversityAttributesFields,
        this.maven
      );

      if (this.maven.people) {
        const persons: Row[] = this.maven.people?.map((person) => {
          return { id: person.mavenid, data: { ...person } };
        });
        this.personnelData = {
          rows: persons,
          columns: PERSONNEL_COLUMNS,
        };
      }

      if (this.maven.callHistory) {
        const callHistory: Row[] = this.maven.callHistory?.map((history) => {
          return { id: history.name, data: { ...history } };
        });
        this.callHistoryData = {
          rows: callHistory,
          columns: CALL_HISTORY_COLUMNS,
        };
      }
    });

    if (this.maven.rates) {
      const rates = this.maven.rates;
      this.ratesData = {
        rateCardYear: rates.rateCardYear,
        colorPremium: rates.dailyColorPremium,
        pageSize: rates.fullPageSize,
        colomns: rates.columnCount,
      };
    }

    if (this.maven.circulationDate && this.maven.paidCirculation) {
      this.magazineCirculation = {
        circulationDate: this.maven.circulationDate,
        paidCirculation: this.maven.paidCirculation,
        totalCirculation: this.maven.totalCirculation,
        circulationSource: this.maven.circulationSource,
        nonPaidCirculation: this.maven.nonPaidCirculation,
        geoRuns: this.maven.geoRuns,
        splitRuns: this.maven.splitRuns,
        issueCount: this.maven.issueCount,
        trimSize: this.maven.trimSize,
      };
    }

    this.activatedRoute.queryParamMap
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((paramMap) => {
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
      [MediaProfileFields.categories]: this.formatArray,
    };

    return fields.map((field) => {
      const propertyLens = Array.isArray(field.path)
        ? lensPath(field.path)
        : lensProp<Maven, MediaProfileFields>(field.path);

      const value = view(propertyLens, maven);

      const formattedValue = Boolean(formatters[field.id])
        ? formatters[field.id]?.(value)
        : value;

      return {
        ...field,
        value: formattedValue,
      };
    });
  }

  formatArray(value: FieldArrayItem[]): string[] {
    return value.map(({ name }) => name);
  }

  backToSearch(event: any): void {
    this.router.navigate([this.searchScreenKey]);
  }

  openDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.openListDialog();
  }

  openListDialog() {
    this.mediaProfileListService
      .fetchMediaProfiles('' + 2)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data) => {
        const rows = data.map((data) => {
          return {
            id: data.typeID,
            data: {
              mavenid: data.mavenid,
              name: data.name,
              market: data.market,
            },
          };
        });
        this.data = {
          rows,
          columns: this.columns,
        };

        this.dialog.open(DynamicListComponent, {
          width: '900px',
          panelClass: 'profile',
          data: {
            data: this.data,
            tableStyles: this.dialogTableStyles,
          },
        });
      });
  }
}
