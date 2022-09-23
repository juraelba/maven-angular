export interface MavenFile {
  name: string;
  type: string;
  date: string;
  [key: string]: string;
}

export interface Maven {
  mavenId: string;
  id: string;
  phone: string;
  workingPhone: string;
  address: string;
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
  mediaPartners: string[];
  callHistory: string;
};
