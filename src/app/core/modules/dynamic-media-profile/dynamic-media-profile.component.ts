import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
export class DynamicMediaProfileComponent implements OnInit {

  @Input() maven: Maven;
  @Input() mainInformationFields: Field[];
  @Input() mavenAttributesFields: Field[];
  @Input() diversityAttributesFields: Field[];
  @Input() filesColumns: FileColumn[];
  @Input() title: string;
  @Input() listButtonTittle: string;

  @Output() opeList = new EventEmitter();

  mainInformation: Field[] = [];
  mavenAttributes: Field[] = [];
  diversityAttributes: Field[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.mainInformation = this.updateFieldsWithValue(this.mainInformationFields, this.maven);
    this.mavenAttributes = this.updateFieldsWithValue(this.mavenAttributesFields, this.maven);
    this.diversityAttributes = this.updateFieldsWithValue(this.diversityAttributesFields, this.maven);
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
    this.opeList.next(event);
  }

}
