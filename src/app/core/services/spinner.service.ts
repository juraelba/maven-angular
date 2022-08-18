import { Injectable } from '@angular/core';
import { SpinnerState } from '../models/spinner.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerSubject$ = new Subject<SpinnerState>();

  spinner$ = this.spinnerSubject$.asObservable();

  constructor() { }

  show() {
    this.spinnerSubject$.next(<SpinnerState>{ show: true });
  }
  hide() {
    this.spinnerSubject$.next(<SpinnerState>{ show: false });
  }
}