import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MediaProfileFields, MediaProfileFieldsLabels } from '@enums/media-profile.enum';
import { SearchColumnsIdEnum, SearchColumnsEnum } from '@enums/search.enum';
import { Maven, MavenFile } from '@models/maven.model';
import { Row, Column, Table } from '@models/table.model';
import { MediaProfileListService } from '@services/media-profile-list/media-profile-list.service';
import { lensPath, lensProp, view } from 'ramda';
import { Subject, takeUntil } from 'rxjs';
import { DynamicListComponent } from '../../../core/modules/dynamic-list/dynamic-list.component';
interface Field {
  id: MediaProfileFields;
  path: MediaProfileFields | string[]
  label: MediaProfileFieldsLabels;
  icon?: string;
  value?: string;
  className?: string[];
  iconStroke?: string;
  iconFill?: string;
  valueClassName?: string[];
  labelClassName?: string[];
  valueContentClassName?: string[];
}

interface FileColumn {
  id: keyof MavenFile;
  label: string;
  className: string[];
  icon?: string;
  iconFill?: string;
}

const mainInformationFields: Field[] = [
  {
    id: MediaProfileFields.id,
    path: MediaProfileFields.id,
    label: MediaProfileFieldsLabels.id
  },
  {
    id: MediaProfileFields.address,
    path: [MediaProfileFields.address, 'completeAddress'],
    label: MediaProfileFieldsLabels.address,
    icon: MediaProfileFields.address,
    className: ['row-span-4', 'align-self'],
    iconFill: '#797979',
    iconStroke: 'none'
  },
  {
    id: MediaProfileFields.website,
    path: MediaProfileFields.website,
    label: MediaProfileFieldsLabels.website,
    icon: MediaProfileFields.website,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center'],
    valueClassName: ['text-regal-blue']
  },
  {
    id: MediaProfileFields.owner,
    path: [MediaProfileFields.owner, 'name'],
    label: MediaProfileFieldsLabels.owner,
    valueClassName: ['text-regal-blue']
  },
  {
    id: MediaProfileFields.phone,
    path: MediaProfileFields.phone,
    label: MediaProfileFieldsLabels.phone,
    icon: MediaProfileFields.phone,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center']
  },
  {
    id: MediaProfileFields.email,
    path: MediaProfileFields.email,
    label: MediaProfileFieldsLabels.email,
    icon: MediaProfileFields.email,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center']
  },
  {
    id: MediaProfileFields.parent,
    path: [MediaProfileFields.parent, 'name'],
    label: MediaProfileFieldsLabels.parent,
    valueClassName: ['text-regal-blue']
  },
  {
    id: MediaProfileFields.fax,
    path: MediaProfileFields.fax,
    label: MediaProfileFieldsLabels.fax,
    icon: MediaProfileFields.fax,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center']
  },
];

const mavenAttributesFields: Field[] = [
  {
    id: MediaProfileFields.type,
    path: ['mediaType', MediaProfileFields.type],
    label: MediaProfileFieldsLabels.type,
    valueContentClassName: ['bg-[#E4F2FF] text-[#4087F3] rounded-xl py-0.5 px-2 w-fit'],
  },
  {
    id: MediaProfileFields.language,
    path: MediaProfileFields.language,
    label: MediaProfileFieldsLabels.language,
    valueContentClassName: ['bg-[#FFFBD8] text-[#80761E] rounded-xl py-0.5 px-2 w-fit']
  },

  {
    id: MediaProfileFields.categories,
    path: MediaProfileFields.categories,
    label: MediaProfileFieldsLabels.categories,
    valueContentClassName: ['bg-[#F6E4FF] text-[#931ACC] rounded-xl py-0.5 px-2 w-fit']
  },
  {
    id: MediaProfileFields.fccid,
    path: MediaProfileFields.fccid,
    label: MediaProfileFieldsLabels.fccid,
  },
  {
    id: MediaProfileFields.geographicAppeal,
    path: ['geoAppeal'],
    label: MediaProfileFieldsLabels.geographicAppeal
  },
  {
    id: MediaProfileFields.licenseCity,
    path: MediaProfileFields.licenseCity,
    label: MediaProfileFieldsLabels.licenseCity
  },
  {
    id: MediaProfileFields.dma,
    path: MediaProfileFields.dma,
    label: MediaProfileFieldsLabels.dma,
    valueClassName: ['text-regal-blue'],
  },
  {
    id: MediaProfileFields.licenseCountry,
    path: MediaProfileFields.licenseCountry,
    label: MediaProfileFieldsLabels.licenseCountry,
  },
  {
    id: MediaProfileFields.slogan,
    path: MediaProfileFields.slogan,
    label: MediaProfileFieldsLabels.slogan
  },
  {
    id: MediaProfileFields.class,
    path: MediaProfileFields.class,
    label: MediaProfileFieldsLabels.class,
  },
  {
    id: MediaProfileFields.power,
    path: MediaProfileFields.power,
    label: MediaProfileFieldsLabels.power
  },
  {
    id: MediaProfileFields.amsl,
    path: MediaProfileFields.amsl,
    label: MediaProfileFieldsLabels.amsl
  },
  {
    id: MediaProfileFields.agl,
    path: MediaProfileFields.agl,
    label: MediaProfileFieldsLabels.agl
  },
  {
    id: MediaProfileFields.haat,
    path: MediaProfileFields.haat,
    label: MediaProfileFieldsLabels.haat
  },
  {
    id: MediaProfileFields.displayChannel,
    path: MediaProfileFields.displayChannel,
    label: MediaProfileFieldsLabels.displayChannel
  },
  {
    id: MediaProfileFields.digitalChannel,
    path: MediaProfileFields.digitalChannel,
    label: MediaProfileFieldsLabels.digitalChannel
  },
  {
    id: MediaProfileFields.timeZone,
    path: MediaProfileFields.timeZone,
    label: MediaProfileFieldsLabels.timeZone
  },
  {
    id: MediaProfileFields.coordinates,
    path: MediaProfileFields.coordinates,
    label: MediaProfileFieldsLabels.coordinates,
    className: ['col-start-2 col-end-3']
  },
];

const diversityAttributesFields: Field[] = [
  {
    id: MediaProfileFields.certified,
    path: [
      'diversity', MediaProfileFields.certified,
    ],
    label: MediaProfileFieldsLabels.certified
  },
  {
    id: MediaProfileFields.classfied,
    path: ['diversity', 'classified'],
    label: MediaProfileFieldsLabels.classfied
  },
  {
    id: MediaProfileFields.fcc,
    path: ['diversity', MediaProfileFields.fcc],
    label: MediaProfileFieldsLabels.fcc,
    valueContentClassName: ['bg-[#F6E4FF] text-[#931ACC] rounded-xl py-0.5 px-2 w-fit']
  },
  {
    id: MediaProfileFields.target,
    path: ['diversity', MediaProfileFields.target],
    label: MediaProfileFieldsLabels.target
  },
];

const filesColumnsConfig: FileColumn[] = [
  {
    id: 'name',
    label: 'Name',
    className: ['basis-[40%]']
  },
  {
    id: 'type',
    label: 'Type',
    className: ['basis-[25%]']

  },
  {
    id: 'file',
    label: '',
    className: ['basis-[5%]'],
    icon: 'pdfFileIcon',
    iconFill: '#797979'
  },
  {
    id: 'uploadDate',
    label: 'Date',
    className: ['basis-[25%]']
  },
  {
    id: 'actions',
    label: '...',
    className: ['basis-[5%]'],
    icon: 'downloadArrow',
    iconFill: '#3A63CC'
  }
];



const COLUMNS: Column[] = [
  {
    id: SearchColumnsIdEnum.mavenid,
    label: SearchColumnsEnum.mavenid,
    width: 200
  },
  {
    id: SearchColumnsIdEnum.name,
    label: SearchColumnsEnum.name,
    width: 200
  },
  {
    id: SearchColumnsIdEnum.market,
    label: SearchColumnsEnum.market,
    width: 200
  }
];

interface FieldArrayItem {
  id: string;
  name: string;
};

type Formatter = {
  [key in MediaProfileFields]?: (value: any) => string;
}

@Component({
  selector: 'app-spot-tv-media-profile',
  templateUrl: './spot-tv-media-profile.component.html',
  styleUrls: ['./spot-tv-media-profile.component.scss']
})
export class SpotTvMediaProfileComponent implements OnInit, OnDestroy {
  title = 'Spot TV';
  listButtonTitle = 'Spot TV List';

  mainInformation: Field[] = [];
  mavenAttributes: Field[] = [];
  diversityAttributes: Field[] = [];
  filesColumns: FileColumn[] = filesColumnsConfig;
  maven: Maven;

  unsubscribeAll: Subject<null> = new Subject();


  // list
  data: Table = { rows: [], columns: [] };
  tableStyles: { [key: string]: string } = { height: '500px' }

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private mediaProfileListService: MediaProfileListService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.maven = data.mediaProfile as Maven;

      this.mainInformation = this.updateFieldsWithValue(mainInformationFields, this.maven);
      this.mavenAttributes = this.updateFieldsWithValue(mavenAttributesFields, this.maven);
      this.diversityAttributes = this.updateFieldsWithValue(diversityAttributesFields, this.maven);
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
          columns: COLUMNS
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
