import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Criteries } from '@models/criteries.model';
import { of } from 'ramda';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CallHistoryService {
  url = environment.api + '/call-history';
  activeMeidaType: BehaviorSubject<number> = new BehaviorSubject(10);
  constructor(private http: HttpClient) {}

  getCallHistory(mediaId: string, criteries: Criteries) {
    if (criteries.callLetterHistory === 'date') {
      this.dateformat(criteries.startDate);
      return this.http.get(
        `${this.url}/${this.activeMeidaType.value}/${this.dateformat(
          criteries.startDate
        )}/${this.dateformat(criteries.endDate)}`
      );
    } else {
      return this.http.get(
        `${this.url}/${this.activeMeidaType.value}/${criteries.callLetter}`
      );
    }
  }

  dateformat(date: number) {
    const date1 = new Date(date);
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const dt = date1.getDate();
    return year + '-' + month + '-' + dt;
  }
}
