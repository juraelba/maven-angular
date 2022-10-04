import { MediaProfileFields, MediaProfileFieldsLabels } from "@enums/media-profile.enum";
import { MavenFile } from "@models/maven.model";

export interface Field {
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

export interface FileColumn {
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

export interface FieldArrayItem {
  id: string;
  name: string;
};

export type Formatter = {
  [key in MediaProfileFields]?: (value: any) => string;
}

export const profileConfig = {
  mainInformationFields,
  mavenAttributesFields,
  diversityAttributesFields,
  filesColumnsConfig
}
