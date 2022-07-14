import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../core/services/lists/lists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
    this.listsService.storeCachingInformation();
  }
}
