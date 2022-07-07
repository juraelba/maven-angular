import { Component, OnInit, Input, ContentChild, ElementRef } from '@angular/core';

import { SelectOption } from '../../core/models/select.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() placeholder: string;
  @Input() disabled: boolean = false;
  @Input() options: SelectOption[] = []

  @ContentChild('valueContainer') valueContainer: ElementRef;
  
  selected: SelectOption;
  arrowIcon: string = 'assets/images/icons/arrow-down.svg';

  constructor() { }

  ngOnInit(): void {
  }

}
