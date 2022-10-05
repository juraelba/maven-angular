import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MediaProfileFields, MediaProfileFieldsLabels } from '@enums/media-profile.enum';
import { SearchMediaProfileEnumTitles } from '@enums/search.enum';
import { Maven, MavenFile } from '@models/maven.model';
import { SearchMediaProfileTitleKey } from '@models/search.model';

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

@Component({
  selector: 'app-dynamic-media-profile',
  templateUrl: './dynamic-media-profile.component.html',
  styleUrls: ['./dynamic-media-profile.component.scss']
})
export class DynamicMediaProfileComponent implements OnInit {

  @Input() maven: Maven;
  @Input() mainInformation: Field[];
  @Input() mavenAttributes: Field[];
  @Input() diversityAttributes: Field[];
  @Input() filesColumns: FileColumn[];

  @Output() opeList = new EventEmitter();

  tittle: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    const searchScreenKey = this.router.url.split('/')[1] as SearchMediaProfileTitleKey;
    this.tittle = SearchMediaProfileEnumTitles[searchScreenKey];
  }

  openDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.opeList.next(event);
  }
}
