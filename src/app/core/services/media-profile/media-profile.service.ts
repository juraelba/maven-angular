import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Maven } from '@models/maven.model';

import { SearchEnum } from '@enums/search.enum';

@Injectable({
  providedIn: 'root'
})
export class MediaProfileService {

  constructor(
    private http: HttpClient
  ) { }

  fetchMediaProfile(key: SearchEnum, id: string): Observable<Maven> {
    const url = environment.api + `/${ key }/${ id }`;

    return this.http.get<Maven>(url)
  }
}
