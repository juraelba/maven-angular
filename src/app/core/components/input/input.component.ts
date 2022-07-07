import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
