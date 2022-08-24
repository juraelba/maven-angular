import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from '@services/search/search.service';

@Component({
  selector: 'app-search-menu-bar',
  templateUrl: './search-menu-bar.component.html',
  styleUrls: ['./search-menu-bar.component.scss']
})
export class SearchMenuBarComponent implements OnInit {
  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
  }

  onNewSearchClick(event: MouseEvent): void {
    event.stopPropagation();

    this.searchService.newSearch();
  }
}
