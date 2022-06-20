import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  isDupe(email: string): Observable<boolean> {
    const url = environment.api + 'users/is-dupe/' + email;
    return this.http.get<boolean>(url);
  }

  isDomainValid(email: string): Observable<boolean> {
    const url = environment.api + 'domains/isvalid/' + email;
    return this.http.get<boolean>(url);
  }
}