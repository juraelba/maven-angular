import { Component, Input, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent implements OnInit {
  @Input() checked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event'])
  toogleCheck() {
    this.checked = !this.checked;
  }
}
