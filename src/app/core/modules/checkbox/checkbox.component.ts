import { Component, OnInit, Input, HostListener, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, OnChanges {
  @Input() checked: boolean | undefined = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
  }

  @HostListener('click', ['$event'])
  toogleCheck() {
    this.checked = !this.checked;

    this.change.emit(this.checked);
  }

}
