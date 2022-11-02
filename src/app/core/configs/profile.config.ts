import {
  MediaProfileFields,
  MediaProfileFieldsLabels,
} from '@enums/media-profile.enum';
import { MavenFile } from '@models/maven.model';

export interface Field {
  id: MediaProfileFields;
  path: MediaProfileFields | string[];
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

const mainInformationFields: Field[][] = [
  [
    {
      id: MediaProfileFields.id,
      path: MediaProfileFields.id,
      label: MediaProfileFieldsLabels.id,
      valueClassName: ['ml-[20px]'],
    },
    {
      id: MediaProfileFields.phone,
      path: MediaProfileFields.phone,
      label: MediaProfileFieldsLabels.phone,
      icon: MediaProfileFields.phone,
      iconFill: '#797979',
      iconStroke: 'none',
      className: ['items-center'],
    },
    {
      id: MediaProfileFields.fax,
      path: MediaProfileFields.fax,
      label: MediaProfileFieldsLabels.fax,
      icon: MediaProfileFields.fax,
      iconFill: '#797979',
      iconStroke: 'none',
      className: ['items-center'],
    },
  ],
  [
    {
      id: MediaProfileFields.address,
      path: [MediaProfileFields.address, 'completeAddress'],
      label: MediaProfileFieldsLabels.address,
      icon: MediaProfileFields.address,
      className: ['row-span-4', 'align-self'],
      iconFill: '#797979',
      iconStroke: 'none',
    },
  ],
  [
    {
      id: MediaProfileFields.website,
      path: MediaProfileFields.website,

      label: MediaProfileFieldsLabels.website,
      icon: MediaProfileFields.website,
      iconFill: '#797979',
      iconStroke: 'none',
      className: ['items-center'],
      valueClassName: ['text-blue', 'cursor-pointer'],
    },
    {
      id: MediaProfileFields.email,
      path: MediaProfileFields.email,
      label: MediaProfileFieldsLabels.email,
      icon: MediaProfileFields.email,
      iconFill: '#797979',
      iconStroke: 'none',
      className: ['items-center'],
    },
  ],
  [
    {
      id: MediaProfileFields.owner,
      path: [MediaProfileFields.owner, 'name'],
      label: MediaProfileFieldsLabels.owner,
      valueClassName: ['text-regal-blue'],
      valueContentClassName: ['text-regal-blue'],
    },
    {
      id: MediaProfileFields.parent,
      path: [MediaProfileFields.parent, 'name'],
      label: MediaProfileFieldsLabels.parent,
      valueClassName: ['text-regal-blue'],
      valueContentClassName: ['text-regal-blue'],
    },
  ],
];

const spotTVMavenAttributesFields: Field[][] = [
  [
    {
      id: MediaProfileFields.type,
      path: ['mediaType', MediaProfileFields.type],
      label: MediaProfileFieldsLabels.type,
      valueContentClassName: [
        'bg-[#E4F2FF] text-[#4087F3] rounded-xl py-0.5 px-2 w-fit',
      ],
    },
    {
      id: MediaProfileFields.language,
      path: MediaProfileFields.language,
      label: MediaProfileFieldsLabels.language,
      valueContentClassName: [
        'bg-[#F6E4FF] text-[#931ACC] rounded-xl py-0.5 px-2 w-fit',
      ],
    },

    {
      id: MediaProfileFields.categories,
      path: MediaProfileFields.categories,
      label: MediaProfileFieldsLabels.categories,
      valueContentClassName: [
        'bg-[#E4F2FF] h-[24px]  text-[#4087F3] rounded-xl py-0.5 px-2 w-fit',
      ],
    },
    {
      id: MediaProfileFields.geographicAppeal,
      path: ['geoAppeal'],
      label: MediaProfileFieldsLabels.geographicAppeal,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.dmaMarket,
      path: MediaProfileFields.dmaMarket,
      label: MediaProfileFieldsLabels.dma,
      valueContentClassName: ['ml-2', 'text-regal-blue'],
      valueClassName: ['text-blue'],
    },
    {
      id: MediaProfileFields.slogan,
      path: MediaProfileFields.slogan,
      label: MediaProfileFieldsLabels.slogan,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.class,
      path: MediaProfileFields.class,
      label: MediaProfileFieldsLabels.class,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.displayChannel,
      path: MediaProfileFields.displayChannel,
      label: MediaProfileFieldsLabels.displayChannel,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.digitalChannel,
      path: MediaProfileFields.digitalChannel,
      label: MediaProfileFieldsLabels.digitalChannel,
      valueContentClassName: ['ml-2'],
    },
  ],
  [
    {
      id: MediaProfileFields.fccid,
      path: MediaProfileFields.fccid,
      label: MediaProfileFieldsLabels.fccid,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.licenseCityState,
      path: MediaProfileFields.licenseCityState,
      label: MediaProfileFieldsLabels.licenseCity,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.licenseCounty,
      path: MediaProfileFields.licenseCounty,
      label: MediaProfileFieldsLabels.licenseCounty,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.timeZone,
      path: MediaProfileFields.timeZone,
      label: MediaProfileFieldsLabels.timeZone,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.power,
      path: MediaProfileFields.power,
      label: MediaProfileFieldsLabels.power,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.haat,
      path: MediaProfileFields.haat,
      label: MediaProfileFieldsLabels.haat,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.amsl,
      path: MediaProfileFields.amsl,
      label: MediaProfileFieldsLabels.amsl,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.agl,
      path: MediaProfileFields.agl,
      label: MediaProfileFieldsLabels.agl,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.coordinates,
      path: MediaProfileFields.coordinates,
      label: MediaProfileFieldsLabels.coordinates,
      className: ['col-start-2 col-end-3'],
      valueContentClassName: ['ml-2'],
    },
  ],
];

const spotRadioMavenAttributesFields: Field[][] = [
  [
    {
      id: MediaProfileFields.type,
      path: ['mediaType', MediaProfileFields.type],
      label: MediaProfileFieldsLabels.type,
      valueContentClassName: [
        'bg-[#E4F2FF] text-[#4087F3] rounded-xl py-0.5 px-2 w-fit',
      ],
    },
    {
      id: MediaProfileFields.language,
      path: MediaProfileFields.language,
      label: MediaProfileFieldsLabels.language,
      valueContentClassName: [
        'bg-[#F6E4FF] text-[#931ACC] rounded-xl py-0.5 px-2 w-fit',
      ],
    },
    {
      id: MediaProfileFields.categories,
      path: MediaProfileFields.categories,
      label: MediaProfileFieldsLabels.categories,
      valueContentClassName: [
        'bg-[#E4F2FF] text-[#4087F3] rounded-xl py-0.5 px-2 w-fit',
      ],
    },
    {
      id: MediaProfileFields.geographicAppeal,
      path: ['geoAppeal'],
      label: MediaProfileFieldsLabels.geographicAppeal,
      valueContentClassName: ['ml-2'],
    },

    {
      id: MediaProfileFields.dmaMarket,
      path: MediaProfileFields.dmaMarket,
      label: MediaProfileFieldsLabels.dma,
      valueClassName: ['text-regal-blue'],
      valueContentClassName: ['ml-2', 'text-regal-blue'],
    },

    {
      id: MediaProfileFields.slogan,
      path: MediaProfileFields.slogan,
      label: MediaProfileFieldsLabels.slogan,
      valueContentClassName: ['ml-2'],
    },
  ],
  [
    {
      id: MediaProfileFields.class,
      path: MediaProfileFields.class,
      label: MediaProfileFieldsLabels.class,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.displayChannel,
      path: MediaProfileFields.displayChannel,
      label: MediaProfileFieldsLabels.displayChannel,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.digitalChannel,
      path: MediaProfileFields.digitalChannel,
      label: MediaProfileFieldsLabels.digitalChannel,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.frequency,
      path: MediaProfileFields.frequency,
      label: MediaProfileFieldsLabels.frequency,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.fccid,
      path: MediaProfileFields.fccid,
      label: MediaProfileFieldsLabels.fccid,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.licenseCityState,
      path: MediaProfileFields.licenseCityState,
      label: MediaProfileFieldsLabels.licenseCity,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.licenseCounty,
      path: MediaProfileFields.licenseCounty,
      label: MediaProfileFieldsLabels.licenseCounty,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.timeZone,
      path: MediaProfileFields.timeZone,
      label: MediaProfileFieldsLabels.timeZone,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.power,
      path: MediaProfileFields.power,
      label: MediaProfileFieldsLabels.power,
      valueContentClassName: ['ml-2'],
    },

    {
      id: MediaProfileFields.haat,
      path: MediaProfileFields.haat,
      label: MediaProfileFieldsLabels.haat,
      valueContentClassName: ['ml-2'],
    },

    {
      id: MediaProfileFields.amsl,
      path: MediaProfileFields.amsl,
      label: MediaProfileFieldsLabels.amsl,
      valueContentClassName: ['ml-2'],
    },

    {
      id: MediaProfileFields.agl,
      path: MediaProfileFields.agl,
      label: MediaProfileFieldsLabels.agl,
      valueContentClassName: ['ml-2'],
    },

    {
      id: MediaProfileFields.coordinates,
      path: MediaProfileFields.coordinates,
      label: MediaProfileFieldsLabels.coordinates,
      className: ['col-start-2 col-end-3'],
      valueContentClassName: ['ml-2'],
    },
  ],
];

const outOfHomeMavenAttributesFields: Field[][] = [
  [
    {
      id: MediaProfileFields.type,
      path: ['mediaType', MediaProfileFields.type],
      label: MediaProfileFieldsLabels.type,
      valueContentClassName: [
        'bg-[#E4F2FF] text-[#4087F3] rounded-xl py-0.5 px-2 w-fit',
      ],
    },
    {
      id: MediaProfileFields.language,
      path: MediaProfileFields.language,
      label: MediaProfileFieldsLabels.language,
      valueContentClassName: [
        'bg-[#F6E4FF] text-[#931ACC] rounded-xl py-0.5 px-2 w-fit',
      ],
    },
    {
      id: MediaProfileFields.categories,
      path: MediaProfileFields.categories,
      label: MediaProfileFieldsLabels.categories,
      valueContentClassName: [
        'bg-[#E4F2FF] text-[#4087F3] rounded-xl py-0.5 px-2 w-fit',
      ],
    },
    {
      id: MediaProfileFields.geographicAppeal,
      path: ['geoAppeal'],
      label: MediaProfileFieldsLabels.geographicAppeal,
      valueContentClassName: ['ml-2', 'text-regal-blue'],
    },

    {
      id: MediaProfileFields.dmaMarket,
      path: MediaProfileFields.dmaMarket,
      label: MediaProfileFieldsLabels.dma,
      valueClassName: ['text-regal-blue'],
      valueContentClassName: ['ml-2', 'text-regal-blue'],
    },

    {
      id: MediaProfileFields.slogan,
      path: MediaProfileFields.slogan,
      label: MediaProfileFieldsLabels.slogan,
      valueClassName: ['text-regal-blue'],
      valueContentClassName: ['ml-2'],
    },
  ],
  [
    {
      id: MediaProfileFields.class,
      path: MediaProfileFields.class,
      label: MediaProfileFieldsLabels.class,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.displayChannel,
      path: MediaProfileFields.displayChannel,
      label: MediaProfileFieldsLabels.displayChannel,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.digitalChannel,
      path: MediaProfileFields.digitalChannel,
      label: MediaProfileFieldsLabels.digitalChannel,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.frequency,
      path: MediaProfileFields.frequency,
      label: MediaProfileFieldsLabels.frequency,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.fccid,
      path: MediaProfileFields.fccid,
      label: MediaProfileFieldsLabels.fccid,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.licenseCityState,
      path: MediaProfileFields.licenseCityState,
      label: MediaProfileFieldsLabels.licenseCity,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.licenseCounty,
      path: MediaProfileFields.licenseCounty,
      label: MediaProfileFieldsLabels.licenseCounty,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.timeZone,
      path: MediaProfileFields.timeZone,
      label: MediaProfileFieldsLabels.timeZone,
      valueContentClassName: ['ml-2'],
    },
    {
      id: MediaProfileFields.power,
      path: MediaProfileFields.power,
      label: MediaProfileFieldsLabels.power,
      valueContentClassName: ['ml-2'],
    },

    {
      id: MediaProfileFields.haat,
      path: MediaProfileFields.haat,
      label: MediaProfileFieldsLabels.haat,
      valueContentClassName: ['ml-2'],
    },

    {
      id: MediaProfileFields.amsl,
      path: MediaProfileFields.amsl,
      label: MediaProfileFieldsLabels.amsl,
      valueContentClassName: ['ml-2'],
    },

    {
      id: MediaProfileFields.agl,
      path: MediaProfileFields.agl,
      label: MediaProfileFieldsLabels.agl,
      valueContentClassName: ['ml-2'],
    },

    {
      id: MediaProfileFields.coordinates,
      path: MediaProfileFields.coordinates,
      label: MediaProfileFieldsLabels.coordinates,
      className: ['col-start-2 col-end-3'],
      valueContentClassName: ['ml-2'],
    },
  ],
];

const diversityAttributesFields: Field[] = [
  {
    id: MediaProfileFields.certified,
    path: ['diversity', MediaProfileFields.certified],
    label: MediaProfileFieldsLabels.certified,
  },
  {
    id: MediaProfileFields.classfied,
    path: ['diversity', 'classified'],
    label: MediaProfileFieldsLabels.classfied,
  },
  {
    id: MediaProfileFields.fcc,
    path: ['diversity', MediaProfileFields.fcc],
    label: MediaProfileFieldsLabels.fcc,
    valueContentClassName: [
      'bg-[#FFFBD8] text-[#80761E] rounded-xl py-0.5 px-0 w-fit',
    ],
  },
  {
    id: MediaProfileFields.target,
    path: ['diversity', MediaProfileFields.target],
    label: MediaProfileFieldsLabels.target,
  },
];

const filesColumnsConfig: FileColumn[] = [
  {
    id: 'name',
    label: 'Name',
    className: ['basis-[40%]'],
  },

  {
    id: 'type',
    label: 'Type',
    className: ['basis-[25%]'],
  },
  {
    id: 'file',
    label: '',
    className: ['basis-[5%]'],
    icon: 'pdfFileIcon',
    iconFill: '#797979',
  },
  {
    id: 'uploadDate',
    label: 'Date',
    className: ['basis-[25%]'],
  },
  {
    id: 'actions',
    label: '...',
    className: ['basis-[5%]'],
    icon: 'downloadArrow',
    iconFill: '#3A63CC',
  },
];

export interface FieldArrayItem {
  id: string;
  name: string;
}

export type Formatter = {
  [key in MediaProfileFields]?: (value: any) => string[];
};

export const spotTvProfileConfig = {
  mainInformationFields,
  mavenAttributesFields: spotTVMavenAttributesFields,
  diversityAttributesFields,
  filesColumnsConfig,
};

export const spotRadioProfileConfig = {
  mainInformationFields,
  mavenAttributesFields: spotRadioMavenAttributesFields,
  diversityAttributesFields,
  filesColumnsConfig,
};

export const outOfHomeProfileConfig = {
  mainInformationFields,
  mavenAttributesFields: outOfHomeMavenAttributesFields,
  diversityAttributesFields,
  filesColumnsConfig,
};
