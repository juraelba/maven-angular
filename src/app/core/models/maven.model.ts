import { MediaTypeListItem } from "./list.model";

export interface MavenFile {
  name: string;
  type: string;
  date: string;
  [key: string]: string;
}

interface Country {
  id: string;
  name: string;
}

interface Address {
  address1: string;
  address2: string;
  city: string;
  completeAddress: string;
  country: Country
  id: number;
  postalCode: string
  state: string;
};

interface CallHistory {
  name: string,
  startDate: string,
  endDate: string,
  dateRange: string
}

interface Person {
  id: number,
  officeID: number,
  mavenid: string,
  firstName: string,
  lastName: string,
  title: string,
  phone: string,
  fax: string,
  mobile: string,
  email: string,
  roles: string,
  name: string
}

interface Partner {
  id: string;
  name: string;
  mediaType: MediaTypeListItem;
}
export interface Maven {
  name: string;
  id: string;
  phone: string;
  fax: string;
  address: Address;
  website: string;
  email: string;
  owner: string;
  parent: string;
  type: string;
  language: string;
  categories: string[];
  geographicAppeal: string;
  dma: string;
  msa: string;
  slogan: string;
  class: string;
  frequency: string;
  fccid: string;
  licenseCity: string;
  licenseCountry: string;
  timeZone: string;
  power: string;
  coordinates: string;
  certified: string;
  classfied: string;
  fcc: string;
  target: string;
  files: MavenFile[];
  partners: Partner[]
  callHistory: CallHistory[];
  haat: string;
  agl: string;
  amsl: string;
  displayChannel: string;
  digitalChannel: string;
  people?: Person[];
};
