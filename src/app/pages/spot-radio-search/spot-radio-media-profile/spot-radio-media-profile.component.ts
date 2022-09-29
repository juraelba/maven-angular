import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { lensPath, lensProp, view } from 'ramda'

import { Maven, MavenFile } from '@models/maven.model';
import { MediaProfileFields, MediaProfileFieldsLabels } from '@enums/media-profile.enum';

import { SpotRadioListComponent } from '../spot-radio-list/spot-radio-list.component';

interface Field {
  id: MediaProfileFields,
  path: MediaProfileFields | string[]
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
    label: MediaProfileFieldsLabels.id,
    path: MediaProfileFields.id
  },
  {
    id: MediaProfileFields.address,
    label: MediaProfileFieldsLabels.address,
    path: [MediaProfileFields.address, 'completeAddress'],
    icon: MediaProfileFields.address,
    className: ['row-span-4', 'align-self'],
    iconFill: '#797979',
    iconStroke: 'none'
  },
  {
    id: MediaProfileFields.website,
    label: MediaProfileFieldsLabels.website,
    path: MediaProfileFields.website,
    icon: MediaProfileFields.website,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center'],
    valueClassName: ['text-regal-blue']
  },
  {
    id: MediaProfileFields.owner,
    label: MediaProfileFieldsLabels.owner,
    path: [ MediaProfileFields.owner, 'name' ],
    valueClassName: ['text-regal-blue']
  },
  {
    id: MediaProfileFields.phone,
    label: MediaProfileFieldsLabels.phone,
    path: MediaProfileFields.phone,
    icon: MediaProfileFields.phone,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center']
  },
  {
    id: MediaProfileFields.email,
    label: MediaProfileFieldsLabels.email,
    path: MediaProfileFields.email,
    icon: MediaProfileFields.email,
    iconFill: '#797979',
    iconStroke: 'none',
    className: ['items-center']
  },
  {
    id: MediaProfileFields.parent,
    path: [ MediaProfileFields.parent, 'name' ],
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
    path: MediaProfileFields.type,
    label: MediaProfileFieldsLabels.type,
    valueContentClassName: ['bg-[#E4F2FF] text-[#4087F3] rounded-xl py-0.5 px-2 w-fit'],
  },
  {
    id: MediaProfileFields.class,
    path: MediaProfileFields.class,
    label: MediaProfileFieldsLabels.class,
  },
  {
    id: MediaProfileFields.language,
    path: MediaProfileFields.language,
    label: MediaProfileFieldsLabels.language,
    valueContentClassName: ['bg-[#FFFBD8] text-[#80761E] rounded-xl py-0.5 px-2 w-fit']
  },
  {
    id: MediaProfileFields.frequency,
    path: MediaProfileFields.frequency,
    label: MediaProfileFieldsLabels.frequency,
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
    path: MediaProfileFields.geographicAppeal,
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
    id: MediaProfileFields.msa,
    path: MediaProfileFields.msa,
    label: MediaProfileFieldsLabels.msa,
    valueClassName: ['text-regal-blue']
  },
  {
    id: MediaProfileFields.timeZone,
    path: MediaProfileFields.timeZone,
    label: MediaProfileFieldsLabels.timeZone
  },
  {
    id: MediaProfileFields.slogan,
    path: MediaProfileFields.slogan,
    label: MediaProfileFieldsLabels.slogan
  },
  {
    id: MediaProfileFields.power,
    path: MediaProfileFields.power,
    label: MediaProfileFieldsLabels.power
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
    path: MediaProfileFields.certified,
    label: MediaProfileFieldsLabels.certified
  },
  {
    id: MediaProfileFields.classfied,
    path: MediaProfileFields.classfied,
    label: MediaProfileFieldsLabels.classfied
  },
  {
    id: MediaProfileFields.fcc,
    path: MediaProfileFields.fcc,
    label: MediaProfileFieldsLabels.fcc,
    valueContentClassName: ['bg-[#F6E4FF] text-[#931ACC] rounded-xl py-0.5 px-2 w-fit']
  },
  {
    id: MediaProfileFields.target,
    path: MediaProfileFields.target,
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

interface FieldArrayItem {
  id: string;
  name: string;
};


type Formatter = {
  [key in MediaProfileFields]?: (value: any) => string;
}

@Component({
  selector: 'app-spot-radio-media-profile',
  templateUrl: './spot-radio-media-profile.component.html',
  styleUrls: ['./spot-radio-media-profile.component.scss']
})
export class SpotRadioMediaProfileComponent implements OnInit {
  mainInformation: Field[] = [];
  mavenAttributes: Field[] = [];
  diversityAttributes: Field[] = [];
  filesColumns: FileColumn[] = filesColumnsConfig;
  maven: Maven;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.maven = data.mediaProfile as Maven;
  
      this.mainInformation = this.updateFieldsWithValue(mainInformationFields, this.maven);
      this.mavenAttributes = this.updateFieldsWithValue(mavenAttributesFields, this.maven);
      this.diversityAttributes = this.updateFieldsWithValue(diversityAttributesFields, this.maven);
    })
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

    this.dialog.open(SpotRadioListComponent, {
      width: '900px',
      panelClass: 'profile'
    });
  }
}
