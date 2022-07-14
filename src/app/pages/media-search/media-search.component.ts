import { Component, OnInit } from '@angular/core';

interface Criteries {
  [key: string]: any;
}

interface CriteriesCahnges {
  key: string;
  data: any
}

@Component({
  selector: 'app-media-search',
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.scss']
})
export class MediaSearchComponent implements OnInit {
  criteries: Criteries = {};

  constructor() { }

  ngOnInit(): void {

  }
  
  onChange({ key, data }: CriteriesCahnges) {
    this.criteries[key] = data;
  }
}
