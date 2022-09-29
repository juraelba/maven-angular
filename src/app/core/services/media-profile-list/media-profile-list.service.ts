import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchEnum } from '@enums/search.enum';
import { environment } from '@environments/environment';
import { Maven } from '@models/maven.model';
import { MediaItem } from '@models/media.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaProfileListService {

  constructor(
    private http: HttpClient
  ) { }

  fetchMediaProfiles(mediaId: string): Observable<MediaItem[]> {
    const url = environment.api + `/lists/media/${mediaId}`;
    return this.http.get<MediaItem[]>(url)
  }
}
