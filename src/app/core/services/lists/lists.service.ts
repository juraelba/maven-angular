import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(
    private http: HttpClient
  ) { }

  fetchCategories(): Observable<any> {
    const url = environment.api + '/lists/categories/';

    return this.http.get(url)
  }
}
