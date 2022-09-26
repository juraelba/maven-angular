import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Maven, MavenFile } from '@models/maven.model';
import { MediaProfileFields, MediaProfileFieldsLabels } from '@enums/media-profile.enum';

import { SpotRadioListComponent } from '../spot-radio-list/spot-radio-list.component';

const mockMaven = {
  mavenId: 'WABC-AM',
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
  categories: [ 'City/Regional/State/Comminity', 'Category City' ],
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
  mediaPartners: [ 'WABC-AM (Digital)' ],
  callHistory: ''
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
    id: MediaProfileFields.class,
    label: MediaProfileFieldsLabels.class,
  },
  {
    id: MediaProfileFields.language,
    label: MediaProfileFieldsLabels.language,
    valueContentClassName: ['bg-[#FFFBD8] text-[#80761E] rounded-xl py-0.5 px-2 w-fit']
  },
  {
    id: MediaProfileFields.frequency,
    label: MediaProfileFieldsLabels.frequency,
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
    id: MediaProfileFields.msa,
    label: MediaProfileFieldsLabels.msa,
    valueClassName: ['text-regal-blue']
  },
  {
    id: MediaProfileFields.timeZone,
    label: MediaProfileFieldsLabels.timeZone
  },
  {
    id: MediaProfileFields.slogan,
    label: MediaProfileFieldsLabels.slogan
  },
  {
    id: MediaProfileFields.power,
    label: MediaProfileFieldsLabels.power
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

@Component({
  selector: 'app-spot-radio-media-profile',
  templateUrl: './spot-radio-media-profile.component.html',
  styleUrls: ['./spot-radio-media-profile.component.scss']
})
export class SpotRadioMediaProfileComponent implements OnInit {
  @Input() maven: Maven = mockMaven;

  mainInformation: Field[] = [];
  mavenAttributes: Field[] = [];
  diversityAttributes: Field[] = [];
  filesColumns: FileColumn[] = filesColumnsConfig;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.mainInformation = this.updateFieldsWithValue(mainInformationFields, this.maven);
    this.mavenAttributes = this.updateFieldsWithValue(mavenAttributesFields, this.maven);
    this.diversityAttributes = this.updateFieldsWithValue(diversityAttributesFields, this.maven);
    console.log(this.mavenAttributes)
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

    this.dialog.open(SpotRadioListComponent, {
      width: '900px',
      panelClass: 'profile'
    });
  }
}
