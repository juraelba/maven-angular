import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { MediaProfileService } from '@services/media-profile/media-profile.service';

import { SearchEnum } from '@enums/search.enum';
import { Maven } from '@models/maven.model';

@Injectable({
  providedIn: 'root'
})
export class MediaProfileResolver implements Resolve<Maven> {
  constructor(
    private mediaProfileService: MediaProfileService,
    private location: Location
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Maven> {
    const id = route.paramMap.get('id') as string;
    const searchScreenKey = this.location.path().split('/')[1] as SearchEnum;

    return this.mediaProfileService.fetchMediaProfile(searchScreenKey, id);
  }
}
