import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ListsService } from '../../../services/lists/lists.service';
import { SelectOption } from '../../../models/select.model';

@Component({
  selector: 'app-media-type-pick-list',
  templateUrl: './media-type-pick-list.component.html',
  styleUrls: ['./media-type-pick-list.component.scss']
})
export class MediaTypePickListComponent implements OnInit {
  @Output() change: EventEmitter<any> = new EventEmitter();

  borderLabel: string;
  options: SelectOption[] = [];

  constructor(
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
    this.listsService.getOptionsData('mediatypes')
      .subscribe((options: SelectOption[]) => {
        this.options = options;
      })
  }

  onApplyChanges(options: SelectOption[]): void {
    this.borderLabel = options.length ? 'MediaType' : '';

    this.change.emit({ key: 'mediatypes', data: options });
  }
}
