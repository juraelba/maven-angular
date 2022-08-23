import { Component, OnInit, Input, EventEmitter, Output, ContentChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
  @Input() icon: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() disabled: boolean = false;
  @Input() border: boolean = true;
  @Input() value: string = '';
  @Input() label: string = '';

  @Output() inputChange: EventEmitter<string> = new EventEmitter();

  @ContentChild('suffix') suffix: ElementRef;

  isFocused: boolean = false;
  _placeholder: string = '';

  constructor() { }

  ngOnInit(): void {
    this._placeholder = this.placeholder;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.value = target.value;
    this.inputChange.emit(target.value);
  }

  onInputFocus(): void {
    this.isFocused = true;
    this._placeholder = '';
  }

  onInputBlur(): void {
    this.isFocused = false;

    if(!this.value) {
      this._placeholder = this.placeholder;
    }
  }
}
