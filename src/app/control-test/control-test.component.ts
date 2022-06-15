import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-test',
  templateUrl: './control-test.component.html',
  styleUrls: ['./control-test.component.scss']
})
export class ControlTestComponent implements OnInit {
  public testing: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
