import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  MediaProfileFields,
  MediaProfileFieldsLabels,
} from '@enums/media-profile.enum';
import { SearchMediaProfileEnumTitles } from '@enums/search.enum';
import { Maven, MavenFile } from '@models/maven.model';
import { SearchMediaProfileTitleKey } from '@models/search.model';
import { Column, Row, Table } from '@models/table.model';
import { CIRCULATION_CONFIG } from '../../configs/circulation.config';

interface Field {
  id: MediaProfileFields;
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

@Component({
  selector: 'app-dynamic-media-profile',
  templateUrl: './dynamic-media-profile.component.html',
  styleUrls: ['./dynamic-media-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicMediaProfileComponent implements OnInit {
  @Input() maven: Maven;
  @Input() mainInformation: Field[][];
  @Input() mavenAttributes: Field[][];
  @Input() diversityAttributes: Field[];
  @Input() filesColumns: FileColumn[];
  @Input() personnelTableData?: Table;
  @Input() stationTableData?: Table;
  @Input() callHistoryTableData?: Table;
  @Input() ratesColumns: Column[];
  @Input() ratesData: any;
  @Input() tableStyles: { [key: string]: string } = { height: '500px' };
  @Output() opeList = new EventEmitter();

  tittle: string;
  searchScreenKey: SearchMediaProfileTitleKey;
  circulationConfig = CIRCULATION_CONFIG;
  showAllCategoryBubbles = false;
  numberOfCaegoriesToShow = 2;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchScreenKey = this.router.url.split(
      '/'
    )[1] as SearchMediaProfileTitleKey;
    this.tittle = SearchMediaProfileEnumTitles[this.searchScreenKey];
  }

  openDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.opeList.next(event);
  }

  backToSearch(event: any): void {
    this.router.navigate([this.searchScreenKey]);
  }

  onRowClick(row: Row): void {
    const searchScreenKey = this.router.url.split(
      '/'
    )[1] as SearchMediaProfileTitleKey;
    this.router.navigate([searchScreenKey, row.data.mavenid]);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  labelwithNoColon(label: string): boolean {
    const labelsWithNoColon = ['ID'];

    return labelsWithNoColon.includes(label);
  }

  formatAddress({ value }: any) {
    let { address1, address2, city, state, postalCode, country } = value;
    let isUSA = country.id === 'USA';

    let addressString = `${address1} ${address2} ${city} ${state} ${postalCode} `;

    !isUSA ? (addressString += country.name) : null;

    return addressString;
  }

  toggleShowAllCategoryBubbles(): void {
    this.showAllCategoryBubbles = !this.showAllCategoryBubbles;
  }

  displayCategories(categories: any) {
    if (this.showAllCategoryBubbles) {
      return categories;
    }

    return categories.slice(0, this.numberOfCaegoriesToShow);
  }

  createLink(url: string): string {
    if (url.includes('http')) {
      return url;
    }

    return `http://${url}`;
  }
  mapKeys(obj: object) {
    return Object.keys(obj);
  }

  filterLineBreaks(text: string) {
    if (!text || !text.length) {
      return text;
    }

    return text.replace(/(?:\r)/g, '<br>');
  }

  isStat(key: string) {
    return ['power', 'amsl', 'haat', 'agl'].includes(key);
  }

  formatStats(key: string, value: string) {
    if (key === 'power') {
      return `${parseInt(value) * 1000} Watts`;
    }

    return `${value} Feet (${this.toMeters(value)} meters)`;
  }

  toMeters(feet: string) {
    return Math.round(Number(feet) * 0.3048);
  }
}
