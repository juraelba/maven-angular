import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-search',
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.scss']
})
export class MediaSearchComponent implements OnInit {
  nameSearchDisabled: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
