import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MediaProfileFields, MediaProfileFieldsLabels } from '@enums/media-profile.enum';
import { SearchColumnsIdEnum, SearchColumnsEnum } from '@enums/search.enum';
import { Maven, MavenFile } from '@models/maven.model';
import { Row, Column, Table } from '@models/table.model';
import { Subject, takeUntil } from 'rxjs';
import { DynamicListComponent } from '../../../core/modules/dynamic-list/dynamic-list.component';

const mockMaven = {
  mavenId: 'KPOB-TV',
  id: 'R21362',
  phone: '212-613-3800',
  workingPhone: '212-613-3800',
  address: '2 Penn Plaza; 17th Floor; New York, NY 10121-0101; United States',
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
  coordinates: '40 52\' 50\'\' N74 4\' 11\'\' W',
  certified: 'Not Diverse',
  classfied: 'Not Diverse',
  fcc: 'Black',
  target: 'None',
  files: [
    {
      name: 'FCC Ownership Report 2020',
      type: 'FCC',
      date: '03/18/2020'
    },
    {
      name: 'FCC Ownership 2021',
      type: 'FCC',
      date: '03/18/2021'
    },
    {
      name: 'FCC Ownership 2022',
      type: 'FCC',
      date: '03/18/2022'
    }
  ],
  mediaPartners: ['WABC-AM (Digital)'],
  callHistory: '',
  haat: '1071 feet(310 meters)',
  agl: '510 feet(159 meters)',
  amsl: '603 feet(184 meters)',
  displayChannel: 15,
  digitalChannel: 15
};

interface Field {
  id: MediaProfileFields,
  label: MediaProfileFieldsLabels,
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
    label: MediaProfileFieldsLabels.id
  },
  {
    id: MediaProfileFields.address,
    label: MediaProfileFieldsLabels.address,
    icon: MediaProfileFields.address,
    className: ['row-span-4', 'align-self'],
    iconFill: '#797979',
    iconStroke: 'none'
  },
  {
    id: MediaProfileFields.website,
    label: MediaProfileFieldsLabels.website,
    icon: MediaProfileFields.website,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center'],
    valueClassName: ['text-regal-blue']
  },
  {
    id: MediaProfileFields.owner,
    label: MediaProfileFieldsLabels.owner,
    valueClassName: ['text-regal-blue']
  },
  {
    id: MediaProfileFields.phone,
    label: MediaProfileFieldsLabels.phone,
    icon: MediaProfileFields.phone,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center']
  },
  {
    id: MediaProfileFields.email,
    label: MediaProfileFieldsLabels.email,
    icon: MediaProfileFields.email,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center']
  },
  {
    id: MediaProfileFields.parent,
    label: MediaProfileFieldsLabels.parent,
    valueClassName: ['text-regal-blue']
  },
  {
    id: MediaProfileFields.workingPhone,
    label: MediaProfileFieldsLabels.workingPhone,
    icon: MediaProfileFields.workingPhone,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center']
  },
];

const mavenAttributesFields: Field[] = [
  {
    id: MediaProfileFields.type,
    label: MediaProfileFieldsLabels.type,
    valueContentClassName: ['bg-[#E4F2FF] text-[#4087F3] rounded-xl py-0.5 px-2 w-fit'],
  },
  {
    id: MediaProfileFields.language,
    label: MediaProfileFieldsLabels.language,
    valueContentClassName: ['bg-[#FFFBD8] text-[#80761E] rounded-xl py-0.5 px-2 w-fit']
  },

  {
    id: MediaProfileFields.categories,
    label: MediaProfileFieldsLabels.categories,
    valueContentClassName: ['bg-[#F6E4FF] text-[#931ACC] rounded-xl py-0.5 px-2 w-fit']
  },
  {
    id: MediaProfileFields.fccid,
    label: MediaProfileFieldsLabels.fccid,
  },
  {
    id: MediaProfileFields.geographicAppeal,
    label: MediaProfileFieldsLabels.geographicAppeal
  },
  {
    id: MediaProfileFields.licenseCity,
    label: MediaProfileFieldsLabels.licenseCity
  },
  {
    id: MediaProfileFields.dma,
    label: MediaProfileFieldsLabels.dma,
    valueClassName: ['text-regal-blue'],
  },
  {
    id: MediaProfileFields.licenseCountry,
    label: MediaProfileFieldsLabels.licenseCountry,
  },
  {
    id: MediaProfileFields.slogan,
    label: MediaProfileFieldsLabels.slogan
  },
  {
    id: MediaProfileFields.class,
    label: MediaProfileFieldsLabels.class,
  },
  {
    id: MediaProfileFields.power,
    label: MediaProfileFieldsLabels.power
  },
  {
    id: MediaProfileFields.amsl,
    label: MediaProfileFieldsLabels.amsl
  },
  {
    id: MediaProfileFields.agl,
    label: MediaProfileFieldsLabels.agl
  },
  {
    id: MediaProfileFields.haat,
    label: MediaProfileFieldsLabels.haat
  },
  {
    id: MediaProfileFields.displayChannel,
    label: MediaProfileFieldsLabels.displayChannel
  },
  {
    id: MediaProfileFields.digitalChannel,
    label: MediaProfileFieldsLabels.digitalChannel
  },
  {
    id: MediaProfileFields.timeZone,
    label: MediaProfileFieldsLabels.timeZone
  },
  {
    id: MediaProfileFields.coordinates,
    label: MediaProfileFieldsLabels.coordinates,
    className: ['col-start-2 col-end-3']
  },
];

const diversityAttributesFields: Field[] = [
  {
    id: MediaProfileFields.certified,
    label: MediaProfileFieldsLabels.certified
  },
  {
    id: MediaProfileFields.classfied,
    label: MediaProfileFieldsLabels.classfied
  },
  {
    id: MediaProfileFields.fcc,
    label: MediaProfileFieldsLabels.fcc,
    valueContentClassName: ['bg-[#F6E4FF] text-[#931ACC] rounded-xl py-0.5 px-2 w-fit']
  },
  {
    id: MediaProfileFields.target,
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
    id: 'date',
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



// list
const MOCK_ROWS: Row[] = [
  {
    id: '1',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R40107',
      [SearchColumnsIdEnum.name]: 'APEX Exchange Local Aggregate',
      [SearchColumnsIdEnum.market]: 'National (USA)'
    }
  },
  {
    id: '2',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R30421',
      [SearchColumnsIdEnum.name]: 'CIMX-FM',
      [SearchColumnsIdEnum.market]: 'Detroit, MI'
    }
  },
  {
    id: '3',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R36230',
      [SearchColumnsIdEnum.name]: 'iHeart Local Aggregate',
      [SearchColumnsIdEnum.market]: 'National (USA)'
    }
  },
  {
    id: '4',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R21141',
      [SearchColumnsIdEnum.name]: 'Joel Mccrea is also acting GSM (alias)',
      [SearchColumnsIdEnum.market]: 'Des Moines-Ames, IA'
    }
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

@Component({
  selector: 'app-spot-tv-media-profile',
  templateUrl: './spot-tv-media-profile.component.html',
  styleUrls: ['./spot-tv-media-profile.component.scss']
})
export class SpotTvMediaProfileComponent implements OnInit, OnDestroy {
  @Input() maven: Maven = mockMaven;
  title = 'Spot TV';
  listButtonTitle = 'Spot TV List';

  mainInformation: Field[] = [];
  mavenAttributes: Field[] = [];
  diversityAttributes: Field[] = [];
  filesColumns: FileColumn[] = filesColumnsConfig;

  mainInformationFields: Field[] = mainInformationFields;
  mavenAttributesFields: Field[] = mavenAttributesFields;
  diversityAttributesFields: Field[] = diversityAttributesFields;

  unsubscribeAll: Subject<null> = new Subject();


  // list
  data: Table = { rows: [], columns: [] };
  tableStyles: { [key: string]: string } = { height: '500px' }

  constructor(
    private dialog: MatDialog,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.mainInformation = this.updateFieldsWithValue(mainInformationFields, this.maven);
    this.mavenAttributes = this.updateFieldsWithValue(mavenAttributesFields, this.maven);
    this.diversityAttributes = this.updateFieldsWithValue(diversityAttributesFields, this.maven);

    this.data = {
      rows: MOCK_ROWS,
      columns: COLUMNS
    };

    this.router.queryParamMap.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(paramMap => {
      const showList = paramMap.get('list');
      if (showList === 'true') {
        this.openListDialog();
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  updateFieldsWithValue(fields: Field[], maven: Maven): Field[] {
    return fields.map((field: any) => {
      const key = field.id as keyof Maven;
      const value = maven[key];

      return {
        ...field,
        value
      };
    });
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
        data: this.data,
        tableStyles: this.tableStyles
      }
    });
  }
}
