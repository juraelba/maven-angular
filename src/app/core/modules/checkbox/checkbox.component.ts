import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() checked: boolean | undefined = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event'])
  toogleCheck() {
    this.checked = !this.checked;
  }

}
