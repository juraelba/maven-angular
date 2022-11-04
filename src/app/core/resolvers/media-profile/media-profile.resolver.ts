import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { MediaProfileService } from '@services/media-profile/media-profile.service';

import { SearchEnum } from '@enums/search.enum';
import { Maven } from '@models/maven.model';
import { SearchService } from '@services/search/search.service';

@Injectable({
  providedIn: 'root',
})
export class MediaProfileResolver implements Resolve<Maven> {
  constructor(
    private mediaProfileService: MediaProfileService,
    private location: Location,
    private searchService: SearchService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Maven> {
    const id = route.paramMap.get('id') as string;

    let searchScreenKey = this.location.path().split('/')[1] as SearchEnum;
    const isMediaPage = this.location.path().split('/')[1] === 'media-search';
    const isTextSearch = this.searchService.isTextSearch.value;

    if (isMediaPage) {
      searchScreenKey = this.searchService.getKeyByValue(
        this.searchService.currentMediaType.value
      ) as SearchEnum;
    }

    return this.mediaProfileService.fetchMediaProfile(searchScreenKey, id);
  }
}
