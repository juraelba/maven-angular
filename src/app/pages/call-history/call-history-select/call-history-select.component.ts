import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { SelectOption } from '@models/select.model';

@Component({
  selector: 'app-call-history-select',
  templateUrl: './call-history-select.component.html',
  styleUrls: ['./call-history-select.component.scss']
})
export class CallHistorySelectComponent implements OnInit {
  @Input() options: SelectOption[] = [];

  @Output() optionSelect: EventEmitter<SelectOption> = new EventEmitter();

  label: string = 'Find call letter history by';

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(event: MouseEvent, selectedOption: SelectOption): void {
    event.stopPropagation();

    this.optionSelect.emit(selectedOption);
  }
}
