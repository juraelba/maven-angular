import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circulation',
  templateUrl: './circulation.component.html',
  styleUrls: ['./circulation.component.scss'],
})
export class CirculationComponent implements OnInit {
  @Input() circulation: any;

  @Input() config: any;

  constructor() {}

  ngOnInit(): void {}

  formatValue(key: string, value: any) {
    let booleans = ['geoRuns', 'splitRuns'];

    if (booleans.includes(key)) {
      return value ? 'Yes' : 'No';
    }

    return value;
  }
}
