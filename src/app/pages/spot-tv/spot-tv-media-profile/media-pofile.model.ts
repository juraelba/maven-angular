import { MediaTypeListItem } from "@models/list.model";
import { MavenFile } from "@models/maven.model";

export interface Category {
  id: string,
  name: string,
}

export interface Parent { id: string, name: string }
export interface Owner { id: string, name: string }
interface Description {
  desc: string;
  descSource: string;
  history: string;
  historySource: string;
  id: string;
  positioning: string;
  positioningSource: string;
  targetAudience: string;
  targetAudienceSource: string;
}

interface Diversity {
  certified: string;
  certifiedAgency: string;
  certifiedCode: string;
  certifiedExpiration: Date;
  classified: string;
  classifiedCode: string;
  classifiedExpiration: Date;
  fcc: string
  qualifiedFCC: string;
  target: string;
}

interface Address {
  address1: string
  address2: string
  city: string
  completeAddress: string
  country: { id: string, name: string }
  id: number
  postalCode: string
  state: string
}

export interface MediaProfile {
  address: Address;
  agl: number;
  anglString: string;
  amsl: number;
  amslString: string;
  band: string;
  categories: Category[];
  category: string;
  class: string;
  commercial: boolean;
  coordinates: string;
  description: Description;
  digitalChannel: number;
  displayChannel: number;
  diversity: Diversity;
  dmAs: { isPrimary: any, id: number, name: string };
  dmaMarket: string;
  email: string;
  fax: string;
  fccid: string;
  files: MavenFile[];
  geoAppeal: string;
  haat: any;
  haatString: string;
  id: string;
  language: string;
  languages: { id: number; name: string }[];
  latitudeDMS: string;
  latitudeDecimal: any;
  licenseCityState: string;
  licenseCounty: string;
  longitudeDMS: string;
  longitudeDecimal: any;
  mediaKitURL: any;
  mediaType: MediaTypeListItem;
  msAs: any;
  msaMarket: any;
  name: string;
  owner: Owner;
  parent: Parent;
  parents: { id: number; name: string; percentage: number; }[]
  partners: { id: string; mediaType: MediaTypeListItem; name: string; }[]
  people: null
  phone: string;
  power: number;
  powerString: string;
  slogan: string;
  startDate: string;
  subChannels: []
  timeZone: string;
  topParent: Parent;
  website: string;
  callHistory: string;
};
