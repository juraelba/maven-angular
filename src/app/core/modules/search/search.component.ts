import { Component, Input } from '@angular/core';

import { Criteries } from '@models/criteries.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() criteries: Criteries;
  @Input() title: string;

  constructor() { }
}
