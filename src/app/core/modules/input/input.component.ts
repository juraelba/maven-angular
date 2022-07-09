import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() icon: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() disabled: boolean = false;
  @Input() border: boolean = true

  @Output() inputChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.inputChange.emit(target.value);
  }
}
