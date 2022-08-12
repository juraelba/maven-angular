import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {
  @Input() name: any;
  @Input() stroke: string;
  @Input() fill: string;

  @ViewChild('cross') cross: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }
}
