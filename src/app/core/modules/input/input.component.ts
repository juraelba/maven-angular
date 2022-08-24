import { Component, OnInit, Input, EventEmitter, Output, ContentChild, ElementRef, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, OnChanges {
  @Input() icon: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() disabled: boolean = false;
  @Input() border: boolean = true;
  @Input() value: string = '';
  @Input() label: string = '';

  @Output() inputChange: EventEmitter<string> = new EventEmitter();

  @ContentChild('prefix') prefix: ElementRef;

  isFocused: boolean = false;
  _placeholder: string = '';

  constructor() { }

  ngOnInit(): void {
    this._placeholder = this.placeholder;
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes.value && !changes.value.firstChange && !changes.value.currentValue) {
        this._placeholder = this.placeholder;
      }
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
