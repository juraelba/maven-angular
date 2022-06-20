import { Component, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { SpinnerService } from '../../core/services/spinner.service';
import { SpinnerState } from '../../core/models/spinner.model';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  show = false;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.spinnerSubject$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((state: SpinnerState) => {
      this.show = state.show;
    });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}