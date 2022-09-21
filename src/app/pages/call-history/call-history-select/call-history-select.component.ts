import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SelectOption } from '@models/select.model';

@Component({
  selector: 'app-call-history-select',
  templateUrl: './call-history-select.component.html',
  styleUrls: ['./call-history-select.component.scss']
})
export class CallHistorySelectComponent implements OnInit {
  @Output() optionSelect: EventEmitter<SelectOption> = new EventEmitter();

  options: SelectOption[] = [
    {
      id: 'date',
      value: 'date',
      label: 'Date',
      selected: true
    },
    {
      id: 'callLetter',
      value: 'callLetter',
      label: 'Call Letter',
      selected: false
    },
  ];
  label: string = 'Find call letter history by';

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(event: MouseEvent, selectedOption: SelectOption): void {
    event.stopPropagation();

    this.options = this.options.map((option) => ({ ...option, selected: option.value === selectedOption.value }));
    this.optionSelect.emit(selectedOption);
  }
}
