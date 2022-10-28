import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MediaProfileFields } from '@enums/media-profile.enum';
import { SearchColumnsIdEnum } from '@enums/search.enum';
import { Maven } from '@models/maven.model';
import { Table, Column, Row } from '@models/table.model';
import { DynamicListComponent } from '@modules/dynamic-list/dynamic-list.component';
import { lensPath, lensProp, view } from 'ramda';
import { Subject, takeUntil } from 'rxjs';
import { COLUMNS } from 'src/app/core/configs/list-table.columns.config';
import {
  spotTvProfileConfig,
  Field,
  FileColumn,
  Formatter,
  FieldArrayItem,
} from 'src/app/core/configs/profile.config';

const mockMaven: Maven = {
  name: 'WABC-AM',
  id: 'R21362',
  phone: '212-613-3800',
  fax: '212-613-3800',
  description: {
    desc: '',
    descSource: '',
    historySource: '',
    id: 'R21362',
    history: '',
    positioning: '',
    positioningSource: '',
    targetAudience: '',
    targetAudienceSource: '',
  },

  address: {
    completeAddress:
      '2 Penn Plaza; 17th Floor; New York, NY 10121-0101; United States',
    address1: '17th Floor; New York',
    address2: ' NY 10121-0101; United States',
    city: 'New York',
    country: {
      id: 'string',
      name: 'USA',
    },
    id: 1,
    postalCode: ' NY 10121-0101',
    state: 'United States',
  },
  website: 'wabcradio.com',
  email: '@comments@wabcradio.com',
  owner: 'Red Apple Media, Inc',
  parent: 'Red Apple Media, Inc',
  type: 'Station',
  language: 'English',
  categories: ['City/Regional/State/Comminity', 'Category City'],
  geographicAppeal: 'Metropolitan',
  dma: 'New York, NY (1)',
  msa: 'New York, NY (1)',
  slogan: 'WABC-AM 770; Where NEw York Comes To Talks',
  class: 'Commercial, Licensed Class A AM Station',
  frequency: '770',
  fccid: '70658',
  licenseCity: 'New York, NY',
  licenseCountry: 'New York, NY',
  timeZone: 'Eastern',
  power: '50, 000 Watts',
  coordinates: "40 52' 50'' N74 4' 11'' W",
  certified: 'Not Diverse',
  classfied: 'Not Diverse',
  fcc: 'Black',
  target: 'None',
  files: [],
  partners: [],
  callHistory: [],
  haat: 'sas',
  agl: '',
  amsl: '',
  displayChannel: '',
  digitalChannel: '',
};

const MOCK_ROWS: Row[] = [
  {
    id: '1',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R40107',
      [SearchColumnsIdEnum.name]: 'APEX Exchange Local Aggregate',
      [SearchColumnsIdEnum.market]: 'National (USA)',
    },
  },
  {
    id: '2',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R30421',
      [SearchColumnsIdEnum.name]: 'CIMX-FM',
      [SearchColumnsIdEnum.market]: 'Detroit, MI',
    },
  },
  {
    id: '3',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R36230',
      [SearchColumnsIdEnum.name]: 'iHeart Local Aggregate',
      [SearchColumnsIdEnum.market]: 'National (USA)',
    },
  },
  {
    id: '4',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R21141',
      [SearchColumnsIdEnum.name]: 'Joel Mccrea is also acting GSM (alias)',
      [SearchColumnsIdEnum.market]: 'Des Moines-Ames, IA',
    },
  },
];
@Component({
  selector: 'app-cable-network',
  templateUrl: './cable-network.component.html',
  styleUrls: ['./cable-network.component.scss'],
})
export class CableNetworkComponent implements OnInit {
  profileConfig = spotTvProfileConfig;
  mainInformation: Field[][] = [];
  mavenAttributes: Field[][] = [];
  diversityAttributes: Field[] = [];
  filesColumns: FileColumn[] = spotTvProfileConfig.filesColumnsConfig;
  maven: Maven = mockMaven;

  // list table data
  data: Table = { rows: [], columns: [] };
  tableStyles: { [key: string]: string } = { height: '500px' };
  columns: Column[] = COLUMNS;
  private unsubscribeAll: Subject<null> = new Subject();
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mainInformation.forEach((_, index) => {
      this.mainInformation[index] = this.updateFieldsWithValue(
        this.profileConfig.mainInformationFields[index],
        this.maven
      );
    });

    this.mainInformation.forEach((_, index) => {
      this.mavenAttributes[index] = this.updateFieldsWithValue(
        this.profileConfig.mavenAttributesFields[index],
        this.maven
      );
    });
    this.diversityAttributes = this.updateFieldsWithValue(
      this.profileConfig.diversityAttributesFields,
      this.maven
    );

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

  openDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.openListDialog();
  }

  openListDialog() {
    this.dialog.open(DynamicListComponent, {
      width: '900px',
      panelClass: 'profile',
      data: {
        data: {
          rows: MOCK_ROWS,
          columns: this.columns,
        },
      },
    });
  }
}
