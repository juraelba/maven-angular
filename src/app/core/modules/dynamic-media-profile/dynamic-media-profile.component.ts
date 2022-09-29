import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaProfileFields, MediaProfileFieldsLabels } from '@enums/media-profile.enum';
import { Maven, MavenFile } from '@models/maven.model';

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
export class DynamicMediaProfileComponent {

  @Input() maven: Maven;
  @Input() mainInformation: Field[];
  @Input() mavenAttributes: Field[];
  @Input() diversityAttributes: Field[];
  @Input() filesColumns: FileColumn[];
  @Input() title: string;
  @Input() listButtonTittle: string;

  @Output() opeList = new EventEmitter();


  constructor() { }

  openDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.opeList.next(event);
  }

}
